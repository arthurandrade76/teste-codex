import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout.jsx';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import SelectField from '../components/SelectField.jsx';
import { useCaseDraft } from '../context/CaseDraftContext.jsx';
import { questionTypeOptions } from '../services/caseMock.js';
import { buildLocalCaseFromDraft, saveLocalCase } from '../services/localCases.js';

const defaultAlternatives = [
  'Iniciar Ácido Acetilsalicílico, monitorar e solicitar troponina.',
  'Iniciar protocolo de dor torácica com ECG, monitorização e oxigênio se necessário.',
  'Dar alta com orientação ambulatorial e retorno em caso de piora.',
  'Prescrever analgesia simples e reavaliar em consulta eletiva.',
];

const emptyAlternatives = ['', '', '', ''];
const defaultStatement = 'Qual o diagnóstico mais provável e a conduta imediata para este paciente na sala de emergência?';
const defaultFeedback = 'A prioridade é reconhecer risco cardiovascular, monitorar o paciente e iniciar a investigação imediata.';
const defaultTrueFalseItems = [
  { statement: 'A dor torácica com irradiação exige investigação imediata.', answer: 'Verdadeiro' },
  { statement: 'A ausência de febre exclui uma condição cardiovascular grave.', answer: 'Falso' },
];

const classOptions = [
  { id: '28M1A', students: '35 alunos matriculados' },
  { id: '25M3A', students: '23 alunos matriculados' },
  { id: '24M4A', students: '52 alunos matriculados' },
];

function createEmptyQuestion(id) {
  return {
    id,
    statement: '',
    type: 'Múltipla escolha',
    alternatives: emptyAlternatives,
    trueFalseItems: [
      { statement: '', answer: 'Verdadeiro' },
      { statement: '', answer: 'Falso' },
    ],
    correctAlternative: 1,
    answer: '',
    feedback: '',
  };
}

function isDiscursiveQuestion(type) {
  return type === 'Discursiva' || type === 'Discursivo';
}

function isTrueFalseQuestion(type) {
  return type === 'Verdadeiro ou falso';
}

function normalizeQuestion(question, index) {
  const fallback = createEmptyQuestion(index + 1);
  const alternatives = question.alternatives?.length >= 2
    ? question.alternatives.map((alternative) => (
      defaultAlternatives.includes(alternative) ? '' : alternative
    ))
    : emptyAlternatives;
  const trueFalseItems = question.trueFalseItems?.length >= 1
    ? question.trueFalseItems.map((item) => ({
      ...item,
      statement: defaultTrueFalseItems.some((defaultItem) => defaultItem.statement === item.statement) ? '' : item.statement,
    }))
    : fallback.trueFalseItems;
  const type = question.type ?? fallback.type;
  const correctAlternative = Number.isInteger(question.correctAlternative) && question.correctAlternative < alternatives.length
    ? question.correctAlternative
    : 0;

  return {
    ...fallback,
    ...question,
    type,
    statement: question.statement === defaultStatement ? '' : question.statement ?? fallback.statement,
    alternatives,
    trueFalseItems,
    feedback: question.feedback === defaultFeedback ? '' : question.feedback ?? fallback.feedback,
    correctAlternative,
    answer: isDiscursiveQuestion(type) ? question.answer ?? fallback.answer : alternatives[correctAlternative],
  };
}

export default function CreateCaseQuestions() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishMode, setPublishMode] = useState('classes');
  const [selectedClasses, setSelectedClasses] = useState(['28M1A']);
  const [allowResolutionHints, setAllowResolutionHints] = useState(true);
  const [answerTimeLimit, setAnswerTimeLimit] = useState('60min');
  const [deliveryDeadline, setDeliveryDeadline] = useState('');
  const { draft, resetDraft, setSavedCase, updateDraftSection } = useCaseDraft();
  const navigate = useNavigate();
  const questions = (draft.questions?.items?.length ? draft.questions.items : [createEmptyQuestion(1)])
    .map(normalizeQuestion);

  const previewSections = buildPreviewSections(draft);

  const updateQuestions = (items) => {
    updateDraftSection('questions', { items });
  };

  const handleQuestionChange = (id, field) => (event) => {
    const { value } = event.target;
    updateQuestions(
      questions.map((question) => {
        if (question.id !== id) {
          return question;
        }

        const nextQuestion = { ...question, [field]: value };

        return nextQuestion;
      }),
    );
  };

  const handleAlternativeChange = (id, optionIndex) => (event) => {
    const { value } = event.target;
    updateQuestions(
      questions.map((question) => {
        if (question.id !== id) {
          return question;
        }

        const alternatives = question.alternatives.map((alternative, index) => (
          index === optionIndex ? value : alternative
        ));

        return {
          ...question,
          alternatives,
          answer: alternatives[question.correctAlternative],
        };
      }),
    );
  };

  const handleCorrectAlternative = (id, optionIndex) => {
    updateQuestions(
      questions.map((question) => (
        question.id === id
          ? { ...question, correctAlternative: optionIndex, answer: question.alternatives[optionIndex] }
          : question
      )),
    );
  };

  const handleAddAlternative = (id) => {
    updateQuestions(
      questions.map((question) => {
        if (question.id !== id) {
          return question;
        }

        return {
          ...question,
          alternatives: [...question.alternatives, ''],
        };
      }),
    );
  };

  const handleRemoveAlternative = (id, optionIndex) => {
    updateQuestions(
      questions.map((question) => {
        if (question.id !== id || question.alternatives.length <= 2) {
          return question;
        }

        const alternatives = question.alternatives.filter((_, index) => index !== optionIndex);
        const correctAlternative = question.correctAlternative === optionIndex
          ? 0
          : question.correctAlternative > optionIndex
            ? question.correctAlternative - 1
            : question.correctAlternative;

        return {
          ...question,
          alternatives,
          correctAlternative,
          answer: alternatives[correctAlternative],
        };
      }),
    );
  };

  const handleTrueFalseItemChange = (id, itemIndex, field) => (event) => {
    const { value } = event.target;
    updateQuestions(
      questions.map((question) => {
        if (question.id !== id) {
          return question;
        }

        return {
          ...question,
          trueFalseItems: question.trueFalseItems.map((item, index) => (
            index === itemIndex ? { ...item, [field]: value } : item
          )),
        };
      }),
    );
  };

  const handleAddTrueFalseItem = (id) => {
    updateQuestions(
      questions.map((question) => {
        if (question.id !== id) {
          return question;
        }

        return {
          ...question,
          trueFalseItems: [
            ...question.trueFalseItems,
            { statement: '', answer: 'Verdadeiro' },
          ],
        };
      }),
    );
  };

  const handleRemoveTrueFalseItem = (id, itemIndex) => {
    updateQuestions(
      questions.map((question) => {
        if (question.id !== id || question.trueFalseItems.length <= 1) {
          return question;
        }

        return {
          ...question,
          trueFalseItems: question.trueFalseItems.filter((_, index) => index !== itemIndex),
        };
      }),
    );
  };

  const handleAddQuestion = () => {
    const nextId = Math.max(...questions.map((question) => question.id), 0) + 1;
    updateQuestions([...questions, createEmptyQuestion(nextId)]);
  };

  const handleRemoveQuestion = (id) => {
    if (questions.length === 1) {
      updateQuestions([createEmptyQuestion(1)]);
      return;
    }

    updateQuestions(questions.filter((question) => question.id !== id));
  };

  const handleGenerateQuestions = () => {
    setFeedback('Perguntas geradas a partir do modelo visual do protótipo.');
  };

  const handleGenerateCase = async () => {
    setFeedback('');
    setIsGenerating(true);

    const publishedCase = buildLocalCaseFromDraft(draft, questions, {
      mode: publishMode,
      selectedClasses,
      allowResolutionHints,
      answerTimeLimit,
      deliveryDeadline,
    });

    saveLocalCase(publishedCase);
    setSavedCase({
      case: {
        titulo: publishedCase.title,
        especialidade: publishedCase.specialty,
        disciplina: publishedCase.discipline,
        areaSaude: publishedCase.healthArea,
        dificuldade: publishedCase.difficulty,
        status: publishedCase.status,
        objetivoAprendizagem: draft.clinical.pedagogicalGoal,
      },
      patient: {
        nome: draft.patient.name,
        idade: draft.patient.age,
        profissao: draft.patient.profession,
        sexo: draft.patient.biologicalSex,
        estadoCivil: draft.patient.maritalStatus,
        peso: draft.patient.weight,
        altura: draft.patient.height,
      },
      clinicalContent: {
        sintomas: draft.clinical.symptoms,
        contexto: draft.clinical.clinicalContext,
        examClinico: draft.clinical.clinicalExam,
        antecClinico: draft.clinical.comorbidities,
        diagEsperado: draft.clinical.centralHypothesis,
      },
      questions,
      savedAt: publishedCase.createdAt,
    });
    resetDraft();
    setIsGenerating(false);
    navigate('/meus-casos');
  };

  const handlePublishClick = () => {
    setIsPublishModalOpen(true);
  };

  const handleClosePublishModal = () => {
    setIsPublishModalOpen(false);
  };

  const handleClassToggle = (classId) => {
    setSelectedClasses((currentClasses) => (
      currentClasses.includes(classId)
        ? currentClasses.filter((item) => item !== classId)
        : [...currentClasses, classId]
    ));
  };

  return (
    <AppLayout breadcrumbCurrent="Revisão > Construção de Perguntas">
      <section className="questions-builder" aria-labelledby="questions-builder-title">
        <h2 className="sr-only" id="questions-builder-title">
          Construção de Perguntas
        </h2>

        <article className="case-preview-panel">
          <header className="case-preview-panel__header">
            <Icon name="note" size={20} />
            <h3>Visualização do Caso</h3>
          </header>

          <div className="case-preview-panel__body">
            {previewSections.map((section) => (
              <section className="case-preview-section" key={section.title}>
                <h4>{section.title}</h4>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </article>

        <div className="question-workspace">
          <section className="academic-assistant" aria-labelledby="academic-assistant-title">
            <div>
              <h3 id="academic-assistant-title">Assistente Acadêmico</h3>
              <p>Digite um prompt para transformar o conteúdo em objetivos pedagógicos.</p>
            </div>
            <Button icon="sparkle" iconPosition="right" onClick={handleGenerateQuestions} variant="primary">
              Gerar Perguntas
            </Button>
          </section>

          <div className="question-card-list">
            {questions.map((question, questionIndex) => (
              <section className="figma-question-card" aria-label={`Pergunta ${questionIndex + 1}`} key={question.id}>
                <header className="figma-question-card__header">
                  <h3>Pergunta {questionIndex + 1}</h3>
                  <div className="figma-question-card__tools">
                    <SelectField
                      label="Tipo"
                      name={`question-type-${question.id}`}
                      onChange={handleQuestionChange(question.id, 'type')}
                      options={questionTypeOptions}
                      value={question.type}
                    />
                    <button
                      aria-label={`Remover pergunta ${questionIndex + 1}`}
                      className="figma-question-card__delete"
                      onClick={() => handleRemoveQuestion(question.id)}
                      type="button"
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                </header>

                <label className="question-editor-field">
                  <span>Enunciado da Questão</span>
                  <textarea
                    name={`question-statement-${question.id}`}
                    onChange={handleQuestionChange(question.id, 'statement')}
                    onInput={handleQuestionChange(question.id, 'statement')}
                    placeholder="Digite o enunciado da questão"
                    value={question.statement}
                  />
                </label>

                {isDiscursiveQuestion(question.type) ? (
                  <div className="discursive-editor">
                    <label className="question-editor-field">
                      <span>Resposta esperada</span>
                      <textarea
                        name={`question-answer-${question.id}`}
                        onChange={handleQuestionChange(question.id, 'answer')}
                        onInput={handleQuestionChange(question.id, 'answer')}
                        placeholder="Digite a resposta esperada"
                        value={question.answer}
                      />
                    </label>
                    <label className="question-editor-field">
                      <span>Critérios de correção</span>
                      <textarea
                        name={`question-feedback-${question.id}`}
                        onChange={handleQuestionChange(question.id, 'feedback')}
                        onInput={handleQuestionChange(question.id, 'feedback')}
                        placeholder="Digite os critérios de correção"
                        value={question.feedback}
                      />
                    </label>
                  </div>
                ) : isTrueFalseQuestion(question.type) ? (
                  <div className="true-false-editor">
                    <div className="alternatives-editor__header">
                      <span className="alternatives-editor__label">Afirmações</span>
                      <button
                        className="alternatives-editor__add"
                        onClick={() => handleAddTrueFalseItem(question.id)}
                        type="button"
                      >
                        Adicionar afirmação
                      </button>
                    </div>

                    {question.trueFalseItems.map((item, index) => (
                      <div className="true-false-row" key={`${question.id}-true-false-${index}`}>
                        <span className="alternative-row__letter">{String.fromCharCode(65 + index)}</span>
                        <textarea
                          aria-label={`Afirmação ${String.fromCharCode(65 + index)}`}
                          onChange={handleTrueFalseItemChange(question.id, index, 'statement')}
                          onInput={handleTrueFalseItemChange(question.id, index, 'statement')}
                          placeholder={`Digite a afirmação ${String.fromCharCode(65 + index)}`}
                          value={item.statement}
                        />
                        <div className="true-false-toggle" aria-label={`Classificação da afirmação ${String.fromCharCode(65 + index)}`}>
                          {['Verdadeiro', 'Falso'].map((answer) => (
                            <button
                              className={`true-false-option ${item.answer === answer ? 'true-false-option--selected' : ''}`}
                              key={answer}
                              onClick={() => handleTrueFalseItemChange(question.id, index, 'answer')({ target: { value: answer } })}
                              type="button"
                            >
                              {answer}
                            </button>
                          ))}
                        </div>
                        <button
                          aria-label={`Remover afirmação ${String.fromCharCode(65 + index)}`}
                          className="alternative-row__remove"
                          disabled={question.trueFalseItems.length <= 1}
                          onClick={() => handleRemoveTrueFalseItem(question.id, index)}
                          type="button"
                        >
                          <Icon name="minus" size={14} />
                        </button>
                      </div>
                    ))}

                    <label className="question-editor-field">
                      <span>Justificativa para o aluno</span>
                      <textarea
                        name={`question-feedback-${question.id}`}
                        onChange={handleQuestionChange(question.id, 'feedback')}
                        onInput={handleQuestionChange(question.id, 'feedback')}
                        placeholder="Digite uma justificativa para o aluno"
                        value={question.feedback}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="alternatives-editor">
                    <div className="alternatives-editor__header">
                      <span className="alternatives-editor__label">Alternativas</span>
                      <button
                        className="alternatives-editor__add"
                        onClick={() => handleAddAlternative(question.id)}
                        type="button"
                      >
                        Adicionar alternativa
                      </button>
                    </div>
                    {question.alternatives.map((alternative, index) => (
                      <label
                        className={`alternative-row ${question.correctAlternative === index ? 'alternative-row--selected' : ''}`}
                        key={`${question.id}-${index}`}
                      >
                        <input
                          checked={question.correctAlternative === index}
                          name={`correct-alternative-${question.id}`}
                          onChange={() => handleCorrectAlternative(question.id, index)}
                          type="radio"
                        />
                        <span className="alternative-row__letter">{String.fromCharCode(65 + index)}</span>
                        <textarea
                          aria-label={`Alternativa ${String.fromCharCode(65 + index)}`}
                          onChange={handleAlternativeChange(question.id, index)}
                          onInput={handleAlternativeChange(question.id, index)}
                          placeholder={`Digite a alternativa ${String.fromCharCode(65 + index)}`}
                          value={alternative}
                        />
                        <button
                          aria-label={`Remover alternativa ${String.fromCharCode(65 + index)}`}
                          className="alternative-row__remove"
                          disabled={question.alternatives.length <= 2}
                          onClick={(event) => {
                            event.preventDefault();
                            handleRemoveAlternative(question.id, index);
                          }}
                          type="button"
                        >
                          <Icon name="minus" size={14} />
                        </button>
                      </label>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {feedback && <p className="form-feedback">{feedback}</p>}

          <div className="questions-builder__actions">
            <Button icon="case" onClick={handleAddQuestion} variant="secondary">
              Adicionar Nova Pergunta
            </Button>
            <Button
              icon="sparkle"
              iconPosition="right"
              loading={isGenerating}
              loadingText="Publicando..."
              onClick={handlePublishClick}
              variant="primary"
            >
              Publicar Caso Clínico
            </Button>
          </div>
        </div>
      </section>

      {isPublishModalOpen && (
        <div className="publish-overlay" role="presentation">
          <section className="publish-modal" aria-labelledby="publish-modal-title" role="dialog" aria-modal="true">
            <header className="publish-modal__header">
              <div>
                <h2 id="publish-modal-title">Publicar Caso Clínico</h2>
                <p>Configure as opções finais antes de disponibilizar aos alunos.</p>
              </div>
              <button
                aria-label="Fechar publicação"
                className="publish-modal__close"
                onClick={handleClosePublishModal}
                type="button"
              >
                ×
              </button>
            </header>

            <div className="publish-modal__divider" />

            <section className="publish-section">
              <div className="publish-section__title">
                <Icon name="globe" size={22} />
                <h3>Modo de Publicação</h3>
              </div>

              <div className="publish-mode-grid">
                <button
                  className={`publish-mode-card ${publishMode === 'classes' ? 'publish-mode-card--selected' : ''}`}
                  onClick={() => setPublishMode('classes')}
                  type="button"
                >
                  <span className="publish-mode-card__top">
                    <Icon name="group" size={18} />
                    <strong>Turmas</strong>
                    <span className="publish-radio" />
                  </span>
                  <span>Envie diretamente para suas turmas ativas na plataforma.</span>
                </button>

                <button
                  className={`publish-mode-card ${publishMode === 'private' ? 'publish-mode-card--selected' : ''}`}
                  onClick={() => setPublishMode('private')}
                  type="button"
                >
                  <span className="publish-mode-card__top">
                    <Icon name="lock" size={18} />
                    <strong>Privado</strong>
                    <span className="publish-radio" />
                  </span>
                  <span>Salve em sua biblioteca para exportar ou enviar por e-mail.</span>
                </button>
              </div>
            </section>

            {publishMode === 'classes' && (
              <>
                <section className="publish-section">
                  <h3 className="publish-section__heading">Selecione as Turmas</h3>
                  <div className="publish-class-list">
                    {classOptions.map((classItem) => (
                      <label className="publish-class-row" key={classItem.id}>
                        <input
                          checked={selectedClasses.includes(classItem.id)}
                          onChange={() => handleClassToggle(classItem.id)}
                          type="checkbox"
                        />
                        <span>
                          <strong>{classItem.id}</strong>
                          <small>{classItem.students}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                </section>

                <section className="publish-config-list">
                  <label className="publish-config-card">
                    <span className="publish-config-card__icon">
                      <Icon name="star" size={18} />
                    </span>
                    <span className="publish-config-card__copy">
                      <strong>Configurações de Resolução</strong>
                      <small>A IA poderá dar dicas guiadas durante a resolução.</small>
                    </span>
                    <input
                      checked={allowResolutionHints}
                      onChange={(event) => setAllowResolutionHints(event.target.checked)}
                      type="checkbox"
                    />
                  </label>

                  <label className="publish-config-card">
                    <span className="publish-config-card__icon">
                      <Icon name="clock" size={18} />
                    </span>
                    <span className="publish-config-card__copy">
                      <strong>Tempo limite de resposta</strong>
                      <small>Defina o tempo máximo que o aluno terá.</small>
                    </span>
                    <span className="publish-select-wrap">
                      <select
                        aria-label="Tempo limite de resposta"
                        onChange={(event) => setAnswerTimeLimit(event.target.value)}
                        value={answerTimeLimit}
                      >
                        <option value="30min">30min</option>
                        <option value="60min">60min</option>
                        <option value="90min">90min</option>
                      </select>
                      <Icon name="chevronDown" size={16} />
                    </span>
                  </label>

                  <label className="publish-config-card">
                    <span className="publish-config-card__icon">
                      <Icon name="calendar" size={18} />
                    </span>
                    <span className="publish-config-card__copy">
                      <strong>Data limite de entrega</strong>
                      <small>Escolha até quando os alunos poderão responder.</small>
                    </span>
                    <input
                      aria-label="Data limite de entrega"
                      className="publish-date-input"
                      onChange={(event) => setDeliveryDeadline(event.target.value)}
                      type="date"
                      value={deliveryDeadline}
                    />
                  </label>
                </section>
              </>
            )}

            <Button icon="send" iconPosition="right" loading={isGenerating} loadingText="Publicando..." onClick={handleGenerateCase} variant="primary">
              Confirmar Publicação
            </Button>
          </section>
        </div>
      )}
    </AppLayout>
  );
}

function buildPreviewSections(draft) {
  return [
    {
      title: 'IDENTIFICAÇÃO:',
      paragraphs: [
        `${draft.patient.name || 'Paciente J.S.M.'}, ${draft.patient.age || '58'} anos, ${draft.patient.profession || 'motorista de aplicativo'}.`,
      ],
    },
    {
      title: 'QUEIXA PRINCIPAL:',
      paragraphs: [draft.clinical.symptoms || 'Dor forte no peito que não passa há cerca de 2 horas.'],
    },
    {
      title: 'HISTÓRIA DA MOLÉSTIA ATUAL (HMA):',
      paragraphs: [
        draft.clinical.clinicalContext
          || 'Paciente refere início de dor precordial constritiva, de forte intensidade, com irradiação para membro superior esquerdo e mandíbula.',
      ],
    },
    {
      title: 'ANTECEDENTES PESSOAIS:',
      paragraphs: [
        draft.clinical.comorbidities
          || 'HAS em uso irregular de Losartana. DM2 em uso de Metformina. Ex-tabagista.',
      ],
    },
    {
      title: 'EXAME FÍSICO:',
      paragraphs: [
        draft.clinical.clinicalExam
          || 'PA 160/95 mmHg, FC 102 bpm, FR 22 irpm, SatO2 93%. Paciente lúcido, sudoreico e ansioso.',
      ],
    },
  ];
}
