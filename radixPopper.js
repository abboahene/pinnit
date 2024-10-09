window.addEventListener("load",function(){
    document.addEventListener("click", function (event) {
        // inplant pin in popper
        let buttonParentElement = event.target.parentElement
        const buttonParentClass = ".flex.items-center.justify-center.text-token-text-secondary.transition"
        
        // making sure it is always the button
        if(buttonParentElement.matches("svg")){
            buttonParentElement = buttonParentElement.parentElement
        }

        // if click was on action button
        if (buttonParentElement.matches(buttonParentClass)) {
            
            console.log("popper is opened!!!" )

            const radixPopperWrapperInnerDiv = document.querySelector(
            "[data-radix-popper-content-wrapper] > div"
            );

            if (radixPopperWrapperInnerDiv) {

                const clazz = "flex items-center m-1.5 p-2.5 text-sm cursor-pointer focus-visible:outline-0 radix-disabled:pointer-events-none radix-disabled:opacity-50 group relative hover:bg-[#f5f5f5] focus-visible:bg-[#f5f5f5] radix-state-open:bg-[#f5f5f5] dark:hover:bg-token-main-surface-secondary dark:focus-visible:bg-token-main-surface-secondary rounded-md my-0 px-3 mx-2 dark:radix-state-open:bg-token-main-surface-secondary gap-2.5 py-3"
                const pinMenuItem = createElement({
                    tag: "div",
                    attrs: {
                        class: clazz,
                        tabIndex: "-1",
                        "data-radix-collection-item": "",
                        "data-orientation": "vertical",
                        role:"menuitem"
                    },
                    content: buildPinMenuItemHTML()
                })

                // add event listener to pin button
                pinMenuItem.addEventListener("click", () => {

                    // get conversation title & url
                    const noDragableParentDiv = buttonParentElement.closest('.no-draggable.group.relative');
                    const conversationUrl = noDragableParentDiv.querySelector('a').getAttribute('href')
                    const conversationTitle = noDragableParentDiv.querySelector('a > div').textContent.trim();
                    console.log(conversationTitle, conversationUrl, "testing!!!")
                    // get conversation id
                    const conversationId = conversationUrl.split("c/").at(-1)

                    // add to UI if data is not already in browser storage
                    retrieveFromBrowserStorage([conversationId], (storage) => {
                        if(!storage[conversationId]){
                            const conversationList = document.querySelector('#pinned-list-ol')
                            const newListItem = buildListItems({[conversationId]: { title: conversationTitle }}).at(0)
                            const closeButton = newListItem.querySelector(".pin-ext-close-btn")
                            closeButton.addEventListener("click", () => unpinConversation(closeButton, conversationId))
                            conversationList.insertBefore(newListItem, conversationList.firstChild)
                        }
                    })
                    
                    // store data in browser storage
                    storeInBrowserStorage(conversationId, { title: conversationTitle })

                    // add conversation to pinned list
                    radixPopperWrapperInnerDiv.remove()
                })

                radixPopperWrapperInnerDiv.insertBefore(pinMenuItem, radixPopperWrapperInnerDiv.firstChild)
                
            }
        }
    })
})
