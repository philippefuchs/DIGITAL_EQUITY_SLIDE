# McKinsey Strategy Visualizer

AI-powered strategy deck generator with McKinsey-style visualizations.

## 🚀 Quick Start

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

3. Run development server:
```bash
npm run dev
```

4. Open http://localhost:3000

### Build for Production

```bash
npm run build
npm run preview
```

## 📦 Deployment

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/mckinsey-strategy-visualizer)

**Important**: Add `VITE_GEMINI_API_KEY` environment variable in Vercel dashboard.

## 🔑 Environment Variables

- `VITE_GEMINI_API_KEY`: Your Google Generative AI API key ([Get one here](https://aistudio.google.com/apikey))

## 📚 Features

- ✨ AI-powered slide generation using Gemini
- 🎨 McKinsey-style professional templates
- 🖼️ Automatic image generation for each slide
- 📄 PDF export functionality
- 🎯 Digital Equity branding

## 🛠️ Tech Stack

- React 19.2.3
- TypeScript 5.8.2
- Vite 6.2.0
- Google Generative AI SDK
- TailwindCSS

## 📖 Usage

1. Enter your transformation goal in the prompt area
2. Click the lightning bolt button ⚡
3. Wait 30-60 seconds for AI to generate 5 slides
4. Export to PDF using the export button

## 🔒 Security

Your API key is exposed client-side. To secure it:

1. Add HTTP referrer restrictions in [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Limit to your domain: `https://your-domain.vercel.app/*`
3. Set API quotas to prevent abuse

## 📝 License

Private - All rights reserved
