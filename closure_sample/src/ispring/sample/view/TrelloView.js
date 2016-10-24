goog.provide("ispring.sample.view.TrelloView");

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
     * @type {ispring.sample.controller.TrelloController}
     */
    ispring.sample.view.TrelloView = goog.defineClass(null, {
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
         * @param {string} message
         * @private
         */
        _createInputForm: function(message)
        {
            var newNameBoard = prompt(message, "default");
        },
        
        /**
         * @private
         */
        _createToolbar: function()
        {
            const thisPtr = this;

            var toolbarForm = document.createElement(goog.dom.TagName.DIV);
            toolbarForm.id = this._conf._ID_MAIN_TOOLBAR;

            /**
             * @type {ispring.sample.Button}
             * @private
             */
            this._btnCreate = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_CREATE_BOARD_BUTTON));

            this._btnCreate._btn.onclick = function ()
            {
                var newNameBoard = prompt(thisPtr._i18n.getMessageById(thisPtr._conf._ID_LABEL_CREATE_BOARD_BUTTON), "default");
                if (newNameBoard != null)
                {
                    document.dispatchEvent(new CustomEvent(thisPtr._conf._EVENT_CREATE_BOARD, {"detail" : {"newValue" : newNameBoard}}));
                }
            };
            
            toolbarForm.appendChild(this._btnCreate._btn);
            document.getElementById("container").appendChild(toolbarForm);
        },

        /**
         * @private
         */
        _changeText: function()
        {
            this._btnCreate._btn.value = this._i18n.getMessageById(this._conf._ID_LABEL_CREATE_BOARD_BUTTON);
            //document.getElementById(this._conf._ID_MAIN_TOOLBAR).appendChild(this._btnCreate._btn);
        },

        changeLanguage: function()
        {
            this._changeText();
        },
        

        hideView: function()
        {
            //this._boardsForm.style.display = "none";
            document.getElementById(this._conf._ID_MAIN_TOOLBAR).style.display = "none";
        },

        showView: function()
        {
            //this._boardsForm.style.display = "block";
            document.getElementById(this._conf._ID_MAIN_TOOLBAR).style.display = "block";
        },

        cleanView: function()
        {
        }
    });
});