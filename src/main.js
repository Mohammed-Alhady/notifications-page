// fetch("/data/data.json")
//     .then((data) => {
//         const dataUsers = data.json();
//         return dataUsers;
//     })
//     .then((data) => {
//         data.forEach(element => {
//             createNotification(element);
//         });
//         counterUnreadingMessages();
//     })

setTimeout(() => {
    const data =
        import ("../data/data.json", { assert: { type: "json" } })
        .then((result) => {
            return result.default
        })
        .then((array) => {
            array.map((item) => {
                createNotification(item);
            })
            counterUnreadingMessages();
        })
}, 500)

function createNotification(element) {
    // structure of the notificaiton section 
    /*
    notifications-holder
        notifications-head
        notifications-body
            [x] notificate
                [x] notificate-holder
                    [x] img-holdern 
                        [x] img
                    [x] txt-holder
                        [x] txt
                            [x] user-name
                            [x] notifcatetion-title
                            [x] notificatetion-sourse
                            [x] notificatetion-group
                        [x] date
                    [x] notification-img-holder
                        [x] notification-img
                [x] message-holder
                    [x] message-content
    */

    // start function
    const notificationsBody = document.querySelector(".notifications-body");

    // create notificate 
    const notificate = document.createElement("div");
    notificate.classList.add("d-flex", "flex-column", "notificate")

    if (element['status'] === "unread") {
        notificate.classList.add("unread");
    }

    // create notificate-holder
    const notificateHolder = document.createElement("div");
    notificateHolder.classList.add("d-flex", "notificate-holder");

    // create img-holder
    const imgHolder = document.createElement("div");
    imgHolder.classList.add("img-holder");

    // create img
    const userImg = document.createElement("img");
    userImg.classList.add("user-img");
    userImg.src = element['user-img'];

    imgHolder.appendChild(userImg);
    notificateHolder.appendChild(imgHolder);
    // done img-holder

    // create txt-holder
    const txtHolder = document.createElement("div");
    txtHolder.classList.add("d-flex", "flex-column", "txt-holder");

    // create txt 
    const txt = document.createElement("div");
    txt.classList.add("d-flex", "txt");

    // create user-name
    if (element['txt']['user-name'] !== null) {
        const userName = document.createElement("h3");
        userName.classList.add("user-name");
        userName.textContent = element['txt']['user-name'];
        txt.appendChild(userName);
    }
    // done user-name

    // create notifcatetion-title
    if (element['txt']['notifcatetion-title'] !== null) {
        const notifcatetionTitle = document.createElement("p");
        notifcatetionTitle.classList.add("notifcatetion-title");
        notifcatetionTitle.textContent = element['txt']['notifcatetion-title'];
        txt.appendChild(notifcatetionTitle);
    }
    // done notifcatetion-title

    // create notificatetion-sourse 
    if (element['txt']['notificatetion-sourse'] !== null) {
        const notificatetionSourse = document.createElement("p");
        notificatetionSourse.classList.add("notificatetion-sourse");
        notificatetionSourse.textContent = element['txt']['notificatetion-sourse'];
        txt.appendChild(notificatetionSourse);
    }
    // done notificatetion-sourse

    // create notificatetion-group 
    if (element['txt']['notificatetion-group'] !== null) {
        const notificatetionGroup = document.createElement("p");
        notificatetionGroup.classList.add("notificatetion-group");
        notificatetionGroup.textContent = element['txt']['notificatetion-group'];
        txt.appendChild(notificatetionGroup);
    }

    if (notificate.classList.contains("unread")) {
        txt.lastChild.classList.add("unread-ball");
    }

    txtHolder.appendChild(txt);
    // done txt

    // create date 
    const date = document.createElement("div");
    date.classList.add("date");
    date.textContent = element['date'];

    txtHolder.appendChild(date);
    // done date

    notificateHolder.appendChild(txtHolder);
    // done txtHolder

    if (element['notification-img'] !== null) {
        // create notification-img-holder
        const notificationImgHolder = document.createElement("div");
        notificationImgHolder.classList.add("notification-img-holder");
        // create notification-img
        const notificationImg = document.createElement("img");
        notificationImg.classList.add("notification-img");
        notificationImg.src = element['notification-img'];

        notificationImgHolder.appendChild(notificationImg);
        // done notification-img

        notificateHolder.appendChild(notificationImgHolder);
        // done notification-img-holder
    }

    notificate.appendChild(notificateHolder);
    // done notificate-holder

    if (element['message-content'] !== null) {
        // create message-holder
        const messageHolder = document.createElement("div");
        messageHolder.classList.add("message-holder");

        // create message-content
        const messageContent = document.createElement("p");
        messageContent.classList.add("message-content");
        messageContent.textContent = element['message-content'];

        messageHolder.appendChild(messageContent);
        // done message-content

        notificate.appendChild(messageHolder);
        // done message-content
    }

    notificationsBody.appendChild(notificate);
    // done notificate

    // end function
}

window.addEventListener("click", (element) => {
    if (element.target.classList.contains("unread") || element.target.parentNode.classList.contains("unread")) {
        if (element.target.classList.contains("unread")) {
            element.target.classList.remove("unread");
            counterUnreadingMessagesLessOne();
        } else {
            element.target.parentNode.classList.remove("unread")
            counterUnreadingMessagesLessOne();
        }
    } else if (element.target.classList.contains("read-all")) {
        const elements = document.querySelectorAll(".notificate");
        const counter = document.querySelector(".counter");
        elements.forEach(element => {
            if (element.classList.contains("unread"));
            element.classList.remove("unread")
        });
        counter.innerHTML = 0;
    }
});

function counterUnreadingMessages() {
    const elements = document.querySelectorAll(".notificate");
    const counter = document.querySelector(".counter");
    let count = 0;

    elements.forEach(element => {
        if (element.classList.contains("unread")) {
            count++;
        }
    });
    counter.innerHTML = count;
}

function counterUnreadingMessagesLessOne() {
    const counter = document.querySelector(".counter");
    counter.innerHTML -= 1;
}