import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout.jsx';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import {
  deleteLocalCase,
  formatCaseDate,
  loadCaseDraftForEditing,
  readLocalCases,
} from '../services/localCases.js';

const filterItems = ['Todos', 'Publicados', 'Rascunhos', 'Arquivados', 'Privados'];

export default function MyCases() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [cases, setCases] = useState(() => readLocalCases());
  const filteredCases = useMemo(
    () => filterCases(cases, searchTerm, activeFilter),
    [activeFilter, cases, searchTerm],
  );
  const stats = buildStats(cases);

  return (
    <AppLayout breadcrumbCurrent="Meus casos">
      <section className="my-cases-page" aria-labelledby="my-cases-title">
        <header className="my-cases-hero">
          <div>
            <h2 id="my-cases-title">Meus Casos</h2>
            <p>Gerencie, edite e acompanhe os casos clínicos criados para suas turmas.</p>
          </div>
          <Button icon="case" to="/criar-caso/parametros" variant="primary">
            Criar novo caso
          </Button>
        </header>

        <div className="my-cases-stats">
          {stats.map((stat) => (
            <article className="my-cases-stat" key={stat.label}>
              <span className={`my-cases-stat__icon my-cases-stat__icon--${stat.tone}`}>
                <Icon name="note" size={22} />
              </span>
              <div>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            </article>
          ))}
        </div>

        <section className="my-cases-panel" aria-label="Lista de casos">
          <div className="my-cases-toolbar">
            <label className="my-cases-search">
              <Icon name="search" size={16} />
              <input
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar por título, especialidade ou turmas"
                type="search"
                value={searchTerm}
              />
            </label>

            <div className="my-cases-filters" aria-label="Filtros de casos">
              {filterItems.map((item) => (
                <button
                  className={`my-cases-filter ${activeFilter === item ? 'my-cases-filter--active' : ''}`}
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="my-cases-table">
            <div className="my-cases-table__row my-cases-table__row--head">
              <span>Caso clínico</span>
              <span>Especialidade</span>
              <span>Disciplina</span>
              <span>Dificuldade</span>
              <span>Turmas</span>
              <span>Respostas</span>
              <span>Status</span>
              <span>Ações</span>
            </div>

            {filteredCases.map((caseItem) => (
              <article className="my-cases-table__row" key={caseItem.id}>
                <div className="my-cases-title-cell">
                  <span className="my-cases-title-cell__icon">
                    <Icon name="note" size={18} />
                  </span>
                  <div>
                    <strong>{caseItem.title}</strong>
                    <small>Atualizado em {formatCaseDate(caseItem.updatedAt)}</small>
                  </div>
                </div>
                <span>{caseItem.specialty || '-'}</span>
                <span>{caseItem.discipline || '-'}</span>
                <span>{caseItem.difficulty || '-'}</span>
                <span>{formatClassCount(caseItem)}</span>
                <span>{caseItem.answers ?? 0}</span>
                <span className={`status-pill status-pill--${caseItem.tone}`}>
                  {caseItem.status}
                </span>
                <div className="my-cases-actions">
                  <button aria-label={`Editar ${caseItem.title}`} onClick={() => handleEditCase(caseItem, navigate)} title="Editar" type="button">
                    <Icon name="edit" size={16} />
                  </button>
                  <button aria-label={`Visualizar ${caseItem.title}`} onClick={() => navigate('/criar-caso/revisao')} title="Visualizar" type="button">
                    <Icon name="eye" size={16} />
                  </button>
                  <button
                    aria-label={`Excluir ${caseItem.title}`}
                    className="my-cases-actions__delete"
                    onClick={() => setCases(deleteLocalCase(caseItem.id))}
                    title="Excluir"
                    type="button"
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </div>
              </article>
            ))}

            {filteredCases.length === 0 && (
              <div className="my-cases-empty">
                Nenhum caso encontrado com os filtros atuais.
              </div>
            )}
          </div>
        </section>
      </section>
    </AppLayout>
  );
}

function formatClassCount(caseItem) {
  if (caseItem.status === 'Privado') {
    return '0';
  }

  const classCount = Number(caseItem.classCount ?? getClassCountFromName(caseItem.className));

  if (classCount <= 0) {
    return '0';
  }

  return String(classCount);
}

function getClassCountFromName(className) {
  if (!className || className === 'Biblioteca' || className === 'Sem turma') {
    return 0;
  }

  return className.split(',').filter(Boolean).length;
}

function handleEditCase(caseItem, navigate) {
  loadCaseDraftForEditing(caseItem);
  navigate('/criar-caso/parametros');
}

function buildStats(cases) {
  const published = cases.filter((caseItem) => caseItem.status === 'Publicado').length;
  const drafts = cases.filter((caseItem) => caseItem.status === 'Rascunho').length;

  return [
    { label: 'Casos criados', value: String(cases.length), tone: 'primary' },
    { label: 'Publicados', value: String(published), tone: 'success' },
    { label: 'Rascunhos', value: String(drafts), tone: 'warning' },
  ];
}

function filterCases(cases, searchTerm, activeFilter) {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  return cases.filter((caseItem) => {
    const matchesSearch = !normalizedSearch
      || `${caseItem.title} ${caseItem.specialty} ${caseItem.discipline} ${caseItem.className}`.toLowerCase().includes(normalizedSearch);

    const matchesFilter = activeFilter === 'Todos'
      || (activeFilter === 'Publicados' && caseItem.status === 'Publicado')
      || (activeFilter === 'Rascunhos' && caseItem.status === 'Rascunho')
      || (activeFilter === 'Arquivados' && caseItem.status === 'Arquivado')
      || (activeFilter === 'Privados' && caseItem.status === 'Privado');

    return matchesSearch && matchesFilter;
  });
}
