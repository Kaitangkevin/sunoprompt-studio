# SunoPrompt Studio

SunoPrompt Studio is a step-by-step prompt builder for Suno AI music creators. It helps users turn raw song ideas into structured prompts for lyrics, music style, vocals, instruments, mood, and arrangement.

## Website

Visit the live site: [https://kaitangkevin.github.io/sunoprompt-studio/](https://kaitangkevin.github.io/sunoprompt-studio/)

## Creator

Default creator: `SunoPrompt Studio Creator`

The app includes a Creator field in Step 1 and displays it in the header. Users can edit it, and the final generated prompt will include the creator information.

## Highlights

- Step-by-step music prompt builder
- Lyrics requirement generator
- Suno Style prompt generator
- Instrument selection system
- Vocal style configuration
- Copy-ready ChatGPT prompt
- Local storage support
- Responsive dark UI
- Quick templates for common music scenarios
- Creator field and visible creator credit

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- React
- Local state with `useState`
- Browser `localStorage`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build for production:

```bash
npm run build
```

## Core Flow

1. Song basic information
2. Lyric mood
3. Lyric language
4. Song structure
5. Required words
6. Music style
7. Instruments
8. Vocal style and accent
9. Tempo and BPM
10. Final copy-ready prompt

## Quick Templates

The app includes templates for:

- High-energy game montage song
- Sad English love song
- Country R&B
- Cyberpunk electronic music
- Healing Chinese pop song
- Travel vlog BGM
- Instrumental game BGM

## Future Ideas

- Connect OpenAI API to generate lyrics and style directly
- Add Suno Style character counter
- Add lyric length controls
- Add bilingual lyric translation
- Add prompt history and favorites
- Add TXT export
- Add user login and cloud sync
- Add viral short-video music templates
