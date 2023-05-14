let timeoutId;
let observer;

async function generateResponse(prompt) {
    const response = await fetch('https://web-production-1f6e.up.railway.app/https://rizz-eval-production.up.railway.app/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    return data.data;
  }

  const ratingToImage = {
    1: "images/blunder_32x.png",
    2: "images/incorrect_32x.png",
    3: "images/mistake_32x.png",
    4: "images/inaccuracy_32x.png",
    5: "images/good_32x.png",
    6: "images/correct_32x.png",
    7: "images/excellent_32x.png",
    8: "images/best_32x.png",
    9: "images/great_find_32x.png",
    10: "images/brilliant_32x.png"
};

function startObserving() {
    let textBox = document.querySelector('div[role="textbox"].markup-eYLPri');
    if (textBox) {
        let span = textBox.querySelector('div span span span');
        if (span) {
            let parentSpan = span.parentElement;
            let grandparentSpan = span.parentElement.parentElement;
            let img = document.createElement('img');
            img.src = chrome.runtime.getURL("brilliant_32x.png");
            let rectangle = document.createElement('div');
            rectangle.textContent = 'Placeholder text';
                rectangle.style.cssText = `
                    background-color: white;
                    border: 1px solid black;
                    border-radius: 5px;
                    padding: 5px;
                    color: black;`;
            img.addEventListener('mouseover', () => {
                grandparentSpan.replaceChild(rectangle, img);
            });
            observer = new MutationObserver(mutations => {
                clearTimeout(timeoutId);

                if (grandparentSpan.contains(img)) {
                    grandparentSpan.removeChild(img);
                }
                if (grandparentSpan.contains(rectangle)) {
                    grandparentSpan.removeChild(rectangle);
                }

                timeoutId = setTimeout(() => {
                    let responseString = 'test';
                    generateResponse(parentSpan.textContent)
                    .then(response => {
                        responseString = response;
                        console.log('responseString:', responseString);
                        const match = responseString.match(/(\d+)\/10\.\s*(.*)/);
                        if (match) {
                            const rating = parseInt(match[1]);
                            const statement = match[2];
                            // Change this based on the rating
                            let img_url = ratingToImage[rating];
                            img.src = chrome.runtime.getURL(img_url);
                            rectangle.textContent = statement;
                            grandparentSpan.appendChild(img);
                        }
                    })
                    .catch(error => console.log(error));
                }, 1000);
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
}, 5000);