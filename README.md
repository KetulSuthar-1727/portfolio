# Ketul Suthar Portfolio

Personal portfolio website for Ketul Suthar, built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Features

- Animated hero section with a premium dark visual style
- Sections for about, skills, experience, projects, education, and contact
- Smooth scrolling navigation
- Downloadable resume
- Contact form powered by EmailJS
- Responsive layout with reduced-motion support

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- EmailJS
- react-icons

## Getting Started

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the local URL printed in the terminal.

### Build for production

```bash
npm run build
```

## Project Structure

```txt
src/
  components/
  data/content.ts
  hooks/
  sections/
  index.css
public/
  Ketul_Suthar_Software_Engineer.pdf
```

## Updating Content

Most site content lives in [`src/data/content.ts`](src/data/content.ts). Update that file to change:

- Profile details
- Skills
- Experience
- Projects
- Education
- Social links
- Resume path

To replace the resume, update `public/Ketul_Suthar_Software_Engineer.pdf` or change `resumeUrl` in `src/data/content.ts`.

## Contact Form Setup

The contact form uses EmailJS and requires three environment variables:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
```

Create a `.env` file in the project root, add the values from your EmailJS dashboard, and restart the dev server.

## Deployment

The project is ready for deployment on Vercel or any static hosting provider that supports Vite builds.

### Vercel

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Add the same EmailJS environment variables in the Vercel dashboard.
4. Deploy.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - type-check and build for production
- `npm run preview` - preview the production build
- `npm run lint` - run Oxlint

