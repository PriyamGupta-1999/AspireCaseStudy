# Aspire CSS Case Study

A pixel-perfect, accessible, and responsive banking dashboard built with React, TypeScript, and custom CSS. This project implements a card slider, card actions, sidebar navigation, dashboard header, and recent transactions, matching provided design specs and screenshots.

## Features
- **Card Slider:** Interactive carousel with masked/visible card numbers, freeze/unfreeze, responsive layout, and Visa logo.
- **Card Actions Strip:** Freeze/unfreeze, set spend limit, add to GPay, replace, and cancel card actions.
- **Accordion Components:** Card details and recent transactions with up/down arrow toggles.
- **Sidebar Navigation:** Desktop and mobile navigation with icons, fixed to left (desktop) or bottom (mobile).
- **Dashboard Layout:** Header and tabs occupy 30vh, body 70vh on mobile; full layout on desktop.
- **Accessibility:** Alt text, aria-labels, keyboard navigation, and focus management.
- **Lazy Loading:** Route components are loaded asynchronously for performance.
- **Mobile Responsive:** Custom mobile UI for actions and navigation, fixed to viewport bottom.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Running the Project
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

## Project Structure
```
AspireCaseStudy/
├── src/
│   ├── app/routes/router.tsx         # Routing with lazy loading
│   ├── layout/
│   │   ├── Dashboard/                # Dashboard components
│   │   ├── CardDetails/              # Card details, actions, transactions
│   │   ├── SidebarNavigationStrip/   # Desktop & mobile sidebar navigation
│   ├── assets/                       # Icons and images
│   ├── shared/                       # Constants, types, mock API
│   ├── index.css, App.css            # Global styles
├── public/
├── package.json
├── README.md
```

## Accessibility & Best Practices
- All icons/images use descriptive alt text.
- Keyboard navigation and ARIA attributes for interactive elements.
- Code uses import statements for assets and lazy loading for routes.
- Custom CSS, no Tailwind.


## License
MIT

---
For any questions or improvements, please open an issue or pull request.
