goog.provide("ispring.sample.view.BoardsView");

goog.require("goog.dom.TagName");
goog.require("ispring.sample.Config");

/**
 * @export
 */
goog.scope(function()
{

    /**
     * @type {ispring.sample.controller.TrelloController}
     */
    ispring.sample.view.BoardsView = goog.defineClass(null, {
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
            
            this._createBoardPanel();
        },
        
        /**
         * @private
         */
        _createBoardPanel: function()
        {
            /**
             * @type {Element}
             * @private
             */
            this._boardsForm = document.createElement(goog.dom.TagName.DIV);
            this._boardsForm.id = this._conf._ID_BOARDS_PANEL;
            document.getElementById("container").appendChild(this._boardsForm);
        },

        /**
         * @param board
         */
        drawBoards: function(board)
        {
            const thisPtr = this;

            var boardDiv = document.createElement(goog.dom.TagName.BUTTON);
            boardDiv.id = board._id;
            boardDiv.innerHTML = board._nameBoard;
            boardDiv.style.color = "white";
            boardDiv.style.background = "blue";

            boardDiv.onclick = function ()
            {
                document.dispatchEvent(new CustomEvent(thisPtr._conf._EVENT_CLICK_BOARD, {"detail" : {"newValue" : this.id}}));
                //thisPtr._controller.clickBoard(this.id);
            };

            this._boardsForm.appendChild(boardDiv);
        },

        hideView: function()
        {
            this._boardsForm.style.display = "none";
            //document.getElementById(this._conf._ID_MAIN_TOOLBAR).style.display = "none";
        },

        showView: function()
        {
            this._boardsForm.style.display = "block";
            //document.getElementById(this._conf._ID_MAIN_TOOLBAR).style.display = "block";
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
            this._removeChildren(this._boardsForm);
        }
    });
});