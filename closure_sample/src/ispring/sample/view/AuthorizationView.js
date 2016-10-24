goog.provide("ispring.sample.view.AuthorizationView");
goog.require("goog.dom.TagName");

//goog.require("ispring.sample.I18n");
goog.require("ispring.sample.Config");
goog.require("ispring.sample.Button");

/**
 * @export
 */
goog.scope(function()
{
    ///const I18n = ispring.sample.I18n;
    const Config = ispring.sample.Config;
    const BUTTON = ispring.sample.Button;

    /**
     * @type {ispring.sample.controller.AuthorizationController}
     */
    ispring.sample.view.AuthorizationView = goog.defineClass(null, {
        constructor: function (controller)
        {
            const Config = ispring.sample.Config;

            /**
             * @type {ispring.sample.Config}
             * @private
             */
            this._conf = new Config();

            this._controller = controller;

            /**
             * @type {ispring.sample.I18n}
             * @private
             */
            this._i18n = this._controller.getI18n();


            this.FormAuthorizationInit();
        },


        /**
         * @param container
         * @param errorMessage
         */
        showError: function (container, errorMessage) {
            container.className = 'error';
            var msgElem = document.createElement(goog.dom.TagName.SPAN);
            msgElem.style.display = "display: table-cell";
            msgElem.className = "error-message";
            msgElem.innerHTML = errorMessage;
            container.appendChild(msgElem);
        },

        /**
         * @param container
         */
        resetError: function (container) {
            container.className = '';
            if (container.lastChild.className == "error-message") { // в константу
                container.removeChild(container.lastChild);
            }
        },

        resetAllErrors: function()
        {
            this.resetError(this._loginForm);
            this.resetError(this._passForm);
        },

        FormAuthorizationInit: function()
        {
            /**
             * @type {Element}
             */
            var AuthorizationForm = document.createElement(goog.dom.TagName.DIV);
            AuthorizationForm.id = this._conf._ID_AUTHORIZATION_FORM;

            /**
             * @type {Element}
             * @private
             */
            this._loginForm = document.createElement(goog.dom.TagName.DIV);

            /**
             * @type {Element}
             * @private
             */
            this._loginMessage = document.createElement(goog.dom.TagName.LABEL);
            this._loginMessage.id = this._conf._ID_LABEL_USER_NAME_MESSAGE;
            this._loginMessage.innerHTML = this._i18n.getMessageById(this._conf._ID_LABEL_LOGIN) + " ";
            this._loginMessage.className = "inline_block_form";
            this._loginForm.appendChild(this._loginMessage);

            var loginInput = document.createElement(goog.dom.TagName.INPUT);
            loginInput.id = this._conf._ID_INPUT_USER_NAME;
            loginInput.type = "text";
            loginInput.className = "inline_block_form";
            this._loginForm.appendChild(loginInput);

            AuthorizationForm.appendChild(this._loginForm);

            /**
             * @type {Element}
             * @private
             */
            this._passForm = document.createElement(goog.dom.TagName.DIV);

            /**
             * @type {Element}
             * @private
             */
            this._passMessage = document.createElement(goog.dom.TagName.LABEL);
            this._passMessage.id = this._conf._ID_LABEL_PASSWORD_MESSAGE;
            this._passMessage.innerHTML = this._i18n.getMessageById(this._conf._ID_LABEL_PASSWORD) + " ";
            this._passMessage.className = "inline_block_form";
            this._passForm.appendChild(this._passMessage);

            var passInput = document.createElement(goog.dom.TagName.INPUT);
            passInput.id = this._conf._ID_INPUT_PASSWORD;
            passInput.type = "password";
            passInput.className = "inline_block_form";
            this._passForm.appendChild(passInput);

            AuthorizationForm.appendChild(this._passForm);

            /**
             * @type {ispring.sample.Button}
             * @private
             */
            this._btnSend = new BUTTON(this._i18n.getMessageById(this._conf._ID_LABEL_SEND));
            const thisPtr = this;
            this._btnSend._btn.onclick = function ()
            {
                thisPtr._controller.buttonSendAct();
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
            //this._loginForm.appendChild(this._loginMessage);
            this._passMessage.innerHTML = this._i18n.getMessageById(this._conf._ID_LABEL_PASSWORD) + " ";
            this._btnSend._btn.value = this._i18n.getMessageById(this._conf._ID_LABEL_SEND);
        },


        changeLanguage: function()
        {
            this._changeText();
        }
    });
});