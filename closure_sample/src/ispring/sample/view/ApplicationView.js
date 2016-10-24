goog.provide("ispring.sample.view.ApplicationView");

goog.require("goog.dom.TagName");
goog.require("ispring.sample.Button");
goog.require("ispring.sample.Config");

/**
 * @export
 */
goog.scope(function()
{
    
    const Button = ispring.sample.Button;

    /**
     * @type {ispring.sample.controller.ApplicationController}
     */
    ispring.sample.view.ApplicationView = goog.defineClass(null, {
        constructor: function (controller)
        {
            this._controller = controller;

            /**
             * @type {ispring.sample.I18n}
             * @private
             */
            this._i18n = this._controller.getI18n();
            
            const Config = ispring.sample.Config;
            /**
             * @type {ispring.sample.Config}
             * @private
             */
            this._conf = new Config();
            
            this._createToolbar();
        },

        /**
         * @private
         */
        _createToolbar: function()
        {
            const thisPtr = this;

            /**
             * @type {Element}
             * @private
             */
            this._toolbarForm = document.createElement(goog.dom.TagName.DIV);
            this._toolbarForm.id = this._conf._ID_APP_TOOLBAR;

            // RUSSIAN LANGUAGE
            /**
             * @type {ispring.sample.Button}
             */
            var btnSelect1stLang = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_SELECT_FIRST_LANG));

            btnSelect1stLang._btn.onclick = function ()
            {
                thisPtr._controller.selectLang("ru");
            };
            
            // ENGLISH LANGUAGE
            /**
             * @type {ispring.sample.Button}
             */
            var btnSelect2ndLang = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_SELECT_SECOND_LANG));

            btnSelect2ndLang._btn.onclick = function ()
            {
                thisPtr._controller.selectLang("en");
            };

            this._toolbarForm.appendChild(btnSelect1stLang._btn);
            this._toolbarForm.appendChild(btnSelect2ndLang._btn);

            /**
             * @type {ispring.sample.Button}
             * @private
             */
            this._btnLogout = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_LOGOUT));

            this._btnLogout._btn.onclick = function ()
            {
                thisPtr._controller.logout();
            };

            document.getElementById("container").appendChild(this._toolbarForm);
        },

        /**
         * @param {string} userName
         */
        addAccountInfo: function(userName)
        {
            /**
             * @type {Element}
             */
            var loginInfo = document.createElement(goog.dom.TagName.LABEL);
            loginInfo.innerHTML = userName;
            
            this._toolbarForm.appendChild(loginInfo);

            this._toolbarForm.appendChild(this._btnLogout._btn);
        },

        /**
         * @private
         */
        _changeText: function()
        {
            this._btnLogout._btn.value = this._i18n.getMessageById(this._conf._ID_LABEL_LOGOUT);
        },
        
        changeLanguage: function()
        {
            this._changeText();
        },
        
        cleanApplication: function()
        {
            while (document.getElementById("container").firstChild)
            {
                document.getElementById("container").removeChild(document.getElementById("container").firstChild);
            }
            this._createToolbar();
        }
    });
});