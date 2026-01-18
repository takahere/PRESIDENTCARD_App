/**
 * オンボーディング バリデーション
 */

import type {
  TermsAgreement,
  EmailVerification,
  IdentityPreparation,
  EkycState,
  CompanyInfo,
} from "./types";

// メールアドレスバリデーション
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// パスワードバリデーション（6〜16桁の数字）
export function isValidPassword(password: string): boolean {
  const passwordRegex = /^[0-9]{6,16}$/;
  return passwordRegex.test(password);
}

// 認証コードバリデーション（6桁）
export function isValidVerificationCode(code: string): boolean {
  return /^\d{6}$/.test(code);
}

// 郵便番号バリデーション
export function isValidPostalCode(postalCode: string): boolean {
  return /^\d{7}$/.test(postalCode.replace("-", ""));
}

// 電話番号バリデーション
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^0\d{9,10}$/;
  return phoneRegex.test(phone.replace(/-/g, ""));
}

// Step 1: 利用規約
export function validateTerms(terms: TermsAgreement): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!terms.memberAgreement) {
    errors.push("PRESIDENT CARD会員規約に同意してください");
  }
  if (!terms.personalInfo) {
    errors.push("個人情報の取り扱いに同意してください");
  }
  if (!terms.electronicDelivery) {
    errors.push("電子交付サービス利用規約に同意してください");
  }
  if (!terms.privacyPolicy) {
    errors.push("プライバシーポリシーに同意してください");
  }
  if (!terms.antiSocialForces) {
    errors.push("反社会的勢力でないことの表明・確約に同意してください");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Step 2: メール認証
export function validateEmailVerification(data: EmailVerification): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.email) {
    errors.email = "メールアドレスを入力してください";
  } else if (!isValidEmail(data.email)) {
    errors.email = "正しいメールアドレスを入力してください";
  }

  if (data.isCodeSent && !data.verificationCode) {
    errors.verificationCode = "認証コードを入力してください";
  } else if (data.verificationCode && !isValidVerificationCode(data.verificationCode)) {
    errors.verificationCode = "6桁の認証コードを入力してください";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Step 3: 本人確認準備
export function validateIdentityPreparation(data: IdentityPreparation): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!data.hasMyNumberCard) {
    errors.push("マイナンバーカードをご用意ください");
  }
  if (!data.hasReadInstructions) {
    errors.push("注意事項をご確認ください");
  }
  if (!data.agreedToTerms) {
    errors.push("同意が必要です");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Step 4: eKYC
export function validateEkyc(data: EkycState): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.password) {
    errors.password = "パスワードを入力してください";
  } else if (!isValidPassword(data.password)) {
    errors.password = "パスワードは6〜16桁の数字で入力してください";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "パスワード（確認）を入力してください";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "パスワードが一致しません";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Step 5: 会社情報
export function validateCompanyInfo(data: CompanyInfo): {
  isValid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.companyName) {
    errors.companyName = "会社名を入力してください";
  }

  if (!data.representativeName) {
    errors.representativeName = "代表者名を入力してください";
  }

  if (!data.postalCode) {
    errors.postalCode = "郵便番号を入力してください";
  } else if (!isValidPostalCode(data.postalCode)) {
    errors.postalCode = "正しい郵便番号を入力してください";
  }

  if (!data.prefecture) {
    errors.prefecture = "都道府県を選択してください";
  }

  if (!data.city) {
    errors.city = "市区町村を入力してください";
  }

  if (!data.address) {
    errors.address = "番地を入力してください";
  }

  if (!data.phoneNumber) {
    errors.phoneNumber = "電話番号を入力してください";
  } else if (!isValidPhoneNumber(data.phoneNumber)) {
    errors.phoneNumber = "正しい電話番号を入力してください";
  }

  if (!data.businessType) {
    errors.businessType = "業種を選択してください";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// 全体バリデーション
export function validateAllSteps(state: {
  terms: TermsAgreement;
  emailVerification: EmailVerification;
  identityPreparation: IdentityPreparation;
  ekyc: EkycState;
  company: CompanyInfo;
}): {
  isValid: boolean;
  stepErrors: Record<string, boolean>;
} {
  const termsResult = validateTerms(state.terms);
  const emailResult = validateEmailVerification(state.emailVerification);
  const identityResult = validateIdentityPreparation(state.identityPreparation);
  const ekycResult = validateEkyc(state.ekyc);
  const companyResult = validateCompanyInfo(state.company);

  return {
    isValid:
      termsResult.isValid &&
      emailResult.isValid &&
      state.emailVerification.isVerified &&
      identityResult.isValid &&
      ekycResult.isValid &&
      state.ekyc.isComplete &&
      companyResult.isValid,
    stepErrors: {
      terms: !termsResult.isValid,
      "email-verification": !emailResult.isValid || !state.emailVerification.isVerified,
      "identity-preparation": !identityResult.isValid,
      ekyc: !ekycResult.isValid || !state.ekyc.isComplete,
      company: !companyResult.isValid,
    },
  };
}
