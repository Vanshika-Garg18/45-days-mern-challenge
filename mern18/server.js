const express = require("express");
const app = express();

app.use(express.json());


app.get("/health", (req, res) => res.send("My health is Superb"));


app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from Enterprise API 🚀" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
