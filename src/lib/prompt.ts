import type { SongForm } from "@/types/prompt";

const fallback = (value: string | string[], empty = "未填写") => {
  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : empty;
  }

  return value.trim() || empty;
};

export const getLyricLanguage = (form: SongForm) => {
  return form.lyricLanguage === "自定义语言" ? fallback(form.customLanguage, "自定义语言") : form.lyricLanguage;
};

export const getStructure = (form: SongForm) => {
  return form.structure === "自定义结构" ? fallback(form.customStructure, "自定义结构") : form.structure;
};

export const getAccent = (form: SongForm) => {
  return form.accent === "自定义" ? fallback(form.customAccent, "自定义口音/语言") : form.accent;
};

export const getBpm = (form: SongForm) => {
  return form.bpmRange === "自定义 BPM" ? fallback(form.customBpm, "自定义 BPM") : form.bpmRange;
};

const languageGuidance = (language: string) => {
  if (language === "English") {
    return "- 如果是英文歌，歌词要使用自然、适合真实演唱的英语母语表达，不要写成作文或直译句子。";
  }

  if (language === "中文") {
    return "- 如果是中文歌，歌词要有画面感、口语自然、有旋律感，不要太书面化。";
  }

  return "- 歌词语言需要符合该语言真实歌曲的表达习惯，避免翻译腔。";
};

export const buildPrompt = (form: SongForm) => {
  const language = getLyricLanguage(form);
  const structure = getStructure(form);
  const accent = getAccent(form);
  const bpm = getBpm(form);

  return `请你根据以下信息，帮我创作一首适合 Suno AI 生成音乐的歌曲内容。

Creator：
${fallback(form.creator)}

歌曲主题：
${fallback(form.theme)}

歌曲故事：
${fallback(form.story)}

想表达的核心内容：
${fallback(form.message)}

歌曲适合的场景：
${fallback(form.scene)}

歌曲情绪：
${fallback(form.moods)}

歌词语言：
${language}

歌曲结构：
${structure}

必须出现的词：
${fallback(form.requiredWords)}

音乐风格：
${fallback(form.styles)}

乐器选择：
${fallback(form.instruments)}

演唱方式：
${fallback(form.vocals)}

演唱语言和口音：
${accent}

节奏速度：
${fallback(form.tempo)} / ${bpm}

请你输出以下内容：

1. 完整歌词 Lyrics
2. 适合 Suno 的 Style Prompt
3. 歌曲结构说明
4. 演唱方式说明
5. 乐器和编曲说明
6. 适合直接粘贴到 Suno 的内容

额外要求：

- 歌词要自然，适合真实演唱，不要像作文。
${languageGuidance(language)}
- 必须出现的词要自然融入歌词，不要生硬堆砌。
- Style Prompt 必须控制在 1000 个字符以内。
- Style Prompt 要清楚描述音乐风格、节奏、乐器、情绪、演唱方式和声音质感。
- Style 里要尽量使用 Suno 容易理解的音乐描述词。
- Style 需要帮助 Suno 更准确生成清晰的人声、明确的编曲和稳定的音乐结构。
- 请分别输出「Lyrics」和「Style」两个部分，方便我直接复制到 Suno。`;
};
