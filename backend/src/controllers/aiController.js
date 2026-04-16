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

2. For each scholarship, ALWAYS provide the exact details:
   - Scholarship Name
   - Short Description
   - Eligibility Criteria
   - Funding Coverage (what is included)
   - Starting Time to Apply (Opening Date, if known)
   - Application Deadline
   - Official Application Link

3. Prioritize:
   - Recently announced or trending scholarships
   - Fully funded opportunities
   - Scholarships relevant to students in Africa (especially Rwanda)

4. Ensure:
   - Information is accurate and not outdated
   - Links are official
   - Content is concise

5. CRITICAL FORMATTING: You MUST format your primary output as a beautifully structured Markdown Table to make it easily managed by the Admin.
   Table columns should be: | Scholarship Name | Starting Date | Deadline | Coverage | Application Link |

6. If the admin asks for filters (e.g., "Fully funded IT scholarships"), refine the table accordingly.

7. If no current data is available, suggest reliable platforms where scholarships can be found.

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
            model: 'llama-3.3-70b-versatile',
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
