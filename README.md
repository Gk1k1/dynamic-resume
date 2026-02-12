# 🚀 Dynamic Resume

A full-stack dynamic resume web application built with **Node.js**, **Express**, and **EJS** server-side rendering.

## Features

- 📄 **Dynamic Resume** — Renders name, summary, skills, projects, education, and experience from backend data
- ⚙️ **Admin Dashboard** — Add/delete projects, update skills, summary, and profile info
- 🔌 **REST API** — Programmatic access to resume data at `/api/resume`
- 🎨 **Premium Dark UI** — Glassmorphism cards, smooth animations, fully responsive
- 🐳 **Docker Ready** — Production-ready Dockerfile included

## Folder Structure

```
dynamic-resume/
├── app.js                  # Express application entry point
├── package.json
├── Dockerfile
├── .dockerignore
├── controllers/
│   └── resumeController.js # Route handlers
├── middleware/
│   └── errorHandler.js     # 404 & global error middleware
├── routes/
│   ├── homeRoutes.js       # GET /
│   ├── adminRoutes.js      # GET/POST /admin/*
│   └── apiRoutes.js        # GET/PUT /api/resume
├── data/
│   └── resume.json         # Resume data store
├── views/
│   ├── index.ejs           # Main resume page
│   ├── admin.ejs           # Admin dashboard
│   ├── error.ejs           # Error page
│   └── partials/
│       ├── header.ejs
│       ├── navbar.ejs
│       └── footer.ejs
└── public/
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## Getting Started

### Prerequisites
- **Node.js** 18+ installed
- **npm** or **yarn**

### Install & Run

```bash
# Install dependencies
npm install

# Start in development mode (with auto-reload)
npm run dev

# Start in production mode
npm start
```

Then open **http://localhost:3000** in your browser.

- **Main Resume**: [http://localhost:3000](http://localhost:3000)
- **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **REST API**: [http://localhost:3000/api/resume](http://localhost:3000/api/resume)

## Docker

### Build the image

```bash
docker build -t dynamic-resume .
```

### Run the container

```bash
docker run -d -p 3000:3000 --name resume-app dynamic-resume
```

Access the app at **http://localhost:3000**.

### Stop the container

```bash
docker stop resume-app
docker rm resume-app
```

## API Endpoints

| Method | Endpoint       | Description               |
|--------|----------------|---------------------------|
| GET    | `/`            | Main resume page          |
| GET    | `/admin`       | Admin dashboard           |
| POST   | `/admin/projects` | Add new project         |
| POST   | `/admin/projects/delete/:id` | Delete project |
| POST   | `/admin/skills` | Update skills            |
| POST   | `/admin/summary` | Update summary          |
| POST   | `/admin/profile` | Update profile info     |
| GET    | `/api/resume`  | Get all resume data (JSON)|
| PUT    | `/api/resume`  | Update resume data (JSON) |

## License

ISC
