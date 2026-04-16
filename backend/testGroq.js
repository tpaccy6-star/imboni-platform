require('dotenv').config();
const Groq = require('groq-sdk');

const test = async () => {
    try {
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY_1 || process.env.GROQ_API_KEY_2 });
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: 'Hello' }
            ],
            model: 'llama3-70b-8192',
            temperature: 0.5,
            max_tokens: 5,
        });
        console.log("Success:", chatCompletion.choices[0].message.content);
    } catch (err) {
        console.error("Groq Error:", err.message);
    }
}
test();
