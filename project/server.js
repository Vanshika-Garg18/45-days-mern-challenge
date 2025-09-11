const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 5000;

app.use(express.json());

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "myDatabase";

async function main() {
  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db(dbName);
  const projects = db.collection("projects");

  app.post("/api/projects", async (req, res) => {
    try {
      const newProject = req.body;
      const result = await projects.insertOne(newProject);
      res.status(201).json({ message: "Project added", projectId: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const allProjects = await projects.find().toArray();
      res.status(200).json(allProjects);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(PORT, () => [
    console.log("Server running on http://localhost:5000")
  ]);
}

main().catch(console.error);