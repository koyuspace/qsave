function onDeviceReady() {
    // File list
    try {
        let codes = "<span>";
        let elements = localStorage.getItem("titles").split("$$$");
        var index = elements.indexOf("");
        if (index !== -1) {
            elements.splice(index, 1);
        }
        elements.pop();
        elements.forEach((el) => {
            codes += "<p><a class=\"btn\" href=\"read.html?title="+Base64.encode(el).replaceAll("=", "")+"\">"+el+"</a> <i class=\"fa fa-times remove\" aria-hidden=\"true\" item=\""+Base64.encode(el).replaceAll("=", "")+"\"></i></p>";
        });
        codes += "</span>"
        if (codes !== "<span></span>") {
            $("#codes").html(codes);
        }
    } catch (e) {}

    // Remove button
    $(".remove").click(function() {
        let item = $(this).attr("item");
        try {
            if (confirm("Do you really want to remove this page?")) {
                let elements = localStorage.getItem("titles").split("$$$");
                var index = elements.indexOf(Base64.decode(item));
                if (index !== -1) {
                    elements.splice(index, 1);
                }
                localStorage.setItem("titles", elements);
                location.reload();
            }
        } catch (e) {
            alert(e);
        }
    });

    // Scan button
    let addbutton = document.getElementById("addbutton");
    addbutton.addEventListener('click', function () {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                try {
                    let decoded = Base64.decode(result.text);
                    let lines = decoded.split("\n");
                    let title = lines.shift();
                    let page = lines.join("\n");
                    try {
                        let isAlreadyThere = false;
                        let elements = localStorage.getItem("titles").split("$$$");
                        elements.pop();
                        elements.forEach((el) => {
                            if (title === el) {
                                isAlreadyThere = true;
                            }
                        });
                        if (!isAlreadyThere) {
                            localStorage.setItem("titles", title+"$$$"+localStorage.getItem("titles"));
                        }
                    } catch (e) {
                        localStorage.setItem("titles", title+"$$$");
                    }
                    localStorage.setItem("html-"+Base64.encode(title).replaceAll("=", ""), page);
                    location.href = "read.html?title="+Base64.encode(title).replaceAll("=", "");
                } catch (e) {
                    alert(e);
                }
            },
            function (error) {
                alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera : false, // iOS and Android
                showFlipCameraButton : false, // iOS and Android
                showTorchButton : true, // iOS and Android
                torchOn: false, // Android, launch with the torch switched on (if available)
                saveHistory: false, // Android, save scan history (default false)
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
                orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations : true, // iOS
                disableSuccessBeep: true // iOS and Android
            }
        );
    });
}

document.addEventListener("deviceready", onDeviceReady, false);