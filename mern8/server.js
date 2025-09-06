const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());




const resume = {
  name: "John Doe",
  title: "Full Stack Developer",
  email: "john@example.com",
  phone: "+91-9876543210",
  summary:
    "Passionate developer with expertise in MERN stack and problem solving."
};


const workExperience = [
  {
    id: 1,
    company: "Tech Solutions",
    role: "Frontend Developer",
    years: "2021-2023",
    details:
      "Built and optimized React apps, improved performance and accessibility."
  },
  {
    id: 2,
    company: "CodeCraft",
    role: "Backend Developer",
    years: "2019-2021",
    details:
      "Designed REST APIs with Node.js & Express, integrated MongoDB, wrote tests."
  }
];


const projects = [
  {
    id: 1,
    name: "Portfolio Website",
    stack: ["React", "TailwindCSS"],
    description: "Personal site to showcase projects and blogs."
  },
  {
    id: 2,
    name: "E-Commerce App",
    stack: ["MERN", "Stripe"],
    description: "Shopping app with auth, cart, and payments."
  },
  {
    id: 3,
    name: "Chat App",
    stack: ["Node", "Socket.IO"],
    description: "Realtime chat with rooms, typing indicators."
  }
];




app.get("/api/resume", (req, res) => {
  res.json(resume);
});


app.get("/api/work-experience", (req, res) => {
  res.json(workExperience);
});

app.get("/api/projects/:id", (req, res) => {
  const id = Number(req.params.id);
  const project = projects.find((p) => p.id === id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Project id must be a number." });
  }
  if (!project) {
    return res.status(404).json({ message: "Project not found." });
  }
  res.json(project);
});


app.get("/", (_req, res) => {
  res.send("Resume API is running ✅");
});


app.listen(PORT, () => {
  console.log('Server running at http://localhost:${PORT}');
});