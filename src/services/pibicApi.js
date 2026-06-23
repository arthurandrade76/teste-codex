import { apiRequest } from './api.js';

export function login(username, password) {
  return apiRequest('/auth/login', {
    auth: false,
    method: 'POST',
    body: { username, password },
  });
}

export function getProfessor(idProfessor) {
  return apiRequest(`/professores/${idProfessor}`);
}

export function getProfessorCases(idProfessor) {
  return apiRequest(`/professores/${idProfessor}/casos`);
}

export function getProfessorReport(idProfessor) {
  return apiRequest(`/professores/${idProfessor}/relatorio-desempenho`);
}

export function listCases(params = {}) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return apiRequest(`/casos${query ? `?${query}` : ''}`);
}

export function createCase(payload) {
  return apiRequest('/casos', {
    method: 'POST',
    body: payload,
  });
}

export function createPatient(payload) {
  return apiRequest('/pacientes', {
    method: 'POST',
    body: payload,
  });
}

export function createClinicalContent(payload) {
  return apiRequest('/conteudos', {
    method: 'POST',
    body: payload,
  });
}

export function getCompleteCase(idCaso) {
  return apiRequest(`/casos/${idCaso}/completo`);
}

export function createProfessor(payload) {
  return apiRequest('/professores', {
    method: 'POST',
    body: payload,
  });
}

export function registerProfessor(payload) {
  return apiRequest('/professores/cadastro', {
    auth: false,
    method: 'POST',
    body: payload,
  });
}

export function createUser(payload) {
  return apiRequest('/usuarios', {
    method: 'POST',
    body: payload,
  });
}
