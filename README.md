# 💸 SmartSpend – Advanced Expense Tracker

A modern, feature-rich expense tracking web application built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Track your daily expenses, set monthly budgets, and gain powerful insights into your spending habits — all with a beautiful, responsive UI.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 📊 Dashboard
- **Summary Cards** — Monthly expense, remaining budget, top category, and total transactions at a glance
- **Budget Progress** — Visual progress bar with overspend alerts
- **Recent Expenses** — Quick view of latest 5 transactions
- **Charts** — Category-wise pie chart and 6-month bar chart right on the dashboard

### ➕ Add Expense
- Intuitive form with **amount**, **category**, **date picker**, and **notes**
- Form validation powered by **React Hook Form + Zod**
- Toast notifications on successful submission

### 📋 Expense List
- View all expenses in a clean, organized list
- **Filter by category** — Food, Travel, Shopping, Bills, Education, Health, Others
- **Filter by month** — Quickly drill down to any month's data
- **Delete** expenses with one click

### 📈 Analytics
- **Month-over-month trend** — Spending comparison with percentage change indicator
- **Category Pie Chart** — Donut chart with tooltips showing exact amounts
- **Monthly Bar Chart** — 6-month spending trend visualization
- **Category Breakdown** — Sorted list with progress bars and percentages

### 💰 Budget Management
- Set and update your **monthly budget**
- Stats overview: Budget, Spent, Remaining, Projected Monthly
- Projected spending based on daily average
- **Visual warnings** when budget is exceeded

### 🌗 Dark / Light Mode
- System-aware theme with manual toggle
- Smooth transitions between themes

### 📱 Fully Responsive
- Desktop sidebar navigation
- Collapsible mobile header with sheet menu
- Optimized layouts for all screen sizes

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [ShadCN UI](https://ui.shadcn.com/) | Pre-built accessible components |
| [Radix UI](https://www.radix-ui.com/) | Headless UI primitives |
| [Recharts](https://recharts.org/) | Charts & data visualization |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |
| [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | Form handling & validation |
| [Lucide React](https://lucide.dev/) | Icon library |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark/Light mode |
| [Sonner](https://sonner.emilkowal.dev/) | Toast notifications |
| [date-fns](https://date-fns.org/) | Date utilities |
| LocalStorage | Client-side data persistence |

---

## 📂 Project Structure

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── page.tsx           # Dashboard (home)
│   │   ├── add/               # Add Expense page
│   │   ├── expenses/          # Expense List page
│   │   ├── analytics/         # Analytics page
│   │   ├── budget/            # Budget Management page
│   │   └── layout.tsx         # Dashboard layout (sidebar + mobile header)
│   ├── layout.tsx             # Root layout (theme, fonts, toaster)
│   └── globals.css            # Global styles & design tokens
├── components/
│   ├── analytics/             # Pie chart, Bar chart
│   ├── dashboard/             # Summary cards, Budget setter
│   ├── expenses/              # Add form, Expense list, Filters
│   ├── layout/                # Sidebar, Mobile header
│   └── ui/                    # ShadCN UI components
├── hooks/
│   ├── use-expenses.ts        # Expense CRUD & computed data
│   ├── use-budget.ts          # Budget state management
│   └── use-animated-counter.ts # Animated number counters
└── lib/
    ├── types.ts               # TypeScript interfaces
    ├── constants.ts           # App config, categories, currency
    └── utils.ts               # Utility functions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/rahull2509/Expense-Tracker.git
cd Expense-Tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📸 Pages Overview

| Page | Route | Description |
|---|---|---|
| Dashboard | `/` | Financial overview with cards, charts & recent expenses |
| Add Expense | `/add` | Form to add a new expense entry |
| Expenses | `/expenses` | Full expense list with category & month filters |
| Analytics | `/analytics` | Detailed spending insights & trend analysis |
| Budget | `/budget` | Set monthly budget & view projections |

---

## 🎨 Design Highlights

- **Glassmorphism** — Frosted glass card effects with `backdrop-blur`
- **Gradient accents** — Color-coded gradient bars on summary cards
- **Micro-animations** — Smooth entry animations, hover effects, and animated counters via Framer Motion
- **Inter font** — Clean, modern typography from Google Fonts
- **Indian Rupee (₹)** — Default currency with locale-aware formatting

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/rahull2509">Rahul</a>
</p>
