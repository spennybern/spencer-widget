# Spencer AI Widget

A voice-powered AI widget that lets people talk to Spencer - Territory Builder, Reaches CEOs Cold across EMEA, APAC, and MEA.

## Quick Start

### Prerequisites
- GitHub account
- Vercel account (free)
- Claude API key (from https://console.anthropic.com)

### Deployment Steps

#### 1. Push to GitHub

```bash
# Clone this project locally (or recreate files)
cd spencer-widget

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/spencer-widget.git
git branch -M main
git push -u origin main
```

#### 2. Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Select "Import Git Repository"
4. Find and select `spencer-widget`
5. Click "Import"
6. In Environment Variables, add:
   - **Name:** `CLAUDE_API_KEY`
   - **Value:** Your Claude API key
7. Click "Deploy"

**That's it!** You'll get a live URL in 2-3 minutes.

## Features

- 🎤 Voice input (speech recognition)
- 💬 Real-time chat with Spencer AI
- 🌍 Positioned for EMEA, APAC, MEA markets
- 📱 Mobile responsive
- 🔒 API key secured on backend

## What Spencer Knows

- 23+ years enterprise sales across EMEA, APAC, MEA
- Territory building from zero (no relationships needed)
- Reaching CEOs cold
- Built $14M Chubb deal (UK), $125M Del Monte deal (Asia)
- Top 1% at Cisco with 375% market share improvement
- 30 years Muay Thai - discipline, heart, resilience

## File Structure

```
spencer-widget/
├── app/
│   ├── components/
│   │   └── SpencerWidget.tsx
│   ├── api/
│   │   └── chat/
│   │       └── route.ts
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── package.json
├── next.config.js
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── .gitignore
```

## Environment Variables

Create a `.env.local` file (for local development):

```
CLAUDE_API_KEY=your_api_key_here
```

For Vercel, add via Settings → Environment Variables.

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

## Testing

1. Click the chat button (bottom right)
2. Click "Speak"
3. Say something like:
   - "Have you sold in Europe?"
   - "Can you help us build a territory in MEA?"
   - "Tell me about your experience with financial services"

Spencer will respond with authentic personality and real experience.

## Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Claude API** - AI responses
- **Web Speech API** - Voice recognition
- **Vercel** - Hosting

## License

MIT

---

**Built with Spencer's actual sales background and philosophy. Zero relationships = Territory builder mentality.**
