# Deployment: GitLab → GitHub mirror

This site deploys to **GitLab Pages** from GitLab CI and to **GitHub Pages** from GitHub Actions. Both can run in parallel when GitLab pushes to a GitHub mirror.

## URLs and base paths

| Platform                                         | Example URL                                          | Base path              |
| ------------------------------------------------ | ---------------------------------------------------- | ---------------------- |
| GitLab Pages                                     | `https://sboissel1.gitlab.io/sboissel-portfolio`     | `/sboissel-portfolio/` |
| GitHub Pages (project repo)                      | `https://<github-user>.github.io/sboissel-portfolio` | `/sboissel-portfolio/` |
| GitHub Pages (user site repo `<user>.github.io`) | `https://<github-user>.github.io`                    | `/`                    |
| Vercel                                           | `https://sboissel-portfolio.vercel.app`              | `/`                    |

Build-time URL/base are resolved automatically:

- **GitLab CI** (`.gitlab-ci.yml`): sets `SITE_URL` / `SITE_BASE` from `CI_PAGES_URL` or GitLab namespace variables.
- **GitHub Actions** (`.github/workflows/deploy-pages.yml`): `astro.config.mjs` reads `GITHUB_REPOSITORY` and `GITHUB_REPOSITORY_OWNER` when `GITHUB_ACTIONS=true`.
- **Fallback**: `src/config/site.toml` (`config.site.url`) is used for local builds and non-CI environments.

No manual `SITE_URL` / `SITE_BASE` overrides are required for either CI platform.

## 1. Create the GitHub repository

1. On GitHub, create a repository (e.g. `sboissel1/sboissel-portfolio`).
2. Leave it empty — do not add a README, `.gitignore`, or license (GitLab will push the full history).

## 2. Configure GitLab push mirror

In GitLab (`https://gitlab.com/sboissel1/sboissel-portfolio`):

1. Go to **Settings → Repository → Mirroring repositories**.
2. Under **Push to a remote repository**:
   - **Git repository URL**: `https://github.com/<github-user>/sboissel-portfolio.git`
   - **Mirror direction**: Push
   - **Authentication**: use a [GitHub personal access token](https://github.com/settings/tokens) (classic) with the `repo` scope, or a fine-grained token with **Contents: Read and write** on this repository.
   - Paste the token as the password (username is your GitHub username).
3. Enable **Only mirror protected branches** if you only want `main` mirrored.
4. Save and trigger **Update now** to verify the first push.

Alternative (SSH): use `git@github.com:<github-user>/sboissel-portfolio.git` with a deploy key added to the GitHub repo (**Settings → Deploy keys**, write access enabled).

## 3. Enable GitHub Pages

On the GitHub repository:

1. **Settings → Pages**
2. **Build and deployment → Source**: select **GitHub Actions** (not “Deploy from a branch”).
3. After the first successful workflow run on `main`, the site is published at:
   - `https://<github-user>.github.io/sboissel-portfolio/` (project page)
   - or `https://<github-user>.github.io/` if the repo is named `<github-user>.github.io`

## 4. Verify the pipeline

After mirroring:

1. Push to `main` on GitLab (or wait for the mirror interval).
2. On GitHub: **Actions → Deploy to GitHub Pages** — confirm build and deploy succeed.
3. Open the deployed URL and check navigation, assets, and search (Pagefind) under the subpath.

## Build requirements (both CI systems)

- Node.js 22+
- Bun (`bun install --frozen-lockfile`, `bun run build`)
- Python 3 with `fonttools` and `brotli` (font subsetting during build)

## Optional: custom domain on GitHub

1. Add a `CNAME` file or configure the domain under **Settings → Pages → Custom domain**.
2. Override build URL if needed by setting repository **Variables** (Settings → Secrets and variables → Actions → Variables):
   - `SITE_URL=https://your-domain.example`
   - `SITE_BASE=/` (or the subpath if applicable)

## Keeping GitLab as source of truth

Recommended workflow:

1. Commit and push to GitLab `main`.
2. GitLab CI deploys to GitLab Pages.
3. GitLab push mirror syncs to GitHub.
4. GitHub Actions deploys to GitHub Pages.

Do not push directly to GitHub unless you also merge back to GitLab, or the mirrors will diverge.
