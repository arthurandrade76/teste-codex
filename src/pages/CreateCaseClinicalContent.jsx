import AppLayout from '../components/AppLayout.jsx';
import Button from '../components/Button.jsx';
import CheckboxField from '../components/CheckboxField.jsx';
import FormField from '../components/FormField.jsx';
import Icon from '../components/Icon.jsx';
import Stepper from '../components/Stepper.jsx';
import TextAreaField from '../components/TextAreaField.jsx';
import { useCaseDraft } from '../context/CaseDraftContext.jsx';
import { clinicalContentForm, stepItems } from '../services/caseMock.js';

export default function CreateCaseClinicalContent() {
  const { draft, updateDraftSection } = useCaseDraft();
  const clinical = draft.clinical;

  const handleChange = (event) => {
    const { checked, name, type, value } = event.target;
    updateDraftSection('clinical', { [name]: type === 'checkbox' ? checked : value });
  };

  return (
    <AppLayout>
      <section className="create-case-page" aria-labelledby="clinical-content-title">
        <h2 className="sr-only" id="clinical-content-title">
          Criar Caso Clínico - Conteúdo Clínico
        </h2>

        <div className="create-case-page__content create-case-page__content--large-gap">
          <Stepper currentStep={3} steps={stepItems} />

          <form className="case-form clinical-form">
            <div className="clinical-form__grid">
              <FormField
                label="Objetivo Pedagógico"
                name="pedagogicalGoal"
                onChange={handleChange}
                placeholder={clinicalContentForm.pedagogicalGoalPlaceholder}
                required
                value={clinical.pedagogicalGoal}
              />
              <FormField
                label="Hipótese Clínica Central"
                name="centralHypothesis"
                onChange={handleChange}
                placeholder={clinicalContentForm.centralHypothesisPlaceholder}
                required
                value={clinical.centralHypothesis}
              />
              <FormField
                full
                label="Sintomas Principais"
                name="symptoms"
                onChange={handleChange}
                placeholder={clinicalContentForm.symptomsPlaceholder}
                required
                value={clinical.symptoms}
              />
              <FormField
                full
                label="Comorbidades"
                name="comorbidities"
                onChange={handleChange}
                placeholder={clinicalContentForm.comorbiditiesPlaceholder}
                required
                value={clinical.comorbidities}
              />
              <FormField
                full
                label="Exame Clínico"
                name="clinicalExam"
                onChange={handleChange}
                placeholder="Ex: PA 120/80 mmHg, FC 82 bpm, ausculta sem alterações..."
                required
                value={clinical.clinicalExam}
              />
              <div className="clinical-form__textarea-wrap">
                <TextAreaField
                  label="Contexto Clínico"
                  large
                  name="clinicalContext"
                  onChange={handleChange}
                  placeholder={clinicalContentForm.clinicalContextPlaceholder}
                  required
                  value={clinical.clinicalContext}
                />
                <span className="clinical-form__resize-icon">
                  <Icon name="maximize" size={20} />
                </span>
              </div>
              <CheckboxField
                checked={clinical.includeClinicalExams}
                label="Incluir resultados de exames clínicos"
                name="includeClinicalExams"
                onChange={handleChange}
              />
            </div>
          </form>

          <div className="page-actions page-actions--patient">
            <Button icon="note" variant="secondary">
              Salvar Rascunho
            </Button>

            <div className="page-actions__next">
              <Button icon="arrowLeft" iconPosition="right" to="/criar-caso/perfil-paciente" variant="outline">
                Anterior
              </Button>
              <Button icon="chevronRight" iconPosition="right" to="/criar-caso/referencias-midias" variant="primary">
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
