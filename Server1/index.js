const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/api/generate", async (req, res) => {
    try{
        const {prompt} = req.body;
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePrompt(prompt),
            temperature: 0.6,
            max_tokens: 100,
        });
        return res.status(200).json({ 
            success: true,
            data: response.data.choices[0].text,
        });
    } catch (error){
        return res.status(400).json({
            success: false,
            error: error.response
                ? error.response.data
                : "There was an issue on the server",
        });
    }
});

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `I am messaging this person on a dating app. Rate how good my messages are on a scale of 1-10. If below a 5/10, give 
me an example of a good line. Please always follow the exact format of the examples below, starting with the integer rating then suggestions.
Write suggestions in a casual, overreacting tone.

Me: Hey, how are you?
Rating: 5/10. BOOK MOVE! Safe, but boring as hell.
Me: I need a map so I don't get lost in your eyes.
Rating: 8/10. That is so corny. But it's funny and it works :)
Me: I want you to sit on my face mommy.
Rating: 1/10. DO NOT SEND THAT. It is creepy and weird.
Me: ${capitalizedAnimal}
Rating:`;
}


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));