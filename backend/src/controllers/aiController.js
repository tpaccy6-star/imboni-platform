const Groq = require('groq-sdk');

let clients = [];
let currentClientIndex = 0;

const getClients = () => {
    if (clients.length === 0) {
        const groqKeys = [
            process.env.GROQ_API_KEY_1,
            process.env.GROQ_API_KEY_2,
            process.env.GROQ_API_KEY_3,
            process.env.GROQ_API_KEY_4
        ].filter(Boolean);
        clients = groqKeys.map(key => new Groq({ apiKey: key }));
    }
    return clients;
};

const SYSTEM_PROMPT = `You are an intelligent Scholarship Research Assistant integrated into a Scholarship Application Web App Admin Panel.

Your role is to continuously research, analyze, and provide up-to-date information about trending scholarships worldwide and locally.

Your responsibilities:
1. Find and list trending and currently open scholarships based on:
   - Academic level (Undergraduate, Masters, PhD)
   - Field of study (e.g., Computer Science, Education, Medicine, etc.)
   - Location (Global, Africa, Rwanda-specific where possible)
   - Funding type (Fully funded, partial, grants, fellowships)

2. For each scholarship, provide:
   - Scholarship Name
   - Short Description (clear and simple)
   - Eligibility Criteria
   - Application Deadline
   - Funding Coverage (what is included)
   - Official Application Link (valid and clickable)

3. Prioritize:
   - Recently announced or trending scholarships
   - Fully funded opportunities
   - Scholarships relevant to students in Africa (especially Rwanda)

4. Ensure:
   - Information is accurate and not outdated
   - Links are official (avoid spam or fake sources)
   - Content is concise but informative

5. Format output clearly as a structured list or table for easy display in the admin dashboard.

6. If the admin asks for filters (e.g., "Fully funded IT scholarships"), refine results accordingly.

7. If no current data is available, suggest reliable platforms where scholarships can be found (e.g., DAAD, Chevening, MasterCard Foundation).

8. Always act like a professional academic advisor and researcher.

Tone:
- Professional
- Clear and concise
- Helpful and informative

Important:
Do NOT generate fake scholarships. Only provide real, verifiable opportunities.

9. Highlight "Top Picks" (max 3) based on:
   - Full funding
   - Reputation
   - Relevance to African students

10. Tag each scholarship with labels like:
   [Fully Funded] [Deadline Soon] [Africa-Friendly] [Top University]`;

const chatWithAssistant = async (req, res) => {
    try {
        const { messages } = req.body;

        const activeClients = getClients();
        if (activeClients.length === 0) {
            return res.status(500).json({ error: 'No GROQ API keys are configured.' });
        }

        // Round-robin load balancer
        const groq = activeClients[currentClientIndex];
        currentClientIndex = (currentClientIndex + 1) % activeClients.length;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...(messages || [])
            ],
            model: 'llama3-70b-8192',
            temperature: 0.5,
            max_tokens: 2048,
        });

        res.json({
            reply: chatCompletion.choices[0]?.message?.content || 'I encountered an error returning a response.'
        });
    } catch (error) {
        console.error('Groq AI Chat Error:', error);
        res.status(500).json({ error: 'Failed to communicate with AI Assistant.' });
    }
};

module.exports = {
    chatWithAssistant
};
