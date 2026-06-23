import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import Sidebar from '../components/Sidebar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import profileDefault from '../assets/profile-default.png';
import {
  getProfessorCases,
  getProfessorReport,
  listCases,
} from '../services/pibicApi.js';

const emptyDashboard = {
  metrics: [
    { label: 'Casos Criados', value: '0', icon: 'note', tone: 'primary' },
    { label: 'Casos Publicados', value: '0', icon: 'note', tone: 'success' },
    { label: 'Rascunhos', value: '0', icon: 'note', tone: 'warning' },
  ],
  classPerformance: [
    { label: 'Respostas', value: 0 },
    { label: 'Corretas', value: 0 },
    { label: 'Aproveitamento', value: 0 },
  ],
  recentCases: [],
};

export default function ProfessorDashboard() {
  const { auth, profile } = useAuth();
  const [dashboard, setDashboard] = useState(emptyDashboard);
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      setFeedback('');
      setIsLoading(true);

      try {
        const idProfessor = auth?.idProfessor;
        const [cases, report] = await loadDashboardData(idProfessor);

        if (!isMounted) {
          return;
        }

        setDashboard(buildDashboard(cases, report));
      } catch (requestError) {
        if (isMounted) {
          setFeedback(requestError.message || 'Não foi possível carregar o dashboard.');
          setDashboard(emptyDashboard);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [auth]);

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <header className="dashboard-topbar">
          <h1>
            Bem vindo, <strong>{getFirstName(profile.name)}!</strong>
          </h1>

          <label className="dashboard-search">
            <Icon name="search" size={16} />
            <input placeholder="Buscar casos, turmas, alunos..." type="search" />
          </label>

          <div className="dashboard-topbar__actions">
            <Button icon="case" to="/criar-caso/parametros" variant="primary">
              Criar novo caso
            </Button>

            <button className="profile" type="button">
              <img alt="" className="profile__avatar" src={profileDefault} />
              <span className="profile__copy">
                <strong>{profile.name}</strong>
                <small>{profile.course}</small>
              </span>
              <Icon name="chevronDown" size={10} />
            </button>
          </div>
        </header>

        <section className="dashboard-page" aria-label="Dashboard do professor">
          {feedback && <p className="form-feedback form-feedback--error">{feedback}</p>}
          {isLoading && <p className="form-feedback">Carregando dados da API...</p>}

          <div className="dashboard-metrics">
            {dashboard.metrics.map((metric) => (
              <article className="metric-card" key={metric.label}>
                <span className={`metric-card__icon metric-card__icon--${metric.tone}`}>
                  <Icon name={metric.icon} size={24} />
                </span>
                <div>
                  <h2>{metric.label}</h2>
                  <strong>{metric.value}</strong>
                </div>
              </article>
            ))}
          </div>

          <section className="dashboard-panel performance-panel">
            <header className="dashboard-panel__header">
              <div className="dashboard-panel__title">
                <span className="dashboard-panel__icon">
                  <Icon name="chart" size={20} />
                </span>
                <div>
                  <h2>Desempenho das turmas</h2>
                  <p>Acompanhe e analise os resultados das turmas e alunos.</p>
                </div>
              </div>
              <Link to="/desempenho">Ver desempenho completo</Link>
            </header>

            <div className="bar-chart" aria-label="Taxa de acerto por turma">
              <span className="bar-chart__axis">Taxa de Acerto</span>
              <div className="bar-chart__plot">
                {[100, 75, 50, 25, 0].map((tick) => (
                  <span className="bar-chart__grid" key={tick}>
                    <span>{tick}%</span>
                  </span>
                ))}
                <div className="bar-chart__bars">
                  {dashboard.classPerformance.map((item) => (
                    <div className="bar-chart__bar-item" key={item.label}>
                      <span className="bar-chart__bar" style={{ height: `${item.value}%` }} />
                      <small>{item.label}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="dashboard-panel recent-cases">
            <header className="recent-cases__header">
              <h2>Lista de Casos Recentes</h2>
              <p>Último mês</p>
            </header>

            <div className="cases-table">
              <div className="cases-table__row cases-table__row--head">
                <span>Título</span>
                <span>Data</span>
                <span>Status</span>
              </div>
              {dashboard.recentCases.map((caseItem, index) => (
                <div className="cases-table__row" key={`${caseItem.title}-${index}`}>
                  <span>{caseItem.title}</span>
                  <span>{caseItem.date}</span>
                  <span className={`status-pill status-pill--${caseItem.tone}`}>
                    {caseItem.status}
                  </span>
                </div>
              ))}
              {!isLoading && dashboard.recentCases.length === 0 && (
                <div className="cases-table__row">
                  <span>Nenhum caso encontrado na API</span>
                  <span>-</span>
                  <span className="status-pill status-pill--done">Vazio</span>
                </div>
              )}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

async function loadDashboardData(idProfessor) {
  if (idProfessor) {
    const [cases, report] = await Promise.all([
      getProfessorCases(idProfessor),
      getProfessorReport(idProfessor),
    ]);

    return [cases, report];
  }

  const casesPage = await listCases({ page: 0, size: 20 });
  return [normalizePage(casesPage), null];
}

function buildDashboard(cases, report) {
  const caseList = Array.isArray(cases) ? cases : [];
  const publishedCount = caseList.filter((caseItem) => caseItem.status === 'PUBLICADO').length;
  const draftCount = caseList.filter((caseItem) => caseItem.status === 'RASCUNHO').length;
  const totalAnswers = report?.totalRespostas || 0;
  const correctAnswers = report?.totalCorretas || 0;
  const average = Math.round(report?.aproveitamentoMedio || 0);

  return {
    metrics: [
      { label: 'Casos Criados', value: String(caseList.length), icon: 'note', tone: 'primary' },
      { label: 'Casos Publicados', value: String(publishedCount), icon: 'note', tone: 'success' },
      { label: 'Rascunhos', value: String(draftCount), icon: 'note', tone: 'warning' },
    ],
    classPerformance: [
      { label: 'Respostas', value: Math.min(totalAnswers, 100) },
      { label: 'Corretas', value: Math.min(correctAnswers, 100) },
      { label: 'Aproveitamento', value: average },
    ],
    recentCases: caseList.slice(0, 6).map((caseItem) => ({
      title: caseItem.titulo,
      date: formatDate(caseItem.dataCriacao),
      status: getStatusLabel(caseItem.status),
      tone: getStatusTone(caseItem.status),
    })),
  };
}

function normalizePage(pageOrList) {
  if (Array.isArray(pageOrList)) {
    return pageOrList;
  }

  return pageOrList?.content || [];
}

function getFirstName(name) {
  return name?.split(' ')[0] || 'Professor';
}

function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
}

function getStatusLabel(status) {
  const labels = {
    PUBLICADO: 'Ativo',
    RASCUNHO: 'Rascunho',
    ARQUIVADO: 'Arquivado',
  };

  return labels[status] || status || '-';
}

function getStatusTone(status) {
  if (status === 'PUBLICADO') {
    return 'active';
  }

  if (status === 'RASCUNHO') {
    return 'draft';
  }

  return 'done';
}
