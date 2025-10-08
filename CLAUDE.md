# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio website for an AI Full Stack Developer. The site is built with vanilla HTML, CSS, and JavaScript - no build tools or frameworks required. It features a modern, animated design with sections for hero, about, services, projects, skills, testimonials, and contact.

## Development Setup

This is a static website that runs directly in the browser with no build process required:

1. Open `index.html` in any modern web browser
2. For development, use a local server like VS Code's Live Server extension for hot reloading
3. All styles are in `style.css` and all interactive behavior is in `script.js`

## Architecture & Code Structure

### File Structure
- `index.html` - Single-page structure with all sections (hero, about, services, projects, skills, testimonials, contact)
- `style.css` - All styling with CSS custom properties for theming, organized by section
- `script.js` - All interactive functionality including scroll effects, animations, form handling

### Key Design Patterns

**CSS Architecture:**
- CSS custom properties (variables) defined in `:root` for consistent theming (colors, gradients, shadows)
- Dark theme with primary colors: `--bg-primary: #0a0a0a`, `--accent: #00ff88`, `--accent-secondary: #0099ff`
- Mobile-first responsive design with breakpoints at 768px, 992px, 1200px
- All sections use consistent `.section-header` structure with subtitle, title, and decoration

**JavaScript Patterns:**
- Intersection Observer API used extensively for scroll-triggered animations (stats counter, skill bars, fade-ins)
- Event-driven architecture for user interactions (navbar, filters, testimonials)
- DOM manipulation is targeted and efficient - elements selected once and reused
- All animations use CSS transitions/animations triggered by class changes

### Important Implementation Details

**Navigation System:**
- Fixed navbar with scroll-based styling (adds `.scrolled` class after 50px scroll)
- Active nav link updates automatically based on scroll position using section intersection detection
- Smooth scroll behavior implemented for all anchor links

**Hero Section:**
- Typing animation cycles through: 'AI Full Stack Developer', 'ML Engineer', 'LLM Specialist', 'AI Innovator'
- Animated stat counters trigger when section enters viewport (targets: 35, 150, 120)
- Floating cards use staggered animations with delays

**Project Filter System (script.js:140-177):**
- Filter buttons control visibility with data-filter/data-category matching
- Uses CSS transitions for smooth show/hide: opacity and transform scale
- "all" filter shows all projects

**Form Handling (script.js:262-277):**
- Contact form prevents default submission and shows alert
- No backend integration - form submission is currently client-side only
- Form reset after submission

**Testimonial Slider (script.js:197-259):**
- Auto-plays with 5-second interval
- Manual controls with prev/next buttons and dot navigation
- Only one card shown at a time using `.active` class

## Common Modifications

**Adding New Projects:**
1. Add `.project-card` div in the projects grid (index.html:284-397)
2. Set appropriate `data-category` attribute (web/mobile/design)
3. Include project-image, project-info with category, title, description, and tags

**Updating Color Scheme:**
- Modify CSS custom properties in `:root` (style.css:12-26)
- Key variables: `--accent`, `--accent-secondary`, `--gradient-primary`

**Adding Services:**
- Add new `.service-card` in services grid (index.html:189-261)
- Use `.featured` class for special highlighting
- Include service-icon, title, description, and features list

**Modifying Animations:**
- Intersection Observer thresholds set at 0.5 for counters/progress (script.js:134, 191)
- Parallax speed controlled by multiplier (script.js:327)
- Typing speed: 100ms per character, 2s pause at end (script.js:90-102)

## External Dependencies

- Google Fonts: Space Grotesk (headings) and Inter (body text)
- Font Awesome 6.4.0 for icons (loaded via CDN)

All other functionality is implemented without external libraries or frameworks.
