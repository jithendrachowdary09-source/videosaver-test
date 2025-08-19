document.getElementById("downloadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = document.getElementById("url").value;
  document.getElementById("progress").innerText = "⏳ Downloading...";

  try {
    const res = await fetch("/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    if (data.success) {
      document.getElementById("progress").innerText = "✅ Download started! Check downloads folder.";
    } else {
      document.getElementById("progress").innerText = "❌ Error: " + data.error;
    }
  } catch (err) {
    document.getElementById("progress").innerText = "⚠️ Failed to download.";
  }
});
