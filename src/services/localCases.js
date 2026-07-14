const LOCAL_CASES_STORAGE_KEY = 'pibic.myCases';
const DRAFT_STORAGE_KEY = 'pibic.caseDraft';

export function readLocalCases() {
  const rawValue = window.localStorage.getItem(LOCAL_CASES_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) ? parsedValue : [];
  } catch {
    window.localStorage.removeItem(LOCAL_CASES_STORAGE_KEY);
    return [];
  }
}

export function saveLocalCase(caseItem) {
  const currentCases = readLocalCases();
  const nextCases = [caseItem, ...currentCases.filter((item) => item.id !== caseItem.id)];
  window.localStorage.setItem(LOCAL_CASES_STORAGE_KEY, JSON.stringify(nextCases));
  return nextCases;
}

export function deleteLocalCase(caseId) {
  const nextCases = readLocalCases().filter((item) => item.id !== caseId);
  window.localStorage.setItem(LOCAL_CASES_STORAGE_KEY, JSON.stringify(nextCases));
  return nextCases;
}

export function loadCaseDraftForEditing(caseItem) {
  if (!caseItem?.draft) {
    return;
  }

  window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(caseItem.draft));
}

export function buildLocalCaseFromDraft(draft, questions, publication) {
  const now = new Date();
  const selectedClasses = publication.selectedClasses || [];
  const status = publication.mode === 'private' ? 'Privado' : 'Publicado';

  return {
    id: `case-${now.getTime()}`,
    title: draft.caseInfo.title || 'Caso clínico sem título',
    specialty: draft.caseInfo.specialty || 'Especialidade não informada',
    difficulty: draft.caseInfo.difficulty || 'Básico',
    discipline: draft.caseInfo.discipline || '',
    healthArea: draft.caseInfo.healthArea || '',
    className: publication.mode === 'private' ? 'Biblioteca' : selectedClasses.join(', ') || 'Sem turma',
    classCount: publication.mode === 'private' ? 0 : selectedClasses.length,
    answers: 0,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    status,
    tone: status === 'Publicado' ? 'active' : 'draft',
    publication,
    draft,
    questions,
  };
}

export function formatCaseDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
}

function buildExampleCase() {
  const now = new Date().toISOString();
  const draft = {
    caseInfo: {
      title: 'Dor torácica na emergência',
      specialty: 'Cardiologia',
      discipline: 'Semiologia Médica',
      difficulty: 'Intermediário',
      healthArea: 'Medicina',
      style: 'Múltipla escolha',
    },
    patient: {
      allowAiCompletion: false,
      name: 'João Silva',
      age: '58',
      profession: 'Motorista de aplicativo',
      weight: '86kg',
      height: '172cm',
      biologicalSex: 'MASCULINO',
      maritalStatus: 'CASADO',
      otherInfo: 'Ex-tabagista, hipertenso e diabético.',
    },
    clinical: {
      pedagogicalGoal: 'Reconhecer sinais de síndrome coronariana aguda e definir conduta inicial.',
      centralHypothesis: 'Infarto agudo do miocárdio',
      symptoms: 'Dor torácica intensa com irradiação para braço esquerdo, sudorese e náuseas.',
      comorbidities: 'Hipertensão arterial sistêmica, diabetes mellitus tipo 2 e dislipidemia.',
      clinicalContext: 'Paciente deu entrada na emergência com dor iniciada em repouso há cerca de 2 horas.',
      clinicalExam: 'PA 160/95 mmHg, FC 102 bpm, FR 22 irpm, SatO2 93%. Paciente ansioso e sudoreico.',
      includeClinicalExams: true,
    },
    files: {
      clinicalImages: [],
      documents: [],
    },
    questions: {
      items: [
        {
          id: 1,
          statement: 'Qual a conduta inicial mais adequada para este paciente?',
          type: 'Múltipla escolha',
          alternatives: [
            'Solicitar ECG, monitorização e marcadores de necrose miocárdica.',
            'Dar alta com retorno ambulatorial.',
            'Prescrever apenas analgésico e observar em casa.',
            'Aguardar melhora espontânea antes de investigar.',
          ],
          trueFalseItems: [
            { statement: '', answer: 'Verdadeiro' },
            { statement: '', answer: 'Falso' },
          ],
          correctAlternative: 0,
          answer: 'Solicitar ECG, monitorização e marcadores de necrose miocárdica.',
          feedback: 'O quadro sugere síndrome coronariana aguda e exige investigação imediata.',
        },
      ],
    },
  };

  return {
    id: 'example-editable-case',
    title: draft.caseInfo.title,
    specialty: draft.caseInfo.specialty,
    difficulty: draft.caseInfo.difficulty,
    discipline: draft.caseInfo.discipline,
    healthArea: draft.caseInfo.healthArea,
    className: '28M1A',
    classCount: 1,
    answers: 35,
    createdAt: now,
    updatedAt: now,
    status: 'Publicado',
    tone: 'active',
    publication: {
      mode: 'classes',
      selectedClasses: ['28M1A'],
      allowResolutionHints: true,
      answerTimeLimit: '60min',
      deliveryDeadline: '',
    },
    draft,
    questions: draft.questions.items,
  };
}
