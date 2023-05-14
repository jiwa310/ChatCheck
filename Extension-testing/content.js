let timeoutId;
let observer;

function startObserving() {
    let textBox = document.querySelector('div[role="textbox"].markup-eYLPri');
    if (textBox) {
        let span = textBox.querySelector('div span span span');
        if (span) {
            let parentSpan = span.parentElement;
            observer = new MutationObserver(mutations => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    console.log('span content:', span.textContent);
                    console.log('parentSpan content:', parentSpan.textContent);
                    let img = document.createElement('img');
                    img.src = chrome.runtime.getURL("images/brilliant_32x.png");
                    parentSpan.appendChild(img);
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
    if (event.key === 'Enter') {
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