# Sandrine Boissel — Portfolio

Personal portfolio site for Sandrine Boissel: operations, analytics, and systems leadership for biotech and biopharma teams.

**Live site**

- [GitLab Pages](https://sboissel1.gitlab.io/sboissel-portfolio) (primary)
- [GitHub Pages](https://sboissel.github.io/sboissel-portfolio/) (mirror)

The site includes a resume, portfolio and featured projects, contact links, and a Strava analysis page with an embedded Tableau dashboard.

## Repositories

- GitLab (source of truth): [gitlab.com/sboissel1/sboissel-portfolio](https://gitlab.com/sboissel1/sboissel-portfolio)
- GitHub (mirror): [github.com/sboissel/sboissel-portfolio](https://github.com/sboissel/sboissel-portfolio)

## Local development

Requires [Bun](https://bun.sh), Node.js 22+, and Python 3 with `fonttools` and `brotli` (used during build for font subsetting).

```sh
bun install
bun run dev      # http://localhost:4321
bun run build    # output in dist/
bun run preview  # preview production build
```

Site content and configuration live in `src/config/site.toml` and `src/content/`.

## Tech stack

- [Astro](https://astro.build) 7
- [Navfolio](https://github.com/dodolalorc/astro-navfolio) theme and packages
- Bun, TypeScript, Tailwind CSS 4
- Pagefind (static search)

## Deployment

GitLab CI deploys to GitLab Pages; a GitLab push mirror syncs to GitHub, where GitHub Actions deploys to GitHub Pages. See [DEPLOY.md](./DEPLOY.md) for URLs, mirror setup, and CI details.
