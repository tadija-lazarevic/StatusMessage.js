var StatusMessage = (function () {
    var statusDiv      = document.createElement('div'),
        messageContent  = document.createElement('div'),
        closeButton    = document.createElement('button'),
        closeIcon      = document.createElement('i'),
        currentBrowser  = Utils.Browser(),
        isPresent,

        closeAction,
        settings        = {},
        defaultSettings = {
            closeAfter  : 0,
            errorMessage: 'Error content!',
            parent      : document.getElementById('statusWrapContainer'),
            type        : 'error'
        };

    function closeAfterTime() {
        if (settings.closeAfter > 0) {
            closeAction = window.setTimeout(function () {
                removeMessage();
            }, settings.closeAfter * 1000);
        }
    }

    function closeEvent() {
        var closeButton = Utils.GetElementID('closeErrorButton');
        closeButton.addEventListener('click', function (e) {
            e.preventDefault();
            removeMessage();
        });
    }

    function removeMessage() {
        if (settings.onClose) {
            settings.onClose();
        }
        if (closeAction) {
            window.clearTimeout(closeAction);
        }
        if (Utils.HasClass(settings.parent, 'status')) {
            Utils.RemoveClassWithName(settings.parent, 'status');
        }
        if (Utils.HasClass(settings.parent, settings.type)) {
            Utils.RemoveClassWithName(settings.parent, settings.type);
        }
        if (currentBrowser.isChrome) {
            statusDiv.remove();
        }
        if (currentBrowser.isFirefox || currentBrowser.isOpera) {
            var len = settings.parent.childNodes.length;

            for (var i = 0; i < len; i++) {
                if (settings.parent.childNodes[i].id == "messageStatus") {
                    settings.parent.removeChild(settings.parent.childNodes[i]);
                }
            }
        }
        if (currentBrowser.isIE) {
            statusDiv.removeNode(true);
        }

    }

    function messageSettings() {

        // Error message content
        messageContent.setAttribute('class', 'messageContent');
        messageContent.innerHTML = settings.errorMessage;
        messageContent.appendChild(closeButton);

        statusDiv.appendChild(messageContent);
        statusDiv.setAttribute('id', 'messageStatus');

        //Close icon
        closeIcon.setAttribute('class', 'icon-Close-Window');
        closeButton.appendChild(closeIcon);

        // Close button
        closeButton.setAttribute('id', 'closeErrorButton');
        closeButton.setAttribute('class', 'statusMenuClose');

        Utils.AddClass(settings.parent, settings.type);
        Utils.AddClass(settings.parent, 'status');

        settings.parent.appendChild(statusDiv);
    }

    function open() {
        messageSettings();
        closeEvent();
        if (settings.onOpen) {
            settings.onOpen();
        }
        if (settings.closeAfter > 0) {
            closeAfterTime();
        }
    }

    return {
        Init: function (params) {
            settings.closeAfter  = params.closeAfter || defaultSettings.closeAfter;
            settings.errorMessage = params.errorMessage || defaultSettings.errorMessage;
            settings.parent      = params.parent || defaultSettings.parent;
            settings.type        = params.type || defaultSettings.type;
            settings.activateOn  = params.activateOn || defaultSettings.activateOn;
            settings.onOpen      = params.onOpen || null;
            settings.onClose      = params.onClose || null;
            settings.showOn      = params.showOn || null;

            isPresent = Utils.GetElementID('messageStatus') ? true : false;

            if (Utils.GetElementID('messageStatus') && (Utils.HasClass(Utils.GetElementID('statusWrapContainer'), 'status'))) {
                return;
            }
            if (settings.showOn && !isPresent) {
                open();
            }
            else if (!settings.showOn && !isPresent) {
                open();
            }
        }
    };

});