# TRON Wallet Mobile Web App - Design Guidelines

## Design Approach
**Reference-Based + Brand Identity Approach**
Following official TRON visual identity with inspiration from leading crypto wallets (Trust Wallet, MetaMask Mobile, Coinbase Wallet). Prioritizing security, clarity, and mobile-first usability while maintaining TRON's futuristic, tech-forward aesthetic.

## Core Design Principles
1. **Security-First Visual Language**: Build trust through consistent dark themes, clear hierarchy, and deliberate information architecture
2. **Mobile-Optimized Interactions**: Large touch targets (min 44px), thumb-friendly navigation, gesture-ready layouts
3. **Progressive Disclosure**: Show critical info first, reveal complexity on demand
4. **TRON Brand Consistency**: Maintain official color palette and futuristic visual treatment

---

## Color Palette

### Dark Mode (Primary)
- **Background Base**: 12 5% 8% (deep charcoal, nearly black)
- **Surface Elevated**: 12 8% 12% (card/component backgrounds)
- **Surface Highest**: 12 10% 16% (modals, overlays)

### TRON Brand Colors
- **Primary Red**: 358 100% 51% (TRON signature red - #FF060A equivalent)
- **Primary Red Muted**: 358 95% 45% (for hover states)
- **Accent Gradient**: Linear gradient from 358 100% 51% to 340 100% 60% (red to pink shift for CTAs, headers)

### Functional Colors
- **Success Green**: 142 76% 36% (transaction success, balance gains)
- **Warning Amber**: 38 92% 50% (alerts, confirmations)
- **Error Red**: 0 84% 60% (destructive actions, failures)
- **Text Primary**: 0 0% 95% (high contrast white)
- **Text Secondary**: 0 0% 65% (muted information)
- **Text Tertiary**: 0 0% 45% (labels, metadata)

### Light Mode (Optional Secondary Theme)
- **Background**: 0 0% 98%
- **Surface**: 0 0% 100%
- **Text Primary**: 0 0% 10%
- Use TRON red (358 100% 51%) consistently across themes

---

## Typography

### Font Families
- **Primary**: 'Inter', system-ui, sans-serif (clean, modern, excellent at small sizes)
- **Numeric/Monospace**: 'JetBrains Mono', 'Courier New', monospace (wallet addresses, balances, hashes)

### Type Scale (Mobile-Optimized)
- **H1 (Page Titles)**: 28px, font-semibold, tracking-tight
- **H2 (Section Headers)**: 22px, font-semibold
- **H3 (Card Titles)**: 18px, font-medium
- **Body Large**: 16px, font-normal (primary content)
- **Body**: 14px, font-normal (standard text)
- **Caption**: 12px, font-medium (labels, metadata)
- **Wallet Addresses**: 13px, monospace, font-medium, letter-spacing tight

---

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 3, 4, 6, 8, 12, 16** for consistency
- **Micro spacing** (gaps, icon padding): p-2, gap-3
- **Component internal**: p-4, gap-4
- **Section spacing**: py-6, py-8
- **Screen margins**: px-4 (mobile), px-6 (tablet+)
- **Large breathing room**: py-12, py-16

### Grid & Containers
- **Max Width**: max-w-md (448px) for mobile-first wallet screens
- **Card Spacing**: space-y-4 between cards, p-4 to p-6 internal padding
- **Safe Areas**: Account for mobile notches with safe-area-inset padding where needed

---

## Component Library

### Navigation
**Bottom Tab Bar** (Primary Navigation)
- 5 tabs: Home, Wallets, Send, Receive, Settings
- Height: 64px + safe-area-bottom
- Icons: 24px, active state with TRON red accent
- Background: Surface Elevated with subtle border-top

**Top App Bar**
- Height: 56px + safe-area-top
- Logo/Title left-aligned, action icons right (QR scan, notifications)
- Gradient overlay option for hero screens using TRON accent gradient

### Cards & Containers
**Balance Card** (Home Screen Hero)
- Gradient background using TRON red-to-pink
- Large balance display: 36px bold numerics
- Secondary info (USD value): 16px, 70% opacity
- Rounded-3xl (24px radius), p-6

**Wallet Item Card**
- Surface Elevated background
- Rounded-2xl (16px radius), p-4
- Left: Wallet icon/avatar (40px circle)
- Center: Address (truncated), Balance
- Right: Chevron or action menu (32px touch target)

**Transaction Item**
- Rounded-xl, p-3
- Left: Status icon (24px - send/receive arrow)
- Center: Amount, timestamp, address (truncated)
- Right: Amount with color coding (green/red)

### Buttons & CTAs
**Primary Button**
- Background: TRON red gradient, text-white
- Height: 48px (mobile), 52px (desktop)
- Rounded-xl, font-semibold
- Active scale: scale-95 transform

**Secondary Button**
- Border: 1.5px border-white/20, text-white
- Same sizing as primary
- Hover: border-white/40, bg-white/5

**Icon Buttons**
- Size: 40px × 40px minimum
- Rounded-lg, centered icon 20px
- Background: Surface Highest on hover

### Form Inputs
**Text Input / PIN Entry**
- Height: 52px
- Background: Surface Elevated, border-white/10
- Focus state: border-TRON-red, ring-2 ring-TRON-red/20
- Rounded-lg, px-4
- Monospace for addresses/keys

**PIN Dots (Authentication)**
- 6-dot layout, 12px circles
- Filled: TRON red, Unfilled: white/20
- Spacing: gap-3

### Modals & Overlays
**Bottom Sheet** (Mobile Pattern)
- Slide up from bottom with spring animation
- Rounded-t-3xl (top corners only)
- Backdrop: bg-black/60 with backdrop-blur-sm
- Drag handle: 32px wide, 4px tall, centered at top

**Full Screen Modal** (Complex Flows)
- Use for Create/Import Key, Send Flow
- Top: Close/Back button (44px), Title centered
- Content area: Scrollable if needed
- Bottom: Fixed action buttons with safe-area padding

### Demo Mode Indicator
**Profile Badge** (When Demo Active)
- Prominent pill badge: "Demo Mode" with pulsing indicator
- Position: Top of wallet card or header
- Background: amber-500/20, text-amber-400, border-amber-500/40
- Rounded-full, px-4 py-1.5, text-sm font-medium

---

## Key Screens & Layouts

### Home Screen
- **Hero**: Balance card with gradient (full-width, rounded-3xl, mb-6)
- **Quick Actions**: 2-button row (Send/Receive, gap-3, mb-6)
- **Recent Transactions**: List with "View All" link
- **Demo Profile** (if active): Compact card showing email, phone, mock password (tap to reveal)

### Wallet Detail
- **Header**: Address with copy button, QR code icon
- **Balance Section**: TRX + USDT-TRC20 tabs or stacked cards
- **Actions**: Send/Receive/Delete buttons
- **Transaction History**: Infinite scroll list

### Send Flow (Multi-Step)
1. **Recipient**: Address input with QR scan button, contact suggestions
2. **Amount**: Numeric keypad, max button, USD conversion
3. **Confirm**: Review card with fee breakdown, biometric/PIN auth
4. **Success**: Check animation, transaction hash, "View Details" CTA

### Wallets Management
- **Header**: "My Wallets" + Add New button
- **List**: Wallet cards with swipe-to-delete gesture
- **Empty State**: Illustration + "Create Your First Wallet" CTA

### Authentication Screens
- **PIN Setup/Entry**: 6-dot layout, numeric keypad
- **Biometric Prompt**: System sheet with fallback to PIN
- **Password (Optional)**: Standard input with show/hide toggle

---

## Animations & Interactions
- **Transitions**: 200ms ease-in-out for state changes
- **Gestures**: Swipe-to-delete on wallet items, pull-to-refresh on transaction lists
- **Loading States**: Skeleton screens with shimmer (gradient sweep animation)
- **Success Feedback**: Checkmark scale + fade-in (300ms), subtle haptic if supported

---

## Images & Iconography
**Icons**: Use Heroicons (outline for inactive, solid for active states) - 24px standard, 20px in compact layouts

**Illustrations** (Optional Enhancement):
- Empty states: Minimal line-art wallet/key illustrations in TRON red accent
- Success screens: Geometric check marks with TRON gradient

**No Large Hero Images**: This is a utility app - prioritize functional clarity over decorative imagery

---

## Accessibility & Polish
- Color contrast minimum 4.5:1 for text on backgrounds
- All interactive elements: min 44×44px touch targets
- Focus indicators: 2px TRON red ring on keyboard navigation
- Semantic HTML for screen readers (balance announcements, transaction statuses)
- Haptic feedback for critical actions (send confirmation, biometric success)