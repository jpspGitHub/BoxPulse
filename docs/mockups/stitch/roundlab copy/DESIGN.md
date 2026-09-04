---
name: RoundLab
colors:
  surface: '#1f0f0c'
  surface-dim: '#1f0f0c'
  surface-bright: '#483531'
  surface-container-lowest: '#190a08'
  surface-container-low: '#281714'
  surface-container: '#2c1b18'
  surface-container-high: '#382622'
  surface-container-highest: '#43302c'
  on-surface: '#fbdcd6'
  on-surface-variant: '#e5beb6'
  inverse-surface: '#fbdcd6'
  inverse-on-surface: '#3f2c28'
  outline: '#ac8982'
  outline-variant: '#5c403a'
  surface-tint: '#ffb4a5'
  primary: '#ffb4a5'
  on-primary: '#650a00'
  primary-container: '#ff5637'
  on-primary-container: '#590800'
  inverse-primary: '#ba1b00'
  secondary: '#f0c03e'
  on-secondary: '#3e2e00'
  secondary-container: '#ba9000'
  on-secondary-container: '#3c2c00'
  tertiary: '#64d4fc'
  on-tertiary: '#003544'
  tertiary-container: '#0e9dc3'
  on-tertiary-container: '#002e3c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad3'
  primary-fixed-dim: '#ffb4a5'
  on-primary-fixed: '#3f0400'
  on-primary-fixed-variant: '#8e1300'
  secondary-fixed: '#ffdf95'
  secondary-fixed-dim: '#f0c03e'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#594400'
  tertiary-fixed: '#baeaff'
  tertiary-fixed-dim: '#64d4fc'
  on-tertiary-fixed: '#001f29'
  on-tertiary-fixed-variant: '#004d62'
  background: '#1f0f0c'
  on-background: '#fbdcd6'
  surface-variant: '#43302c'
typography:
  display-lg:
    fontFamily: Anton
    fontSize: 80px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: 0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: 0.03em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 36px
    fontWeight: '400'
    lineHeight: 40px
  headline-md:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 36px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  timer-xl:
    fontFamily: Anton
    fontSize: 120px
    fontWeight: '400'
    lineHeight: 110px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

The design system is engineered for the high-intensity environment of boxing gyms and combat sports facilities. It prioritizes immediate legibility, physical durability, and high-performance aesthetics. The brand personality is authoritative, energetic, and uncompromising, designed to evoke the grit of a traditional boxing gym while maintaining the precision of modern sports science.

The design style is **High-Contrast / Industrial**, leaning into a dark-mode-first architecture. It utilizes heavy strokes, raw textures, and vibrant action colors to create a sense of urgency and strength. Visual elements draw inspiration from the geometry of the ring, the texture of heavy bags, and the high-visibility requirements of digital scoreboards.

**Key Brand Pillars:**
- **Kinetic Energy:** UI elements feel ready for action, utilizing high-saturation accents against deep neutrals.
- **Rugged Precision:** Clean, technical layouts that mirror professional training equipment.
- **Tactile Feedback:** Large, confident touch targets designed for use with gym-worn hands or quick interactions between rounds.

## Colors

This design system utilizes a high-contrast palette optimized for dark environments and rapid glanceability.

- **Primary (Punchy Red):** Used for primary actions, critical recording, and active "in-round" states. It represents the intensity of the sport.
- **Secondary (Boxing Gold):** Used for achievement, premium status, and highlights. It provides a classic sporting contrast to the red and black.
- **Background & Surface:** The core architecture uses a deep charcoal (`#0F1115`) to reduce glare, with surfaces (`#1A1D24`) providing subtle depth.
- **Functional Colors:** Success Green and Danger Red are reserved for status indicators (e.g., payment cleared, membership expired) and must maintain high saturation to be visible across the gym floor.

## Typography

The typography system is split into three distinct roles to maximize both impact and utility.

1.  **Display & Headlines (Anton):** A bold, condensed sans-serif that commands attention. Used for titles, heavy-duty stats, and section headers. All headlines should be treated with uppercase styling to reinforce the "industrial" feel.
2.  **Body & UI (Hanken Grotesk):** A modern, sharp grotesque that ensures high readability for member profiles, schedules, and management logs.
3.  **Data & Metrics (JetBrains Mono):** A monospaced font used for labels, timestamps, and technical data points, evoking a sense of digital precision and "lab" style analysis.

For timers and round counters, use the `timer-xl` token to ensure maximum visibility from a distance.

## Layout & Spacing

The layout is built on a strict **4px baseline grid** to maintain industrial alignment. 

- **Mobile-First Approach:** The primary experience is optimized for handheld devices used on the gym floor. Use a single-column fluid layout with a `container-margin` of 20px.
- **Tablet/Dashboard:** On larger screens, transition to a 12-column grid. Elements should span 4, 6, or 12 columns.
- **Rhythm:** Use `xl` (40px) spacing between major sections and `md` (16px) for internal component padding to ensure touch targets are large and accessible.
- **Touch Targets:** No interactive element (button, checkbox, toggle) should be smaller than 48x48px to accommodate rapid, high-movement interactions.

## Elevation & Depth

In this design system, depth is achieved through **Tonal Layering** and **Industrial Borders** rather than traditional soft shadows.

- **Level 0 (Background):** `#0F1115` - The base of the application.
- **Level 1 (Cards/Surfaces):** `#1A1D24` - Elevated surfaces used for grouping information.
- **Outlines:** Surfaces should utilize a 1px solid border in `#2A2E37` to define boundaries without relying on light-source metaphors. 
- **Active Elevation:** When an element is focused or active, it uses a high-contrast border in the Primary (`#FF4D2E`) or Secondary (`#F5C542`) color.
- **Shadows:** Only used sparingly for "Floating Action Buttons" or critical modals. Shadows should be hard, low-blur, and high-opacity (e.g., `0px 4px 0px rgba(0,0,0,0.5)`) to maintain the "Heavy-Duty" aesthetic.

## Shapes

The shape language reflects the balance between "Rugged" and "Modern."

- **Core Elements:** Use a `0.5rem` (8px) radius for buttons, input fields, and standard cards. This provides enough "roundness" to feel modern while maintaining a structural, solid appearance.
- **Large Containers:** Components like "Workout Overviews" or "Membership Badges" use the `rounded-lg` (1rem/16px) token.
- **Interactive States:** Toggles and pill-tags use the `rounded-xl` (1.5rem/24px) token to differentiate them from structural layout blocks.

## Components

### Buttons
- **Primary:** Solid `#FF4D2E` background with white uppercase `Anton` text. Min-height: 56px.
- **Secondary:** Outline variant with a 2px `#F5C542` border.
- **Ghost:** White text on transparent background, used for secondary actions like "Cancel".

### Cards
- Heavy-duty construction: `#1A1D24` background, 1px border. 
- Headers within cards should use the `label-md` JetBrains Mono token for a technical look.

### Input Fields
- Dark backgrounds (`#0F1115`) with a 2px bottom border that turns Primary Red on focus. 
- Large, legible type for entering weights, reps, or timer settings.

### Status Badges
- High-visibility pills using full-saturation colors (Success Green, Danger Red).
- Use `label-md` typography for maximum clarity.

### Timers & Counters
- The centerpiece of the gym UI. Use `timer-xl` typography. 
- Active rounds should have a pulsing Primary Red border to signal "Work" and a Boxing Gold border for "Rest."

### Lists
- High-density lists for "Class Attendance" or "Leaderboards." 
- Each list item should be separated by a 1px `#2A2E37` divider.