To enhance the readability and usability of your README, you might consider structuring it to include an introduction, detailed instructions for setting up and running the project, a concise description of the technology stack, an outline of how to use the application, and any additional resources or acknowledgments. Here's a revamped version of your README:

---

# Dizme Nobid Portal

Welcome to the Dizme Nobid Portal, a cutting-edge project utilizing Next.js, tailored for creating an engaging web experience. This project is bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and is designed to demonstrate the seamless integration of Next.js features and optimizations.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 12.22.0 or later
- npm/yarn/pnpm/bun (whichever package manager you prefer)

## Getting Started

To get the project up and running on your local machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone git@gitlab.mgmt.infocert.it:npd/new_dizme_waltid/dizme-nobid-portal.git
   cd dizme-nobid-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
   
   Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

4. **Edit your pages:** Start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Technology Stack

This project makes use of:
- Next.js for SSR (Server-Side Rendering) and static site generation.
- `next/font` for automatic font optimization.
- Tailwind CSS for styling.
- Keycloak for secure authentication.

## Environment Configuration

Please configure your environment variables according to the `env.local.sample` provided. Fill in the necessary details for connecting to Keycloak and other services.

## Deployment

TODO

## Learn More

To dive deeper into Next.js and explore its vast capabilities, check out the following resources:
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

Your feedback and contributions to the [Next.js GitHub repository](https://github.com/vercel/next.js/) are highly appreciated!

## License

[Specify the license under which this project is available, e.g., MIT, GPL]

---

This version aims to make your README clearer and more structured, offering readers an easy-to-follow guide for setting up and understanding the project. Adjust any section as necessary to fit the specific needs or details of your project.