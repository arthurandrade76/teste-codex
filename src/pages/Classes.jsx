import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout.jsx';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import { classes, getActivityTone } from '../services/classesMock.js';

export default function Classes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassId, setSelectedClassId] = useState(classes[0].id);
  const filteredClasses = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return classes;
    }

    return classes.filter((classItem) => (
      `${classItem.id} ${classItem.course}`.toLowerCase().includes(normalizedSearch)
    ));
  }, [searchTerm]);
  const selectedClass = classes.find((classItem) => classItem.id === selectedClassId) || filteredClasses[0] || classes[0];
  const totals = buildTotals(classes);

  return (
    <AppLayout breadcrumbCurrent="Turmas" breadcrumbPrefix="">
      <section className="classes-page" aria-labelledby="classes-title">
        <header className="classes-page__header">
          <div>
            <h2 id="classes-title">Turmas</h2>
            <p>Acesse suas turmas, acompanhe alunos e confira casos clínicos enviados.</p>
          </div>
        </header>

        <div className="classes-toolbar">
          <label className="classes-search">
            <Icon name="search" size={16} />
            <input
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar turma ou aluno..."
              type="search"
              value={searchTerm}
            />
          </label>
          <button className="classes-filter" type="button">
            <Icon name="settings" size={16} />
            Filtros
          </button>
          <Button icon="people" variant="primary">
            Nova Turma
          </Button>
        </div>

        <div className="classes-metrics">
          <MetricCard icon="cluster" label="Turmas Ativas" tone="success" value={totals.classes} />
          <MetricCard icon="people" label="Alunos Matriculados" tone="primary" value={totals.students} />
          <MetricCard icon="pendingList" label="Avaliações Pendentes" tone="warning" value={totals.pending} />
        </div>

        <div className="classes-content">
          <aside className="classes-list-panel">
            <header>
              <h3>Minhas Turmas</h3>
              <p>Selecione uma turma para abrir</p>
            </header>

            <div className="classes-list">
              {filteredClasses.map((classItem) => (
                <button
                  className={`class-list-item ${selectedClass.id === classItem.id ? 'class-list-item--active' : ''}`}
                  key={classItem.id}
                  onClick={() => setSelectedClassId(classItem.id)}
                  type="button"
                >
                  <span className="class-list-item__icon">
                    <Icon name="people" size={16} />
                  </span>
                  <span>
                    <strong>{classItem.id}</strong>
                    <small>{classItem.course}</small>
                  </span>
                  <Icon name="chevronRight" size={16} />
                </button>
              ))}
            </div>
          </aside>

          <section className="class-detail-panel" aria-label={`Detalhes da turma ${selectedClass.id}`}>
            <header className="class-detail-panel__header">
              <div>
                <h3>{selectedClass.id}</h3>
                <p>{selectedClass.students} alunos matriculados</p>
              </div>
              <Button icon="eye" onClick={() => navigate(`/turmas/${selectedClass.id}`)} variant="primary">
                Visualizar Turma
              </Button>
            </header>

            <div className="class-detail-stats">
              <ClassStat label="Média da Turma" value={selectedClass.average} />
              <ClassStat label="Casos Concluídos" value={selectedClass.completedCases} />
              <ClassStat label="Avaliações Pendentes" value={selectedClass.pendingEvaluations} />
            </div>

            <div className="class-activity-table">
              <div className="class-activity-table__row class-activity-table__row--head">
                <span>Aluno</span>
                <span>Caso clínico</span>
                <span>Entrega</span>
                <span>Status</span>
                <span>Ação</span>
              </div>

              {selectedClass.activity.map((activityItem) => (
                <div className="class-activity-table__row" key={`${activityItem.student}-${activityItem.caseTitle}`}>
                  <span className="class-student-cell">
                    <span>{getInitials(activityItem.student)}</span>
                    <button onClick={() => navigate(`/turmas/${selectedClass.id}/alunos/${activityItem.slug}`)} type="button">
                      {activityItem.student}
                    </button>
                  </span>
                  <span>{activityItem.caseTitle}</span>
                  <span>{activityItem.deliveredAt}</span>
                  <span className={`class-status class-status--${getActivityTone(activityItem.status)}`}>
                    {activityItem.status}
                  </span>
                  <button
                    aria-label={`Ver perfil de ${activityItem.student}`}
                    onClick={() => navigate(`/turmas/${selectedClass.id}/alunos/${activityItem.slug}`)}
                    type="button"
                  >
                    Ver aluno
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </AppLayout>
  );
}

function MetricCard({ icon, label, tone, value }) {
  return (
    <article className="classes-metric-card">
      <span className={`classes-metric-card__icon classes-metric-card__icon--${tone}`}>
        <Icon name={icon} size={23} />
      </span>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </article>
  );
}

function ClassStat({ label, value }) {
  return (
    <article className="class-detail-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function buildTotals(classList) {
  return {
    classes: classList.length,
    students: classList.reduce((total, classItem) => total + classItem.students, 0),
    pending: classList.reduce((total, classItem) => total + classItem.pendingEvaluations, 0),
  };
}

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
