# Not My Type — Premium Mechanical Keyboard Storefront

**Not My Type** is a high-end, gallery-style e-commerce Single Page Application (SPA) dedicated to mechanical keyboard enthusiasts. The platform focuses on a minimalist, premium "white-out" aesthetic, providing a seamless shopping experience for custom keyboards, keycaps, and switches.

![Storefront Preview](src/assets/hero.png)

## ✨ Key Features

### 🛍️ Premium Shopping Experience
- **Gallery-Style Browsing**: A clean, distraction-free interface to explore curated keyboard components.
- **Dynamic Product Detail Page (PDP)**: Full-page product views featuring high-resolution image carousels and thumbnail navigation.
- **Smart Filtering**: Streamlined category filters for Keyboards, Keycaps, and Switches.

### 💬 Community & Feedback
- **Functional Reviews**: A star-rating and review system that allows users to share their typing experiences.
- **Interactive Discussions**: A social-style discussion board for community questions and troubleshooting.
- **Session Persistence**: Reviews and discussions are saved in memory and persist as you navigate throughout the store.

### 💳 Localized Checkout Flow
- **PH-Market Optimized**: Payment integration tailored for the Philippine market, including **GCash**, **Maya**, **GrabPay**, and **ShopeePay**.
- **Accordion Checkout**: A streamlined, single-page multi-step checkout process (Shipping → Payment → Review).
- **Auto-fill for Demo**: One-click demo data population to quickly test the checkout flow.

### 📦 Advanced Order Tracking
- **Real-time Logistics**: Detailed tracking dashboard featuring courier information (J&T Express) and estimated delivery dates.
- **Visual Route Map**: A stylized visual representation of the package's journey.
- **Detailed History**: A complete timeline of shipping milestones from processing to delivery.

## 🛠️ Technology Stack

- **Core**: Vanilla JavaScript (ES6+) with a custom hash-based router.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for a modern, responsive design system.
- **Build Tool**: [Vite](https://vitejs.dev/) for ultra-fast development and optimized production builds.
- **Icons**: Custom SVG icons and Lucide-inspired components.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd Marketplace
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the local development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Production Build
Build the project for production:
```bash
npm run build
```
The output will be generated in the `dist/` directory.

## 📁 Project Structure

- `src/components/`: Modular UI components (Navbar, Cart, ProductDetail, etc.)
- `src/data/`: Centralized product and mock order data.
- `src/store.js`: Global state management for the cart and filters.
- `src/router.js`: Custom hash-based SPA router logic.
- `src/style.css`: Global styles and Tailwind configuration.
- `public/`: Static assets and high-resolution product photography.

---

*Designed and Built for the Enthusiast Community.*
