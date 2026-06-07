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
    title: "歌曲基本信息",
    kicker: "Step 1",
    description: "先把主题、故事、核心表达和使用场景搭起来。"
  },
  {
    title: "歌词情绪",
    kicker: "Step 2",
    description: "可以多选，情绪会影响歌词措辞和整体氛围。"
  },
  {
    title: "歌词语言",
    kicker: "Step 3",
    description: "选择歌词语言，并补充不同语言的写作要求。"
  },
  {
    title: "歌词结构",
    kicker: "Step 4",
    description: "选择歌曲段落结构，默认推荐适合完整流行歌。"
  },
  {
    title: "特殊词",
    kicker: "Step 5",
    description: "输入必须自然出现的词、名字、品牌词或关键短语。"
  },
  {
    title: "音乐风格",
    kicker: "Step 6",
    description: "多选风格，让 ChatGPT 更准确组合 Suno Style。"
  },
  {
    title: "乐器选择",
    kicker: "Step 7",
    description: "按分类选择乐器和声音元素。"
  },
  {
    title: "演唱方式",
    kicker: "Step 8",
    description: "配置人声类型、演唱语言和口音。"
  },
  {
    title: "节奏与速度",
    kicker: "Step 9",
    description: "设置歌曲速度与 BPM 范围。"
  },
  {
    title: "生成最终 Prompt",
    kicker: "Step 10",
    description: "检查完整 Prompt，然后一键复制给 ChatGPT。"
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
            <p className="mt-1 text-sm text-slate-400">一步步生成适合 Suno 的歌词与 Style Prompt。</p>
          </div>

          <div className="rounded-lg border border-white/10 bg-studio-panel/80 p-4 text-sm text-slate-300">
            <span className="block text-xs uppercase tracking-[0.2em] text-studio-gold">Creator</span>
            <span className="mt-1 block text-lg font-semibold text-white">{form.creator || "SunoPrompt Studio Creator"}</span>
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
          <h2 className="text-lg font-semibold text-white">快速模板</h2>
          <p className="text-sm text-slate-400">点击后会自动填充一组音乐创作方向。</p>
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
            <h2 className="text-lg font-semibold text-white">实时 Prompt 预览</h2>
            <p className="text-sm text-slate-400">刷新页面也会保留当前内容。</p>
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
            placeholder="例如：PaJii / 你的名字 / Studio 名称"
            onChange={(value) => updateForm("creator", value)}
          />
          <OptionGrid
            label="你想写一首关于什么的歌？"
            options={themeOptions}
            selected={[form.theme].filter(Boolean)}
            onToggle={(value) => updateForm("theme", value)}
            single
          />
          <TextInput
            label="自定义主题"
            value={form.theme}
            placeholder="也可以直接输入自己的主题"
            onChange={(value) => updateForm("theme", value)}
          />
          <TextArea
            label="歌曲故事"
            value={form.story}
            placeholder="例如：一个人在城市夜晚想起夏天错过的人。"
            onChange={(value) => updateForm("story", value)}
          />
          <TextArea
            label="想表达的核心内容"
            value={form.message}
            placeholder="例如：遗憾不是失败，而是曾经认真爱过。"
            onChange={(value) => updateForm("message", value)}
          />
          <TextInput
            label="歌曲适合的场景"
            value={form.scene}
            placeholder="例如：游戏剪辑、旅行 Vlog、深夜歌单、短视频 BGM"
            onChange={(value) => updateForm("scene", value)}
          />
        </div>
      );
    case 1:
      return (
        <OptionGrid
          label="选择歌词情绪，可以多选"
          options={moodOptions}
          selected={form.moods}
          onToggle={(value) => toggleListValue("moods", value)}
        />
      );
    case 2:
      return (
        <div className="space-y-5">
          <OptionGrid
            label="选择歌词语言"
            options={languageOptions}
            selected={[form.lyricLanguage]}
            onToggle={(value) => updateForm("lyricLanguage", value)}
            single
          />
          {form.lyricLanguage === "自定义语言" ? (
            <TextInput
              label="自定义语言"
              value={form.customLanguage}
              placeholder="例如：Italian / Thai / 粤语"
              onChange={(value) => updateForm("customLanguage", value)}
            />
          ) : null}
          <GuidanceCard>
            English 会要求 ChatGPT 写自然、适合演唱的英语歌词；中文会要求有画面感、不要太书面。
          </GuidanceCard>
        </div>
      );
    case 3:
      return (
        <div className="space-y-5">
          <OptionGrid
            label="选择歌曲结构"
            options={structureOptions}
            selected={[form.structure]}
            onToggle={(value) => updateForm("structure", value)}
            single
          />
          {form.structure === "自定义结构" ? (
            <TextInput
              label="自定义结构"
              value={form.customStructure}
              placeholder="例如：Intro + Hook + Rap Verse + Hook + Outro"
              onChange={(value) => updateForm("customStructure", value)}
            />
          ) : null}
        </div>
      );
    case 4:
      return (
        <TextArea
          label="必须出现的词"
          value={form.requiredWords}
          placeholder="例如：sugar rush, lonely night, PaJii, 猪里奥, city lights, summer rain"
          onChange={(value) => updateForm("requiredWords", value)}
        />
      );
    case 5:
      return (
        <OptionGrid
          label="选择音乐风格，可以多选"
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
            label="选择人声类型"
            options={vocalOptions}
            selected={form.vocals}
            onToggle={(value) => toggleListValue("vocals", value)}
          />
          <OptionGrid
            label="选择演唱语言和口音"
            options={accentOptions}
            selected={[form.accent]}
            onToggle={(value) => updateForm("accent", value)}
            single
          />
          {form.accent === "自定义" ? (
            <TextInput
              label="自定义口音 / 语言"
              value={form.customAccent}
              placeholder="例如：Cantonese, Southern American, French accent"
              onChange={(value) => updateForm("customAccent", value)}
            />
          ) : null}
        </div>
      );
    case 8:
      return (
        <div className="space-y-5">
          <OptionGrid
            label="选择节奏"
            options={tempoOptions}
            selected={[form.tempo]}
            onToggle={(value) => updateForm("tempo", value)}
            single
          />
          <OptionGrid
            label="选择 BPM 范围"
            options={bpmOptions}
            selected={[form.bpmRange]}
            onToggle={(value) => updateForm("bpmRange", value)}
            single
          />
          {form.bpmRange === "自定义 BPM" ? (
            <TextInput
              label="自定义 BPM"
              value={form.customBpm}
              placeholder="例如：92 BPM / 128 BPM / 90-105 BPM"
              onChange={(value) => updateForm("customBpm", value)}
            />
          ) : null}
        </div>
      );
    default:
      return (
        <div className="space-y-5">
          <GuidanceCard>
            完整 Prompt 已在右侧生成。你可以继续返回修改，也可以直接复制给 ChatGPT，让它输出 Lyrics 和 Style。
          </GuidanceCard>
          <div className="grid gap-3 sm:grid-cols-2">
            <SummaryItem label="主题" value={form.theme} />
            <SummaryItem label="语言" value={form.lyricLanguage} />
            <SummaryItem label="风格" value={form.styles.join(", ")} />
            <SummaryItem label="乐器" value={form.instruments.join(", ")} />
            <SummaryItem label="人声" value={form.vocals.join(", ")} />
            <SummaryItem label="速度" value={`${form.tempo} / ${form.bpmRange}`} />
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
      <span className="mt-2 block min-h-6 text-sm text-slate-200">{value || "未填写"}</span>
    </div>
  );
}
