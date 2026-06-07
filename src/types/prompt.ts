export type SongForm = {
  creator: string;
  theme: string;
  story: string;
  message: string;
  scene: string;
  moods: string[];
  lyricLanguage: string;
  customLanguage: string;
  structure: string;
  customStructure: string;
  requiredWords: string;
  styles: string[];
  instruments: string[];
  vocals: string[];
  accent: string;
  customAccent: string;
  tempo: string;
  bpmRange: string;
  customBpm: string;
};

export type QuickTemplate = {
  name: string;
  description: string;
  values: Partial<SongForm>;
};

export type InstrumentGroup = {
  title: string;
  items: string[];
};
