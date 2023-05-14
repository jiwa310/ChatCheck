import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const textmessage = req.body.textmessage || '';
  if (textmessage.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid textmessage",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(textmessage),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(textmessage) {
  const capitalizedtextmessage =
    textmessage[0].toUpperCase() + textmessage.slice(1).toLowerCase();
  return `I am a lonely person trying to charm someone I am sexually attracted to
  I am messaging this person on a dating app. Rate how good my messages are on a scale of 1-10. If below a 5/10, give 
  me an example of a good line.
  
  Me: Hey, how are you?
  Rating: 5/10. Safe choice, but a little boring.
  Me: I need a map so I don't get lost in your eyes.
  Rating: 8/10. Cheesy, but funny.
  Me: I want you to sit on my face mommy.
  Rating: 1/10. Very bold, but also very inappropriate.
  Me: ${capitalizedtextmessage}
  Rating:`;
}
