# AK Tech Blog 🚀

A modern **Tech Blog website** built with a clean UI, dark mode support, and CMS-driven content. This project is designed to showcase technical blogs related to **web development, AI, cloud, and modern technologies**.

🔗 **Live Preview**: *(https://aktechblog.vercel.app/)*

🔗 **GitHub Repo**: [https://github.com/AmrendraCodes/aktechblog](https://github.com/AmrendraCodes/aktechblog)

---

## 📸 Screenshots

### 🏠 Home Page

<img width="1907" height="942" alt="image" src="https://github.com/user-attachments/assets/17835f94-38b5-456f-b289-e22856d71eeb" />


### 📰 Blog Page


<img width="1903" height="920" alt="image" src="https://github.com/user-attachments/assets/2678b955-1793-4c8f-9975-92fff0cff1cb" />

### 📰 About Page 

<img width="1920" height="967" alt="image" src="https://github.com/user-attachments/assets/32c7134a-6c02-4e0d-b3c8-8c36549d1e52" />


---

## ✨ Features

* ⚡ Modern UI with gradient hero section
* 🌙 Dark mode support
* 📝 Blog listing with categories
* 🔍 Search functionality for blogs
* 📅 Blog metadata (date & read time)
* 📱 Fully responsive design
* 🔗 Dedicated pages: Home, Blog, About, Contact
* 🧩 CMS-ready architecture (Strapi-friendly)

---

## 🧑‍💻 Tech Stack

* **Frontend**: HTML, CSS, JavaScript
* **Framework**: React / Vite *(if applicable)*
* **Styling**: Tailwind CSS / Custom CSS
* **CMS**: Strapi (Headless CMS)
* **Deployment**: Vercel 

---

## 📂 Project Structure

```
aktechblog/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── Home
│   │   ├── Blog
│   │   ├── About
│   │   └── Contact
│   ├── assets/
│   └── utils/
├── .env
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
VITE_STRAPI_API_URL=your_strapi_api_url
VITE_STRAPI_API_TOKEN=your_api_token
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/AmrendraCodes/aktechblog.git
cd aktechblog
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start development server

```bash
npm run dev
```

---

## 📖 About Page

The **About section** explains the vision of the blog — sharing knowledge, deep dives, and practical guides written **by developers, for developers**.

---


##Real-World Challenges & Debugging Experience

## 🧩 Real-World Challenges & Debugging Experience

This project helped me gain hands-on experience with real production-level issues while integrating a frontend with Strapi Cloud CMS.

- Designed the initial UI using a custom method, then imported the project into GitHub and continued development using VS Code and an AI-assisted code editor.
- Redesigned the Home page and sub-pages using React after the initial setup.
- Deployed the project on Vercel and integrated it with Strapi Cloud CMS.
- Faced initial Strapi integration failures and resolved them by debugging API calls and CMS configuration.
- Fixed delayed blog rendering issues caused by inefficient API queries and missing pagination logic.
- Identified performance issues caused by using `populate=*` and optimized the populate strategy.
- Debugged missing content issues that occurred after populate changes.
- Resolved `400` API errors by correctly setting up environment variables and adding a secure API token.
- Regenerated and configured Strapi API tokens from the admin panel to restore data access.
- Implemented SEO improvements using React Helmet and debugged blank-screen issues caused by misconfiguration.
- Debugged role-based permission issues in Strapi where incorrect field access (`featureimage` instead of `cover`) caused data mismatch.
- Resolved blank page and buffering issues where data was fetched, but React routing failed to re-render correctly.
- Fixed image rendering issues where outdated API attributes were returning stale data by correcting attribute paths.
- Actively used browser DevTools (Network & Console) to trace API responses, caching issues, and rendering bugs.


## 🛠️ Future Improvements

* 🔐 Authentication (Admin / Author)
* 🗂️ Blog pagination
* 🏷️ Tags & advanced filters
* 💬 Comments system
* 📈 SEO optimization

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙋‍♂️ Author

**Amrendra Kumar**
Frontend Developer | Tech Enthusiast
GitHub: [@AmrendraCodes](https://github.com/AmrendraCodes)

---

⭐ If you like this project, don’t forget to **star the repository**!
