import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ClipboardList,
  Clock3,
  CreditCard,
  Loader2,
  QrCode,
  Search,
  Upload,
  Utensils,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/site/BrandIcons";
import { toast } from "sonner";

import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { usePrograms, useSettings, whatsappLink } from "@/hooks/useSiteContent";
import { cldOptimize, uploadImage } from "@/lib/cloudinary";
import {
  EMPTY_BASIC_DETAILS,
  EMPTY_NUTRITION_LOG,
  MEAL_SLOTS,
  phoneKey,
  publicPrograms,
  type AssessmentDoc,
  type BasicDetails,
  type NutritionLog,
} from "@/lib/content-types";
import { buildPaymentMessage, openWhatsApp } from "@/lib/whatsapp";
import {
  fetchAssessmentByPhone,
  saveBasicDetails,
  paymentReference,
  saveNutritionLog,
  submitPaymentProof,
  watchAssessment,
} from "@/lib/assessments";

import { canonical, canonicalLink } from "@/lib/seo";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Health Assessment — Reclaim Hormones" },
      {
        name: "description",
        content:
          "Start your personalized hormone care journey: share your health details, confirm your consultation and complete your nutrition log.",
      },
      { property: "og:title", content: "Health Assessment — Reclaim Hormones" },
      { property: "og:image", content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png" },
      { name: "twitter:image", content: "https://res.cloudinary.com/pumhgsff/image/upload/v1788419905/reclaim/site/w992zk1zdtdz7qlzbhz5.png" },
      {
        property: "og:description",
        content:
          "A guided 3-step assessment so Dt. Kruthi Goud can build your personalized nutrition plan.",
      },
      { property: "og:url", content: canonical("/assessment") },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: canonicalLink("/assessment"),
  }),
  /* A program page can hand its program straight through, so the visitor
     never re-picks something they already chose. */
  validateSearch: (search: Record<string, unknown>): { program?: string } => {
    const program = typeof search["program"] === "string" ? search["program"].slice(0, 120) : "";
    return program ? { program } : {};
  },
  component: AssessmentPage,
});

const field =
  "w-full min-h-14 rounded-2xl border border-border bg-background px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/15";

const STEP_META = [
  { n: 1, label: "Your Details", icon: ClipboardList },
  { n: 2, label: "Consultation Payment", icon: CreditCard },
  { n: 3, label: "Health Form", icon: Utensils },
];

function Stepper({ step }: { step: number }) {
  return (
    <ol className="mx-auto flex max-w-2xl items-center gap-2">
      {STEP_META.map((s, i) => {
        const done = step > s.n;
        const active = step === s.n;
        return (
          <li key={s.n} className="flex flex-1 items-center gap-2">
            <div className="flex min-w-0 flex-1 flex-col items-center text-center">
              <span
                className={`flex size-10 items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                  done
                    ? "border-brand bg-brand text-primary-foreground"
                    : active
                      ? "border-brand bg-brand/10 text-brand"
                      : "border-border bg-background text-muted-foreground"
                }`}
              >
                {done ? <CheckCircle2 className="size-5" /> : <s.icon className="size-4" />}
              </span>
              <span
                className={`mt-2 text-[0.68rem] uppercase tracking-[0.12em] ${
                  active || done ? "text-brand" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEP_META.length - 1 && (
              <span className={`h-px flex-1 ${step > s.n ? "bg-brand" : "bg-border"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* --------------------------------- step 1 -------------------------------- */

function BasicDetailsStep({
  value,
  onChange,
  onNext,
}: {
  value: BasicDetails;
  onChange: (v: BasicDetails) => void;
  onNext: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data: programs } = usePrograms();

  const audience = value.gender === "Male" ? "men" : "women";
  const options = publicPrograms(programs).filter((p) =>
    value.gender ? p.category === audience : true,
  );
  const isFemale = value.gender === "Female" || value.gender === "Other" || value.gender === "";

  function set<K extends keyof BasicDetails>(key: K, v: BasicDetails[K]) {
    onChange({ ...value, [key]: v });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (value.name.trim().length < 2) e["name"] = "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(value.email.trim())) e["email"] = "Enter a valid email address.";
    if (phoneKey(value.phone).length !== 10) e["phone"] = "Enter a valid 10-digit phone number.";
    if (value.healthGoal.trim().length < 3) e["healthGoal"] = "Tell us your main health goal.";
    if (!value.gender) e["gender"] = "Please select your gender.";
    if (!value.program) e["program"] = "Please select a program.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSaving(true);
    try {
      await saveBasicDetails(value);
      toast.success("Details saved. You can resume anytime with your phone number.");
      onNext();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your details.");
    } finally {
      setSaving(false);
    }
  }

  const err = (k: string) =>
    errors[k] ? <p className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Full Name *
          </label>
          <input
            className={field}
            value={value.name}
            maxLength={80}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Your name"
          />
          {err("name")}
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Phone Number *
          </label>
          <input
            className={field}
            value={value.phone}
            maxLength={15}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 98765 43210"
          />
          {err("phone")}
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Email *
          </label>
          <input
            className={field}
            value={value.email}
            maxLength={120}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@email.com"
          />
          {err("email")}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Gender *
          </label>
          <select
            className={field}
            value={value.gender}
            onChange={(e) => {
              const gender = e.target.value as BasicDetails["gender"];
              onChange({
                ...value,
                gender,
                program: "",
                ...(gender === "Male" ? { menstrualCycle: "NA" as const } : {}),
              });
            }}
          >
            <option value="">Select</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Prefer not to say</option>
          </select>
          {err("gender")}
        </div>
        <div>
          <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Program you are interested in
          </label>
          <select
            className={field}
            value={value.program}
            onChange={(e) => set("program", e.target.value)}
          >
            <option value="">
              {value.gender ? "Recommended for you" : "Select your gender first"}
            </option>
            {options.map((p) => (
              <option key={p.id} value={p.title}>
                {p.title}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet — please guide me</option>
          </select>
          {err("program")}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
          Main Problem / Health Goal *
        </label>
        <textarea
          className={`${field} min-h-20`}
          value={value.healthGoal}
          maxLength={600}
          onChange={(e) => set("healthGoal", e.target.value)}
          placeholder="e.g. Regulate my cycles and manage PCOS naturally"
        />
        {err("healthGoal")}
      </div>



      <button
        type="button"
        onClick={() => void submit()}
        disabled={saving}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60 sm:w-auto"
      >
        {saving ? <Loader2 className="size-4 animate-spin" /> : null}
        Save & Continue to Payment
        <ArrowRight className="size-4" />
      </button>
    </div>
  );
}

/* --------------------------------- step 2 -------------------------------- */

/**
 * The hold screen a patient sees between uploading proof of payment and an
 * admin approving it. Step 3 is genuinely unreachable from here — there is no
 * continue control — and the page's live subscription replaces this view the
 * instant the admin approves.
 */
function VerificationLock({
  assessment,
  price,
  details,
  whatsapp,
}: {
  assessment: AssessmentDoc | null;
  price: number;
  details: BasicDetails;
  whatsapp: string;
}) {
  const submittedAt = assessment?.paymentSubmittedAt;
  const reference =
    assessment?.paymentReference ??
    (assessment?.id && submittedAt ? paymentReference(assessment.id, submittedAt) : "—");

  const submittedLabel = submittedAt
    ? new Date(submittedAt).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Just now";

  const rows = [
    { label: "Reference ID", value: reference },
    { label: "Amount", value: `₹${(assessment?.paymentAmount ?? price).toLocaleString("en-IN")}` },
    { label: "Submitted", value: submittedLabel },
    ...(assessment?.paymentNote ? [{ label: "Transaction ref", value: assessment.paymentNote }] : []),
  ];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="surface surface-lg overflow-hidden">
        <div className="bg-gradient-to-b from-gold/15 to-card px-6 py-8 text-center">
          <span className="icon-pod mx-auto size-16 rounded-full">
            <Clock3 className="size-7 text-gold" aria-hidden="true" />
          </span>
          <p className="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold">
            Step 2 of 3
          </p>
          <h2 className="mt-2 font-serif text-2xl text-brand-deep">Payment Under Verification</h2>
          <p className="mx-auto mt-3 max-w-sm text-pretty-body text-sm text-muted-foreground">
            Your payment is being verified by our team. Step 3 will unlock automatically after
            approval.
          </p>
        </div>

        <dl className="divide-y divide-border/60 border-t border-border/60">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between gap-4 px-6 py-4">
              <dt className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {row.label}
              </dt>
              <dd className="min-w-0 break-words text-right text-sm font-semibold text-brand-deep">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        {assessment?.paymentScreenshot ? (
          <div className="border-t border-border/60 px-6 py-5">
            <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Screenshot submitted
            </p>
            <img
              src={cldOptimize(assessment.paymentScreenshot, 600)}
              alt="The payment screenshot you submitted"
              loading="lazy"
              className="mt-3 max-h-64 w-auto rounded-2xl border border-border"
            />
          </div>
        ) : null}

        <div className="border-t border-border/60 px-6 py-5">
          <p className="text-pretty-body text-xs text-muted-foreground">
            Verification is usually completed within a few hours. You can message our team if you
            need an update — please attach the same screenshot there.
          </p>
          <a
            href={whatsappLink(
              whatsapp,
              buildPaymentMessage({
                name: details.name,
                phone: details.phone,
                gender: details.gender,
                program: details.program || "Health assessment",
                amount: assessment?.paymentAmount ?? price,
                reference,
                ...(assessment?.paymentScreenshot
                  ? { screenshotUrl: assessment.paymentScreenshot }
                  : {}),
              }),
            )}
            target="_blank"
            rel="noreferrer noopener"
            className="tactile touch-lg fill-surface mt-4 inline-flex items-center gap-2 text-sm"
          >
            <WhatsAppIcon className="size-4" /> Message our team
          </a>
        </div>
      </div>
    </div>
  );
}

function PaymentStep({
  assessmentKey,
  assessment,
  details,
  onNext,
  onBack,
  onRefresh,
}: {
  assessmentKey: string;
  assessment: AssessmentDoc | null;
  details: BasicDetails;
  onNext: () => void;
  onBack: () => void;
  onRefresh: () => void;
}) {
  const { settings } = useSettings();
  const [uploading, setUploading] = useState(false);
  const [note, setNote] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const price = settings.consultationPrice;
  const status = assessment?.paymentStatus ?? "not_started";
  const upiUrl = settings.upiId
    ? `upi://pay?pa=${encodeURIComponent(settings.upiId)}&pn=${encodeURIComponent(
        "Reclaim Hormones",
      )}&am=${price}&cu=INR&tn=${encodeURIComponent("Consultation")}`
    : "";

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadImage(file, "reclaim/payments");
      const { reference } = await submitPaymentProof(assessmentKey, url, price, note);
      toast.success("Payment submitted. Our team will verify it shortly.");
      openWhatsApp(
        settings.whatsapp,
        buildPaymentMessage({
          name: details.name,
          phone: details.phone,
          gender: details.gender,
          program: details.program || "Health assessment",
          amount: price,
          reference,
          screenshotUrl: url,
        }),
      );
      onRefresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  /*
   * Once a screenshot is in, the patient is held here. Step 3 is not a button
   * they can press past — an admin approval is what releases it, and the live
   * subscription on the page swaps this screen out the moment that happens.
   */
  if (status === "pending_verification") {
    return (
      <VerificationLock
        assessment={assessment}
        price={price}
        details={details}
        whatsapp={settings.whatsapp}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/70 bg-card p-6">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Consultation Fee
          </p>
          <p className="mt-1 font-serif text-4xl text-brand-deep">₹{price.toLocaleString("en-IN")}</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Includes your detailed 1:1 consultation with Dt. Kruthi Goud and your personalized
            nutrition plan.
          </p>

          <div className="mt-5 space-y-3 text-sm">
            {settings.upiId ? (
              <div className="rounded-xl bg-muted/40 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">UPI ID</p>
                <p className="mt-0.5 font-medium text-brand-deep">{settings.upiId}</p>
              </div>
            ) : (
              <p className="rounded-xl bg-muted/40 px-4 py-3 text-muted-foreground">
                Payment details are being updated. Please reach us on WhatsApp to complete your
                payment.
              </p>
            )}
            {upiUrl ? (
              <a
                href={upiUrl}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep"
              >
                <CreditCard className="size-4" />
                Pay ₹{price.toLocaleString("en-IN")} via UPI
              </a>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card p-6">
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <QrCode className="size-4" /> Scan to pay
          </p>
          <div className="mt-4 flex items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 p-4">
            {settings.qrImage ? (
              <img
                src={cldOptimize(settings.qrImage, 500)}
                alt="UPI QR code for consultation payment"
                className="max-h-64 w-auto rounded-xl"
              />
            ) : (
              <p className="py-10 text-center text-sm text-muted-foreground">
                QR code will appear here once added by the clinic.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-6">
        <p className="font-serif text-xl text-brand-deep">Upload payment screenshot</p>
        <p className="mt-1 text-sm text-muted-foreground">
          After paying, upload the screenshot so our team can verify it.
        </p>

        {/* "pending_verification" never reaches here — VerificationLock takes
            over the whole step while a payment is awaiting review. */}
        {status === "approved" ? (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-brand-deep">
            <BadgeCheck className="size-4" /> Status: <strong>Payment Completed</strong>
          </div>
        ) : null}
        {status === "rejected" ? (
          <div className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            Your payment could not be verified. Please upload a clearer screenshot or contact us.
          </div>
        ) : null}

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Transaction reference (optional)
            </label>
            <input
              className={field}
              value={note}
              maxLength={80}
              onChange={(e) => setNote(e.target.value)}
              placeholder="UPI reference / UTR number"
            />
          </div>
          <div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => void handleFile(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex w-full items-center justify-center gap-2 min-h-14 rounded-2xl border border-border bg-background px-5 py-3.5 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-60"
            >
              {uploading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Upload className="size-4" />
              )}
              {assessment?.paymentScreenshot ? "Replace screenshot" : "Upload screenshot"}
            </button>
          </div>
        </div>

        {assessment?.paymentScreenshot ? (
          <img
            src={cldOptimize(assessment.paymentScreenshot, 400)}
            alt="Uploaded payment screenshot"
            className="mt-4 max-h-48 w-auto rounded-xl border border-border"
            loading="lazy"
          />
        ) : null}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 min-h-14 rounded-2xl border border-border bg-background px-5 py-3.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          <ArrowLeft className="size-4" /> Back
        </button>
        {/* Only an approved payment opens step 3. */}
        {status === "approved" ? (
          <button
            type="button"
            onClick={onNext}
            className="tactile touch-lg fill-primary inline-flex items-center gap-2 text-sm"
          >
            Continue to Nutrition Log <ArrowRight className="size-4" />
          </button>
        ) : null}
      </div>
      <p className="text-xs text-muted-foreground">
        {status === "approved"
          ? "Your payment is verified — you can continue to your nutrition log."
          : "Upload your payment screenshot to continue. Step 3 unlocks once our team verifies it."}
      </p>
    </div>
  );
}

/* --------------------------------- step 3 -------------------------------- */

function NutritionStep({
  assessmentKey,
  value,
  details,
  onChange,
  onChangeDetails,
  onBack,
  onDone,
}: {
  assessmentKey: string;
  value: NutritionLog;
  details: BasicDetails;
  onChange: (v: NutritionLog) => void;
  onChangeDetails: (v: BasicDetails) => void;
  onBack: () => void;
  onDone: () => void;
}) {
  const [saving, setSaving] = useState<"draft" | "submit" | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isFemale =
    details.gender === "Female" || details.gender === "Other" || details.gender === "";

  function setDetail<K extends keyof BasicDetails>(key: K, v: BasicDetails[K]) {
    onChangeDetails({ ...details, [key]: v });
  }

  function set(slot: string, key: "time" | "food" | "portion", v: string) {
    onChange({ ...value, [slot]: { ...(value[slot] ?? { time: "", food: "", portion: "" }), [key]: v } });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    const age = Number(details.age);
    if (!details.age || Number.isNaN(age) || age < 5 || age > 100)
      e["age"] = "Enter an age from 5–100.";
    if (details.address.trim().length < 4) e["address"] = "Please enter your address.";
    if (!details.lookingToStart) e["lookingToStart"] = "Please choose when you want to start.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function persist(submit: boolean) {
    if (submit) {
      if (!validate()) {
        toast.error("Please fix the highlighted fields in the health form.");
        return;
      }
      const filled = MEAL_SLOTS.filter((s) => (value[s]?.food ?? "").trim().length > 0);
      if (filled.length < 3) {
        toast.error("Please fill at least breakfast, lunch and dinner before submitting.");
        return;
      }
    }
    setSaving(submit ? "submit" : "draft");
    try {
      await saveNutritionLog(assessmentKey, value, details, submit);
      toast.success(submit ? "Assessment submitted. Thank you!" : "Nutrition log saved.");
      if (submit) onDone();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save your nutrition log.");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Help us understand your health better so we can craft the perfect nutrition plan for you.
      </p>

      <div className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5">
        <p className="font-serif text-lg text-brand-deep">Health Profile</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Age *
            </label>
            <input
              className={field}
              value={details.age}
              inputMode="numeric"
              maxLength={3}
              onChange={(e) => setDetail("age", e.target.value.replace(/\D/g, ""))}
              placeholder="e.g. 28"
            />
            {errors["age"] && <p className="mt-1 text-xs text-destructive">{errors["age"]}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Address *
            </label>
            <input
              className={field}
              value={details.address}
              maxLength={200}
              onChange={(e) => setDetail("address", e.target.value)}
              placeholder="City, State"
            />
            {errors["address"] && <p className="mt-1 text-xs text-destructive">{errors["address"]}</p>}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Past Medical History
            </label>
            <textarea
              className={`${field} min-h-20`}
              value={details.medicalHistory}
              maxLength={800}
              onChange={(e) => setDetail("medicalHistory", e.target.value)}
              placeholder="Diagnoses, surgeries, medication, reports"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Daily Symptoms
            </label>
            <textarea
              className={`${field} min-h-20`}
              value={details.symptoms}
              maxLength={800}
              onChange={(e) => setDetail("symptoms", e.target.value)}
              placeholder="Fatigue, bloating, hair loss, cravings…"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Lifestyle / Daily Routine
            </label>
            <textarea
              className={`${field} min-h-20`}
              value={details.lifestyle}
              maxLength={800}
              onChange={(e) => setDetail("lifestyle", e.target.value)}
              placeholder="Work hours, sleep, activity, stress levels"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Previous Nutrition Programs
            </label>
            <textarea
              className={`${field} min-h-20`}
              value={details.previousPrograms}
              maxLength={600}
              onChange={(e) => setDetail("previousPrograms", e.target.value)}
              placeholder="Diets or programs you have tried before"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {isFemale ? (
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Menstrual Cycle
              </label>
              <select
                className={field}
                value={details.menstrualCycle}
                onChange={(e) =>
                  setDetail("menstrualCycle", e.target.value as BasicDetails["menstrualCycle"])
                }
              >
                <option value="">Select</option>
                <option value="Regular">Regular</option>
                <option value="Irregular">Irregular</option>
                <option value="NA">Not applicable</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Energy, Sleep & Stress Pattern
              </label>
              <select
                className={field}
                value={details.menstrualCycle === "NA" ? "NA" : details.menstrualCycle}
                onChange={(e) =>
                  setDetail("menstrualCycle", e.target.value as BasicDetails["menstrualCycle"])
                }
              >
                <option value="NA">Not applicable</option>
              </select>
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-[0.12em] text-muted-foreground">
              Looking To Start *
            </label>
            <select
              className={field}
              value={details.lookingToStart}
              onChange={(e) => setDetail("lookingToStart", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Immediately">Immediately</option>
              <option value="Within a week">Within a week</option>
              <option value="Within a month">Within a month</option>
              <option value="Just exploring">Just exploring</option>
            </select>
            {errors["lookingToStart"] && (
              <p className="mt-1 text-xs text-destructive">{errors["lookingToStart"]}</p>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        Now, please share a typical day of eating — timings, foods and rough portions.
      </p>

      <div className="space-y-4">
        {MEAL_SLOTS.map((slot) => (
          <div key={slot} className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5">
            <p className="font-serif text-lg text-brand-deep">{slot}</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,0.6fr)_minmax(0,1.6fr)_minmax(0,0.9fr)]">
              <input
                className={field}
                type="time"
                value={value[slot]?.time ?? ""}
                onChange={(e) => set(slot, "time", e.target.value)}
                aria-label={`${slot} time`}
              />
              <input
                className={field}
                value={value[slot]?.food ?? ""}
                maxLength={200}
                onChange={(e) => set(slot, "food", e.target.value)}
                placeholder="What do you usually eat?"
                aria-label={`${slot} food`}
              />
              <input
                className={field}
                value={value[slot]?.portion ?? ""}
                maxLength={80}
                onChange={(e) => set(slot, "portion", e.target.value)}
                placeholder="Portion (e.g. 2 idli)"
                aria-label={`${slot} portion`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 min-h-14 rounded-2xl border border-border bg-background px-5 py-3.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          <ArrowLeft className="size-4" /> Back
        </button>
        <button
          type="button"
          onClick={() => void persist(false)}
          disabled={saving !== null}
          className="inline-flex items-center gap-2 min-h-14 rounded-2xl border border-border bg-background px-5 py-3.5 text-sm font-medium transition-colors hover:bg-accent disabled:opacity-60"
        >
          {saving === "draft" ? <Loader2 className="size-4 animate-spin" /> : null}
          Save draft
        </button>
        <button
          type="button"
          onClick={() => void persist(true)}
          disabled={saving !== null}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-deep disabled:opacity-60"
        >
          {saving === "submit" ? <Loader2 className="size-4 animate-spin" /> : null}
          Submit Assessment
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- page --------------------------------- */

function AssessmentPage() {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState<BasicDetails>(EMPTY_BASIC_DETAILS);
  const [log, setLog] = useState<NutritionLog>(EMPTY_NUTRITION_LOG);
  const [assessment, setAssessment] = useState<AssessmentDoc | null>(null);
  const [resumePhone, setResumePhone] = useState("");
  const [resuming, setResuming] = useState(false);
  const [completed, setCompleted] = useState(false);

  const key = assessment?.id ?? phoneKey(details.phone);

  /* Arriving from a program page pre-selects that program once. */
  const { program: presetProgram } = Route.useSearch();
  useEffect(() => {
    if (!presetProgram) return;
    setDetails((d) => (d.program ? d : { ...d, program: presetProgram }));
  }, [presetProgram]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, completed]);

  /*
   * Live subscription to the patient's own assessment. This is what makes
   * "step 3 unlocks automatically after approval" true: when an admin approves,
   * the doc changes, this fires, and the verification lock is replaced without
   * the patient reloading or re-entering their phone number.
   */
  useEffect(() => {
    if (!key || key.length < 10) return;
    return watchAssessment(key, (doc) => {
      if (!doc) return;
      setAssessment(doc);
      if (doc.status === "completed") setCompleted(true);
    });
  }, [key]);

  /* Approval releases the hold; a rejection or a fresh upload pulls it back. */
  useEffect(() => {
    if (!assessment) return;
    if (assessment.paymentStatus === "pending_verification" && step > 2) setStep(2);
  }, [assessment, step]);

  async function refresh() {
    if (!key) return;
    try {
      const fresh = await fetchAssessmentByPhone(key);
      if (fresh) setAssessment(fresh);
    } catch {
      /* non-blocking refresh */
    }
  }

  async function handleResume() {
    setResuming(true);
    try {
      const found = await fetchAssessmentByPhone(resumePhone);
      if (!found) {
        toast.error("No assessment found for that phone number.");
        return;
      }
      setAssessment(found);
      setDetails({ ...EMPTY_BASIC_DETAILS, ...found.details });
      setLog({ ...EMPTY_NUTRITION_LOG, ...(found.nutritionLog ?? {}) });
      if (found.status === "completed") {
        setCompleted(true);
      } else if (found.paymentStatus === "pending_verification") {
        /* Returning mid-verification always lands back on the hold screen,
           however far the saved step says they got. */
        setStep(2);
      } else {
        setStep(Math.min(3, Math.max(1, found.step ?? 1)));
      }
      toast.success("Welcome back! We picked up where you left off.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not resume your assessment.");
    } finally {
      setResuming(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 pb-20 pt-24 lg:px-8 lg:pt-32">
        <header className="text-center">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-primary">
            Health Assessment
          </p>
          <h1 className="mt-2 font-serif text-3xl text-brand-deep lg:text-5xl">
            Start Your Healing Journey
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Three simple steps — your health story, your consultation, and your food diary. Everything
            is saved as you go.
          </p>
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-border bg-sage-soft/50 px-5 py-4 text-left">
            <p className="text-sm font-semibold text-brand-deep">
              Paid assessment — different from a free consultation enquiry
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              This is our detailed, paid health assessment: your full history, a booked consultation
              slot and a reviewed food diary. If you only want to talk to us first, use the free{" "}
              <Link to="/contact" className="font-medium text-brand underline">
                consultation enquiry form
              </Link>{" "}
              instead — no payment needed.
            </p>
          </div>
        </header>

        {completed ? (
          <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-brand/25 bg-brand/5 px-6 py-12 text-center">
            <CheckCircle2 className="mx-auto size-12 text-brand" />
            <h2 className="mt-4 font-serif text-2xl text-brand-deep">Assessment Completed</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Thank you, {details.name || "friend"}. Our team will review everything and reach out to
              schedule your consultation.
            </p>
            <p className="mt-4 text-xs uppercase tracking-[0.12em] text-brand">
              Payment status:{" "}
              {assessment?.paymentStatus === "approved" ? "Completed" : "Pending verification"}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-10">
              <Stepper step={step} />
            </div>

            {step === 1 ? (
              <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-border/70 bg-muted/30 p-4">
                <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-brand">
                  <Search className="size-3.5" /> Already started?
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <input
                    className={field}
                    value={resumePhone}
                    maxLength={15}
                    onChange={(e) => setResumePhone(e.target.value)}
                    placeholder="Enter your phone number"
                    aria-label="Phone number to resume assessment"
                  />
                  <button
                    type="button"
                    onClick={() => void handleResume()}
                    disabled={resuming}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl border border-brand/40 bg-background px-5 py-3 text-sm font-medium text-brand transition-colors hover:bg-brand/10 disabled:opacity-60"
                  >
                    {resuming ? <Loader2 className="size-4 animate-spin" /> : null}
                    Resume
                  </button>
                </div>
              </div>
            ) : null}

            <div className="mt-8">
              {step === 1 ? (
                <BasicDetailsStep
                  value={details}
                  onChange={setDetails}
                  onNext={() => {
                    void refresh();
                    setStep(2);
                  }}
                />
              ) : null}
              {step === 2 ? (
                <PaymentStep
                  assessmentKey={key}
                  assessment={assessment}
                  details={details}
                  onBack={() => setStep(1)}
                  onNext={() => setStep(3)}
                  onRefresh={() => void refresh()}
                />
              ) : null}
              {step === 3 ? (
                <NutritionStep
                  assessmentKey={key}
                  value={log}
                  details={details}
                  onChange={setLog}
                  onChangeDetails={setDetails}
                  onBack={() => setStep(2)}
                  onDone={() => setCompleted(true)}
                />
              ) : null}
            </div>
          </>
        )}
      </main>
      <WhatsAppButton />
      <SiteFooter />
    </div>
  );
}
