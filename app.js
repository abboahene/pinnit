window.addEventListener("load", function(){
    const injectPinnedTabs = (element) => {
        const tabsContainerInnerDiv = element;
        console.log("Injecting pinned tabs...");
        console.log(tabsContainerInnerDiv);
        if (tabsContainerInnerDiv) {
            // retrieve pinned items
            retrieveFromBrowserStorage(null, (data = {}) => {
                const listItems = buildListItems(data)
                const pinnedSectionHTML = buildPinnedSectionHTML(listItems)
                console.log("pinned data: ", data)
                console.log("pinnedSectionHTML: ", pinnedSectionHTML)
                const pinnedSectionDiv = createElement({
                    tag: "div", 
                    attr: {"class": "relative mt-5 first:mt-0 last:mb-5 custom"}, 
                    content: pinnedSectionHTML})
    
                tabsContainerInnerDiv.insertBefore(pinnedSectionDiv, tabsContainerInnerDiv.firstChild)
            })
        }
    }

    // observe node for pins
    console.log("loaded tabs container...");
    pollForElement(".flex.flex-col.gap-2.pb-2.text-token-text-primary.text-sm.mt-5 > div", injectPinnedTabs)
    
})

