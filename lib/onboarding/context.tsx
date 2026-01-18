"use client";

/**
 * オンボーディング Context
 *
 * 全ステップ間で状態を共有するためのContext
 */

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type {
  OnboardingState,
  OnboardingAction,
  OnboardingStep,
  TermsAgreement,
  RepresentativeInfo,
  IdentityPreparation,
  BeneficialOwner,
  CompanyInfo,
} from "./types";
import { initialOnboardingState, ONBOARDING_STEPS } from "./types";
import { onboardingReducer } from "./reducer";

// Context型定義
interface OnboardingContextType {
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
  // ナビゲーション
  goToStep: (step: OnboardingStep) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  completeCurrentStep: () => void;
  // 利用規約
  setTermsAgreement: (key: keyof TermsAgreement, value: boolean) => void;
  setAllTermsAgreed: (value: boolean) => void;
  isAllTermsAgreed: boolean;
  // メール認証
  setEmail: (email: string) => void;
  setVerificationCode: (code: string) => void;
  sendCode: () => void;
  verifyCode: () => Promise<boolean>;
  // 代表者情報
  setRepresentativeInfo: (key: keyof RepresentativeInfo, value: string) => void;
  isRepresentativeComplete: boolean;
  // 本人確認準備
  setIdentityPrep: (key: keyof IdentityPreparation, value: boolean) => void;
  isIdentityPrepComplete: boolean;
  // eKYC
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  startNfcScan: () => Promise<boolean>;
  resetNfc: () => void;
  // 会社情報
  setCompanyInfo: (key: keyof Omit<CompanyInfo, "beneficialOwners">, value: string) => void;
  addBeneficialOwner: (owner: Omit<BeneficialOwner, "id">) => void;
  updateBeneficialOwner: (owner: BeneficialOwner) => void;
  removeBeneficialOwner: (id: string) => void;
  // 審査提出
  submitReview: () => Promise<boolean>;
  // ユーティリティ
  getCurrentStepIndex: () => number;
  getTotalSteps: () => number;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | null>(null);

// Provider
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(onboardingReducer, initialOnboardingState);

  // ナビゲーション
  const goToStep = useCallback((step: OnboardingStep) => {
    dispatch({ type: "GO_TO_STEP", step });
  }, []);

  const goToNextStep = useCallback(() => {
    const currentIndex = ONBOARDING_STEPS.indexOf(state.currentStep);
    if (currentIndex < ONBOARDING_STEPS.length - 1) {
      dispatch({ type: "GO_TO_STEP", step: ONBOARDING_STEPS[currentIndex + 1] });
    }
  }, [state.currentStep]);

  const goToPrevStep = useCallback(() => {
    const currentIndex = ONBOARDING_STEPS.indexOf(state.currentStep);
    if (currentIndex > 0) {
      dispatch({ type: "GO_TO_STEP", step: ONBOARDING_STEPS[currentIndex - 1] });
    }
  }, [state.currentStep]);

  const completeCurrentStep = useCallback(() => {
    dispatch({ type: "COMPLETE_STEP", step: state.currentStep });
  }, [state.currentStep]);

  // 利用規約
  const setTermsAgreement = useCallback(
    (key: keyof TermsAgreement, value: boolean) => {
      dispatch({ type: "SET_TERMS_AGREEMENT", key, value });
    },
    []
  );

  const setAllTermsAgreed = useCallback((value: boolean) => {
    dispatch({ type: "SET_ALL_TERMS_AGREED", value });
  }, []);

  const isAllTermsAgreed = useMemo(() => {
    return Object.values(state.terms).every((v) => v === true);
  }, [state.terms]);

  // メール認証
  const setEmail = useCallback((email: string) => {
    dispatch({ type: "SET_EMAIL", email });
  }, []);

  const setVerificationCode = useCallback((code: string) => {
    dispatch({ type: "SET_VERIFICATION_CODE", code });
  }, []);

  const sendCode = useCallback(() => {
    dispatch({ type: "SEND_CODE" });
  }, []);

  const verifyCode = useCallback(async (): Promise<boolean> => {
    // モック: 123456 が正解
    const isValid = state.emailVerification.verificationCode === "123456";

    if (isValid) {
      dispatch({ type: "VERIFY_CODE_SUCCESS" });
      return true;
    } else {
      dispatch({ type: "VERIFY_CODE_ERROR", error: "認証コードが正しくありません" });
      return false;
    }
  }, [state.emailVerification.verificationCode]);

  // 代表者情報
  const setRepresentativeInfo = useCallback(
    (key: keyof RepresentativeInfo, value: string) => {
      dispatch({ type: "SET_REPRESENTATIVE_INFO", key, value });
    },
    []
  );

  const isRepresentativeComplete = useMemo(() => {
    return (
      state.representative.name.trim() !== "" &&
      state.representative.phoneNumber.trim() !== "" &&
      state.representative.desiredCreditLimit !== ""
    );
  }, [state.representative]);

  // 本人確認準備
  const setIdentityPrep = useCallback(
    (key: keyof IdentityPreparation, value: boolean) => {
      dispatch({ type: "SET_IDENTITY_PREP", key, value });
    },
    []
  );

  const isIdentityPrepComplete = useMemo(() => {
    return (
      state.identityPreparation.hasMyNumberCard &&
      state.identityPreparation.hasReadInstructions &&
      state.identityPreparation.agreedToTerms
    );
  }, [state.identityPreparation]);

  // eKYC
  const setPassword = useCallback((password: string) => {
    dispatch({ type: "SET_EKYC_PASSWORD", password });
  }, []);

  const setConfirmPassword = useCallback((confirmPassword: string) => {
    dispatch({ type: "SET_EKYC_CONFIRM_PASSWORD", confirmPassword });
  }, []);

  const startNfcScan = useCallback(async (): Promise<boolean> => {
    dispatch({ type: "START_NFC_SCAN" });

    // モックNFCスキャン（2秒後に成功）
    return new Promise((resolve) => {
      setTimeout(() => {
        // 80%の確率で成功
        if (Math.random() > 0.2) {
          dispatch({ type: "NFC_SCAN_SUCCESS" });
          resolve(true);
        } else {
          dispatch({
            type: "NFC_SCAN_ERROR",
            error: "カードの読み取りに失敗しました。もう一度お試しください。",
          });
          resolve(false);
        }
      }, 2000);
    });
  }, []);

  const resetNfc = useCallback(() => {
    dispatch({ type: "RESET_NFC" });
  }, []);

  // 会社情報
  const setCompanyInfo = useCallback(
    (key: keyof Omit<CompanyInfo, "beneficialOwners">, value: string) => {
      dispatch({ type: "SET_COMPANY_INFO", key, value });
    },
    []
  );

  const addBeneficialOwner = useCallback(
    (owner: Omit<BeneficialOwner, "id">) => {
      const newOwner: BeneficialOwner = {
        ...owner,
        id: `owner-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      dispatch({ type: "ADD_BENEFICIAL_OWNER", owner: newOwner });
    },
    []
  );

  const updateBeneficialOwner = useCallback((owner: BeneficialOwner) => {
    dispatch({ type: "UPDATE_BENEFICIAL_OWNER", owner });
  }, []);

  const removeBeneficialOwner = useCallback((id: string) => {
    dispatch({ type: "REMOVE_BENEFICIAL_OWNER", id });
  }, []);

  // 審査提出
  const submitReview = useCallback(async (): Promise<boolean> => {
    dispatch({ type: "SUBMIT_REVIEW" });

    // モック: 1.5秒後に成功
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: "SUBMIT_REVIEW_SUCCESS" });
        resolve(true);
      }, 1500);
    });
  }, []);

  // ユーティリティ
  const getCurrentStepIndex = useCallback(() => {
    return ONBOARDING_STEPS.indexOf(state.currentStep);
  }, [state.currentStep]);

  const getTotalSteps = useCallback(() => {
    return ONBOARDING_STEPS.length;
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET_ONBOARDING" });
  }, []);

  const value = useMemo(
    () => ({
      state,
      dispatch,
      goToStep,
      goToNextStep,
      goToPrevStep,
      completeCurrentStep,
      setTermsAgreement,
      setAllTermsAgreed,
      isAllTermsAgreed,
      setEmail,
      setVerificationCode,
      sendCode,
      verifyCode,
      setRepresentativeInfo,
      isRepresentativeComplete,
      setIdentityPrep,
      isIdentityPrepComplete,
      setPassword,
      setConfirmPassword,
      startNfcScan,
      resetNfc,
      setCompanyInfo,
      addBeneficialOwner,
      updateBeneficialOwner,
      removeBeneficialOwner,
      submitReview,
      getCurrentStepIndex,
      getTotalSteps,
      reset,
    }),
    [
      state,
      goToStep,
      goToNextStep,
      goToPrevStep,
      completeCurrentStep,
      setTermsAgreement,
      setAllTermsAgreed,
      isAllTermsAgreed,
      setEmail,
      setVerificationCode,
      sendCode,
      verifyCode,
      setRepresentativeInfo,
      isRepresentativeComplete,
      setIdentityPrep,
      isIdentityPrepComplete,
      setPassword,
      setConfirmPassword,
      startNfcScan,
      resetNfc,
      setCompanyInfo,
      addBeneficialOwner,
      updateBeneficialOwner,
      removeBeneficialOwner,
      submitReview,
      getCurrentStepIndex,
      getTotalSteps,
      reset,
    ]
  );

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

// Hook
export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within OnboardingProvider");
  }
  return context;
}
