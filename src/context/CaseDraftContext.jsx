import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const DRAFT_STORAGE_KEY = 'pibic.caseDraft';
const SAVED_CASE_STORAGE_KEY = 'pibic.savedCase';

const initialDraft = {
  caseInfo: {
    title: '',
    specialty: 'Cardiologia',
    discipline: '',
    difficulty: 'Básico',
    healthArea: '',
    style: 'Múltipla escolha',
  },
  patient: {
    allowAiCompletion: false,
    name: 'Paciente simulado',
    age: '',
    profession: '',
    weight: '',
    height: '',
    biologicalSex: 'NAO_INFORMADO',
    maritalStatus: 'NAO_INFORMADO',
    otherInfo: '',
  },
  clinical: {
    pedagogicalGoal: '',
    centralHypothesis: '',
    symptoms: '',
    comorbidities: '',
    clinicalContext: '',
    clinicalExam: '',
    includeClinicalExams: false,
  },
  files: {
    clinicalImages: [],
    documents: [],
  },
  questions: {
    items: [
      {
        id: 1,
        statement: '',
        type: 'Múltipla escolha',
        answer: '',
        feedback: '',
      },
    ],
  },
};

const CaseDraftContext = createContext(null);

export function CaseDraftProvider({ children }) {
  const [draft, setDraft] = useState(() => mergeDraft(initialDraft, readStorage(DRAFT_STORAGE_KEY, {})));
  const [savedCase, setSavedCaseState] = useState(() => readStorage(SAVED_CASE_STORAGE_KEY, null));

  const updateDraftSection = useCallback((section, values) => {
    setDraft((currentDraft) => {
      const nextDraft = {
        ...currentDraft,
        [section]: {
          ...currentDraft[section],
          ...values,
        },
      };

      window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(nextDraft));
      return nextDraft;
    });
  }, []);

  const setSavedCase = useCallback((value) => {
    setSavedCaseState(value);
    window.localStorage.setItem(SAVED_CASE_STORAGE_KEY, JSON.stringify(value));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(initialDraft);
    window.localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(initialDraft));
  }, []);

  const value = useMemo(
    () => ({
      draft,
      savedCase,
      resetDraft,
      setSavedCase,
      updateDraftSection,
    }),
    [draft, resetDraft, savedCase, setSavedCase, updateDraftSection],
  );

  return <CaseDraftContext.Provider value={value}>{children}</CaseDraftContext.Provider>;
}

export function useCaseDraft() {
  const context = useContext(CaseDraftContext);

  if (!context) {
    throw new Error('useCaseDraft deve ser usado dentro de CaseDraftProvider');
  }

  return context;
}

function readStorage(key, fallback) {
  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return fallback;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    window.localStorage.removeItem(key);
    return fallback;
  }
}

function mergeDraft(baseDraft, storedDraft) {
  return {
    ...baseDraft,
    ...storedDraft,
    caseInfo: {
      ...baseDraft.caseInfo,
      ...storedDraft?.caseInfo,
    },
    patient: {
      ...baseDraft.patient,
      ...storedDraft?.patient,
    },
    clinical: {
      ...baseDraft.clinical,
      ...storedDraft?.clinical,
    },
    files: {
      ...baseDraft.files,
      ...storedDraft?.files,
    },
    questions: {
      ...baseDraft.questions,
      ...storedDraft?.questions,
    },
  };
}
