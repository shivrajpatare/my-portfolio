# Codebase Walkthrough — Shivraj Patare Terminal Portfolio

This document walks through the full internal architecture of `index.html`, explaining how every major feature is built, structured, and connected.

---

## File Architecture

Everything lives in a **single `index.html` file**. It is divided into three logical layers:

```
index.html
├── <head>
│   └── <style>          ← All CSS (design tokens, layout, animations, responsive)
├── <body>
│   ├── Preloader DOM    ← #preloader, canvas, boot log, progress bar
│   ├── Main Content     ← #mainContent with all portfolio sections
│   └── Terminal Widgets ← footer input bar + #termModal overlay
└── <script> blocks (5 separate IIFEs)
    ├── Typing Animation       ← Animates the hero "code block"
    ├── Matrix Rain (main)     ← Canvas background
    ├── Preloader Boot         ← Boot sequence + preloader matrix rain
    ├── Form Submission        ← Contact form via FormSubmit
    └── Interactive Terminal   ← Command parser + modal + history
    └── Scroll Progress Bar    ← Scroll % width tracking
    └── Scroll Reveal          ← IntersectionObserver animations
```

---

## CSS Structure (inside `<style>`)

### Design Tokens (`:root`)

All colors are defined as CSS custom properties at the top. Every single color reference in the file uses `var(--token-name)`. Changing the theme means updating these 11 variables only.

```css
:root {
    --bg-base: #1a1b26;
    --term-green: #bb9af7;   /* Primary accent — Tokyo Night purple */
    --term-blue:  #7aa2f7;   /* Links, headings */
    --term-white: #c0caf5;   /* Body text */
    ...
}
```

### CRT Effect

Two CSS layers produce the retro terminal feel:

1. `body::after` — a repeating `linear-gradient` creates horizontal scanlines + subtle RGB chromatic aberration
2. `@keyframes flicker` on `body` — randomly flickers opacity between 0.85 and 1 at 0.15s intervals

### Typography

Headings (`h2`, `h3`) use `::before` pseudo-elements to prepend terminal prompt strings:

```css
h2::before {
  content: "root@shivraj:~# ";
}
h3::before {
  content: "./";
}
```

### Skills Grid

Uses CSS Grid with `auto-fit` and `minmax(280px, 1fr)`. On mobile (`@media max-width: 768px`), it collapses to a single column.

### Terminal Modal

The `#termModal` overlay uses:

- `position: fixed` + `backdrop-filter: blur(4px)` for the frosted background
- `opacity: 0` + `visibility: hidden` toggled to `opacity: 1` + `visibility: visible` via `.active` class — this allows CSS `transition` to animate the fade in/out properly
- The inner `.term-modal` uses `transform: translateY(20px) scale(0.95)` at rest and resets on `.active` for the slide-up animation

### Scroll-Reveal

`.reveal` class sets `opacity: 0` and `transform: translateY(30px)`. When `.revealed` is added by JS, it resets both. Three `.delay-1/2/3` classes stagger transitions for cards.

---

## JavaScript Architecture

All scripts are **IIFEs** (immediately invoked function expressions) to keep scope isolated. No global variables leak between them.

### 1. Typing Animation (`animateLine`)

Handles the animated "code block" in the About section. It reads all `.type-line` children and triggers them sequentially with delays. Each line gets class `typing` (animation plays) then `done` (locks at full width) before the next starts.

### 2. Preloader Boot Sequence

**Flow:**

```
DOMContentLoaded
  → Start mini matrix rain on #preloader-rain canvas
  → Read bootMessages array
  → Call addLine(0) with setTimeout recursion
    → Each line appends to #bootLog with color-coded span
    → Updates #progressFill width and #progressPct text
    → On last message: fade out #preloader, show #mainContent
    → Scroll to #msgSection after reveal
```

**Boot messages** are color-coded arrays — green for OK, yellow for warnings, red for errors, simulating a real BIOS/systemd boot log.

**The mini matrix rain** is a canvas drawing loop using `setInterval`. Each frame:

1. Fills canvas with semi-transparent background color (creates fade trail effect)
2. Iterates over columns, draws a random character in `rgba(187, 154, 247, alpha)`
3. Resets column drop to top randomly

### 3. Main Matrix Rain Canvas

Same technique as preloader rain but uses `requestAnimationFrame` instead of `setInterval` for better performance. Runs continuously in the background at 8% opacity as a wallpaper effect.

### 4. Form Submission Handler

Intercepts the `contactForm` submit event. Uses `fetch()` with `FormData` to POST to FormSubmit.co endpoint. Race conditions prevented by an `isSubmitting` boolean flag. Displays color-coded status messages on success/error.

### 5. Interactive Terminal Engine

This is the most complex script block. Key components:

#### State Variables

```javascript
var cmdHistory = []; // Array of all typed commands
var historyIndex = -1; // Current position in history
```

#### Command Registry (`commands` object)

Each key is a command name. Values are functions that return HTML strings:

```javascript
var commands = {
    help: function() { return '<span>...</span>'; },
    skills: function() { return [...].join('\n'); },
    ...
};
```

#### `processCommand(cmd)`

Normalizes the input to lowercase, trims whitespace, then:

- Checks `cmd.startsWith('resume')` for sub-commands (`resume view`, `resume download`)
- Checks `cmd.startsWith('sudo')` and `cmd.startsWith('rm ')`
- Checks `cmd.startsWith('cat ')` for file reading easter eggs
- Falls through to `commands[input]()` for standard commands
- Returns a `not found` error HTML string as default

#### `openModal(initialCmd)`

Called when user presses Enter in the footer input:

1. Resets `#modalOutput` innerHTML
2. Adds `.active` to overlay
3. Appends welcome message
4. If an initial command was passed, executes it immediately
5. Focuses the modal input

#### `appendOutput(text)`

All output goes through this function. Handles the special `__CLEAR__` string to wipe the terminal. Appends a `<div>` block with inner HTML and auto-scrolls to bottom.

#### Keyboard Handling

Both `#cliInput` (footer) and `#modalInput` (modal) share the same keyboard logic:

- `Enter` → process command, add to history, reset `historyIndex` to end of array
- `ArrowUp` → decrement `historyIndex`, populate input with `cmdHistory[historyIndex]`
- `ArrowDown` → increment `historyIndex`, populate input or clear if at end
- `Escape` → close modal

### 6. Scroll Progress Bar

Listens to `window.scroll` (passive). Calculates `(scrollTop / docHeight) * 100` and sets `#scrollProgress` width as a percentage.

### 7. Scroll-Reveal Animations

An `IntersectionObserver` watches all `section`, `.skill-card`, and `.project-list > li` elements. When they enter the viewport (`isIntersecting: true`), it adds class `.revealed` which triggers the CSS transition. Stagger delays are added numerically (`delay-1`, `delay-2`, `delay-3`) via modulo arithmetic.

---

## Data Flow — How a Terminal Command Works End to End

```
User types "skills" in #cliInput
    ↓
keydown listener detects Enter
    ↓
cmd = cliInput.value.trim()           → "skills"
cmdHistory.push(cmd)                  → history stored
openModal("skills") called
    ↓
modalOverlay.classList.add('active')  → CSS fade-in
appendOutput(welcomeMessage)          → greeting shown
appendOutput('<span>skills</span>')   → echoes command
    ↓
result = processCommand("skills")
    → input = cmd.toLowerCase().trim() → "skills"
    → commands["skills"]()             → returns HTML string
    ↓
appendOutput(result)                  → skills table shown
modalBody.scrollTop = scrollHeight    → auto-scrolls down
    ↓
modalInput.focus()                    → ready for next command
```

---

## Customization Reference

| What to change       | Where to find it                                              |
| -------------------- | ------------------------------------------------------------- |
| Colors / theme       | `:root` block inside `<style>`                                |
| Personal info (HTML) | Sections inside `<main id="mainContent">`                     |
| Terminal commands    | `commands` object in the `INTERACTIVE TERMINAL ENGINE` script |
| Boot log messages    | `bootMessages` array in the `PRELOADER BOOT SEQUENCE` script  |
| Resume file          | Replace `Shivraj_Patare_Resume.pdf` in repository root        |
| Contact form email   | `action` attribute on `#contactForm` (FormSubmit URL)         |
| Typing SVG lines     | `lines=` query param in `readme-typing-svg` `<img>` src       |
| Projects section     | `<ul class="project-list">` inside `<main>`                   |
| Skills badges        | `.skill-card` divs inside `.skills-container`                 |

---

## Known Limitations

- The matrix rain canvas is redrawn on every animation frame — on very low-end devices, it may cause negligible CPU usage. It can be removed or opacity reduced (currently at 8%).
- The CRT flicker animation (`animation: flicker 0.15s infinite`) is disabled automatically for users with `prefers-reduced-motion: reduce`.
- FormSubmit.co requires first-time email confirmation before the contact form starts delivering messages to your inbox.
- The `readme-typing-svg` external image in the preloader requires an internet connection to load.
