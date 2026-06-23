import AppLayout from '../components/AppLayout.jsx';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';
import SelectField from '../components/SelectField.jsx';
import Stepper from '../components/Stepper.jsx';
import TipCard from '../components/TipCard.jsx';
import { useCaseDraft } from '../context/CaseDraftContext.jsx';
import { selectOptions, stepItems } from '../services/caseMock.js';

const caseStyleOptions = ['Múltipla escolha', 'Discursivo', 'Diagnóstico', 'Conduta clínica'];

export default function CreateCaseParameters() {
  const { draft, updateDraftSection } = useCaseDraft();
  const caseInfo = draft.caseInfo;

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateDraftSection('caseInfo', { [name]: value });
  };

  return (
    <AppLayout>
      <section className="create-case-page" aria-labelledby="create-case-title">
        <h2 className="sr-only" id="create-case-title">
          Criar Caso Clínico - Parâmetros
        </h2>

        <div className="create-case-page__content">
          <Stepper currentStep={1} steps={stepItems} />

          <form className="case-form">
            <div className="case-form__grid">
              <FormField
                label="Título"
                name="title"
                onChange={handleChange}
                placeholder="Ex: Choque Cardiogênico pós IAM"
                required
                value={caseInfo.title}
              />
              <SelectField
                label="Especialidade"
                name="specialty"
                onChange={handleChange}
                options={selectOptions.specialties}
                required
                value={caseInfo.specialty}
              />
              <FormField
                label="Disciplina"
                name="discipline"
                onChange={handleChange}
                placeholder="Ex: Semiologia Médica"
                required
                value={caseInfo.discipline}
              />
              <SelectField
                label="Dificuldade"
                name="difficulty"
                onChange={handleChange}
                options={selectOptions.difficulties}
                required
                value={caseInfo.difficulty}
              />
              <FormField
                label="Área da saúde"
                name="healthArea"
                onChange={handleChange}
                placeholder="Ex: Medicina"
                required
                value={caseInfo.healthArea}
              />
              <SelectField
                label="Estilo"
                name="style"
                onChange={handleChange}
                options={caseStyleOptions}
                required
                value={caseInfo.style}
              />
            </div>
          </form>

          <TipCard />

          <div className="page-actions">
            <Button icon="note" variant="secondary">
              Salvar Rascunho
            </Button>

            <div className="page-actions__next">
              <Button disabled icon="arrowLeft" iconPosition="right" variant="ghost">
                Anterior
              </Button>
              <Button icon="chevronRight" iconPosition="right" to="/criar-caso/perfil-paciente" variant="primary">
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
