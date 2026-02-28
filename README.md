# Shivraj Patare — Terminal Portfolio

> A single-file, zero-dependency developer portfolio built to look and feel like a real Linux terminal.

---

## What is this?

This is a personal portfolio website built entirely in one `index.html` file — no frameworks, no build tools, no package managers. Open the file in a browser and you're dropped into a boot sequence followed by a fully interactive terminal interface styled with the **Tokyo Night** color theme.

## Live Demo

> GitHub Repository: [github.com/shivrajpatare/my-portfolio](https://github.com/shivrajpatare/my-portfolio)

---

## Features

### Boot Sequence / Preloader

- Matrix-style rain canvas animation plays in the background
- ASCII "SHIVRAJ" logo renders at the top
- Animated BIOS-style boot log messages appear line by line
- A live progress bar counts from 0% to 100% as the page initializes
- Typing SVG banner from `readme-typing-svg.herokuapp.com` plays in the center

### Main Portfolio Content

The full portfolio is displayed as a terminal window with sections:

- **Hero / About** — ASCII name art, role introduction, and a typed-out code block describing the stack and philosophy
- **Experience** — Work history with company, role, and dates
- **Skills** — A responsive grid of categorized skill cards with tech badges (with icons from `skillicons.dev`)
- **Projects** — Deployed project cards with live demo and source code links
- **Education** — Academic background
- **Research & Certifications** — Published paper and certification list
- **Contact** — Social links + a working terminal-style contact form powered by FormSubmit

### Interactive Terminal (Bottom Bar + Modal)

A command-line input sits at the bottom of the page. Typing a command and pressing Enter opens a macOS-style terminal modal window. Commands supported:

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `help`            | Show all available commands          |
| `view`            | Full portfolio overview              |
| `about`           | About Shivraj in brief               |
| `skills`          | List technical skills                |
| `projects`        | Show all deployed projects with URLs |
| `experience`      | Work history                         |
| `education`       | Academic background                  |
| `contact`         | Email, GitHub, LinkedIn links        |
| `socials`         | Social media links (clickable)       |
| `resume`          | Options to view or download resume   |
| `resume view`     | Open resume PDF in new tab           |
| `resume download` | Download resume PDF directly         |
| `clear`           | Clear the terminal output            |
| `exit`            | Close the terminal modal             |
| `whoami`          | Returns: `visitor@curious`           |
| `ls`              | Lists files in fake directory        |
| `pwd`             | Returns: `/home/shivraj/portfolio`   |
| `neofetch`        | System info card (terminal style)    |
| `sudo [anything]` | Permission denied easter egg         |
| `rm -rf /`        | Indestructible easter egg            |

### Arrow Key Command History

- Press `↑` to cycle back through previously typed commands
- Press `↓` to move forward through history
- Works in both the footer input bar and the modal input

### Scroll Progress Bar

A 3px gradient bar at the very top of the viewport fills left-to-right as you scroll down the page.

### Scroll-Reveal Animations

Sections, skill cards, and project items animate in (fade + slide up) as they enter the viewport via `IntersectionObserver`. Respects `prefers-reduced-motion`.

### CRT Effect

A subtle scanline overlay + flicker animation gives the portfolio an old terminal monitor aesthetic.

### Accessibility

- Semantic HTML5 elements throughout (`section`, `nav`, `footer`, `main`)
- ARIA labels on interactive sections
- Full keyboard navigation support
- Focus-visible outlines on all interactive elements
- `prefers-reduced-motion` media query disables animations for users who need it

### Mobile Responsive

All sections adapt for screens under `768px`:

- Single-column skill cards
- Stacked contact links and project buttons
- Scaled-down ASCII art and font sizes
- Terminal modal expands to 95% viewport width

---

## Tech Stack

| Layer        | Tech                         |
| ------------ | ---------------------------- |
| Structure    | HTML5                        |
| Styling      | Vanilla CSS (no frameworks)  |
| Logic        | Vanilla JavaScript (no libs) |
| Fonts        | Fira Code (Google Fonts)     |
| Icons        | skillicons.dev               |
| Contact Form | FormSubmit.co                |
| Hosting      | GitHub (raw) / GitHub Pages  |
| Theme        | Tokyo Night                  |

---

## Color Palette (Tokyo Night)

| Token           | Hex       | Usage                       |
| --------------- | --------- | --------------------------- |
| `--bg-base`     | `#1a1b26` | Page background             |
| `--term-green`  | `#bb9af7` | Primary accent (purple)     |
| `--term-blue`   | `#7aa2f7` | Links, headings             |
| `--term-white`  | `#c0caf5` | Body text                   |
| `--text-muted`  | `#565f89` | Comments, secondary text    |
| `--term-pink`   | `#f7768e` | Keywords, errors            |
| `--term-yellow` | `#e0af68` | Warnings, company names     |
| `--term-cyan`   | `#7dcfff` | Special highlights          |
| `--term-orange` | `#ff9e64` | Accent variation            |
| `--term-border` | `#414868` | Borders, dividers           |
| `--term-dark`   | `#16161e` | Terminal header backgrounds |

---

## Project Structure

```
my-portfolio/
├── index.html               # Everything — HTML, CSS, JS in one file
└── Shivraj_Patare_Resume.pdf  # Resume PDF for download/view commands
```

---

## How to Run Locally

No build step required. Just:

```bash
git clone https://github.com/shivrajpatare/my-portfolio.git
cd my-portfolio
# Open index.html directly in any modern browser
```

Or with a local server:

```bash
npx serve .
# or
python -m http.server 8000
```

---

## Customization

All personal data (name, experience, projects, skills) is in clearly marked sections inside `index.html`. The JS terminal commands are defined in the `commands` object inside the `INTERACTIVE TERMINAL ENGINE` script block. The color theme is fully controlled by CSS variables in the `:root` block at the top of `<style>`.

---

## Contact

- **Email:** shivrajpatare.work@gmail.com
- **GitHub:** [github.com/shivrajpatare](https://github.com/shivrajpatare)
- **LinkedIn:** [linkedin.com/in/shivrajpatare](https://linkedin.com/in/shivrajpatare)
