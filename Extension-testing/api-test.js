const axios = require('axios');

async function generateResponse(prompt) {
  const response = await axios.post('http://localhost:5000/api/generate', { prompt });
  return response.data.data;
}

generateResponse('Hello, how are you?')
  .then(response => console.log(response))
  .catch(error => console.error(error));