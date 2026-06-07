# SunoPrompt Studio

SunoPrompt Studio is a step-by-step prompt builder for Suno AI music creators. It helps users turn raw song ideas into structured prompts for lyrics, music style, vocals, instruments, mood, and arrangement.

中文说明：这是一个面向 Suno AI 音乐创作者的网页工具。用户通过一步步回答问题，选择歌曲内容、情绪、语言、风格、乐器、演唱方式和特殊要求，最后生成一段可以直接复制给 ChatGPT 的完整 prompt。

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

- 高燃游戏剪辑歌曲
- 悲伤英文情歌
- 乡村 R&B
- 赛博朋克电子音乐
- 中文治愈流行歌
- 旅行 Vlog BGM
- 纯音乐游戏 BGM

## Future Ideas

- Connect OpenAI API to generate lyrics and style directly
- Add Suno Style character counter
- Add lyric length controls
- Add bilingual lyric translation
- Add prompt history and favorites
- Add TXT export
- Add user login and cloud sync
- Add viral short-video music templates
