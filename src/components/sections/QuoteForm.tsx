"use client";

import { useEffect, useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Loader2,
  MapPin,
  Phone,
  Upload,
  X,
} from "lucide-react";
import Button from "@/components/ui/Button";
import SelectCard from "@/components/ui/SelectCard";
import { cn } from "@/lib/utils";
import { useQuotePrefill } from "@/hooks/useQuotePrefill";
import { COMPANY } from "@/lib/constants";

const PROJECT_TYPES = [
  "Neubau",
  "Außenanlage",
  "Pflaster",
  "Abbruch",
  "Innenausbau",
  "Trockenbau",
  "Entsorgung",
  "Sonstiges",
];

const TIMELINES = ["Sofort", "1–3 Monate", "3–6 Monate", "Später"];
const TOTAL_STEPS = 5;
const MAX_FILES = 6;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

interface PhotoFile {
  id: string;
  file: File;
  previewUrl: string;
}

type Status = "idle" | "submitting" | "success" | "error";

export default function QuoteForm() {
  const { prefill } = useQuotePrefill();
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);

  const [projectType, setProjectType] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [timeline, setTimeline] = useState<string | null>(null);
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Übernimmt Werte aus Rechnern/Konfigurator (externer Kontext), die sich
    // jederzeit nach dem Mount ändern können, in die lokal editierbaren Felder.
    if (prefill.projectType) {
      const match = PROJECT_TYPES.find((p) =>
        prefill.projectType!.toLowerCase().includes(p.toLowerCase())
      );
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProjectType(match ?? "Sonstiges");
    }
    if (prefill.summary) setDescription(prefill.summary);
    if (prefill.zip) setLocation(prefill.zip);
    if (prefill.timeline) setTimeline(prefill.timeline);
  }, [prefill]);

  const addPhotos = (fileList: FileList | null) => {
    if (!fileList) return;
    setStepError(null);
    const incoming = Array.from(fileList);
    const oversized = incoming.find((f) => f.size > MAX_FILE_SIZE);
    if (oversized) {
      setStepError(`${oversized.name} ist größer als 10 MB.`);
      return;
    }
    setPhotos((prev) => {
      const combined = [...prev, ...incoming.map(toPhotoFile)];
      if (combined.length > MAX_FILES) {
        setStepError(`Maximal ${MAX_FILES} Fotos möglich.`);
        return combined.slice(0, MAX_FILES);
      }
      return combined;
    });
  };

  const toPhotoFile = (file: File): PhotoFile => ({
    id: `${file.name}-${file.size}-${Math.random().toString(36).slice(2)}`,
    file,
    previewUrl: URL.createObjectURL(file),
  });

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    addPhotos(e.dataTransfer.files);
  };

  const validateStep = (): boolean => {
    setStepError(null);
    if (step === 0 && !projectType) {
      setStepError("Bitte wählen Sie ein Vorhaben aus.");
      return false;
    }
    if (step === 1 && location.trim().length < 3) {
      setStepError("Bitte Ort oder PLZ angeben.");
      return false;
    }
    if (step === 2 && !timeline) {
      setStepError("Bitte einen Zeitpunkt auswählen.");
      return false;
    }
    if (step === 4) {
      if (!name.trim()) {
        setStepError("Bitte Ihren Namen angeben.");
        return false;
      }
      if (!phone.trim() && !email.trim()) {
        setStepError("Bitte Telefonnummer oder E-Mail angeben.");
        return false;
      }
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        setStepError("Die E-Mail-Adresse ist ungültig.");
        return false;
      }
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < TOTAL_STEPS - 1) {
      setStep((s) => s + 1);
    } else {
      submit();
    }
  };
  const back = () => {
    setStepError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  const submit = async () => {
    setStatus("submitting");
    setServerError(null);
    try {
      const body = new FormData();
      body.set("projectType", projectType ?? "");
      body.set("description", description);
      body.set("location", location);
      body.set("timeline", timeline ?? "");
      body.set("name", name);
      body.set("phone", phone);
      body.set("email", email);
      photos.forEach((p) => body.append("photos", p.file));

      const res = await fetch("/api/contact", { method: "POST", body });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Unbekannter Fehler");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Anfrage konnte nicht gesendet werden.");
    }
  };

  const reset = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setStep(0);
    setStatus("idle");
    setServerError(null);
    setStepError(null);
    setProjectType(null);
    setDescription("");
    setLocation("");
    setTimeline(null);
    setPhotos([]);
    setName("");
    setPhone("");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl bg-graphite p-10 text-center text-off-white md:p-16">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
          <Check size={28} aria-hidden />
        </div>
        <h3 className="font-display text-3xl font-bold uppercase md:text-4xl">Angekommen.</h3>
        <p className="mt-4 mx-auto max-w-md text-off-white/75">
          Vielen Dank, {name.split(" ")[0] || "für Ihre Anfrage"}. Wir melden uns zeitnah unter
          den angegebenen Kontaktdaten zurück.
        </p>
        <Button onClick={reset} variant="outline-light" className="mt-8">
          Weitere Anfrage stellen
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-off-white p-6 shadow-[0_2px_40px_rgba(0,0,0,0.06)] md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <span className="label-technical text-xs text-anthracite/50">
          {step + 1} / {TOTAL_STEPS}
        </span>
        <div className="h-1 w-32 overflow-hidden rounded-full bg-concrete">
          <motion.div
            className="h-full bg-accent"
            animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && (
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-graphite mb-6">
                Was möchten Sie umsetzen?
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {PROJECT_TYPES.map((type) => (
                  <SelectCard
                    key={type}
                    label={type}
                    selected={projectType === type}
                    onClick={() => setProjectType(type)}
                  />
                ))}
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Kurze Beschreibung Ihres Vorhabens (optional)"
                rows={3}
                className="mt-5 w-full resize-none rounded-xl border border-anthracite/15 bg-off-white px-4 py-3 text-sm outline-none focus:border-accent"
              />
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-graphite mb-6">
                Wo befindet sich das Projekt?
              </h3>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" aria-hidden />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ort oder PLZ, z. B. 91550 Dinkelsbühl"
                  className="w-full rounded-xl border border-anthracite/15 bg-off-white py-4 pl-12 pr-4 text-lg outline-none focus:border-accent"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-graphite mb-6">
                Wann soll es starten?
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {TIMELINES.map((t) => (
                  <SelectCard key={t} label={t} selected={timeline === t} onClick={() => setTimeline(t)} />
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-graphite mb-2">
                Baustelle fotografieren
              </h3>
              <p className="mb-6 text-sm text-anthracite/60">
                Optional, hilft uns bei der ersten Einschätzung.
              </p>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={cn(
                  "flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-colors",
                  dragActive ? "border-accent bg-accent/5" : "border-anthracite/15"
                )}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-off-white">
                  <Camera size={24} aria-hidden />
                </div>
                <div>
                  <p className="font-medium text-graphite">Fotos aufnehmen oder hochladen</p>
                  <p className="text-sm text-anthracite/50">
                    Ziehen Sie Fotos hierher oder wählen Sie sie manuell aus
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full bg-graphite px-5 py-3 text-sm font-medium text-off-white">
                    <Camera size={16} aria-hidden /> Fotografieren
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => addPhotos(e.target.files)}
                    />
                  </label>
                  <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-anthracite/20 px-5 py-3 text-sm font-medium text-graphite">
                    <Upload size={16} aria-hidden /> Datei wählen
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => addPhotos(e.target.files)}
                    />
                  </label>
                </div>
              </div>

              {photos.length > 0 && (
                <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {photos.map((p) => (
                    <div key={p.id} className="group relative aspect-square overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.previewUrl}
                        alt={`Hochgeladenes Baustellenfoto: ${p.file.name}`}
                        className="h-full w-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(p.id)}
                        className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-off-white"
                        aria-label="Foto entfernen"
                      >
                        <X size={14} aria-hidden />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-graphite mb-6">
                Ihre Kontaktdaten
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name*"
                  autoComplete="name"
                  className="w-full rounded-xl border border-anthracite/15 bg-off-white px-4 py-4 outline-none focus:border-accent"
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Telefon"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-anthracite/15 bg-off-white px-4 py-4 outline-none focus:border-accent"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-Mail"
                    autoComplete="email"
                    className="w-full rounded-xl border border-anthracite/15 bg-off-white px-4 py-4 outline-none focus:border-accent"
                  />
                </div>
                <p className="text-xs text-anthracite/50">*Pflichtfeld. Telefon oder E-Mail erforderlich.</p>
              </div>
            </div>
          )}

          {stepError && (
            <p className="mt-4 flex items-center gap-2 text-sm text-accent-dark" role="alert">
              <AlertCircle size={16} aria-hidden /> {stepError}
            </p>
          )}
          {status === "error" && serverError && (
            <p className="mt-4 flex items-center gap-2 text-sm text-accent-dark" role="alert">
              <AlertCircle size={16} aria-hidden /> {serverError}. Sie erreichen uns auch direkt
              unter {COMPANY.phone}.
            </p>
          )}

          <div className="mt-10 flex items-center justify-between">
            <button
              type="button"
              onClick={back}
              disabled={step === 0 || status === "submitting"}
              className="inline-flex items-center gap-2 text-sm font-medium text-anthracite/60 disabled:opacity-0"
            >
              <ArrowLeft size={16} aria-hidden /> Zurück
            </button>
            <Button onClick={next} disabled={status === "submitting"} magnetic={false}>
              {status === "submitting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden /> Wird gesendet…
                </>
              ) : step === TOTAL_STEPS - 1 ? (
                <>
                  Projekt kostenlos prüfen lassen <ArrowRight size={16} aria-hidden />
                </>
              ) : (
                <>
                  Weiter <ArrowRight size={16} aria-hidden />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      <p className="mt-6 flex items-center gap-2 text-xs text-anthracite/40">
        <Phone size={12} aria-hidden /> Lieber direkt sprechen? {COMPANY.phone}
      </p>
    </div>
  );
}
