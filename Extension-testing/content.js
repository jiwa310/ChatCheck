let timeoutId;
let observer;

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
                    console.log('span content:', span.textContent);
                    console.log('parentSpan content:', parentSpan.textContent);
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

<<<<<<< HEAD
// setTimeout(() => {
//     console.log('This message will be logged after a delay of 3 seconds');
//     console.log('This is a content script!');
//     startObserving();
//     let textBox = document.querySelector('div[role="textbox"].markup-eYLPri');
//     textBox.addEventListener('keydown', handleKeydown);
// }, 3000);
=======
setTimeout(() => {
    console.log('This message will be logged after a delay of 3 seconds');
    console.log('This is a content script!');
    startObserving();
    let textBox = document.querySelector('div[role="textbox"].markup-eYLPri');
    textBox.addEventListener('keydown', handleKeydown);
}, 3000);
>>>>>>> 528bc015d05cc152d2fc2b2c7d9ecbe8dcf34da4
