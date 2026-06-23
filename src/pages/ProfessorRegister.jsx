import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import FormField from '../components/FormField.jsx';
import { registerProfessor } from '../services/pibicApi.js';

export default function ProfessorRegister() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    materia: '',
    username: '',
    senha: '',
  });
  const [feedback, setFeedback] = useState({ message: '', tone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ message: '', tone: '' });
    setIsSubmitting(true);

    try {
      await registerProfessor(formData);
      setFeedback({ message: 'Professor e usuário de acesso cadastrados com sucesso.', tone: 'success' });
      setFormData({ nome: '', email: '', materia: '', username: '', senha: '' });
    } catch (requestError) {
      setFeedback({
        message: requestError.message || 'Não foi possível cadastrar professor.',
        tone: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-labelledby="register-title">
        <div className="auth-card__brand">
          <span className="auth-card__logo">PIBIC</span>
          <div>
            <h1 id="register-title">Cadastro do professor</h1>
            <p>Crie seu acesso para organizar casos clínicos, turmas e avaliações.</p>
          </div>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <FormField
            label="Nome"
            name="nome"
            onChange={handleChange}
            placeholder="Ex: Anderson Soares"
            required
            value={formData.nome}
          />
          <FormField
            autoComplete="email"
            label="Email"
            name="email"
            onChange={handleChange}
            placeholder="Ex: professor@email.com"
            required
            type="email"
            value={formData.email}
          />
          <FormField
            label="Curso que dá aula"
            name="materia"
            onChange={handleChange}
            placeholder="Ex: Fisioterapia"
            required
            value={formData.materia}
          />
          <FormField
            autoComplete="username"
            label="Usuário de acesso"
            name="username"
            onChange={handleChange}
            placeholder="Ex: professor2"
            required
            value={formData.username}
          />
          <FormField
            autoComplete="new-password"
            label="Senha"
            minLength={6}
            name="senha"
            onChange={handleChange}
            placeholder="Mínimo de 6 caracteres"
            required
            type="password"
            value={formData.senha}
          />

          {feedback.message && (
            <p className={`form-feedback form-feedback--${feedback.tone}`}>{feedback.message}</p>
          )}

          <Button loading={isSubmitting} loadingText="Salvando..." type="submit" variant="primary">
            Cadastrar professor
          </Button>
        </form>

        <p className="auth-card__footer">
          Já possui conta? <Link to="/login">Entrar</Link>
        </p>
      </section>
    </main>
  );
}
