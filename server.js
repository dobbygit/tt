// Simple Express server for local testing
const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle SPA routing - redirect all requests to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
