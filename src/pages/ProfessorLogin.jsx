import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProfessorLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((currentCredentials) => ({ ...currentCredentials, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (requestError) {
      setError(requestError.message || 'Não foi possível entrar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="login-title">
        <div className="auth-card__brand">
          <span className="auth-card__logo">PIBIC</span>
          <div>
            <h1 id="login-title">Entrar na conta</h1>
            <p>Acesse seu painel para criar casos clínicos e acompanhar suas turmas.</p>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <FormField
            autoComplete="username"
            label="Usuário"
            name="username"
            onChange={handleChange}
            placeholder="Ex: professor"
            required
            value={credentials.username}
          />
          <FormField
            autoComplete="current-password"
            label="Senha"
            name="password"
            onChange={handleChange}
            placeholder="Digite sua senha"
            required
            type="password"
            value={credentials.password}
          />

          <div className="auth-form__row">
            <label className="checkbox-field">
              <input type="checkbox" />
              <span>Lembrar acesso</span>
            </label>
            <Link to="/cadastro-professor">Esqueci minha senha</Link>
          </div>

          {error && <p className="form-feedback form-feedback--error">{error}</p>}

          <Button loading={isSubmitting} loadingText="Entrando..." type="submit" variant="primary">
            Entrar
          </Button>
        </form>

        <p className="auth-card__footer">
          Ainda não possui conta? <Link to="/cadastro-professor">Cadastrar professor</Link>
        </p>
      </section>
    </main>
  );
}
