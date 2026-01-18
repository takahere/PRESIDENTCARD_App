"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, ChevronLeft, Plus, Trash2, Edit2, X, User } from "lucide-react";
import { Button, TextField, Card } from "@/components/ui/ios";
import { useOnboarding, validateCompanyInfo, type BeneficialOwner } from "@/lib/onboarding";

// 業種リスト
const BUSINESS_TYPES = [
  { value: "", label: "選択してください" },
  { value: "it", label: "IT・通信" },
  { value: "finance", label: "金融・保険" },
  { value: "manufacturing", label: "製造業" },
  { value: "retail", label: "小売・卸売" },
  { value: "service", label: "サービス業" },
  { value: "construction", label: "建設業" },
  { value: "real_estate", label: "不動産業" },
  { value: "other", label: "その他" },
];

// 従業員数リスト
const EMPLOYEE_COUNTS = [
  { value: "", label: "選択してください" },
  { value: "1-10", label: "1-10名" },
  { value: "11-50", label: "11-50名" },
  { value: "51-100", label: "51-100名" },
  { value: "101-500", label: "101-500名" },
  { value: "501+", label: "501名以上" },
];

// 関係リスト
const RELATIONSHIPS = [
  { value: "representative", label: "代表取締役" },
  { value: "director", label: "取締役" },
  { value: "shareholder", label: "株主" },
  { value: "beneficial_owner", label: "実質的支配者" },
];

export default function CompanyPage() {
  const router = useRouter();
  const {
    state,
    setCompanyInfo,
    addBeneficialOwner,
    updateBeneficialOwner,
    removeBeneficialOwner,
    completeCurrentStep,
  } = useOnboarding();

  const { company } = state;

  // モーダル状態
  const [showOwnerModal, setShowOwnerModal] = useState(false);
  const [editingOwner, setEditingOwner] = useState<BeneficialOwner | null>(null);
  const [ownerForm, setOwnerForm] = useState({
    name: "",
    relationship: "representative",
    ownershipPercentage: 0,
  });

  // バリデーション
  const validation = validateCompanyInfo(company);
  const canProceed = company.companyName && company.representativeName && company.postalCode && company.city && company.address;

  const handleNext = () => {
    if (canProceed) {
      completeCurrentStep();
      router.push("/onboarding/review");
    }
  };

  const handleBack = () => {
    router.push("/onboarding/ekyc");
  };

  // 実質的支配者の追加/編集
  const handleSaveOwner = () => {
    if (!ownerForm.name) return;

    if (editingOwner) {
      updateBeneficialOwner({
        ...editingOwner,
        ...ownerForm,
      });
    } else {
      addBeneficialOwner(ownerForm);
    }

    setShowOwnerModal(false);
    setEditingOwner(null);
    setOwnerForm({ name: "", relationship: "representative", ownershipPercentage: 0 });
  };

  const handleEditOwner = (owner: BeneficialOwner) => {
    setEditingOwner(owner);
    setOwnerForm({
      name: owner.name,
      relationship: owner.relationship,
      ownershipPercentage: owner.ownershipPercentage,
    });
    setShowOwnerModal(true);
  };

  const handleDeleteOwner = (id: string) => {
    removeBeneficialOwner(id);
  };

  return (
    <div className="min-h-full flex flex-col px-4 py-6">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={handleBack}
        className="flex items-center gap-1 text-white/60 mb-4 min-h-[44px] self-start"
      >
        <ChevronLeft size={20} />
        <span className="text-sm">戻る</span>
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-darkgreen-80/20 flex items-center justify-center mb-4">
          <Building2 size={32} className="text-darkgreen-80" />
        </div>
        <h1 className="text-xl font-bold text-white mb-2">会社情報</h1>
        <p className="text-white/60 text-sm">
          法人情報と実質的支配者情報を入力してください。
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex-1 space-y-6 overflow-y-auto"
      >
        {/* 基本情報 */}
        <div className="space-y-4">
          <h2 className="text-body-medium font-semibold text-white">基本情報</h2>

          <TextField
            label="会社名"
            value={company.companyName}
            onChange={(v) => setCompanyInfo("companyName", v)}
            placeholder="株式会社サンプル"
            error={validation.errors.companyName}
          />

          <TextField
            label="代表者名"
            value={company.representativeName}
            onChange={(v) => setCompanyInfo("representativeName", v)}
            placeholder="山田 太郎"
            error={validation.errors.representativeName}
          />
        </div>

        {/* 住所 */}
        <div className="space-y-4">
          <h2 className="text-body-medium font-semibold text-white">所在地</h2>

          <TextField
            label="郵便番号"
            value={company.postalCode}
            onChange={(v) => setCompanyInfo("postalCode", v.replace(/[^\d-]/g, ""))}
            placeholder="100-0001"
            error={validation.errors.postalCode}
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-caption-medium text-white/60 font-medium mb-2">
                都道府県
              </label>
              <select
                value={company.prefecture}
                onChange={(e) => setCompanyInfo("prefecture", e.target.value)}
                className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
              >
                <option value="">選択</option>
                <option value="東京都">東京都</option>
                <option value="大阪府">大阪府</option>
                <option value="神奈川県">神奈川県</option>
                <option value="愛知県">愛知県</option>
                <option value="福岡県">福岡県</option>
                {/* 他の都道府県も追加可能 */}
              </select>
            </div>
            <TextField
              label="市区町村"
              value={company.city}
              onChange={(v) => setCompanyInfo("city", v)}
              placeholder="千代田区"
              error={validation.errors.city}
            />
          </div>

          <TextField
            label="番地"
            value={company.address}
            onChange={(v) => setCompanyInfo("address", v)}
            placeholder="丸の内1-1-1"
            error={validation.errors.address}
          />

          <TextField
            label="建物名・部屋番号（任意）"
            value={company.building}
            onChange={(v) => setCompanyInfo("building", v)}
            placeholder="〇〇ビル 5F"
          />
        </div>

        {/* 事業情報 */}
        <div className="space-y-4">
          <h2 className="text-body-medium font-semibold text-white">事業情報</h2>

          <div>
            <label className="block text-caption-medium text-white/60 font-medium mb-2">
              業種
            </label>
            <select
              value={company.businessType}
              onChange={(e) => setCompanyInfo("businessType", e.target.value)}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
            >
              {BUSINESS_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-caption-medium text-white/60 font-medium mb-2">
              従業員数（任意）
            </label>
            <select
              value={company.employeeCount}
              onChange={(e) => setCompanyInfo("employeeCount", e.target.value)}
              className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
            >
              {EMPLOYEE_COUNTS.map((count) => (
                <option key={count.value} value={count.value}>
                  {count.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 実質的支配者 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-body-medium font-semibold text-white">実質的支配者</h2>
            <button
              onClick={() => {
                setEditingOwner(null);
                setOwnerForm({ name: "", relationship: "representative", ownershipPercentage: 0 });
                setShowOwnerModal(true);
              }}
              className="flex items-center gap-1 text-darkgreen-80 text-sm active:opacity-70"
            >
              <Plus size={16} />
              <span>追加</span>
            </button>
          </div>

          <p className="text-caption-medium text-white/50">
            議決権の25%以上を保有する個人、または事業活動に支配的な影響力を持つ個人を登録してください。
          </p>

          {company.beneficialOwners.length === 0 ? (
            <div className="bg-white/5 rounded-xl p-6 text-center">
              <User size={32} className="text-white/20 mx-auto mb-2" />
              <p className="text-white/40 text-sm">
                実質的支配者が登録されていません
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {company.beneficialOwners.map((owner) => (
                <Card key={owner.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">{owner.name}</p>
                      <p className="text-white/50 text-sm">
                        {RELATIONSHIPS.find((r) => r.value === owner.relationship)?.label}
                        {owner.ownershipPercentage > 0 && ` (${owner.ownershipPercentage}%)`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditOwner(owner)}
                        className="p-2 text-white/40 active:text-white/60"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteOwner(owner.id)}
                        className="p-2 text-red-80/60 active:text-red-80"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pb-8 mt-6"
      >
        <Button
          variant="primary"
          fullWidth
          onClick={handleNext}
          disabled={!canProceed}
        >
          次へ
        </Button>
      </motion.div>

      {/* Owner Modal */}
      <AnimatePresence>
        {showOwnerModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowOwnerModal(false);
              }
            }}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-luxbrown-80 rounded-t-2xl p-6 w-full max-w-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {editingOwner ? "実質的支配者を編集" : "実質的支配者を追加"}
                </h3>
                <button
                  onClick={() => setShowOwnerModal(false)}
                  className="p-2 text-white/40"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <TextField
                  label="氏名"
                  value={ownerForm.name}
                  onChange={(v) => setOwnerForm({ ...ownerForm, name: v })}
                  placeholder="山田 太郎"
                />

                <div>
                  <label className="block text-caption-medium text-white/60 font-medium mb-2">
                    関係
                  </label>
                  <select
                    value={ownerForm.relationship}
                    onChange={(e) =>
                      setOwnerForm({ ...ownerForm, relationship: e.target.value })
                    }
                    className="w-full bg-white/5 border-2 border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40"
                  >
                    {RELATIONSHIPS.map((rel) => (
                      <option key={rel.value} value={rel.value}>
                        {rel.label}
                      </option>
                    ))}
                  </select>
                </div>

                <TextField
                  label="議決権割合（%）"
                  value={ownerForm.ownershipPercentage.toString()}
                  onChange={(v) =>
                    setOwnerForm({
                      ...ownerForm,
                      ownershipPercentage: parseInt(v) || 0,
                    })
                  }
                  placeholder="25"
                  type="number"
                />
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleSaveOwner}
                  disabled={!ownerForm.name}
                >
                  {editingOwner ? "更新" : "追加"}
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setShowOwnerModal(false)}
                >
                  キャンセル
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
