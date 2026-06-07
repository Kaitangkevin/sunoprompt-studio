import type { InstrumentGroup, QuickTemplate, SongForm } from "@/types/prompt";

export const STORAGE_KEY = "sunoprompt-studio-form-v2";

export const creatorName = "Kai Tang / Kaitangkevin";

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
  "Love",
  "Heartbreak",
  "Country Life",
  "City Night",
  "Game Montage",
  "Travel",
  "Motivation",
  "Loneliness",
  "Memories",
  "Friendship"
];

export const moodOptions = [
  "Happy",
  "Sad",
  "Lonely",
  "Romantic",
  "Gentle",
  "Passionate",
  "High-energy",
  "Healing",
  "Dark",
  "Dreamy",
  "Nostalgic",
  "Tense",
  "Free",
  "Epic",
  "Cinematic",
  "Laid-back"
];

export const languageOptions = [
  "English",
  "Chinese (Mandarin)",
  "Japanese",
  "Korean",
  "Spanish",
  "French",
  "Custom Language"
];

export const structureOptions = [
  "Verse + Chorus",
  "Verse + Pre-Chorus + Chorus",
  "Verse + Chorus + Bridge",
  "Intro + Verse + Chorus + Bridge + Outro",
  "Rap Verse + Hook",
  "Intro + Verse 1 + Pre-Chorus + Chorus + Verse 2 + Bridge + Final Chorus + Outro",
  "Custom Structure"
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

export const accentOptions = ["American English", "British English", "Chinese Mandarin", "Japanese", "Korean", "Custom"];

export const tempoOptions = ["Slow", "Medium", "Fast", "Very Fast"];

export const bpmOptions = ["60-80 BPM", "80-100 BPM", "100-120 BPM", "120-140 BPM", "140+ BPM", "Custom BPM"];

export const quickTemplates: QuickTemplate[] = [
  {
    name: "High-energy Game Montage",
    description: "Fast, aggressive, and built for highlight clips, battles, and esports edits.",
    values: {
      theme: "Game Montage",
      story: "A player rises from a losing position and lands the decisive play in the final moment.",
      message: "No surrender, peak focus, and the rush of winning under pressure.",
      scene: "Gaming highlights, short-form edits, esports intros",
      moods: ["Passionate", "High-energy", "Epic", "Cinematic"],
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
    name: "Sad English Love Song",
    description: "Natural English lyrics, soft vocals, and a rainy late-night heartbreak mood.",
    values: {
      theme: "Heartbreak",
      story: "Someone remembers a relationship that has ended on a rainy night, still loving but finally letting go.",
      message: "The love was real, and so is the goodbye.",
      scene: "Late-night playlists, emotional videos, breakup edits",
      moods: ["Sad", "Lonely", "Gentle", "Nostalgic"],
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
    name: "Country R&B",
    description: "Small-town storytelling with a modern R&B groove.",
    values: {
      theme: "Country Life",
      story: "A summer evening drive through a small town brings back old friends and words left unsaid.",
      message: "Freedom, regret, and tenderness inside a simple life.",
      scene: "Road trips, sunset vlogs, warm lifestyle videos",
      moods: ["Free", "Laid-back", "Nostalgic", "Gentle"],
      lyricLanguage: "English",
      styles: ["Country", "R&B", "Soul"],
      instruments: ["Acoustic Guitar", "Bass Guitar", "Drum Kit", "Rhodes"],
      vocals: ["Male Vocal", "Soft Vocal"],
      tempo: "Medium",
      bpmRange: "80-100 BPM"
    }
  },
  {
    name: "Cyberpunk Electronic Music",
    description: "Neon city atmosphere, cold synths, and futuristic cinematic tension.",
    values: {
      theme: "City Night",
      story: "A lonely person searches for a real heartbeat inside a neon city and digital rain.",
      message: "The colder the technology becomes, the more human feeling matters.",
      scene: "Sci-fi shorts, night city edits, cyberpunk trailers",
      moods: ["Dark", "Dreamy", "Cinematic", "Lonely"],
      lyricLanguage: "English",
      styles: ["Cyberpunk", "Synthwave", "EDM"],
      instruments: ["Synthesizer", "Synth Bass", "Pad", "Glitch Effects", "Arpeggiator"],
      vocals: ["Whisper Vocal", "Emotional Vocal"],
      tempo: "Medium",
      bpmRange: "100-120 BPM"
    }
  },
  {
    name: "Healing Chinese Pop Song",
    description: "Warm Mandarin pop with gentle vocals and cinematic daily-life imagery.",
    values: {
      theme: "Healing",
      story: "After work, someone sees the sunset and realizes ordinary life can still hold quiet hope.",
      message: "Take it slowly; every tired moment can be softened by the evening wind.",
      scene: "Lifestyle vlogs, cozy videos, healing short films",
      moods: ["Healing", "Gentle", "Laid-back", "Happy"],
      lyricLanguage: "Chinese (Mandarin)",
      requiredWords: "evening wind, streetlight, take it slowly",
      styles: ["Chinese Pop", "Folk", "Pop"],
      instruments: ["Acoustic Guitar", "Piano", "Pad", "Bass Guitar"],
      vocals: ["Female Vocal", "Soft Vocal"],
      accent: "Chinese Mandarin",
      tempo: "Medium",
      bpmRange: "80-100 BPM"
    }
  },
  {
    name: "Travel Vlog BGM",
    description: "Bright, easygoing, and useful for scenery shots and smooth transitions.",
    values: {
      theme: "Travel",
      story: "A journey starts in the morning and ends by a new coastline at sunset.",
      message: "Turn daily life into an adventure.",
      scene: "Travel vlogs, drone shots, short-form transitions",
      moods: ["Happy", "Free", "Laid-back", "Dreamy"],
      lyricLanguage: "English",
      styles: ["Pop", "House", "Afrobeat"],
      instruments: ["Electric Piano", "Drum Kit", "Pluck Synth", "Vocal Chop", "Ambient Texture"],
      vocals: ["Group Vocal", "Soft Vocal"],
      tempo: "Fast",
      bpmRange: "120-140 BPM"
    }
  },
  {
    name: "Instrumental Game BGM",
    description: "No lyrics, loop-friendly, and designed for immersive game scenes.",
    values: {
      theme: "Game Montage",
      story: "The listener enters a mysterious map, explores ancient ruins, and feels the rhythm slowly intensify.",
      message: "Adventure, mystery, and immersion.",
      scene: "Game levels, livestream background music, fantasy exploration",
      moods: ["Epic", "Cinematic", "Dreamy", "Dark"],
      lyricLanguage: "English",
      styles: ["Game Music", "Orchestral", "Cinematic"],
      instruments: ["Full Strings", "Choir", "Cinematic Percussion", "Woodwinds", "Harp"],
      vocals: ["No Vocal / Instrumental"],
      tempo: "Medium",
      bpmRange: "100-120 BPM"
    }
  }
];
