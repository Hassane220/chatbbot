const OpenAI = require('openai');
//const { OpenAIAPI } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 4000;

//const OPENAI_API_KEY = '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';

app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());


const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
  });
}

main();

app.post('/chat', async (req, res) => {   
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: "user", content: req.body.question }],
            model: "gpt-3.5-turbo",
        });

        res.status(200).json({ message: chatCompletion.choices[0].message.content });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

app.listen(port, () => {
    console.log("Server is active");
});
