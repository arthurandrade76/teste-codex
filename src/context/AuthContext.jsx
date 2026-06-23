import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { clearStoredAuth, getStoredAuth, storeAuth } from '../services/api.js';
import { getProfessor, login as loginRequest } from '../services/pibicApi.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => getStoredAuth());
  const [profile, setProfile] = useState(() => buildFallbackProfile(getStoredAuth()));

  const login = useCallback(async ({ username, password }) => {
    const response = await loginRequest(username, password);
    storeAuth(response);
    setAuth(response);
    return response;
  }, []);

  const logout = useCallback(() => {
    clearStoredAuth();
    setAuth(null);
    setProfile(buildFallbackProfile(null));
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      if (!auth?.token) {
        setProfile(buildFallbackProfile(null));
        return;
      }

      if (!auth.idProfessor) {
        setProfile(buildFallbackProfile(auth));
        return;
      }

      try {
        const professor = await getProfessor(auth.idProfessor);

        if (isMounted) {
          setProfile({
            name: professor.nome || auth.username || 'Professor',
            course: professor.materia || auth.role || 'PROFESSOR',
          });
        }
      } catch {
        if (isMounted) {
          setProfile(buildFallbackProfile(auth));
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [auth]);

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated: Boolean(auth?.token),
      login,
      logout,
      profile,
    }),
    [auth, login, logout, profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function buildFallbackProfile(auth) {
  return {
    name: auth?.username || 'Professor',
    course: auth?.role || 'PROFESSOR',
  };
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }

  return context;
}
