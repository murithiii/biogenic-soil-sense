# Biogenic Soil Sense Redesign

A modern web application for monitoring and analyzing soil conditions with real-time data visualization and interactive mapping capabilities.

## 🚀 [Try It Live](https://biogenic-soil-sense.vercel.app/)

## 🌍 Overview

Biogenic Soil Sense is a soil monitoring platform that helps environmental scientists and agricultural professionals track and analyze soil health metrics in real-time. I built this as part of my internship at Mars Software & AI, taking it from UX audit and requirements gathering through full frontend implementation.

## 🎯 My Role & Contributions

I was responsible for:
- **UX Research & Analysis** - Conducted usability evaluations to identify pain points in soil data workflows
- **Frontend Architecture** - Designed and built the complete React application with reusable component structure
- **Interactive Features** - Implemented interactive mapping and data visualization from scratch
- **Technical Decision-Making** - Selected and integrated libraries based on project requirements and performance needs

## ✨ Key Features I Built

- **Interactive Soil Monitoring Dashboard** - Real-time visualization of soil monitoring sites using React Leaflet
- **Multi-Chart Data Analysis** - Advanced charts powered by Recharts for comparative soil analysis
- **Responsive Design** - Mobile-first UI built with Tailwind CSS and Radix UI components
- **Form Handling & Validation** - Robust forms with React Hook Form and Zod for data entry and filtering
- **Efficient Data Management** - TanStack React Query for optimized data fetching and state synchronization

## 🛠️ Tech Stack & Why I Chose Each

**React 19 + TypeScript**
- Type safety ensures fewer bugs and better maintainability
- React's component model lets me build reusable UI patterns

**Vite** (Build Tool)
- Fast hot module replacement (HMR) for quick development iteration
- Significantly faster build times compared to Webpack

**Tailwind CSS** (Styling)
- Utility-first approach allows rapid, consistent design without writing CSS
- Easy to build responsive layouts for mobile and desktop

**React Leaflet** (Interactive Mapping)
- Chosen because Recharts is for data charts, but we needed interactive map features
- Leaflet is lightweight and battle-tested for geospatial applications

**Recharts** (Data Visualization)
- Declarative React-based charts make them easy to integrate with component state
- Rich visualization options for displaying soil metrics and trends

**TanStack Router & React Query**
- Separate concerns: Router handles navigation, Query handles async data fetching
- Query caching prevents unnecessary API calls and improves UX

**Radix UI** (Component Library)
- Unstyled, accessible components that I can customize with Tailwind
- Headless design gives full control over appearance and behavior

**React Hook Form** (Form State)
- Minimal re-renders — keeps forms fast even with many fields
- Zod integration provides runtime validation alongside TypeScript types

## 📚 What I Learned

- **Component Architecture** - Building scalable, reusable components with clear prop interfaces
- **Data Visualization** - How to choose the right chart types for different data patterns
- **User-Centered Development** - Translating UX research findings into technical implementations
- **Library Selection** - Understanding trade-offs between libraries and picking the right tool for each job
- **Performance Optimization** - Using React Query and efficient rendering to handle real-time data updates
- **Responsive Design** - Crafting interfaces that work seamlessly across devices using Tailwind

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/murithiii/biogenic-soil-sense-redesign.git
cd biogenic-soil-sense-redesign

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔍 Project Structure
src/
├── components/ # Reusable UI components
├── pages/ # Page-level components
├── hooks/ # Custom React hooks
├── utils/ # Utility functions
└── types/ # TypeScript type definitions


## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Built by [Brandon Murithi](https://github.com/murithiii) — Frontend Developer

## 🔗 Links

- **Live Demo**: https://biogenic-soil-sense.vercel.app/
- **GitHub**: https://github.com/murithiii/biogenic-soil-sense-redesign
- **LinkedIn**: https://linkedin.com/in/brandon-murithi-1b9b10295/

---

**Built for environmental science and sustainable agriculture**
