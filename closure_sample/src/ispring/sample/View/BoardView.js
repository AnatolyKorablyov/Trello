goog.provide("ispring.sample.view.BoardView");

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
    ispring.sample.view.BoardView = goog.defineClass(null, {
        constructor: function (controller)
        {
            this._controller = controller;
            this._i18n = new I18n("ru");
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
            this._toolbarForm.id = this._conf._ID_BOARD_TOOLBAR;

            this._btnBackspace = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_BACKSPACE_BUTTON));

            this._btnBackspace._btn.onclick = function ()
            {
                thisPtr._controller.clickBackspace();
            };

            this._toolbarForm.appendChild(this._btnBackspace._btn);
            document.getElementById("container").appendChild(this._toolbarForm);
            this._createListPanel();
        },

        /**
         * @private
         */
        _changeText: function()
        {
            this._btnBackspace._btn.value = this._i18n.getMessageById(this._conf._ID_LABEL_BACKSPACE_BUTTON);
            //document.getElementById(this._conf._ID_MAIN_TOOLBAR).appendChild(this._btnCreate._btn);
        },

        /**
         * @param {string} lang
         */
        changeLanguage: function(lang)
        {
            this._i18n = new I18n(lang);

            this._changeText();
        },

        /**
         * @private
         */
        _createListPanel: function()
        {
            this._listForm = document.createElement(goog.dom.TagName.DIV);
            this._listForm.id = this._conf._ID_LIST_PLACE;
            document.getElementById("container").appendChild(this._listForm);
        },

        /**
         * @param board
         */
        drawLists: function(list)
        {
            const thisPtr = this;
            var listNameForm = document.createElement(goog.dom.TagName.INPUT);
            listNameForm.id = list._id;
            listNameForm.value = list._nameList;
            listNameForm.style.color = "white";
            listNameForm.style.background = "blue";

            listNameForm.onblur = function()
            {
                if (this.value != "")
                {
                    thisPtr._controller.renameList(this.id, this.value);
                }
            };

            this._listForm.appendChild(listNameForm);
        },
        
        deleteView: function()
        {
            this._listForm.parentElement.removeChild(this._listForm);
            this._toolbarForm.parentElement.removeChild(this._toolbarForm);
        }
    });
});