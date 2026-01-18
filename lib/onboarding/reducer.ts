/**
 * オンボーディング Reducer
 */

import type { OnboardingState, OnboardingAction } from "./types";
import { initialOnboardingState } from "./types";

export function onboardingReducer(
  state: OnboardingState,
  action: OnboardingAction
): OnboardingState {
  switch (action.type) {
    // ナビゲーション
    case "GO_TO_STEP":
      return {
        ...state,
        currentStep: action.step,
      };

    case "COMPLETE_STEP":
      if (state.completedSteps.includes(action.step)) {
        return state;
      }
      return {
        ...state,
        completedSteps: [...state.completedSteps, action.step],
      };

    // 利用規約
    case "SET_TERMS_AGREEMENT":
      return {
        ...state,
        terms: {
          ...state.terms,
          [action.key]: action.value,
        },
      };

    case "SET_ALL_TERMS_AGREED":
      return {
        ...state,
        terms: {
          memberAgreement: action.value,
          personalInfo: action.value,
          electronicDelivery: action.value,
          privacyPolicy: action.value,
          antiSocialForces: action.value,
        },
      };

    // メール認証
    case "SET_EMAIL":
      return {
        ...state,
        emailVerification: {
          ...state.emailVerification,
          email: action.email,
          error: null,
        },
      };

    case "SET_VERIFICATION_CODE":
      return {
        ...state,
        emailVerification: {
          ...state.emailVerification,
          verificationCode: action.code,
          error: null,
        },
      };

    case "SEND_CODE":
      return {
        ...state,
        emailVerification: {
          ...state.emailVerification,
          isCodeSent: true,
          error: null,
        },
      };

    case "VERIFY_CODE_SUCCESS":
      return {
        ...state,
        emailVerification: {
          ...state.emailVerification,
          isVerified: true,
          error: null,
        },
      };

    case "VERIFY_CODE_ERROR":
      return {
        ...state,
        emailVerification: {
          ...state.emailVerification,
          error: action.error,
        },
      };

    case "CLEAR_EMAIL_ERROR":
      return {
        ...state,
        emailVerification: {
          ...state.emailVerification,
          error: null,
        },
      };

    // 代表者情報
    case "SET_REPRESENTATIVE_INFO":
      return {
        ...state,
        representative: {
          ...state.representative,
          [action.key]: action.value,
        },
      };

    // 本人確認準備
    case "SET_IDENTITY_PREP":
      return {
        ...state,
        identityPreparation: {
          ...state.identityPreparation,
          [action.key]: action.value,
        },
      };

    // eKYC
    case "SET_EKYC_PASSWORD":
      return {
        ...state,
        ekyc: {
          ...state.ekyc,
          password: action.password,
        },
      };

    case "SET_EKYC_CONFIRM_PASSWORD":
      return {
        ...state,
        ekyc: {
          ...state.ekyc,
          confirmPassword: action.confirmPassword,
        },
      };

    case "START_NFC_SCAN":
      return {
        ...state,
        ekyc: {
          ...state.ekyc,
          nfcStatus: "scanning",
          nfcError: null,
        },
      };

    case "NFC_SCAN_SUCCESS":
      return {
        ...state,
        ekyc: {
          ...state.ekyc,
          nfcStatus: "success",
          isComplete: true,
        },
      };

    case "NFC_SCAN_ERROR":
      return {
        ...state,
        ekyc: {
          ...state.ekyc,
          nfcStatus: "error",
          nfcError: action.error,
        },
      };

    case "RESET_NFC":
      return {
        ...state,
        ekyc: {
          ...state.ekyc,
          nfcStatus: "idle",
          nfcError: null,
        },
      };

    // 会社情報
    case "SET_COMPANY_INFO":
      return {
        ...state,
        company: {
          ...state.company,
          [action.key]: action.value,
        },
      };

    case "ADD_BENEFICIAL_OWNER":
      return {
        ...state,
        company: {
          ...state.company,
          beneficialOwners: [...state.company.beneficialOwners, action.owner],
        },
      };

    case "UPDATE_BENEFICIAL_OWNER":
      return {
        ...state,
        company: {
          ...state.company,
          beneficialOwners: state.company.beneficialOwners.map((owner) =>
            owner.id === action.owner.id ? action.owner : owner
          ),
        },
      };

    case "REMOVE_BENEFICIAL_OWNER":
      return {
        ...state,
        company: {
          ...state.company,
          beneficialOwners: state.company.beneficialOwners.filter(
            (owner) => owner.id !== action.id
          ),
        },
      };

    // 審査提出
    case "SUBMIT_REVIEW":
      return {
        ...state,
        review: {
          ...state.review,
          isSubmitting: true,
          error: null,
        },
      };

    case "SUBMIT_REVIEW_SUCCESS":
      return {
        ...state,
        review: {
          ...state.review,
          isSubmitting: false,
          isSubmitted: true,
        },
      };

    case "SUBMIT_REVIEW_ERROR":
      return {
        ...state,
        review: {
          ...state.review,
          isSubmitting: false,
          error: action.error,
        },
      };

    // リセット
    case "RESET_ONBOARDING":
      return initialOnboardingState;

    default:
      return state;
  }
}
