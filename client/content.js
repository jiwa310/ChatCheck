let timeoutId;
let observer;

// const axios = require('axios');

// async function generateResponse(prompt) {
//   const response = await axios.post('http://localhost:5000/api/generate', { prompt });
//   return response.data.data;
// }



  //-------------WHAT JIM WROTE---------------------------

// async function sendRequest(textmessage) {
//     const response = await fetch('http://localhost:5000/api/generate', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ textmessage })
//     });
//     const data = await response.json();
//     // Handle the response data here
//   }

function startObserving() {
    let textBox = document.querySelector('div[role="textbox"].markup-eYLPri');
    if (textBox) {
        let span = textBox.querySelector('div span span span');
        if (span) {
            let parentSpan = span.parentElement;
            let grandparentSpan = span.parentElement.parentElement;
            let img = document.createElement('img');
            observer = new MutationObserver(mutations => {
                clearTimeout(timeoutId);
                img.src = chrome.runtime.getURL("images/brilliant_32x.png");
                if (grandparentSpan.contains(img)) {
                    grandparentSpan.removeChild(img);
                }
                timeoutId = setTimeout(() => {
                    console.log('parentSpan content:', parentSpan.textContent);
                    //SCOTT WROTE THIS-----------------------------------------------------
                    // generateResponse(parentSpan.textContent)
                    //     .then(response => console.log(response))
                    //     .catch(error => console.error(error));
                    //SCOTT WROTE THIS-----------------------------------------------------
                    //sendRequest(parentSpan.textContent); // Send the request to the server

                    grandparentSpan.appendChild(img);
                }, 2000);
            });
            observer.observe(span, { characterData: true, childList: true, subtree: true });
            observer.observe(parentSpan, { characterData: true, childList: true, subtree: true });
        }
    }
}

function restartObserving() {
    observer.disconnect();
    startObserving();
}

function handleKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        restartObserving();
    }
}

setTimeout(() => {
    console.log('This message will be logged after a delay of 3 seconds');
    console.log('This is a content script!');
    startObserving();
    let textBox = document.querySelector('div[role="textbox"].markup-eYLPri');
    textBox.addEventListener('keydown', handleKeydown);
       
}, 10000); //Load times vary by computer, temporary fix for now, create onload funciton later.