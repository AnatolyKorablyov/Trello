goog.provide("ispring.sample.view.AuthorizationView");
goog.require("goog.dom.TagName");

goog.require("ispring.sample.I18n");
goog.require("ispring.sample.Config");
goog.require("ispring.sample.Button");

/**
 * @export
 */
goog.scope(function()
{
    const I18n = ispring.sample.I18n;
    const Config = ispring.sample.Config;
    const BUTTON = ispring.sample.Button;

    /**
     * @constructor
     */
    ispring.sample.view.AuthorizationView = goog.defineClass(null, {
        constructor: function (controller)
        {
            this._conf = new Config();
            this._controller = controller;
            this._i18n = new I18n(this._controller.getLanguage());
            this.FormAuthorizationInit();
        },

        showError: function (container, errorMessage) {
            container.className = 'error';
            var msgElem = document.createElement(goog.dom.TagName.SPAN);
            msgElem.style.display = "display: table-cell";
            msgElem.className = "error-message";
            msgElem.innerHTML = errorMessage;
            container.appendChild(msgElem);
        },

        resetError: function (container) {
            container.className = '';
            if (container.lastChild.className == "error-message") { // в константу
                container.removeChild(container.lastChild);
            }
        },

        FormAuthorizationInit: function()
        {
            /**
             *
             * @type {Element}
             */
            var AuthorizationForm = document.createElement(goog.dom.TagName.DIV);
            AuthorizationForm.id = this._conf._ID_AUTHORIZATION_FORM;
            AuthorizationForm.style = "display: table horizontal-";

            /**
             *
             * @type {Element}
             */
            var loginForm = document.createElement(goog.dom.TagName.DIV);
            loginForm.style = 'display: table-row';

            this._loginMessage = document.createElement(goog.dom.TagName.LABEL);
            this._loginMessage.id = this._conf._ID_LABEL_USER_NAME_MESSAGE;
            this._loginMessage.innerHTML = this._i18n.getMessageById(this._conf._ID_LABEL_LOGIN) + " ";
            this._loginMessage.style = "display: table-cell";
            loginForm.appendChild(this._loginMessage);

            var loginInput = document.createElement(goog.dom.TagName.INPUT);
            loginInput.id = this._conf._ID_INPUT_USER_NAME;
            loginInput.type = "text";
            loginInput.style = "display: table-cell";
            loginForm.appendChild(loginInput);

            AuthorizationForm.appendChild(loginForm);

            /**
             *
             * @type {Element}
             */
            var passForm = document.createElement(goog.dom.TagName.DIV);
            passForm.style = 'display: table-row';

            this._passMessage = document.createElement(goog.dom.TagName.LABEL);
            this._passMessage.id = this._conf._ID_LABEL_PASSWORD_MESSAGE;
            this._passMessage.innerHTML = this._i18n.getMessageById(this._conf._ID_LABEL_PASSWORD) + " ";
            this._passMessage.style = "display: table-cell";
            passForm.appendChild(this._passMessage);

            var passInput = document.createElement(goog.dom.TagName.INPUT);
            passInput.id = this._conf._ID_INPUT_PASSWORD;
            passInput.type = "password";
            passInput.style = "display: table-cell";
            passForm.appendChild(passInput);

            AuthorizationForm.appendChild(passForm);

            this._btnSend = new BUTTON(this._i18n.getMessageById(this._conf._ID_LABEL_SEND));
            const thisPtr = this;
            this._btnSend._btn.onclick = function ()
            {
                thisPtr._controller.ButtonSendAct();
            };
            AuthorizationForm.appendChild(this._btnSend._btn);

            document.getElementById("container").appendChild(AuthorizationForm);
        },

        /**
         * @private
         */
        _changeText: function()
        {
            this._loginMessage.innerHTML = this._i18n.getMessageById(this._conf._ID_LABEL_LOGIN) + " ";
            this._passMessage.innerHTML = this._i18n.getMessageById(this._conf._ID_LABEL_PASSWORD) + " ";
            this._btnSend._btn.value = this._i18n.getMessageById(this._conf._ID_LABEL_SEND);
        },

        /**
         * @param {string} lang
         */
        changeLanguage: function(lang)
        {
            this._i18n = new I18n(lang);

            this._changeText();
        }
    });
});