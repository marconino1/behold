# Google OAuth Setup Checklist

## Code changes (done)

- **Auth callback**: Added `x-forwarded-host` handling for production deployments behind a proxy (e.g. Vercel with custom domain).
- **LoginForm / SignupForm**: Already configured with correct `redirectTo` and bfcache fix for the Google button.

## Your end – things to verify

### 1. Supabase Dashboard → Redirect URLs

Go to **Authentication → URL Configuration → Redirect URLs**.

Ensure these URLs are in the list **exactly** as shown:

- `https://beholdcatholic.app/auth/callback`
- `http://localhost:3000/auth/callback` ← must include `http://`

If you have `localhost:3000/auth/callback` without `http://`, remove it and add `http://localhost:3000/auth/callback`.

### 2. Google Cloud Console → OAuth consent screen

Go to **APIs & Services → OAuth consent screen**.

- Click **Edit app**
- Open **Scopes**
- Click **Add or remove scopes**
- Add `openid` if it’s not already there
- Ensure `email` and `profile` (or `userinfo.email` and `userinfo.profile`) are present

### 3. Google Cloud Console → OAuth client

Go to **APIs & Services → Credentials** → your OAuth 2.0 Client ID.

**Authorized JavaScript origins:**

- `https://beholdcatholic.app`
- `http://localhost:3000`

**Authorized redirect URIs:**

- `https://cqodzfbrtqubfwwmszkk.supabase.co/auth/v1/callback` ← Supabase callback (required)
- `http://localhost:3000/auth/callback` ← only if you use Google’s redirect to your app directly; usually not needed for Supabase OAuth

For Supabase’s OAuth flow, Google redirects to the Supabase callback URL. Your app’s `/auth/callback` is where Supabase redirects after exchanging the code.

### 4. Supabase Dashboard → Google provider

Go to **Authentication → Providers → Google**.

- Enable **Sign in with Google**
- Set **Client ID** and **Client Secret** from Google Cloud Console
- Use the **Callback URL** shown there in Google’s Authorized redirect URIs

### 5. Environment variables

Your `.env.local` has:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

For production (e.g. Vercel), add the same variables in your hosting provider’s environment settings.

### 6. Supabase Site URL

Go to **Authentication → URL Configuration**.

- **Site URL**: set to `https://beholdcatholic.app` for production

---

## Quick test

1. Run locally: `npm run dev`
2. Open `http://localhost:3000/login`
3. Click **Continue with Google**
4. Sign in with Google
5. You should be redirected to `/dashboard`

If you land on the landing page or `/login`, check:

- Supabase Redirect URLs (including `http://` for localhost)
- Browser console and network tab for errors
- Supabase Dashboard → Logs for auth errors
