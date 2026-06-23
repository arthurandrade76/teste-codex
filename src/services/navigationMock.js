// TODO: Substituir por chamada da API quando o backend estiver pronto.
export const navigationSections = [
  {
    title: 'Geral',
    items: [
      { label: 'Início', path: '/', icon: 'home' },
      { label: 'Criar Caso', path: '/criar-caso/parametros', icon: 'case', active: true },
      { label: 'Meus casos', path: '/meus-casos', icon: 'folder' },
      { label: 'Turmas', path: '/turmas', icon: 'people' },
      { label: 'Desempenho', path: '/desempenho', icon: 'chart' },
    ],
  },
  {
    title: 'Outros',
    items: [
      { label: 'Configurações', path: '/configuracoes', icon: 'settings' },
      { label: 'Ajuda', path: '/ajuda', icon: 'info' },
    ],
  },
];
