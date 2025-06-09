
export default async function handler(req, res) {
  const { prompt, notes } = req.body;

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful essay writer.' },
          { role: 'user', content: `Main Idea:\n${prompt}\n\nJot Notes:\n${notes}` }
        ],
        max_tokens: 700
      })
    });

    const data = await openaiRes.json();
    res.status(200).json({ response: data.choices?.[0]?.message?.content || "Error generating." });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
