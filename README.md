# Owlendev 🦉

A clearer way to build software.

Static marketing site for Owlendev. Plain HTML/CSS/JS, no build step, ready for GitHub Pages.

## Structure

```
index.html                    The whole site (single page)
assets/style.css              Styles and light/dark theme tokens
assets/main.js                Theme toggle, mobile menu, owl eyes, starfield
assets/owl.svg                Logo / favicon
assets/fonts/                 Self-hosted Inter & Fraunces (OFL), no third-party requests
.github/workflows/deploy.yml  Deploys to GitHub Pages on every push to main
```

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to GitHub Pages

Deployment is automatic via GitHub Actions.

1. Push this folder to a GitHub repo. Naming it `<org>.github.io` serves the site at `https://<org>.github.io/`.
2. One-time setup: repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Every push to `main` now publishes the site (progress shows in the **Actions** tab). You can also re-run it manually there.
4. Optional custom domain: add a `CNAME` file containing e.g. `owlendev.com` (the workflow publishes it) and configure DNS.

Only `index.html`, `assets/` and `CNAME` are published. The README and workflow stay in the repo only.

## Before launch

- Replace the placeholder email `hello@owlendev.com` in `index.html`.
- Review the product feature bullets so they match what each platform actually does.
