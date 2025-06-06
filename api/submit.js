export default async function handler(req, res) {
  const scriptURL = "https://script.google.com/macros/s/AKfycbxPxNpbEnCQUy0wjdQPNrVM2SwrNvjox_VDjxExKKuawpWTEpPGbf4pobgtJOhsDRdC/exec";

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error("Google Apps Script responded with error");
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Relay error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
