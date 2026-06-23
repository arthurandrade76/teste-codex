const difficultyLevels = {
  Básico: 'BAIXA',
  Intermediário: 'MEDIA',
  Avançado: 'ALTA',
};

export function validateDraftForApi(draft, auth) {
  if (!auth?.idProfessor) {
    return 'Entre com um usuário professor para criar casos clínicos.';
  }

  const requiredFields = [
    [draft.caseInfo.title, 'título'],
    [draft.caseInfo.discipline, 'disciplina'],
    [draft.caseInfo.healthArea, 'área da saúde'],
    [draft.patient.name, 'nome do paciente'],
    [draft.patient.age, 'idade do paciente'],
    [draft.patient.profession, 'profissão do paciente'],
    [draft.patient.weight, 'peso do paciente'],
    [draft.patient.height, 'altura do paciente'],
    [draft.clinical.pedagogicalGoal, 'objetivo pedagógico'],
    [draft.clinical.centralHypothesis, 'hipótese clínica central'],
    [draft.clinical.symptoms, 'sintomas principais'],
    [draft.clinical.comorbidities, 'comorbidades'],
    [draft.clinical.clinicalExam, 'exame clínico'],
    [draft.clinical.clinicalContext, 'contexto clínico'],
  ];

  const missingField = requiredFields.find(([value]) => !String(value || '').trim());

  if (missingField) {
    return `Preencha o campo ${missingField[1]} antes de salvar na API.`;
  }

  if (Number.isNaN(Number(draft.patient.age))) {
    return 'Informe uma idade válida para o paciente.';
  }

  return '';
}

export function buildCasePayload(draft, auth) {
  return {
    idProfessor: auth.idProfessor,
    titulo: draft.caseInfo.title.trim(),
    dificuldade: draft.caseInfo.difficulty,
    disciplina: draft.caseInfo.discipline.trim(),
    areaSaude: draft.caseInfo.healthArea.trim(),
    estilo: draft.caseInfo.style,
    especialidade: draft.caseInfo.specialty,
    status: 'RASCUNHO',
    objetivoAprendizagem: draft.clinical.pedagogicalGoal.trim(),
    nivelDificuldade: difficultyLevels[draft.caseInfo.difficulty] || 'MEDIA',
  };
}

export function buildPatientPayload(draft, idCaso) {
  return {
    idCaso,
    nome: draft.patient.name.trim(),
    profissao: draft.patient.profession.trim(),
    sexo: draft.patient.biologicalSex || 'NAO_INFORMADO',
    idade: Number(draft.patient.age),
    estadoCivil: draft.patient.maritalStatus || 'NAO_INFORMADO',
    altura: draft.patient.height.trim(),
    peso: draft.patient.weight.trim(),
  };
}

export function buildClinicalContentPayload(draft, idCaso) {
  return {
    idCaso,
    sintomas: draft.clinical.symptoms.trim(),
    contexto: draft.clinical.clinicalContext.trim(),
    examClinico: draft.clinical.clinicalExam.trim(),
    antecClinico: draft.clinical.comorbidities.trim(),
    diagEsperado: draft.clinical.centralHypothesis.trim(),
  };
}

export function buildReview(savedCase) {
  const completeCase = savedCase?.complete;
  const caseInfo = completeCase?.caso || savedCase?.case;
  const patient = completeCase?.pacientes?.[0] || savedCase?.patient;
  const clinicalContent = completeCase?.conteudosClinicos?.[0] || savedCase?.clinicalContent;

  if (!caseInfo) {
    return null;
  }

  return {
    title: 'CASO CLÍNICO SALVO NA API',
    generatedAt: `Salvo em ${formatDateTime(savedCase.savedAt)}${caseInfo.idCaso ? ` | ID ${caseInfo.idCaso}` : ''}`,
    sections: [
      {
        title: 'DADOS DO CASO:',
        paragraphs: [
          `Título: ${caseInfo.titulo}`,
          `Especialidade: ${caseInfo.especialidade}`,
          `Disciplina: ${caseInfo.disciplina}`,
          `Área da saúde: ${caseInfo.areaSaude}`,
          `Dificuldade: ${caseInfo.dificuldade}`,
          `Status: ${caseInfo.status}`,
        ],
      },
      {
        title: 'IDENTIFICAÇÃO DO PACIENTE:',
        paragraphs: patient
          ? [
              `Paciente: ${patient.nome}, ${patient.idade} anos.`,
              `Sexo: ${patient.sexo}. Estado civil: ${patient.estadoCivil}.`,
              `Profissão: ${patient.profissao}. Peso: ${patient.peso}. Altura: ${patient.altura}.`,
            ]
          : ['Paciente ainda não cadastrado para este caso.'],
      },
      {
        title: 'CONTEÚDO CLÍNICO:',
        paragraphs: clinicalContent
          ? [
              `Sintomas: ${clinicalContent.sintomas}`,
              `Contexto: ${clinicalContent.contexto}`,
              `Exame clínico: ${clinicalContent.examClinico}`,
              `Antecedentes/comorbidades: ${clinicalContent.antecClinico}`,
              `Diagnóstico esperado: ${clinicalContent.diagEsperado}`,
            ]
          : ['Conteúdo clínico ainda não cadastrado para este caso.'],
      },
      {
        title: 'OBJETIVO DE APRENDIZAGEM:',
        paragraphs: [caseInfo.objetivoAprendizagem || 'Não informado.'],
      },
    ],
  };
}

function formatDateTime(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(value));
}
