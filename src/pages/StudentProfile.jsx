import { useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout.jsx';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import { classes, getActivityTone } from '../services/classesMock.js';

const tabs = ['Histórico', 'Casos respondidos', 'Notas', 'Feedbacks'];

const studentHistory = [
  { title: 'Reabilitação pós-operatória de joelho', grade: '8.7', deliveredAt: 'Hoje', status: 'Pendente', action: 'Corrigir' },
  { title: 'Lesão de menisco - protocolo fisioterapêutico', grade: '7.9', deliveredAt: 'Ontem', status: 'Pendente', action: 'Corrigir' },
  { title: 'Manejo de paciente diabético descompensado', grade: '9.2', deliveredAt: '30/06', status: 'Concluído', action: 'Ver correção' },
  { title: 'Trauma facial em paciente jovem', grade: '7.1', deliveredAt: '29/06', status: 'Pendente', action: 'Continuar' },
  { title: 'Pneumonia adquirida na comunidade', grade: '9.4', deliveredAt: '24/06', status: 'Concluído', action: 'Ver correção' },
];

export default function StudentProfile() {
  const { classId, studentSlug } = useParams();
  const [activeTab, setActiveTab] = useState('Histórico');
  const [searchTerm, setSearchTerm] = useState('');
  const classItem = classes.find((item) => item.id === classId);
  const student = classItem?.activity.find((item) => item.slug === studentSlug);
  const history = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return studentHistory;
    }

    return studentHistory.filter((item) => item.title.toLowerCase().includes(normalizedSearch));
  }, [searchTerm]);

  if (!classItem || !student) {
    return <Navigate replace to="/turmas" />;
  }

  return (
    <AppLayout breadcrumbCurrent={`Turmas > Turma ${classItem.id} > Perfil do Aluno`} breadcrumbPrefix="">
      <section className="student-profile-page" aria-labelledby="student-profile-title">
        <div className="student-profile-toolbar">
          <label className="classes-search">
            <Icon name="search" size={16} />
            <input
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar caso ou avaliação..."
              type="search"
              value={searchTerm}
            />
          </label>
          <Button icon="download" variant="secondary">
            Exportar notas
          </Button>
        </div>

        <header className="student-profile-header">
          <div className="student-profile-identity">
            <span>{student.initials}</span>
            <div>
              <h2 id="student-profile-title">{student.student}</h2>
              <p>{classItem.id} - {classItem.course}</p>
              <small>{classItem.professor}</small>
            </div>
          </div>

          <StudentMetric icon="metricBars" label="Média geral" tone="average" value={student.average} />
          <StudentMetric icon="metricNote" label="Casos respondidos" tone="completed" value={student.casesDone.replace(' de ', '/')} />
          <StudentMetric icon="pendingList" label="Pendências" tone="pending" value={getPendingCount(student)} />
        </header>

        <div className="class-open-tabs" role="tablist" aria-label="Perfil do aluno">
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

        <section className="student-history-panel" aria-label={activeTab}>
          <h3>{activeTab === 'Histórico' ? 'Histórico de casos clínicos' : activeTab}</h3>

          <div className="student-history-table">
            <div className="student-history-table__row student-history-table__row--head">
              <span>Caso clínico</span>
              <span>Nota</span>
              <span>Entrega</span>
              <span>Status</span>
              <span>Ação</span>
            </div>

            {history.map((item) => (
              <div className="student-history-table__row" key={item.title}>
                <span>{item.title}</span>
                <span>{item.grade}</span>
                <span>{item.deliveredAt}</span>
                <span className={`class-status class-status--${getActivityTone(item.status)}`}>
                  {item.status}
                </span>
                <button type="button">{item.action}</button>
              </div>
            ))}
          </div>
        </section>
      </section>
    </AppLayout>
  );
}

function StudentMetric({ icon, label, tone, value }) {
  return (
    <article className={`student-profile-metric student-profile-metric--${tone}`}>
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

function getPendingCount(student) {
  return student.status === 'Concluído' ? '0' : '1';
}
