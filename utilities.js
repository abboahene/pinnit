//create html element
function createElement(payload = {}) {
    const {tag, attrs = {}, content} = payload
    const element = document.createElement(tag)

    for(let key of Object.keys(attrs)){
        element.setAttribute(key, attrs[key])
    }
        
    if(content) element.appendChild(content)
        
    return element
}

// create element from html string
function createElementFromHTML(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.firstChild;
}

// build group pinned section
function buildPinnedSectionHTML (list = []) {
    const pinnedSectionHtml = `
        <div class="sticky z-20 bg-token-sidebar-surface-primary top-0">
            <span class="flex h-9 items-center">
                <h3 class="flex items-center pb-2 pt-3 px-2 text-xs font-semibold text-ellipsis overflow-hidden break-all text-token-text-primary">
                <svg class="icon" width="20px" height="20px" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
                    <g transform="translate(0 -1028.4)">
                    <g transform="matrix(.70711 .70711 -.70711 .70711 737.68 297.72)">
                    <path d="m11 1028.4v13h1 6.406c-0.595-1.1-1.416-2.1-2.406-2.8v-8c0.616-0.6 1.131-1.4 1.531-2.2h-5.531-1z" fill="#c0392b"/>
                    <path d="m11 13v2 4 2l1 2v-2-6-2h-1z" transform="translate(0 1028.4)" fill="#bdc3c7"/>
                    <path d="m12 13v2 4 2 2l1-2v-2-4-2h-1z" transform="translate(0 1028.4)" fill="#7f8c8d"/>
                    <path d="m6.4688 1028.4c0.4006 0.8 0.915 1.6 1.5312 2.2v8c-0.9897 0.7-1.8113 1.7-2.4062 2.8h6.4062v-13h-5.5312z" fill="#e74c3c"/>
                    </g>
                    </g>
                </svg>   
                <span>Pinned <span class="px-1 rounded-lg text-white bg-token-text-primary">ext</span></span>
                </h3>
            </span>
        </div>
        `
    
    const pinnedSection = createElementFromHTML(pinnedSectionHtml)
    const conversationList = createElement({tag: "ol", attrs: {id: "pinned-list-ol"}})
    for(let li of list){
        conversationList.appendChild(li)
    }
    pinnedSection.append(conversationList)
    console.log(pinnedSection, "building section")
    return pinnedSection
}

function buildPinMenuItemHTML(){
    const pinMenuItemHTML = `
    <div class="flex w-5">
        <div class="flex items-center justify-center text-token-text-secondary h-5 pr-4">
            <svg class="icon" width="20px" height="20px" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
                <g transform="translate(0 -1028.4)">
                <g transform="matrix(.70711 .70711 -.70711 .70711 737.68 297.72)">
                <path d="m11 1028.4v13h1 6.406c-0.595-1.1-1.416-2.1-2.406-2.8v-8c0.616-0.6 1.131-1.4 1.531-2.2h-5.531-1z" fill="#c0392b"/>
                <path d="m11 13v2 4 2l1 2v-2-6-2h-1z" transform="translate(0 1028.4)" fill="#bdc3c7"/>
                <path d="m12 13v2 4 2 2l1-2v-2-4-2h-1z" transform="translate(0 1028.4)" fill="#7f8c8d"/>
                <path d="m6.4688 1028.4c0.4006 0.8 0.915 1.6 1.5312 2.2v8c-0.9897 0.7-1.8113 1.7-2.4062 2.8h6.4062v-13h-5.5312z" fill="#e74c3c"/>
                </g>
                </g>
            </svg> 
        </div>
        Pin
    </div>
    `
    return createElementFromHTML(pinMenuItemHTML)
}

// build coversation lists
function buildListItems(conversations) {
    const listItems = []

    for(let key of Object.keys(conversations)){

        const listHtmlString= `
        <li id=${key} class="pin-ext-li relative" pinned-data-id="history-item-0" style="height: auto;">
            <div class="no-draggable group relative rounded-lg hover:bg-token-sidebar-surface-secondary">
                <a class="pin-ext-a flex items-center gap-2 p-2" data-discover="true" href="/c/${key}" >
                    <div class="relative grow overflow-hidden whitespace-nowrap">
                        ${conversations[key].title}
                        <div class="pin-ext-li-fader absolute bottom-0 top-0 to-transparent ltr:right-0 ltr:bg-gradient-to-l rtl:left-0 rtl:bg-gradient-to-r from-token-sidebar-surface-secondary w-10 from-60%"></div>
                    </div>
                </a>
                <div class="absolute bottom-0 top-0 items-center gap-1.5 pr-2 ltr:right-0 rtl:left-0 flex">
                    <span class="pin-ext-close-span">
                        <button class="pin-ext-close-btn flex items-center justify-center text-token-text-secondary hover:text-token-text-primary"type="button">
                            <svg class="pin-ext-close-btn-svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12,11.2928932 L16.1464466,7.14644661 C16.3417088,6.95118446 16.6582912,6.95118446 16.8535534,7.14644661 C17.0488155,7.34170876 17.0488155,7.65829124 16.8535534,7.85355339 L12.7071068,12 L16.8535534,16.1464466 C17.0488155,16.3417088 17.0488155,16.6582912 16.8535534,16.8535534 C16.6582912,17.0488155 16.3417088,17.0488155 16.1464466,16.8535534 L12,12.7071068 L7.85355339,16.8535534 C7.65829124,17.0488155 7.34170876,17.0488155 7.14644661,16.8535534 C6.95118446,16.6582912 6.95118446,16.3417088 7.14644661,16.1464466 L11.2928932,12 L7.14644661,7.85355339 C6.95118446,7.65829124 6.95118446,7.34170876 7.14644661,7.14644661 C7.34170876,6.95118446 7.65829124,6.95118446 7.85355339,7.14644661 L12,11.2928932 Z"/>
                            </svg>
                        </button>
                    </span>
                </div>
            </div>
        </li>
        `
        const newListItem = createElementFromHTML(listHtmlString)
        const closeButton = newListItem.querySelector(".pin-ext-close-btn")
        closeButton.addEventListener("click", () => unpinConversation(closeButton, key))

        listItems.push(newListItem)
    }
    return listItems
}

// Store data in chrome storage
function storeInBrowserStorage(key, value){
    chrome.storage.local.set({[key]: value}, () => {
        if (chrome.runtime.lastError) {
            console.error('Error saving key:', chrome.runtime.lastError);
        } else {
            console.log("Data saved to chrome storage with key:", key);
        }
    });
}

// Retrieve data from chrome storage
function retrieveFromBrowserStorage(keys = [], callback){
    chrome.storage.local.get(keys, (result) => {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving key:', chrome.runtime.lastError);
        } else {
            console.log("Data retrieved from chrome storage:", result);
            if(callback) callback(result || {})
        }
    });
}

// Remove data from chrome storage
function removeFromBrowserStorage(key) {
    chrome.storage.local.remove(key, () => {
        if (chrome.runtime.lastError) {
            console.error('Error removing key:', chrome.runtime.lastError);
        } else {
            console.log(`Key '${key}' removed from storage.`);
        }
    });
}

// Clear data from chrome storage
function clearBrowserStorage() {
    chrome.storage.local.clear(() => {
        if (chrome.runtime.lastError) {
            console.error('Error clearing storage:', chrome.runtime.lastError);
        } else {
            console.log('All data cleared from storage.');
        }
    });
}

// unpin a conversation
function unpinConversation(closeButton, key) {
    removeFromBrowserStorage(key)
    const listItem = closeButton.closest("li")
    listItem.remove()
}

function pollForElement(selector, callback, interval = 100, maxAttempts = 50) {
    let attempts = 0;

    const poll = setInterval(() => {
        const element = document.querySelector(selector);
        
        if (element) {
            clearInterval(poll); // Stop polling if the element is found
            callback(element); // Call the callback function with the found element
        } else {
            attempts++;
            if (attempts >= maxAttempts) {
                clearInterval(poll); // Stop polling after max attempts
                console.warn(`Element with selector "${selector}" not found after ${maxAttempts} attempts.`);
            }
        }
    }, interval);
}