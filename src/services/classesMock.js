export const classes = [
  {
    id: '28M1A',
    course: 'Fisioterapia - Manhã',
    professor: 'Professor Anderson Soares',
    students: 35,
    average: '8.2',
    completedCases: 64,
    pendingEvaluations: 18,
    activity: [
      { student: 'Ana Costa', slug: 'ana-costa', initials: 'AC', casesDone: '10 de 10', progress: 100, average: '9.2', status: 'Concluído', deliveredAt: '30/06/2026', caseTitle: 'Infarto agudo do miocárdio' },
      { student: 'Bruno Pereira', slug: 'bruno-pereira', initials: 'BP', casesDone: '6 de 10', progress: 60, average: '7.1', status: 'Pendente', deliveredAt: '29/06/2026', caseTitle: 'Trauma facial em paciente jovem' },
      { student: 'João Oliveira', slug: 'joao-oliveira', initials: 'JO', casesDone: '9 de 10', progress: 90, average: '8.9', status: 'Concluído', deliveredAt: 'Hoje, 09:14', caseTitle: 'Reabilitação pós-operatória do joelho' },
      { student: 'Mariana Lima', slug: 'mariana-lima', initials: 'ML', casesDone: '8 de 10', progress: 80, average: '8.7', status: 'Pendente', deliveredAt: 'Hoje, 09:14', caseTitle: 'Reabilitação pós-operatória do joelho' },
      { student: 'Rafael Santos', slug: 'rafael-santos', initials: 'RS', casesDone: '7 de 10', progress: 70, average: '7.9', status: 'Pendente', deliveredAt: 'Ontem, 18:42', caseTitle: 'Lesão de menisco - protocolo fisioterapêutico' },
    ],
  },
  {
    id: '25M3A',
    course: 'Enfermagem - Noite',
    professor: 'Professor Anderson Soares',
    students: 29,
    average: '7.8',
    completedCases: 51,
    pendingEvaluations: 12,
    activity: [
      { student: 'Lucas Martins', slug: 'lucas-martins', initials: 'LM', casesDone: '8 de 10', progress: 80, average: '8.1', status: 'Concluído', deliveredAt: '28/06/2026', caseTitle: 'Diabetes mellitus tipo 2' },
      { student: 'Paula Nunes', slug: 'paula-nunes', initials: 'PN', casesDone: '5 de 10', progress: 50, average: '7.0', status: 'Pendente', deliveredAt: 'Hoje, 10:30', caseTitle: 'Hipertensão arterial sistêmica' },
    ],
  },
  {
    id: '24M4A',
    course: 'Fisioterapia - Vespertino',
    professor: 'Professor Anderson Soares',
    students: 42,
    average: '8.6',
    completedCases: 72,
    pendingEvaluations: 10,
    activity: [
      { student: 'Carlos Souza', slug: 'carlos-souza', initials: 'CS', casesDone: '10 de 10', progress: 100, average: '9.0', status: 'Concluído', deliveredAt: '27/06/2026', caseTitle: 'Pneumonia comunitária' },
      { student: 'Beatriz Alves', slug: 'beatriz-alves', initials: 'BA', casesDone: '7 de 10', progress: 70, average: '8.2', status: 'Em análise', deliveredAt: 'Hoje, 08:45', caseTitle: 'Acidente vascular encefálico' },
    ],
  },
  {
    id: '23M2B',
    course: 'Odontologia - Tarde',
    professor: 'Professor Anderson Soares',
    students: 33,
    average: '7.5',
    completedCases: 48,
    pendingEvaluations: 8,
    activity: [
      { student: 'Diego Ramos', slug: 'diego-ramos', initials: 'DR', casesDone: '6 de 10', progress: 60, average: '7.5', status: 'Concluído', deliveredAt: '25/06/2026', caseTitle: 'Abscesso odontogênico' },
      { student: 'Camila Rocha', slug: 'camila-rocha', initials: 'CR', casesDone: '4 de 10', progress: 40, average: '6.9', status: 'Pendente', deliveredAt: 'Ontem, 16:20', caseTitle: 'Trauma dentário' },
    ],
  },
];

export function getActivityTone(status) {
  if (status === 'Concluído') {
    return 'done';
  }

  if (status === 'Em análise') {
    return 'review';
  }

  return 'pending';
}
