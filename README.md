# Biogenic Soil Sense Redesign

A modern, full-stack web application for monitoring and analyzing biogenic soil conditions with real-time data visualization and interactive mapping capabilities.

## 🌍 Overview

Biogenic Soil Sense Redesign is a contemporary redesign of soil monitoring technology, providing environmental scientists, agricultural professionals, and researchers with an intuitive platform to track and analyze soil health metrics. Built with cutting-edge web technologies, it delivers real-time insights through interactive maps, data visualization, and comprehensive analytics.

## ✨ Key Features

- **Interactive Mapping** - Real-time visualization of soil monitoring sites using Leaflet
- **Data Visualization** - Advanced charts and graphs powered by Recharts
- **Responsive UI** - Beautiful, accessible interface built with Radix UI and Tailwind CSS
- **Form Management** - Robust form handling with React Hook Form and Zod validation
- **Real-time Updates** - Powered by TanStack React Query for efficient data fetching
- **Modern Architecture** - Built on TanStack Start for optimal performance and scalability

## 🛠️ Tech Stack

**Frontend:**
- **Framework**: React 19 + TanStack Start
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **Routing**: TanStack Router
- **State Management**: TanStack React Query
- **Mapping**: Leaflet + React Leaflet
- **Visualization**: Recharts
- **Form Handling**: React Hook Form + Zod
- **UI Components**: Pre-built Radix UI component library

**Build Tools:**
- Vite (fast bundler)
- TypeScript
- ESLint + Prettier

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Bun (recommended package manager)

### Installation

```bash
# Clone the repository
git clone https://github.com/murithiii/biogenic-soil-sense-redesign.git
cd biogenic-soil-sense-redesign

# Install dependencies
bun install
# or
npm install
```

### Development

```bash
# Start development server
bun run dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Production build
bun run build
# or
npm run build

# Preview production build
bun run preview
```

## 📁 Project Structure

```
├── src/
│   ├── routes/          # File-based routing (TanStack Start convention)
│   ├── components/      # Reusable React components
│   ├── lib/            # Utility functions and helpers
│   └── styles/         # Global styles and Tailwind config
├── public/             # Static assets
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── tailwind.config.ts  # Tailwind CSS configuration
```

## 🎨 UI Components

This project uses a comprehensive set of Radix UI components:
- Accordions, Alerts, Dialogs
- Forms (inputs, selects, checkboxes, radio buttons)
- Navigation (menus, navigation items)
- Data display (tables, progress bars)
- And many more...

All components are styled with Tailwind CSS for a consistent, modern design system.

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start development server with hot reload |
| `build` | Create optimized production build |
| `build:dev` | Create development build |
| `preview` | Preview production build locally |
| `lint` | Run ESLint to check code quality |
| `format` | Format code with Prettier |

## 🌱 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created by [murithiii](https://github.com/murithiii)

## 🤝 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Built with ❤️ for environmental science and sustainable agriculture**
