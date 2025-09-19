const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/api/users/:id", (req, res) => {
  const id = String(req.params.id); 
  res.json({ id, name: "Test User" });
});


app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({ error: "Name and email required" });
  }

  res.status(201).json({ name, email });
});


if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

module.exports = app;
