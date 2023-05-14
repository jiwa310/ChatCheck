let timeoutId;
let observer;

// const axios = require('axios');

// async function generateResponse(prompt) {
//     const response = await axios.post('http://localhost:5000/api/generate', { prompt });
//     return response.data.data;
// }

function startObserving() {
    let textBox = document.querySelector('div[role="textbox"].markup-eYLPri');
    if (textBox) {
        let span = textBox.querySelector('div span span span');
        if (span) {
            let parentSpan = span.parentElement;
            let grandparentSpan = span.parentElement.parentElement;
            let img = document.createElement('img');
            img.addEventListener('mouseover', () => {
                let rectangle = document.createElement('div');
                rectangle.textContent = 'Your text here';
                rectangle.style.cssText = '/* add your styles here */';
                grandparentSpan.replaceChild(rectangle, img);
            });
            observer = new MutationObserver(mutations => {
                clearTimeout(timeoutId);
                img.src = chrome.runtime.getURL("images/brilliant_32x.png");
                if (grandparentSpan.contains(img)||grandparentSpan.contains(textBox)) {
                    grandparentSpan.removeChild(img);
                }
                timeoutId = setTimeout(() => {
                    console.log('parentSpan content:', parentSpan.textContent);
                    // generateResponse(parentSpan.textContent)
                    //     .then(response => console.log(response))
                    //     .catch(error => console.log(error));
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
}, 3000);