const axios = require('axios');

// async function generateResponse(prompt) {
//   const response = await axios.post('https://rizz-eval-production.up.railway.app/api/generate', { prompt });
//   return response.data.data;
// }

async function generateResponse(prompt) {
    const response = await fetch('https://rizz-eval-production.up.railway.app/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return data.data;
    
  }



generateResponse("I'd love to get to know you better")
  .then(response => console.log(response))
  .catch(error => console.error(error));



