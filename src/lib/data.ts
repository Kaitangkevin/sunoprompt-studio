import type { InstrumentGroup, QuickTemplate, SongForm } from "@/types/prompt";

export const STORAGE_KEY = "sunoprompt-studio-form";

export const creatorName = "SunoPrompt Studio Creator";

export const defaultForm: SongForm = {
  creator: creatorName,
  theme: "",
  story: "",
  message: "",
  scene: "",
  moods: [],
  lyricLanguage: "English",
  customLanguage: "",
  structure: "Intro + Verse 1 + Pre-Chorus + Chorus + Verse 2 + Bridge + Final Chorus + Outro",
  customStructure: "",
  requiredWords: "",
  styles: [],
  instruments: [],
  vocals: [],
  accent: "American English",
  customAccent: "",
  tempo: "Medium",
  bpmRange: "100-120 BPM",
  customBpm: ""
};

export const themeOptions = [
  "爱情",
  "失恋",
  "乡村生活",
  "城市夜晚",
  "游戏剪辑",
  "旅行",
  "励志",
  "孤独",
  "回忆",
  "友情"
];

export const moodOptions = [
  "开心",
  "悲伤",
  "孤独",
  "浪漫",
  "温柔",
  "热血",
  "高燃",
  "治愈",
  "黑暗",
  "梦幻",
  "怀旧",
  "压抑",
  "自由",
  "史诗感",
  "电影感",
  "松弛感"
];

export const languageOptions = ["English", "中文", "日文", "韩文", "西班牙语", "法语", "自定义语言"];

export const structureOptions = [
  "Verse + Chorus",
  "Verse + Pre-Chorus + Chorus",
  "Verse + Chorus + Bridge",
  "Intro + Verse + Chorus + Bridge + Outro",
  "Rap Verse + Hook",
  "Intro + Verse 1 + Pre-Chorus + Chorus + Verse 2 + Bridge + Final Chorus + Outro",
  "自定义结构"
];

export const styleOptions = [
  "Pop",
  "R&B",
  "Hip-Hop",
  "Rap",
  "Country",
  "Rock",
  "Alternative",
  "EDM",
  "House",
  "Future Bass",
  "Trap",
  "Lo-fi",
  "Jazz",
  "Soul",
  "Funk",
  "Folk",
  "Cinematic",
  "Orchestral",
  "Synthwave",
  "Cyberpunk",
  "J-Pop",
  "K-Pop",
  "Chinese Pop",
  "Game Music",
  "Trailer Music",
  "Drill",
  "Phonk",
  "Reggaeton",
  "Afrobeat"
];

export const instrumentGroups: InstrumentGroup[] = [
  {
    title: "Keyboard",
    items: ["Piano", "Electric Piano", "Synthesizer", "Organ", "Rhodes", "Harpsichord"]
  },
  {
    title: "String Instruments",
    items: [
      "Acoustic Guitar",
      "Electric Guitar",
      "Bass Guitar",
      "Violin",
      "Viola",
      "Cello",
      "Double Bass",
      "Harp",
      "Erhu",
      "Guzheng",
      "Pipa"
    ]
  },
  {
    title: "Drums & Percussion",
    items: [
      "Drum Kit",
      "808 Drums",
      "Electronic Drums",
      "Snare",
      "Kick",
      "Hi-hat",
      "Toms",
      "Cymbals",
      "Cajon",
      "Conga",
      "Bongo",
      "Taiko Drum"
    ]
  },
  {
    title: "Wind Instruments",
    items: ["Flute", "Clarinet", "Saxophone", "Trumpet", "Trombone", "French Horn", "Harmonica", "Pan Flute"]
  },
  {
    title: "Electronic Sounds",
    items: [
      "Synth Bass",
      "Pad",
      "Arpeggiator",
      "Pluck Synth",
      "Lead Synth",
      "Sub Bass",
      "Vocal Chop",
      "Ambient Texture",
      "Glitch Effects",
      "Risers",
      "Impacts"
    ]
  },
  {
    title: "Orchestral",
    items: ["Full Strings", "Brass Section", "Woodwinds", "Choir", "Cinematic Percussion", "Orchestra Hits"]
  }
];

export const vocalOptions = [
  "Male Vocal",
  "Female Vocal",
  "Duet",
  "Group Vocal",
  "Soft Vocal",
  "Powerful Vocal",
  "Whisper Vocal",
  "Emotional Vocal",
  "Rap Vocal",
  "Melodic Rap",
  "Choir Vocal",
  "No Vocal / Instrumental"
];

export const accentOptions = ["American English", "British English", "Chinese Mandarin", "Japanese", "Korean", "自定义"];

export const tempoOptions = ["Slow", "Medium", "Fast", "Very Fast"];

export const bpmOptions = ["60-80 BPM", "80-100 BPM", "100-120 BPM", "120-140 BPM", "140+ BPM", "自定义 BPM"];

export const quickTemplates: QuickTemplate[] = [
  {
    name: "高燃游戏剪辑歌曲",
    description: "快节奏、强鼓点、适合击杀集锦和热血剪辑。",
    values: {
      theme: "游戏剪辑",
      story: "主角从低谷一路反击，在关键时刻打出高光操作。",
      message: "不服输、爆发、胜利前的最后一秒。",
      scene: "游戏高光剪辑、短视频开场、电竞宣传片",
      moods: ["热血", "高燃", "史诗感", "电影感"],
      lyricLanguage: "English",
      structure: "Rap Verse + Hook",
      requiredWords: "last shot, power up, no surrender",
      styles: ["Trap", "EDM", "Trailer Music", "Game Music"],
      instruments: ["808 Drums", "Synth Bass", "Risers", "Impacts", "Lead Synth"],
      vocals: ["Powerful Vocal", "Rap Vocal"],
      tempo: "Fast",
      bpmRange: "140+ BPM"
    }
  },
  {
    name: "悲伤英文情歌",
    description: "自然英文歌词、柔和人声、夜晚失恋氛围。",
    values: {
      theme: "失恋",
      story: "一个人在雨夜回想已经结束的关系，舍不得却必须放手。",
      message: "爱过是真的，离开也是真的。",
      scene: "深夜独处、情绪短片、失恋歌单",
      moods: ["悲伤", "孤独", "温柔", "怀旧"],
      lyricLanguage: "English",
      requiredWords: "lonely night, city lights, almost home",
      styles: ["Pop", "R&B", "Lo-fi"],
      instruments: ["Piano", "Electric Piano", "Pad", "Ambient Texture"],
      vocals: ["Female Vocal", "Soft Vocal", "Emotional Vocal"],
      tempo: "Slow",
      bpmRange: "60-80 BPM"
    }
  },
  {
    name: "乡村 R&B",
    description: "乡村故事感加现代 R&B groove。",
    values: {
      theme: "乡村生活",
      story: "夏天傍晚在小镇路边开车，想起旧朋友和没说出口的话。",
      message: "简单生活里的自由、遗憾和温柔。",
      scene: "公路旅行、夕阳 Vlog、轻松短片",
      moods: ["自由", "松弛感", "怀旧", "温柔"],
      lyricLanguage: "English",
      styles: ["Country", "R&B", "Soul"],
      instruments: ["Acoustic Guitar", "Bass Guitar", "Drum Kit", "Rhodes"],
      vocals: ["Male Vocal", "Soft Vocal"],
      tempo: "Medium",
      bpmRange: "80-100 BPM"
    }
  },
  {
    name: "赛博朋克电子音乐",
    description: "霓虹城市、冷感合成器、未来电影氛围。",
    values: {
      theme: "城市夜晚",
      story: "霓虹城市里的人在数字雨中寻找真实的心跳。",
      message: "科技越冷，越想证明自己还活着。",
      scene: "科幻短片、城市夜景、赛博朋克混剪",
      moods: ["黑暗", "梦幻", "电影感", "孤独"],
      lyricLanguage: "English",
      styles: ["Cyberpunk", "Synthwave", "EDM"],
      instruments: ["Synthesizer", "Synth Bass", "Pad", "Glitch Effects", "Arpeggiator"],
      vocals: ["Whisper Vocal", "Emotional Vocal"],
      tempo: "Medium",
      bpmRange: "100-120 BPM"
    }
  },
  {
    name: "中文治愈流行歌",
    description: "中文画面感歌词、温柔旋律、适合日常视频。",
    values: {
      theme: "治愈",
      story: "下班路上看到晚霞，忽然觉得生活虽然普通但还有期待。",
      message: "慢慢来，所有疲惫都会被晚风接住。",
      scene: "生活 Vlog、治愈短片、朋友圈配乐",
      moods: ["治愈", "温柔", "松弛感", "开心"],
      lyricLanguage: "中文",
      requiredWords: "晚风, 路灯, 慢慢来",
      styles: ["Chinese Pop", "Folk", "Pop"],
      instruments: ["Acoustic Guitar", "Piano", "Pad", "Bass Guitar"],
      vocals: ["Female Vocal", "Soft Vocal"],
      accent: "Chinese Mandarin",
      tempo: "Medium",
      bpmRange: "80-100 BPM"
    }
  },
  {
    name: "旅行 Vlog BGM",
    description: "轻快、无负担、适合转场和风景镜头。",
    values: {
      theme: "旅行",
      story: "从清晨出发到日落抵达陌生海边，一路都是新鲜感。",
      message: "把生活调成冒险模式。",
      scene: "旅行 Vlog、航拍、短视频转场",
      moods: ["开心", "自由", "松弛感", "梦幻"],
      lyricLanguage: "English",
      styles: ["Pop", "House", "Afrobeat"],
      instruments: ["Electric Piano", "Drum Kit", "Pluck Synth", "Vocal Chop", "Ambient Texture"],
      vocals: ["Group Vocal", "Soft Vocal"],
      tempo: "Fast",
      bpmRange: "120-140 BPM"
    }
  },
  {
    name: "纯音乐游戏 BGM",
    description: "无歌词、循环友好、适合作为游戏场景音乐。",
    values: {
      theme: "游戏剪辑",
      story: "进入神秘地图，探索未知遗迹，节奏逐渐推进。",
      message: "冒险、未知、沉浸感。",
      scene: "游戏关卡、直播背景、幻想世界探索",
      moods: ["史诗感", "电影感", "梦幻", "黑暗"],
      lyricLanguage: "English",
      styles: ["Game Music", "Orchestral", "Cinematic"],
      instruments: ["Full Strings", "Choir", "Cinematic Percussion", "Woodwinds", "Harp"],
      vocals: ["No Vocal / Instrumental"],
      tempo: "Medium",
      bpmRange: "100-120 BPM"
    }
  }
];
