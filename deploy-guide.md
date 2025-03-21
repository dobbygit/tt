# Deployment Guide

## Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Supabase account with project set up

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Building for Production

1. Build the project:
   ```bash
   npm run build
   ```

2. Test the production build locally:
   ```bash
   node server.js
   ```

## Deployment Options

### Option 1: Vercel (Easiest)

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Set environment variables in the Vercel dashboard
4. Deploy

### Option 2: Netlify

1. Push your code to a GitHub repository
2. Connect your repository to Netlify
3. Set build command to `npm run build`
4. Set publish directory to `dist`
5. Set environment variables in the Netlify dashboard

### Option 3: Traditional Web Hosting

1. Build the project: `npm run build`
2. Upload the contents of the `dist` folder to your web server
3. Configure your server to redirect all requests to index.html

## Environment Variables

Make sure to set these environment variables on your hosting provider:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Troubleshooting

- If you see a blank page, check browser console for errors
- If API calls fail, verify your environment variables are set correctly
- For routing issues, ensure your server is configured to handle SPA routing
