
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const WorkExpSchema = new mongoose.Schema({
  company: String,
  role: String,
  description: String,
  startDate: Date,
  endDate: Date,
  isCurrent: Boolean
});

const WorkExperience = mongoose.model("WorkExperience", WorkExpSchema);


app.post("/api/work", async (req, res) => {
  const exp = new WorkExperience(req.body);
  await exp.save();
  res.json(exp);
});

app.get("/api/work", async (req, res) => {
  const exp = await WorkExperience.find();
  res.json(exp);
});

app.put("/api/work/:id", async (req, res) => {
  const exp = await WorkExperience.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(exp);
});

app.delete("/api/work/:id", async (req, res) => {
  await WorkExperience.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
