window.addEventListener("load", function () {
  document.addEventListener("pointerdown", function (event) {
    // inplant pin in popper
    let buttonParentElement = event.target.parentElement;

    const buttonParentDataId = /history-item-\d-options/;

    // making sure it is always the button
    if (buttonParentElement.matches("svg")) {
      buttonParentElement = buttonParentElement.parentElement;
    }

    // if click was on action button
    console.log(
      "is button: ",
      buttonParentDataId.test(buttonParentElement.getAttribute("data-testid")),
    );

    if (
      buttonParentDataId.test(buttonParentElement.getAttribute("data-testid"))
    ) {
      console.log("popper is opened!!!");

      const firstMenuItemChild = document.querySelector(
        "[data-testid=share-chat-menu-item]",
      );

      if (!firstMenuItemChild) return;

      const radixPopperWrapperInnerDiv = firstMenuItemChild.parentElement;
      const pinMenuItem = firstMenuItemChild.cloneNode(true);
      console.log("pinned child:", pinMenuItem);
      console.log("pinned child first:", pinMenuItem.firstChild);
      pinMenuItem.firstChild.innerHTML = `
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
      `;
      pinMenuItem.lastChild.textContent = "Pin";

      if (radixPopperWrapperInnerDiv) {
        radixPopperWrapperInnerDiv.insertBefore(
          pinMenuItem,
          firstMenuItemChild,
        );

        // buttonParentElement.click()

        // add event listener to pin button
        pinMenuItem.addEventListener("click", () => {
          // get conversation title & url
          const listItem = buttonParentElement.closest("li");
          const conversationUrl = listItem
            .querySelector("a")
            .getAttribute("href");
          const conversationTitle = listItem
            .querySelector("a > div")
            .textContent.trim();
          console.log("Title: ", conversationTitle, "URL", conversationUrl);
          // get conversation id
          const conversationId = conversationUrl.split("c/").at(-1);

          // add to UI if data is not already in browser storage
          const conversationList = document.querySelector("#pinned-list-ol");
          retrieveFromBrowserStorage([conversationId], (storage) => {
            if (!storage[conversationId]) {
              const newListItem = buildListItems({
                [conversationId]: { title: conversationTitle },
              }).at(0);

              makeDraggable(newListItem, conversationList);

              const closeButton =
                newListItem.querySelector(".pin-ext-close-btn");
              closeButton.addEventListener("click", () =>
                unpinConversation(closeButton, conversationId),
              );
              conversationList.appendChild(newListItem);

              // store data in browser storage
              storeInBrowserStorage(conversationId, {
                title: conversationTitle,
                order: conversationList.children.length,
              });
            }
          });

          // remove the popup
          radixPopperWrapperInnerDiv.remove();
        });
      }
    }
  });
});
