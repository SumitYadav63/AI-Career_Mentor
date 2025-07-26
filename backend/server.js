const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { CohereClient } = require('cohere-ai');  // Updated import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (your Mongo URI)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => { console.error('MongoDB error:', err); process.exit(1); });

// New way to instantiate Cohere client
const cohere = new CohereClient({ apiKey: process.env.CO_API_KEY });


// Endpoint for chat
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ reply: "Please send a non-empty message." });
  }
  try {
    const response = await cohere.chat({
      message: message,
      model: "command" // or another model you wish to use
    });
    const aiReply = response.text.trim();
    res.json({ reply: aiReply });
  } catch (error) {
    console.error("Cohere error:", error);
    res.status(500).json({ reply: "Sorry, I couldn't answer that right now." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
