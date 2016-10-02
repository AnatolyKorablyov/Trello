goog.provide("ispring.sample.view.TrelloView");

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
    ispring.sample.view.TrelloView = goog.defineClass(null, {
        constructor: function (controller)
        {
            this._controller = controller;
            this._i18n = new I18n("ru");
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

            /**
             * @type {Element}
             */
            var toolbarForm = document.createElement(goog.dom.TagName.DIV);
            toolbarForm.id = this._conf._ID_MAIN_TOOLBAR;

            this._btnCreate = new Button(this._i18n.getMessageById(this._conf._ID_LABEL_CREATE_BOARD_BUTTON));

            this._btnCreate._btn.onclick = function ()
            {
                var newNameBoard = prompt(thisPtr._i18n.getMessageById(thisPtr._conf._ID_LABEL_CREATE_BOARD_BUTTON), "default");
                if (newNameBoard != null)
                {
                    thisPtr._controller.createBoard(newNameBoard);
                }
            };
            
            //btnCreate._btn.setAttribute('data-action', this._conf._NAME_ACT_CREATE_BOARD);
            toolbarForm.appendChild(this._btnCreate._btn);
            document.getElementById("container").appendChild(toolbarForm);
            this._createBoardPanel();
        },

        /**
         * @private
         */
        _changeText: function()
        {
            this._btnCreate._btn.value = this._i18n.getMessageById(this._conf._ID_LABEL_CREATE_BOARD_BUTTON);
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
                thisPtr._controller.clickBoard(this.id);
            };

            this._boardsForm.appendChild(boardDiv);
        },

        hideView: function()
        {
            this._boardsForm.style.display = "none";
            document.getElementById(this._conf._ID_MAIN_TOOLBAR).style.display = "none";
        },

        showView: function()
        {
            this._boardsForm.style.display = "block";
            document.getElementById(this._conf._ID_MAIN_TOOLBAR).style.display = "block";
        }
    });
});