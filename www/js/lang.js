function onDeviceReady2() {
    var userLang = navigator.language || navigator.userLanguage; 
    userLang = userLang.split("-")[0];

    // German
    if (userLang === "de") {
        $("#yourpages").html("Deine Seiten");
        $("#error").html("Keine Seiten gefunden. Drücke auf das Plus, um einen QR code einzuscannen!");
        $("#madeby").html("Eine App erstellt von koyu.space.");
        $("#about").html("Über QSave");
        $("#what").html("Diese App erlaubt es dir einen QR-Code zu scannen und die daraus entstandene Seite zu speichern.");
        $("#return").html("Zurück zur Übersicht");
    }
}

document.addEventListener("deviceready", onDeviceReady2, false);