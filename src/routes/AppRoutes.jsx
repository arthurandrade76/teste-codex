import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import ClassDetail from '../pages/ClassDetail.jsx';
import Classes from '../pages/Classes.jsx';
import CreateCaseClinicalContent from '../pages/CreateCaseClinicalContent.jsx';
import CreateCaseParameters from '../pages/CreateCaseParameters.jsx';
import CreateCasePatientProfile from '../pages/CreateCasePatientProfile.jsx';
import CreateCaseQuestions from '../pages/CreateCaseQuestions.jsx';
import CreateCaseReferencesMedia from '../pages/CreateCaseReferencesMedia.jsx';
import CreateCaseReview from '../pages/CreateCaseReview.jsx';
import MyCases from '../pages/MyCases.jsx';
import PlaceholderPage from '../pages/PlaceholderPage.jsx';
import ProfessorDashboard from '../pages/ProfessorDashboard.jsx';
import ProfessorLogin from '../pages/ProfessorLogin.jsx';
import ProfessorRegister from '../pages/ProfessorRegister.jsx';
import StudentProfile from '../pages/StudentProfile.jsx';

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />} />
      <Route
        path="/dashboard"
        element={(
          <RequireAuth>
            <ProfessorDashboard />
          </RequireAuth>
        )}
      />
      <Route path="/login" element={<ProfessorLogin />} />
      <Route path="/cadastro-professor" element={<ProfessorRegister />} />
      <Route
        path="/criar-caso/parametros"
        element={(
          <RequireAuth>
            <CreateCaseParameters />
          </RequireAuth>
        )}
      />
      <Route
        path="/criar-caso/perfil-paciente"
        element={(
          <RequireAuth>
            <CreateCasePatientProfile />
          </RequireAuth>
        )}
      />
      <Route
        path="/criar-caso/conteudo-clinico"
        element={(
          <RequireAuth>
            <CreateCaseClinicalContent />
          </RequireAuth>
        )}
      />
      <Route
        path="/criar-caso/referencias-midias"
        element={(
          <RequireAuth>
            <CreateCaseReferencesMedia />
          </RequireAuth>
        )}
      />
      <Route
        path="/criar-caso/perguntas"
        element={(
          <RequireAuth>
            <CreateCaseQuestions />
          </RequireAuth>
        )}
      />
      <Route
        path="/criar-caso/revisao"
        element={(
          <RequireAuth>
            <CreateCaseReview />
          </RequireAuth>
        )}
      />
      <Route path="/meus-casos" element={<RequireAuth><MyCases /></RequireAuth>} />
      <Route path="/turmas" element={<RequireAuth><Classes /></RequireAuth>} />
      <Route path="/turmas/:classId" element={<RequireAuth><ClassDetail /></RequireAuth>} />
      <Route path="/turmas/:classId/alunos/:studentSlug" element={<RequireAuth><StudentProfile /></RequireAuth>} />
      <Route path="/desempenho" element={<RequireAuth><PlaceholderPage title="Desempenho" /></RequireAuth>} />
      <Route path="/configuracoes" element={<RequireAuth><PlaceholderPage title="Configurações" /></RequireAuth>} />
      <Route path="/ajuda" element={<RequireAuth><PlaceholderPage title="Ajuda" /></RequireAuth>} />
      <Route path="*" element={<Navigate to="/criar-caso/parametros" replace />} />
    </Routes>
  );
}

function RequireAuth({ children }) {
  return children;
}
