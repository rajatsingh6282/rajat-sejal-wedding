# Rajat & Sejal — Wedding Website

Traditional red, ivory and gold wedding invitation website for 24 November 2026 in Surat.

## Included
- Live countdown to 24 November 2026 at 6:00 PM IST
- Wedding invitation and programme images
- Haldi, Mehendi and wedding schedule
- Google Maps search links for the wedding and family venue
- Native device sharing with WhatsApp fallback
- Responsive layout for mobile and desktop

## Run locally
Install Node.js (LTS), then from this folder run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually http://localhost:5173.

## Deploy to Vercel
1. Push this folder to a GitHub repository.
2. Import the repository at https://vercel.com/new.
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
4. Deploy, then share the Vercel URL with guests.

## Update details
Edit `src/weddingConfig.js`. Venue links currently open Google Maps search results for the supplied venue names; verify the exact pin before sharing widely.
