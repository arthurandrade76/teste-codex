import AppLayout from '../components/AppLayout.jsx';
import Button from '../components/Button.jsx';
import CheckboxField from '../components/CheckboxField.jsx';
import FormField from '../components/FormField.jsx';
import GenderOption from '../components/GenderOption.jsx';
import SelectField from '../components/SelectField.jsx';
import Stepper from '../components/Stepper.jsx';
import TextAreaField from '../components/TextAreaField.jsx';
import { useCaseDraft } from '../context/CaseDraftContext.jsx';
import { patientProfileForm, stepItems } from '../services/caseMock.js';

const maritalStatusOptions = [
  'NAO_INFORMADO',
  'SOLTEIRO',
  'CASADO',
  'DIVORCIADO',
  'VIUVO',
  'SEPARADO',
  'UNIAO_ESTAVEL',
];

export default function CreateCasePatientProfile() {
  const { draft, updateDraftSection } = useCaseDraft();
  const patient = draft.patient;

  const handleChange = (event) => {
    const { checked, name, type, value } = event.target;
    updateDraftSection('patient', { [name]: type === 'checkbox' ? checked : value });
  };

  const handleSexSelect = (biologicalSex) => {
    updateDraftSection('patient', { biologicalSex });
  };

  return (
    <AppLayout>
      <section className="create-case-page" aria-labelledby="patient-profile-title">
        <h2 className="sr-only" id="patient-profile-title">
          Criar Caso Clínico - Perfil do Paciente
        </h2>

        <div className="create-case-page__content create-case-page__content--large-gap">
          <Stepper currentStep={2} steps={stepItems} />

          <form className="case-form patient-form">
            <CheckboxField
              checked={patient.allowAiCompletion}
              label="Permitir que a IA complemente as informações"
              name="allowAiCompletion"
              onChange={handleChange}
            />

            <div className="patient-form__grid">
              <FormField
                label="Nome do paciente"
                name="name"
                onChange={handleChange}
                placeholder="Ex: João da Silva"
                required
                value={patient.name}
              />
              <FormField
                label="Idade"
                min="0"
                name="age"
                onChange={handleChange}
                placeholder={patientProfileForm.agePlaceholder}
                required
                type="number"
                value={patient.age}
              />
              <FormField
                label="Profissão"
                name="profession"
                onChange={handleChange}
                placeholder={patientProfileForm.professionPlaceholder}
                required
                value={patient.profession}
              />
              <SelectField
                label="Estado civil"
                name="maritalStatus"
                onChange={handleChange}
                options={maritalStatusOptions}
                required
                value={patient.maritalStatus}
              />
              <FormField
                label="Peso"
                name="weight"
                onChange={handleChange}
                placeholder={patientProfileForm.weightPlaceholder}
                required
                value={patient.weight}
              />
              <FormField
                label="Altura"
                name="height"
                onChange={handleChange}
                placeholder={patientProfileForm.heightPlaceholder}
                required
                value={patient.height}
              />

              <div className="field">
                <span className="field__label">Sexo Biológico</span>
                <GenderOption
                  icon="man"
                  label="Masculino"
                  onSelect={() => handleSexSelect('MASCULINO')}
                  selected={patient.biologicalSex === 'MASCULINO'}
                />
              </div>

              <div className="field field--gender-offset">
                <GenderOption
                  icon="woman"
                  label="Feminino"
                  onSelect={() => handleSexSelect('FEMININO')}
                  selected={patient.biologicalSex === 'FEMININO'}
                />
              </div>

              <TextAreaField
                label="Outra informação"
                name="otherInfo"
                onChange={handleChange}
                placeholder={patientProfileForm.otherPlaceholder}
                value={patient.otherInfo}
              />
            </div>
          </form>

          <div className="page-actions page-actions--patient">
            <Button icon="note" variant="secondary">
              Salvar Rascunho
            </Button>

            <div className="page-actions__next">
              <Button icon="arrowLeft" iconPosition="right" to="/criar-caso/parametros" variant="outline">
                Anterior
              </Button>
              <Button icon="chevronRight" iconPosition="right" to="/criar-caso/conteudo-clinico" variant="primary">
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
