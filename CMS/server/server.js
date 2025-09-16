const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("../config/database");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.static("public"));
// Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
