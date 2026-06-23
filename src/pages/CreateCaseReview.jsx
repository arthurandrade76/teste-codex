import AppLayout from '../components/AppLayout.jsx';
import Button from '../components/Button.jsx';
import Icon from '../components/Icon.jsx';
import TextAreaField from '../components/TextAreaField.jsx';
import { useCaseDraft } from '../context/CaseDraftContext.jsx';
import { buildReview } from '../services/caseMappers.js';

const quickActions = [
  { label: 'Gerar novamente', icon: 'refresh' },
  { label: 'Tornar o Caso mais Simples', icon: 'minus' },
  { label: 'Tornar o Caso mais Complexo', icon: 'arrowUp' },
];

export default function CreateCaseReview() {
  const { savedCase } = useCaseDraft();
  const caseReview = buildReview(savedCase);

  return (
    <AppLayout breadcrumbCurrent="Revisão">
      <section className="review-page" aria-labelledby="review-title">
        <div className="review-page__content">
          <article className="medical-record">
            <header className="medical-record__header">
              <h2 id="review-title">{caseReview?.title || 'Nenhum caso salvo na API'}</h2>
              <p>{caseReview?.generatedAt || 'Preencha as etapas anteriores e salve o caso para revisar o retorno.'}</p>
            </header>

            <div className="medical-record__body">
              {caseReview?.sections.map((section) => (
                <section className="medical-record__section" key={section.title}>
                  <h3>{section.title}</h3>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              )) || (
                <section className="medical-record__section">
                  <h3>RETORNO DA API:</h3>
                  <p>A revisão será preenchida depois que `/casos`, `/pacientes` e `/conteudos` responderem com sucesso.</p>
                </section>
              )}
            </div>
          </article>

          <aside className="review-panel">
            <div className="review-panel__card">
              <section className="review-panel__section">
                <h3>Ações Rápidas</h3>
                <div className="review-panel__actions">
                  {quickActions.map((action) => (
                    <button className="quick-action" key={action.label} type="button">
                      <span>{action.label}</span>
                      <Icon name={action.icon} size={16} />
                    </button>
                  ))}
                </div>
              </section>

              <section className="review-panel__section">
                <TextAreaField
                  label="Solicitar Ajuste"
                  placeholder="Ajustes por IA entram em uma próxima etapa da integração."
                />
                <Button disabled variant="primary">Enviar</Button>
              </section>

              <section className="review-panel__manual">
                <div>
                  <h3>Edição Manual</h3>
                  <p>
                    Prefere fazer os ajustes você mesmo? Edite o texto do caso diretamente no documento.
                  </p>
                </div>
                <Button icon="edit" iconPosition="right" variant="dark">
                  Habilitar Edição
                </Button>
              </section>
            </div>

            <Button icon="chevronRight" iconPosition="right" to="/criar-caso/parametros" variant="primary">
              Criar outro caso
            </Button>
          </aside>
        </div>
      </section>
    </AppLayout>
  );
}
