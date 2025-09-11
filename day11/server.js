const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

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

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const result = await projects.updateOne({ _id: new ObjectId(id) }, { $set: updatedData });
      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json({ message: "Project updated" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await projects.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json({ message: "Project deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main().catch(console.error);
