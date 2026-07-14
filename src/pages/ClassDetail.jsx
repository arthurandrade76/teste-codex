import { useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout.jsx';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import { classes, getActivityTone } from '../services/classesMock.js';

const tabs = ['Alunos', 'Entregas pendentes', 'Casos atribuídos'];

export default function ClassDetail() {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Alunos');
  const [searchTerm, setSearchTerm] = useState('');
  const classItem = classes.find((item) => item.id === classId);
  const students = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!classItem) {
      return [];
    }

    const tabFiltered = classItem.activity.filter((activityItem) => {
      if (activeTab === 'Entregas pendentes') {
        return activityItem.status !== 'Concluído';
      }

      return true;
    });

    if (!normalizedSearch) {
      return tabFiltered;
    }

    return tabFiltered.filter((activityItem) => (
      `${activityItem.student} ${activityItem.caseTitle}`.toLowerCase().includes(normalizedSearch)
    ));
  }, [activeTab, classItem, searchTerm]);

  if (!classItem) {
    return <Navigate replace to="/turmas" />;
  }

  return (
    <AppLayout breadcrumbCurrent={`Turmas > Turma ${classItem.id}`} breadcrumbPrefix="">
      <section className="class-open-page" aria-labelledby="class-open-title">
        <div className="class-open-toolbar">
          <label className="classes-search">
            <Icon name="search" size={16} />
            <input
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar aluno..."
              type="search"
              value={searchTerm}
            />
          </label>
          <button className="classes-filter" type="button">
            <Icon name="settings" size={16} />
            Filtros
          </button>
          <Button icon="case" to="/criar-caso/parametros" variant="primary">
            Criar novo caso
          </Button>
        </div>

        <header className="class-open-header">
          <div className="class-open-identity">
            <span>
              <Icon name="cluster" size={32} />
            </span>
            <div>
              <h2 id="class-open-title">{classItem.id}</h2>
              <p>{classItem.course}</p>
              <small>{classItem.professor}</small>
            </div>
          </div>

          <MetricInline icon="metricBars" label="Média da turma" tone="average" value={classItem.average} />
          <MetricInline icon="metricNote" label="Casos concluídos" tone="completed" value={classItem.completedCases} />
          <MetricInline icon="pendingList" label="Pendentes" tone="pending" value={classItem.pendingEvaluations} />
        </header>

        <div className="class-open-tabs" role="tablist" aria-label="Visualizações da turma">
          {tabs.map((tab) => (
            <button
              className={`class-open-tab ${activeTab === tab ? 'class-open-tab--active' : ''}`}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <section className="class-open-panel" aria-label={activeTab}>
          <header>
            <h3>{activeTab === 'Alunos' ? 'Alunos da turma' : activeTab}</h3>
            <span>{students.length} alunos</span>
          </header>

          <div className="class-open-table">
            <div className="class-open-table__row class-open-table__row--head">
              <span>Aluno</span>
              <span>Casos feitos</span>
              <span>Progresso</span>
              <span>Média</span>
              <span>Status</span>
              <span>Ação</span>
            </div>

            {students.map((student) => (
              <div className="class-open-table__row" key={`${student.student}-${student.caseTitle}`}>
                <span className="class-student-cell">
                  <span>{student.initials}</span>
                  <button onClick={() => navigate(`/turmas/${classItem.id}/alunos/${student.slug}`)} type="button">
                    {student.student}
                  </button>
                </span>
                <span>{student.casesDone}</span>
                <span className="class-progress-cell">
                  <span className="class-progress-track">
                    <span style={{ width: `${student.progress}%` }} />
                  </span>
                  <small>{student.progress}%</small>
                </span>
                <span>{student.average}</span>
                <span className={`class-status class-status--${getActivityTone(student.status)}`}>
                  {student.status}
                </span>
                <button
                  aria-label={`Ver perfil de ${student.student}`}
                  className="class-open-link"
                  onClick={() => navigate(`/turmas/${classItem.id}/alunos/${student.slug}`)}
                  type="button"
                >
                  Ver aluno
                </button>
              </div>
            ))}
          </div>
        </section>
      </section>
    </AppLayout>
  );
}

function MetricInline({ icon, label, tone, value }) {
  return (
    <article className={`class-open-metric class-open-metric--${tone}`}>
      <span>
        <Icon name={icon} size={23} />
      </span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
