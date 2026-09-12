export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                error: "Please enter a message."
            });
        }

        const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-5.6-luna",
                input: [
                    {
                        role: "system",
                        content:
                            "You are the AI learning assistant for a student learning platform. Help students understand subjects such as Computer Science, Mathematics, programming, accounting, and general academic topics. Explain things clearly and step by step. Do not simply give answers when teaching; help the student understand the solution."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenAI error:", data);

            return res.status(response.status).json({
                error: "The AI service returned an error."
            });
        }

        return res.status(200).json({
            reply: data.output_text
        });

    } catch (error) {
        console.error("Server error:", error);

        return res.status(500).json({
            error: "Something went wrong while contacting the AI."
        });
    }
}
