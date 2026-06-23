// TODO: Substituir por chamada da API quando o backend estiver pronto.
export const createCaseForm = {
  title: '',
  specialty: 'Cardiologia',
  discipline: '',
  difficulty: 'Básico',
};

// TODO: Substituir por chamada da API quando o backend estiver pronto.
export const patientProfileForm = {
  agePlaceholder: 'Ex: 45',
  professionPlaceholder: 'Ex: Pedreiro',
  weightPlaceholder: 'Ex: 75Kg',
  heightPlaceholder: 'Ex: 170cm',
  otherPlaceholder: 'Ex: Sedentário, alergias',
};

// TODO: Substituir por chamada da API quando o backend estiver pronto.
export const clinicalContentForm = {
  pedagogicalGoalPlaceholder: 'O que os alunos devem aprender...',
  centralHypothesisPlaceholder: 'Ex: Gripe, Resfriado, etc.',
  symptomsPlaceholder: 'Incluir histórico médico...',
  comorbiditiesPlaceholder: 'Adicionar comorbidades...',
  clinicalContextPlaceholder: 'Digite um contexto adicional relevante para o caso...',
};

// TODO: Substituir por chamada da API quando o backend estiver pronto.
export const referencesMediaUploads = [
  {
    title: 'Imagens Clínicas',
    description: 'Radiografias, exames laboratoriais, fotos - PNG, JPG (máx 3mb)',
  },
  {
    title: 'Artigos e/ou Slides',
    description: 'A IA utilizará esses documentos como base de geração - PDF, DOCX',
  },
];

export const questionTypeOptions = ['Múltipla escolha', 'Verdadeiro ou falso', 'Discursiva'];

export const questionForm = {
  statementPlaceholder: 'Ex: Qual conduta inicial é mais adequada para este paciente?',
  answerPlaceholder: 'Ex: Solicitar ECG e marcadores de necrose miocárdica imediatamente.',
  feedbackPlaceholder: 'Explique por que esta resposta é adequada e quais alternativas devem ser evitadas.',
};

// TODO: Substituir por chamada da API quando o backend estiver pronto.
export const generatedCaseReview = {
  title: 'PRONTUÁRIO MÉDICO SIMULADO',
  generatedAt: 'Gerado por EduMed AI em 06/05/2026',
  sections: [
    {
      title: 'IDENTIFICAÇÃO:',
      paragraphs: [
        'Paciente: J.S.M, masculino, 58 anos, branco, casado, motorista de aplicativo. Natural e procedente de São Paulo - SP.',
      ],
    },
    {
      title: 'QUEIXA PRINCIPAL:',
      paragraphs: ['"Dor forte no peito que não passa" há cerca de 2 horas.'],
    },
    {
      title: 'HISTÓRIA DA MOLESTIA ATUAL (HMA):',
      paragraphs: [
        'Paciente refere início de dor precordial constritiva, de forte intensidade (9/10), com irradiação para membro superior esquerdo e mandíbula, que se iniciou em repouso enquanto assistia televisão. A dor é contínua e não aliviou com repouso ou mudança de decúbito. Associada a sudorese profusa, náuseas e dispneia leve. Nega episódios prévios semelhantes com esta intensidade, embora relate desconforto esporádico aos grandes esforços no último mês.',
      ],
    },
    {
      title: 'ANTECEDENTES PESSOAIS E COMORBIDADES:',
      paragraphs: [
        '- Hipertensão Arterial Sistêmica (HAS) diagnosticada há 10 anos, em uso irregular de Losartana 50mg/dia.',
        '- Diabetes Mellitus tipo 2 (DM2) diagnosticada há 5 anos, em uso de Metformina 850mg 2x/dia.',
        '- Dislipidemia não tratada.',
        '- Ex-tabagista (parou há 2 anos, carga tabágica 30 anos-maço).',
        '- Nega alergias medicamentosas conhecidas.',
      ],
    },
    {
      title: 'EXAME FÍSICO (Admissão na Emergência):',
      paragraphs: [
        '- REG, lúcido, orientado, sudoreico, taquipneico e ansioso.',
        '- Sinais Vitais: PA 160/95 mmHg, FC 102 bpm, FR 22 irpm, Temperatura 36.5°C, SatO2 93% em ar ambiente.',
        '- Aparelho Cardiovascular: Ritmo cardíaco regular, 2 tempos, bulhas normofonéticas, sem sopros ou extrassístoles aparentes. Pulsos periféricos finos, simétricos. Enchimento capilar de 3s.',
        '- Aparelho Respiratório: Murmúrio vesicular presente e simétrico bilateralmente, com crepitações discretas em bases pulmonares.',
        '- Abdome: Atípico, flácido, indolor, RHA presentes, sem visceromegalias.',
      ],
    },
    {
      title: 'CONTEXTUALIZAÇÃO PARA O ALUNO:',
      paragraphs: [
        'Você é o médico plantonista da sala de emergência. O paciente acaba de dar entrada trazido pelo SAMU. A equipe de enfermagem já está puncionando o acesso venoso periférico e instalando o monitoramento contínuo.',
      ],
    },
  ],
};

// TODO: Substituir por chamada da API quando o backend estiver pronto.
export const professorDashboard = {
  metrics: [
    { label: 'Casos Criados', value: '25', icon: 'note', tone: 'primary' },
    { label: 'Avaliações Pendentes', value: '48', icon: 'note', tone: 'warning' },
    { label: 'Turmas Ativas', value: '4', icon: 'people', tone: 'success' },
  ],
  classPerformance: [
    { label: 'Turma 1', value: 44 },
    { label: 'Turma 2', value: 72 },
    { label: 'Turma 3', value: 34 },
    { label: 'Turma 4', value: 51 },
    { label: 'Turma 5', value: 47 },
    { label: 'Turma 6', value: 54 },
    { label: 'Turma 7', value: 41 },
    { label: 'Turma 8', value: 49 },
  ],
  recentCases: [
    {
      title: 'Caso de Cardiologia - Insuficiência Cardíaca',
      date: '18/04/2026',
      status: 'Ativo',
    },
    {
      title: 'Caso Clínico de Diabetes Tipo 2',
      date: '12/04/2026',
      status: 'Concluído',
    },
    {
      title: 'Caso Clínico de Diabetes Tipo 2',
      date: '12/04/2026',
      status: 'Concluído',
    },
    {
      title: 'Caso Clínico de Diabetes Tipo 2',
      date: '12/04/2026',
      status: 'Concluído',
    },
  ],
};

// TODO: Substituir por chamada da API quando o backend estiver pronto.
export const selectOptions = {
  specialties: ['Cardiologia', 'Fisioterapia', 'Neurologia', 'Pediatria'],
  difficulties: ['Básico', 'Intermediário', 'Avançado'],
};

// TODO: Substituir por chamada da API quando o backend estiver pronto.
export const currentUser = {
  name: 'Anderson Soares',
  course: 'Fisioterapia',
  avatar: profileDefault,
};

export const stepItems = [
  'Informações do caso',
  'Perfil do Paciente',
  'Conteúdo Clínico',
  'Referências e Mídias',
  'Perguntas',
];
import profileDefault from '../assets/profile-default.png';
