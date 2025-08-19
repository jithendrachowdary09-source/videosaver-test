const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const ytdlp = require("yt-dlp-exec");

const app = express();
const PORT = process.env.PORT || 3000;

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/downloads", express.static(path.join(__dirname, "downloads")));

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "YTVideoSaver - Free YouTube Video Downloader (4K Supported)",
    description: "Download YouTube videos in 4K, MP4, or MP3 with YTVideoSaver. Fast, free, and SEO-friendly downloader.",
    keywords: "YouTube downloader, 4K video download, free YouTube MP4, YTVideoSaver, save YouTube videos",
    url: req.protocol + "://" + req.get("host")
  });
});

// Download Route
app.post("/download", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "No URL provided" });

    const outputDir = path.join(__dirname, "downloads");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    console.log("Downloading:", url);

    const video = await ytdlp(url, {
      output: path.join(outputDir, "%(title)s.%(ext)s"),
      format: "bestvideo+bestaudio/best"
    });

    res.json({ success: true, message: "Download started", file: video });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Download failed" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 YTVideoSaver running at http://localhost:${PORT}`);
});
