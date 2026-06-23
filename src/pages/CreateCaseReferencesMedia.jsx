import AppLayout from '../components/AppLayout.jsx';
import Button from '../components/Button.jsx';
import Stepper from '../components/Stepper.jsx';
import UploadDropzone from '../components/UploadDropzone.jsx';
import { useCaseDraft } from '../context/CaseDraftContext.jsx';
import { referencesMediaUploads, stepItems } from '../services/caseMock.js';

export default function CreateCaseReferencesMedia() {
  const { draft, updateDraftSection } = useCaseDraft();

  const handleFileChange = (group) => (event) => {
    updateDraftSection('files', {
      [group]: Array.from(event.target.files || []).map((file) => file.name),
    });
  };

  return (
    <AppLayout>
      <section className="create-case-page" aria-labelledby="references-media-title">
        <h2 className="sr-only" id="references-media-title">
          Criar Caso Clínico - Referências e Mídias
        </h2>

        <div className="create-case-page__content create-case-page__content--large-gap">
          <Stepper currentStep={4} steps={stepItems} />

          <div className="references-form">
            {referencesMediaUploads.map((upload, index) => (
              <UploadDropzone
                accept={index === 0 ? 'image/png,image/jpeg' : '.pdf,.doc,.docx,.ppt,.pptx'}
                description={upload.description}
                files={index === 0 ? draft.files.clinicalImages : draft.files.documents}
                key={upload.title}
                multiple
                name={index === 0 ? 'clinicalImages' : 'documents'}
                onChange={handleFileChange(index === 0 ? 'clinicalImages' : 'documents')}
                title={upload.title}
              />
            ))}
          </div>

          <div className="page-actions page-actions--patient">
            <Button icon="note" variant="secondary">
              Salvar Rascunho
            </Button>

            <div className="page-actions__next">
              <Button icon="arrowLeft" iconPosition="right" to="/criar-caso/conteudo-clinico" variant="outline">
                Anterior
              </Button>
              <Button icon="chevronRight" iconPosition="right" to="/criar-caso/perguntas" variant="primary">
                Próximo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
