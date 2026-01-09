# AK Tech Blog 🚀

[Live Preview](https://aktechblog.vercel.app/) • [GitHub Repo](https://github.com/AmrendraCodes/aktechblog)

A modern tech blog website with a clean UI, dark mode, and CMS-driven content. The project focuses on web development, AI, cloud, and other modern web topics.

---

## Table of Contents

- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [About Page & Vision](#about-page--vision)
- [Real-World Challenges & Debugging Experience](#real-world-challenges--debugging-experience)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Screenshots

Replace these with your repository images or a `screenshots/` folder for better control.

### Home Page
![Home page screenshot](https://github.com/user-attachments/assets/17835f94-38b5-456f-b289-e22856d71eeb)

### Blog Page
![Blog page screenshot](https://github.com/user-attachments/assets/2678b955-1793-4c8f-9975-92fff0cff1cb)

### About Page
![About page screenshot](https://github.com/user-attachments/assets/32c7134a-6c02-4e0d-b3c8-8c36549d1e52)

---

## ✨ Features

- ⚡ Modern UI with gradient hero section
- 🌙 Dark mode support
- 📝 Blog listing with categories
- 🔍 Search functionality for blogs
- 📅 Blog metadata (date & read time)
- 📱 Fully responsive design
- 🔗 Dedicated pages: Home, Blog, About, Contact
- 🧩 CMS-ready architecture (Strapi-friendly)

---

## 🧑‍💻 Tech Stack

- Frontend: HTML, CSS, JavaScript
- Framework: React + Vite
- Styling: Tailwind CSS (or custom CSS)
- CMS: Strapi (Headless CMS)
- Deployment: Vercel

---

## 📂 Project Structure

```
aktechblog/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Blog/
│   │   ├── About/
│   │   └── Contact/
│   ├── assets/
│   └── utils/
├── .env
├── package.json
└── README.md
```

---

## Prerequisites

- Node.js (recommend LTS, e.g. 18+)
- npm or yarn
- (Optional) Strapi Cloud account or local Strapi instance for the CMS

Add a note about the Node version in package.json `engines` or a `.nvmrc` file if you want to be specific.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (do NOT commit `.env`). Add a `.env.example` to show required variables.

Example `.env`:

```env
VITE_STRAPI_API_URL=https://your-strapi-instance-url
VITE_STRAPI_API_TOKEN=your_strapi_api_token
```

Notes:
- For Vite, environment variables that should be exposed to client-side code must start with `VITE_`.
- If you run Strapi locally, point `VITE_STRAPI_API_URL` to your local Strapi URL (e.g., `http://localhost:1337`).

---

## 🚀 Getting Started

1. Clone the repository

```bash
git clone https://github.com/AmrendraCodes/aktechblog.git
cd aktechblog
```

2. Install dependencies

```bash
npm install
# or
yarn
```

3. Add environment variables

- Copy `.env.example` to `.env` and set values.

4. Start development server

```bash
npm run dev
# or
yarn dev
```

5. Build for production

```bash
npm run build
# or
yarn build
```

---

## About Page & Vision

This blog is about sharing knowledge — deep dives and practical guides written by developers, for developers. The About page explains the project's vision and goals.

---

## Real-World Challenges & Debugging Experience

This project provided hands-on experience with production-level issues while integrating a React frontend with Strapi Cloud CMS:

- Initially designed UI, then migrated to React and continued development.
- Deployed on Vercel and integrated with Strapi.
- Troubleshot Strapi integration failures by debugging API calls and CMS configuration.
- Fixed delayed rendering caused by inefficient API queries and missing pagination.
- Optimized usage of Strapi `populate` to avoid performance regressions.
- Resolved `400` errors by correctly managing environment variables and regenerating API tokens.
- Used browser DevTools (Network & Console) to trace caching and rendering issues.
- Fixed role/permission mismatches (e.g., wrong field names like `featureimage` vs `cover`) and updated code accordingly.

---

## 🛠️ Future Improvements

- 🔐 Authentication (Admin / Author)
- 🗂️ Blog pagination
- 🏷️ Tags & advanced filters
- 💬 Comments system (e.g., Disqus, Commento, or custom)
- 📈 SEO optimization (structured data, sitemap, meta tags)
- 🔁 CI/CD (tests, linting, previews)
- ♿ Accessibility improvements & performance tuning

---

## 🤝 Contributing

Contributions are welcome! Suggested additions:
- Add a `CONTRIBUTING.md` with contribution workflow and PR template
- Add a `CODE_OF_CONDUCT.md`
- Provide `ISSUE_TEMPLATE` and `PULL_REQUEST_TEMPLATE` files
- Add `.env.example` showing required environment variables

Steps to contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes, add tests where applicable
4. Open a pull request describing the change

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file.

---

## 🙋‍♂️ Author

**Amrendra Kumar**  
Frontend Developer | Tech Enthusiast  
GitHub: [@AmrendraCodes](https://github.com/AmrendraCodes)

---

If you like this project, don’t forget to star the repository!
