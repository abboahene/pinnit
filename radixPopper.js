window.addEventListener("load", function () {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeType === 1 &&
            node.matches("div[data-radix-popper-content-wrapper]")
          ) {
            const menuItemDiv = node.querySelector('div[role="menuitem"]');

            if (menuItemDiv) {
              const clonedMenuItem = menuItemDiv.cloneNode(true);

              const textNode = clonedMenuItem.lastChild;
              if (textNode.nodeType === Node.TEXT_NODE) {
                textNode.textContent = "Pin";
              }

              const existingSvg = clonedMenuItem.querySelector("svg");
              if (existingSvg) {
                existingSvg.outerHTML = `
                      <svg class="icon" width="20px" height="20px" viewBox="0 0 24 24" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">
                          <g transform="translate(0 -1028.4)">
                          <g transform="matrix(.70711 .70711 -.70711 .70711 737.68 297.72)">
                          <path d="m11 1028.4v13h1 6.406c-0.595-1.1-1.416-2.1-2.406-2.8v-8c0.616-0.6 1.131-1.4 1.531-2.2h-5.531-1z" fill="#c0392b"/>
                          <path d="m11 13v2 4 2l1 2v-2-6-2h-1z" transform="translate(0 1028.4)" fill="#bdc3c7"/>
                          <path d="m12 13v2 4 2 2l1-2v-2-4-2h-1z" transform="translate(0 1028.4)" fill="#7f8c8d"/>
                          <path d="m6.4688 1028.4c0.4006 0.8 0.915 1.6 1.5312 2.2v8c-0.9897 0.7-1.8113 1.7-2.4062 2.8h6.4062v-13h-5.5312z" fill="#e74c3c"/>
                          </g>
                          </g>
                      </svg>`;
              }

              clonedMenuItem.addEventListener("click", () => {
                const btn = document.querySelector('button[data-state="open"]');
                // get conversation title & url
                const aTag = btn
                  .closest("div.relative")
                  .querySelector('a[data-discover="true"]');
                const href = aTag.getAttribute("href");
                const conversationTitle = aTag.textContent;
                // get conversation id
                const conversationId = href.split("/").pop();

                // add to UI if data is not already in browser storage
                retrieveFromBrowserStorage([conversationId], (storage) => {
                  if (!storage[conversationId]) {
                    const conversationList =
                      document.querySelector("#pinned-list-ol");
                    const newListItem = buildListItems({
                      [conversationId]: { title: conversationTitle },
                    }).at(0);
                    const closeButton =
                      newListItem.querySelector(".pin-ext-close-btn");
                    closeButton.addEventListener("click", () =>
                      unpinConversation(closeButton, conversationId)
                    );
                    conversationList.insertBefore(
                      newListItem,
                      conversationList.firstChild
                    );
                  }
                });

                // store data in browser storage
                storeInBrowserStorage(conversationId, {
                  title: conversationTitle,
                });

                parentDiv.remove();
              });

              const parentDiv = menuItemDiv.parentElement;
              if (parentDiv) {
                parentDiv.insertBefore(clonedMenuItem, parentDiv.firstChild);
              }
            }
          }
        });
      }
    });
  });

  // Start observing the document's body for child nodes being added
  observer.observe(document.body, { childList: true, subtree: true });
  //

  window.addEventListener("beforeunload", () => {
    observer.disconnect();
  });
});
