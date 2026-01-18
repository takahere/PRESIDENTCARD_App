/**
 * オンボーディング 型定義
 */

// ステップ定義
export type OnboardingStep =
  | "terms"
  | "email-verification"
  | "representative"
  | "identity-preparation"
  | "ekyc"
  | "company"
  | "review"
  | "complete";

export const ONBOARDING_STEPS: OnboardingStep[] = [
  "terms",
  "email-verification",
  "representative",
  "identity-preparation",
  "ekyc",
  "company",
  "review",
  "complete",
];

export const STEP_LABELS: Record<OnboardingStep, string> = {
  terms: "利用規約",
  "email-verification": "メール認証",
  representative: "代表者情報",
  "identity-preparation": "本人確認準備",
  ekyc: "本人確認",
  company: "会社情報",
  review: "審査提出",
  complete: "完了",
};

// Step 1: 利用規約
export interface TermsAgreement {
  memberAgreement: boolean; // PRESIDENT CARD会員規約
  personalInfo: boolean; // 個人情報の取り扱い
  electronicDelivery: boolean; // 電子交付サービス利用規約
  privacyPolicy: boolean; // プライバシーポリシー
  antiSocialForces: boolean; // 反社会的勢力でないことの表明・確約
}

// Step 2: メール認証
export interface EmailVerification {
  email: string;
  verificationCode: string;
  isCodeSent: boolean;
  isVerified: boolean;
  error: string | null;
}

// Step 3: 代表者情報
export interface RepresentativeInfo {
  name: string;
  phoneNumber: string;
  desiredCreditLimit: string;
}

// Step 4: 本人確認準備
export interface IdentityPreparation {
  hasMyNumberCard: boolean;
  hasReadInstructions: boolean;
  agreedToTerms: boolean;
}

// Step 4: eKYC
export type EkycStatus = "idle" | "scanning" | "success" | "error";

export interface EkycState {
  password: string;
  confirmPassword: string;
  nfcStatus: EkycStatus;
  nfcError: string | null;
  isComplete: boolean;
}

// Step 5: 会社情報
export interface BeneficialOwner {
  id: string;
  name: string;
  relationship: string;
  ownershipPercentage: number;
}

export interface CompanyInfo {
  companyName: string;
  representativeName: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
  phoneNumber: string;
  businessType: string;
  annualRevenue: string;
  employeeCount: string;
  beneficialOwners: BeneficialOwner[];
}

// Step 6: 審査提出確認（入力内容のサマリー）
export interface ReviewState {
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
}

// 全体の状態
export interface OnboardingState {
  currentStep: OnboardingStep;
  completedSteps: OnboardingStep[];
  terms: TermsAgreement;
  emailVerification: EmailVerification;
  representative: RepresentativeInfo;
  identityPreparation: IdentityPreparation;
  ekyc: EkycState;
  company: CompanyInfo;
  review: ReviewState;
}

// 初期状態
export const initialOnboardingState: OnboardingState = {
  currentStep: "terms",
  completedSteps: [],
  terms: {
    memberAgreement: false,
    personalInfo: false,
    electronicDelivery: false,
    privacyPolicy: false,
    antiSocialForces: false,
  },
  emailVerification: {
    email: "",
    verificationCode: "",
    isCodeSent: false,
    isVerified: false,
    error: null,
  },
  representative: {
    name: "",
    phoneNumber: "",
    desiredCreditLimit: "",
  },
  identityPreparation: {
    hasMyNumberCard: false,
    hasReadInstructions: false,
    agreedToTerms: false,
  },
  ekyc: {
    password: "",
    confirmPassword: "",
    nfcStatus: "idle",
    nfcError: null,
    isComplete: false,
  },
  company: {
    companyName: "",
    representativeName: "",
    postalCode: "",
    prefecture: "",
    city: "",
    address: "",
    building: "",
    phoneNumber: "",
    businessType: "",
    annualRevenue: "",
    employeeCount: "",
    beneficialOwners: [],
  },
  review: {
    isSubmitting: false,
    isSubmitted: false,
    error: null,
  },
};

// アクション型定義
export type OnboardingAction =
  // ナビゲーション
  | { type: "GO_TO_STEP"; step: OnboardingStep }
  | { type: "COMPLETE_STEP"; step: OnboardingStep }
  // 利用規約
  | { type: "SET_TERMS_AGREEMENT"; key: keyof TermsAgreement; value: boolean }
  | { type: "SET_ALL_TERMS_AGREED"; value: boolean }
  // メール認証
  | { type: "SET_EMAIL"; email: string }
  | { type: "SET_VERIFICATION_CODE"; code: string }
  | { type: "SEND_CODE" }
  | { type: "VERIFY_CODE_SUCCESS" }
  | { type: "VERIFY_CODE_ERROR"; error: string }
  | { type: "CLEAR_EMAIL_ERROR" }
  // 代表者情報
  | { type: "SET_REPRESENTATIVE_INFO"; key: keyof RepresentativeInfo; value: string }
  // 本人確認準備
  | { type: "SET_IDENTITY_PREP"; key: keyof IdentityPreparation; value: boolean }
  // eKYC
  | { type: "SET_EKYC_PASSWORD"; password: string }
  | { type: "SET_EKYC_CONFIRM_PASSWORD"; confirmPassword: string }
  | { type: "START_NFC_SCAN" }
  | { type: "NFC_SCAN_SUCCESS" }
  | { type: "NFC_SCAN_ERROR"; error: string }
  | { type: "RESET_NFC" }
  // 会社情報
  | { type: "SET_COMPANY_INFO"; key: keyof Omit<CompanyInfo, "beneficialOwners">; value: string }
  | { type: "ADD_BENEFICIAL_OWNER"; owner: BeneficialOwner }
  | { type: "UPDATE_BENEFICIAL_OWNER"; owner: BeneficialOwner }
  | { type: "REMOVE_BENEFICIAL_OWNER"; id: string }
  // 審査提出
  | { type: "SUBMIT_REVIEW" }
  | { type: "SUBMIT_REVIEW_SUCCESS" }
  | { type: "SUBMIT_REVIEW_ERROR"; error: string }
  // リセット
  | { type: "RESET_ONBOARDING" };
