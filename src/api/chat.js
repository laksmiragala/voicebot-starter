export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  // Demo response (replace with OpenAI API later)
  let reply = "I am a demo bot. You asked: " + message;

  res.status(200).json({ text: reply });
}
