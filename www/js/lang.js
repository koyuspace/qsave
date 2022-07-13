var pageRemoval = "Do you really want to remove this page?"
var qrPrompt = "Place a barcode inside the scan area";

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
        pageRemoval = "Möchtest du die Seite wikrlich entfernen?";
        qrPrompt = "Halte dein Gerät an einen QR-Code";
    }
}

document.addEventListener("deviceready", onDeviceReady2, false);