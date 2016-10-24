goog.provide("ispring.sample.view.BoardView");

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
     * @constructor
     */
    ispring.sample.view.BoardView = goog.defineClass(null, {
        constructor: function (controller)
        {
            this._controller = controller;

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
            this._toolbarForm.id = this._conf._ID_BOARD_TOOLBAR;

            /**
             * @type {ispring.sample.Button}
             * @private
             */
            this._btnBackspace = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_BACKSPACE_BUTTON));

            this._btnBackspace._btn.onclick = function ()
            {
                document.dispatchEvent(new Event(thisPtr._conf._EVENT_BACKSPACE_TO_TRELLO));
                //thisPtr._controller.clickBackspace();
            };
            
            
            this._toolbarForm.appendChild(this._btnBackspace._btn);

            /**
             * @type {ispring.sample.Button}
             * @private
             */
            this._btnAddList = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_ADD_LIST));

            this._btnAddList._btn.onclick = function ()
            {
                document.dispatchEvent(new Event(thisPtr._conf._EVENT_ADD_LIST));
                //thisPtr._controller.clickBackspace();
            };
            this._toolbarForm.appendChild(this._btnAddList._btn);
            
            document.getElementById("container").appendChild(this._toolbarForm);

        },

        /**
         * @private
         */
        _changeText: function()
        {
            this._btnBackspace._btn.value = this._i18n.getMessageById(this._conf._ID_LABEL_BACKSPACE_BUTTON);
            //document.getElementById(this._conf._ID_MAIN_TOOLBAR).appendChild(this._btnCreate._btn);
        },

        
        changeLanguage: function()
        {
            this._changeText();
        },
        

        /**
         * @param {Element} node
         * @private
         */
        _removeChildren: function(node)
        {
            while (node.firstChild)
            {
                node.removeChild(node.firstChild);
            }
        },

        cleanView: function()
        {
            this._removeChildren(this._toolbarForm); 
        },
        
        deleteView: function()
        {
            this.cleanView();

            this._toolbarForm.parentNode.removeChild(this._toolbarForm);
        }
    });
});