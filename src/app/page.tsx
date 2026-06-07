"use client";

import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  accentOptions,
  bpmOptions,
  defaultForm,
  instrumentGroups,
  languageOptions,
  moodOptions,
  quickTemplates,
  STORAGE_KEY,
  structureOptions,
  styleOptions,
  tempoOptions,
  themeOptions,
  vocalOptions
} from "@/lib/data";
import { buildPrompt } from "@/lib/prompt";
import type { SongForm } from "@/types/prompt";

type Step = {
  title: string;
  kicker: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "Song Basics",
    kicker: "Step 1",
    description: "Start with the theme, story, core message, and best use case."
  },
  {
    title: "Lyric Mood",
    kicker: "Step 2",
    description: "Choose one or more moods to shape the language and atmosphere."
  },
  {
    title: "Lyric Language",
    kicker: "Step 3",
    description: "Choose the lyric language and add language-specific writing guidance."
  },
  {
    title: "Song Structure",
    kicker: "Step 4",
    description: "Select a section layout. The default works well for a complete pop song."
  },
  {
    title: "Required Words",
    kicker: "Step 5",
    description: "Add names, phrases, keywords, or branded terms that must appear naturally."
  },
  {
    title: "Music Style",
    kicker: "Step 6",
    description: "Select one or more styles to guide the Suno Style Prompt."
  },
  {
    title: "Instruments",
    kicker: "Step 7",
    description: "Choose instruments and sound design elements by category."
  },
  {
    title: "Vocal Direction",
    kicker: "Step 8",
    description: "Set the vocal type, singing language, and accent direction."
  },
  {
    title: "Tempo and Speed",
    kicker: "Step 9",
    description: "Choose the energy level and BPM range."
  },
  {
    title: "Final Prompt",
    kicker: "Step 10",
    description: "Review the complete prompt and copy it into ChatGPT."
  }
];

const mergeUnique = (current: string[], value: string) => {
  if (current.includes(value)) {
    return current.filter((item) => item !== value);
  }

  return [...current, value];
};

export default function Home() {
  const [form, setForm] = useState<SongForm>(defaultForm);
  const [stepIndex, setStepIndex] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setForm({ ...defaultForm, ...JSON.parse(saved) });
      } catch {
        setForm(defaultForm);
      }
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    }
  }, [form, loaded]);

  const prompt = useMemo(() => buildPrompt(form), [form]);
  const progress = ((stepIndex + 1) / steps.length) * 100;
  const currentStep = steps[stepIndex];

  const updateForm = <Key extends keyof SongForm>(key: Key, value: SongForm[Key]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const toggleListValue = (key: "moods" | "styles" | "instruments" | "vocals", value: string) => {
    setForm((current) => ({ ...current, [key]: mergeUnique(current[key], value) }));
  };

  const applyTemplate = (values: Partial<SongForm>) => {
    setForm((current) => ({ ...current, ...values }));
    setStepIndex(9);
    setCopyState("idle");
  };

  const resetAll = () => {
    setForm(defaultForm);
    setStepIndex(0);
    setCopyState("idle");
    window.localStorage.removeItem(STORAGE_KEY);
  };

  const copyPrompt = async () => {
    try {
      await copyText(prompt);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("failed");
      window.setTimeout(() => setCopyState("idle"), 2200);
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="flex flex-col gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-glow backdrop-blur md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex rounded-full border border-studio-cyan/30 bg-studio-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-studio-cyan">
              Prompt Builder for Suno AI
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">SunoPrompt Studio</h1>
            <p className="mt-3 text-base text-slate-300 sm:text-lg">
              Create better lyrics and style prompts for Suno AI Music.
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Build copy-ready song briefs for lyrics, style, vocals, instruments, mood, and arrangement.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-studio-panel/80 p-4 text-sm text-slate-300">
            <span className="block text-xs uppercase tracking-[0.2em] text-studio-gold">Creator</span>
            <span className="mt-1 block text-lg font-semibold text-white">{form.creator || "Kai Tang / Kaitangkevin"}</span>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="flex flex-col gap-5">
            <TemplatePanel onApply={applyTemplate} />

            <section className="rounded-lg border border-white/10 bg-studio-panel/90 p-5 shadow-glow">
              <div className="mb-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-studio-cyan">
                      {currentStep.kicker} / {steps.length}
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold text-white">{currentStep.title}</h2>
                    <p className="mt-1 text-sm text-slate-400">{currentStep.description}</p>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-slate-300">
                    {stepIndex + 1} / {steps.length}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-studio-cyan via-studio-pink to-studio-gold transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="min-h-[440px]">{renderStep(stepIndex, form, updateForm, toggleListValue)}</div>

              <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={() => setStepIndex((index) => Math.max(0, index - 1))}
                  disabled={stepIndex === 0}
                  className="rounded-lg border border-white/10 px-4 py-3 font-semibold text-slate-200 transition hover:border-studio-cyan/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Back
                </button>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={resetAll}
                    className="rounded-lg border border-white/10 px-4 py-3 font-semibold text-slate-300 transition hover:border-studio-pink/50 hover:text-white"
                  >
                    Reset
                  </button>
                  {stepIndex < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => setStepIndex((index) => Math.min(steps.length - 1, index + 1))}
                      className="rounded-lg bg-studio-cyan px-5 py-3 font-bold text-studio-ink transition hover:bg-white"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={copyPrompt}
                      className="rounded-lg bg-studio-gold px-5 py-3 font-bold text-studio-ink transition hover:bg-white"
                    >
                      {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy Failed" : "Copy Prompt"}
                    </button>
                  )}
                </div>
              </div>
            </section>
          </div>

          <PromptPreview prompt={prompt} copyState={copyState} onCopy={copyPrompt} />
        </section>
      </section>
    </main>
  );
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Some browsers deny Clipboard API access on localhost or embedded previews.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("Copy command failed");
  }
}

function TemplatePanel({ onApply }: { onApply: (values: Partial<SongForm>) => void }) {
  return (
    <section className="rounded-lg border border-white/10 bg-studio-panel/80 p-5">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Quick Templates</h2>
          <p className="text-sm text-slate-400">Click a template to fill in a complete creative direction.</p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {quickTemplates.map((template) => (
          <button
            key={template.name}
            type="button"
            onClick={() => onApply(template.values)}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-studio-cyan/50 hover:bg-studio-cyan/10"
          >
            <span className="block font-semibold text-white">{template.name}</span>
            <span className="mt-1 block text-sm leading-5 text-slate-400">{template.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function PromptPreview({
  prompt,
  copyState,
  onCopy
}: {
  prompt: string;
  copyState: "idle" | "copied" | "failed";
  onCopy: () => void;
}) {
  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <section className="rounded-lg border border-studio-cyan/20 bg-[#08111d]/95 p-5 shadow-glow">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Live Prompt Preview</h2>
            <p className="text-sm text-slate-400">Your draft is automatically saved in this browser.</p>
          </div>
          <button
            type="button"
            onClick={onCopy}
            className="rounded-lg border border-studio-cyan/40 px-3 py-2 text-sm font-semibold text-studio-cyan transition hover:bg-studio-cyan hover:text-studio-ink"
          >
            {copyState === "copied" ? "Copied" : copyState === "failed" ? "Failed" : "Copy"}
          </button>
        </div>
        <pre className="prompt-scroll max-h-[680px] overflow-auto whitespace-pre-wrap rounded-lg border border-white/10 bg-black/30 p-4 text-sm leading-6 text-slate-200">
          {prompt}
        </pre>
      </section>
    </aside>
  );
}

function renderStep(
  stepIndex: number,
  form: SongForm,
  updateForm: <Key extends keyof SongForm>(key: Key, value: SongForm[Key]) => void,
  toggleListValue: (key: "moods" | "styles" | "instruments" | "vocals", value: string) => void
) {
  switch (stepIndex) {
    case 0:
      return (
        <div className="space-y-5">
          <TextInput
            label="Creator"
            value={form.creator}
            placeholder="Example: Kai Tang / your name / studio name"
            onChange={(value) => updateForm("creator", value)}
          />
          <OptionGrid
            label="What do you want the song to be about?"
            options={themeOptions}
            selected={[form.theme].filter(Boolean)}
            onToggle={(value) => updateForm("theme", value)}
            single
          />
          <TextInput
            label="Custom theme"
            value={form.theme}
            placeholder="You can also type your own theme here"
            onChange={(value) => updateForm("theme", value)}
          />
          <TextArea
            label="Song story"
            value={form.story}
            placeholder="Example: Someone remembers a missed summer romance during a lonely city night."
            onChange={(value) => updateForm("story", value)}
          />
          <TextArea
            label="Core message"
            value={form.message}
            placeholder="Example: Regret is not failure; it means the love was real."
            onChange={(value) => updateForm("message", value)}
          />
          <TextInput
            label="Best use case or scene"
            value={form.scene}
            placeholder="Example: gaming edit, travel vlog, late-night playlist, short-form BGM"
            onChange={(value) => updateForm("scene", value)}
          />
        </div>
      );
    case 1:
      return (
        <OptionGrid
          label="Choose one or more lyric moods"
          options={moodOptions}
          selected={form.moods}
          onToggle={(value) => toggleListValue("moods", value)}
        />
      );
    case 2:
      return (
        <div className="space-y-5">
          <OptionGrid
            label="Choose the lyric language"
            options={languageOptions}
            selected={[form.lyricLanguage]}
            onToggle={(value) => updateForm("lyricLanguage", value)}
            single
          />
          {form.lyricLanguage === "Custom Language" ? (
            <TextInput
              label="Custom language"
              value={form.customLanguage}
              placeholder="Example: Italian / Thai / Cantonese"
              onChange={(value) => updateForm("customLanguage", value)}
            />
          ) : null}
          <GuidanceCard>
            English lyrics will be guided toward native, singable songwriting. Mandarin lyrics will be guided toward
            vivid imagery and natural phrasing.
          </GuidanceCard>
        </div>
      );
    case 3:
      return (
        <div className="space-y-5">
          <OptionGrid
            label="Choose the song structure"
            options={structureOptions}
            selected={[form.structure]}
            onToggle={(value) => updateForm("structure", value)}
            single
          />
          {form.structure === "Custom Structure" ? (
            <TextInput
              label="Custom structure"
              value={form.customStructure}
              placeholder="Example: Intro + Hook + Rap Verse + Hook + Outro"
              onChange={(value) => updateForm("customStructure", value)}
            />
          ) : null}
        </div>
      );
    case 4:
      return (
        <TextArea
          label="Required words or phrases"
          value={form.requiredWords}
          placeholder="Example: sugar rush, lonely night, PaJii, city lights, summer rain"
          onChange={(value) => updateForm("requiredWords", value)}
        />
      );
    case 5:
      return (
        <OptionGrid
          label="Choose one or more music styles"
          options={styleOptions}
          selected={form.styles}
          onToggle={(value) => toggleListValue("styles", value)}
        />
      );
    case 6:
      return (
        <div className="space-y-5">
          {instrumentGroups.map((group) => (
            <OptionGrid
              key={group.title}
              label={group.title}
              options={group.items}
              selected={form.instruments}
              onToggle={(value) => toggleListValue("instruments", value)}
              compact
            />
          ))}
        </div>
      );
    case 7:
      return (
        <div className="space-y-5">
          <OptionGrid
            label="Choose vocal types"
            options={vocalOptions}
            selected={form.vocals}
            onToggle={(value) => toggleListValue("vocals", value)}
          />
          <OptionGrid
            label="Choose singing language or accent"
            options={accentOptions}
            selected={[form.accent]}
            onToggle={(value) => updateForm("accent", value)}
            single
          />
          {form.accent === "Custom" ? (
            <TextInput
              label="Custom accent or singing language"
              value={form.customAccent}
              placeholder="Example: Cantonese, Southern American, French accent"
              onChange={(value) => updateForm("customAccent", value)}
            />
          ) : null}
        </div>
      );
    case 8:
      return (
        <div className="space-y-5">
          <OptionGrid
            label="Choose tempo"
            options={tempoOptions}
            selected={[form.tempo]}
            onToggle={(value) => updateForm("tempo", value)}
            single
          />
          <OptionGrid
            label="Choose BPM range"
            options={bpmOptions}
            selected={[form.bpmRange]}
            onToggle={(value) => updateForm("bpmRange", value)}
            single
          />
          {form.bpmRange === "Custom BPM" ? (
            <TextInput
              label="Custom BPM"
              value={form.customBpm}
              placeholder="Example: 92 BPM / 128 BPM / 90-105 BPM"
              onChange={(value) => updateForm("customBpm", value)}
            />
          ) : null}
        </div>
      );
    default:
      return (
        <div className="space-y-5">
          <GuidanceCard>
            The full prompt is ready in the preview panel. You can go back to refine details or copy it into ChatGPT.
          </GuidanceCard>
          <div className="grid gap-3 sm:grid-cols-2">
            <SummaryItem label="Theme" value={form.theme} />
            <SummaryItem label="Language" value={form.lyricLanguage} />
            <SummaryItem label="Styles" value={form.styles.join(", ")} />
            <SummaryItem label="Instruments" value={form.instruments.join(", ")} />
            <SummaryItem label="Vocals" value={form.vocals.join(", ")} />
            <SummaryItem label="Speed" value={`${form.tempo} / ${form.bpmRange}`} />
          </div>
        </div>
      );
  }
}

function OptionGrid({
  label,
  options,
  selected,
  onToggle,
  single = false,
  compact = false
}: {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
  single?: boolean;
  compact?: boolean;
}) {
  return (
    <div>
      <label className="mb-3 block text-sm font-semibold text-slate-200">{label}</label>
      <div className={clsx("grid gap-2", compact ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 md:grid-cols-3")}>
        {options.map((option) => {
          const active = selected.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              aria-pressed={active}
              className={clsx(
                "rounded-lg border px-3 py-2 text-left text-sm font-semibold transition",
                active
                  ? "border-studio-cyan bg-studio-cyan text-studio-ink"
                  : "border-white/10 bg-white/[0.04] text-slate-300 hover:border-studio-cyan/50 hover:text-white",
                single && "text-center"
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TextInput({
  label,
  value,
  placeholder,
  onChange
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-200">{label}</span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-studio-cyan focus:ring-2 focus:ring-studio-cyan/20"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  placeholder,
  onChange
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-200">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        rows={5}
        className="w-full resize-y rounded-lg border border-white/10 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-studio-cyan focus:ring-2 focus:ring-studio-cyan/20"
      />
    </label>
  );
}

function GuidanceCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-studio-gold/20 bg-studio-gold/10 p-4 text-sm leading-6 text-studio-gold">
      {children}
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <span className="block text-xs uppercase tracking-[0.18em] text-slate-500">{label}</span>
      <span className="mt-2 block min-h-6 text-sm text-slate-200">{value || "Not provided"}</span>
    </div>
  );
}
