function onDeviceReady() {
    try {
        let title = window.location.href.split("?title=")[1];
        if (title === "") {
            location.href = "index.html";
        }
        let page = localStorage.getItem("html-"+title);
        page = "<h1>"+Base64.decode(title)+"</h1><br>"+page;
        $("#html").html(page);
    } catch (e) {
        alert(e);
    }
}

document.addEventListener("deviceready", onDeviceReady, false);