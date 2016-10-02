goog.provide("ispring.sample.view.ApplicationView");

goog.require("goog.dom.TagName");
goog.require("ispring.sample.Button");
goog.require("ispring.sample.Config");
goog.require("ispring.sample.I18n");
/**
 * @export
 */
goog.scope(function()
{
    const I18n = ispring.sample.I18n;
    const Config = ispring.sample.Config;
    const Button = ispring.sample.Button;
    
    /**
     * @constructor
     */
    ispring.sample.view.ApplicationView = goog.defineClass(null, {
        constructor: function (controller)
        {
            this._controller = controller;
            this._i18n = new I18n(this._controller._applicationModel.getLanguage());
            this._conf = new Config();
            
            this._createToolbar();
        },

        /**
         * @private
         */
        _createToolbar: function()
        {
            const thisPtr = this;

            this._toolbarForm = document.createElement(goog.dom.TagName.DIV);
            this._toolbarForm.id = this._conf._ID_APP_TOOLBAR;

            var btnSelect1stLang = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_SELECT_FIRST_LANG));

            btnSelect1stLang._btn.onclick = function ()
            {
                thisPtr._controller.selectLang("ru");
            };
            var btnSelect2ndLang = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_SELECT_SECOND_LANG));

            btnSelect2ndLang._btn.onclick = function ()
            {
                thisPtr._controller.selectLang("en");
            };

            this._toolbarForm.appendChild(btnSelect1stLang._btn);
            this._toolbarForm.appendChild(btnSelect2ndLang._btn);

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

        /**
         * @param {string} lang
         */
        changeLanguage: function(lang)
        {
            this._i18n = new I18n(lang);

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