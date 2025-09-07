
const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;


app.use(express.json());


const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB successfully!");

    const db = client.db("resumedata");
    const collection = db.collection("resumes");

    
    app.post("/addResume", async (req, res) => {
      try {
        const resume = req.body; 
        const result = await collection.insertOne(resume);
        res.status(201).send({ message: "Resume added", id: result.insertedId });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

  
    app.get("/getResumes", async (req, res) => {
      try {
        const resumes = await collection.find().toArray();
        res.status(200).send(resumes);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    
    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}

run();
