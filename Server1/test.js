const axios = require('axios');

async function generateResponse(prompt) {
  const response = await axios.post('http://localhost:4000/api/generate', { prompt });
  return response.data.data;
}



generateResponse("test input")
  .then(response => console.log(response))
  .catch(error => console.error(error));



