# Hosting Guide for Tendas Mozambique Website

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Run the development server: `npm run dev`
5. Open http://localhost:5173 in your browser

## Building for Production

```bash
npm run build
```

This will create a `dist` folder with all the static files needed for hosting.

## Testing Production Build Locally

```bash
node server.js
```

This will serve your production build on http://localhost:3000

## Hosting Options

### Vercel (Recommended)

1. Create an account on [Vercel](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project directory and follow the prompts
4. Set environment variables in the Vercel dashboard

### Netlify

1. Create an account on [Netlify](https://netlify.com)
2. Drag and drop the `dist` folder to Netlify or use their CLI
3. Set environment variables in the Netlify dashboard

### Traditional Hosting

1. Upload the contents of the `dist` folder to your web server
2. Configure your server to handle SPA routing (redirect all requests to index.html)

## Important Notes

- Make sure to set up your Supabase environment variables on your hosting provider
- For proper routing, configure your server to redirect all requests to index.html
- The site uses client-side routing, so a 404 page configuration is necessary
