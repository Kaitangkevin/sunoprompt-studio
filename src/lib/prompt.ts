import type { SongForm } from "@/types/prompt";

const fallback = (value: string | string[], empty = "Not provided") => {
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : empty;
  }

  return value.trim() || empty;
};

export const getLyricLanguage = (form: SongForm) => {
  return form.lyricLanguage === "Custom Language" ? fallback(form.customLanguage, "Custom Language") : form.lyricLanguage;
};

export const getStructure = (form: SongForm) => {
  return form.structure === "Custom Structure" ? fallback(form.customStructure, "Custom Structure") : form.structure;
};

export const getAccent = (form: SongForm) => {
  return form.accent === "Custom" ? fallback(form.customAccent, "Custom accent or singing language") : form.accent;
};

export const getBpm = (form: SongForm) => {
  return form.bpmRange === "Custom BPM" ? fallback(form.customBpm, "Custom BPM") : form.bpmRange;
};

const languageGuidance = (language: string) => {
  if (language === "English") {
    return "- If the song is in English, write natural lyrics that sound like native English songwriting, not essay-like prose or literal translation.";
  }

  if (language === "Chinese (Mandarin)") {
    return "- If the song is in Mandarin Chinese, write vivid, singable, image-rich lyrics that feel natural and not overly formal.";
  }

  return "- Make the lyrics sound natural for the selected language and avoid translation-like phrasing.";
};

export const buildPrompt = (form: SongForm) => {
  const language = getLyricLanguage(form);
  const structure = getStructure(form);
  const accent = getAccent(form);
  const bpm = getBpm(form);

  return `Please create a complete song concept for Suno AI based on the information below.

Creator:
${fallback(form.creator)}

Song theme:
${fallback(form.theme)}

Song story:
${fallback(form.story)}

Core message:
${fallback(form.message)}

Best use case or scene:
${fallback(form.scene)}

Mood:
${fallback(form.moods)}

Lyric language:
${language}

Song structure:
${structure}

Required words or phrases:
${fallback(form.requiredWords)}

Music styles:
${fallback(form.styles)}

Instruments:
${fallback(form.instruments)}

Vocal direction:
${fallback(form.vocals)}

Singing language or accent:
${accent}

Tempo and BPM:
${fallback(form.tempo)} / ${bpm}

Please output:

1. Full lyrics
2. A Suno-ready Style Prompt
3. Song structure notes
4. Vocal performance notes
5. Instrumentation and arrangement notes
6. Copy-ready content suitable for Suno

Additional requirements:

- The lyrics must feel natural, singable, and suitable for a real song.
${languageGuidance(language)}
- Required words or phrases must be blended naturally into the lyrics, not forced into random lines.
- Keep the Style Prompt under 1000 characters.
- The Style Prompt must clearly describe genre, rhythm, instruments, mood, vocal delivery, and sonic texture.
- Use music description terms that Suno can understand easily.
- The Style Prompt should help Suno generate clear vocals, a stable arrangement, and a coherent song structure.
- Separate the final answer into clear "Lyrics" and "Style" sections so I can copy them into Suno directly.`;
};
