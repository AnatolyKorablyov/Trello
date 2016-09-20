goog.provide("ispring.sample.View.BoardView");
goog.require("ispring.sample.Button");
goog.require("ispring.sample.Config");
goog.require("ispring.sample.I18n");

/**
 * @export
 */
goog.scope(function() {

    const BUTTON = ispring.sample.Button;
    const CONFIG = ispring.sample.Config;
    const I18N = ispring.sample.I18n;

    /**
     * @constructor
     */
    ispring.sample.View.BoardView = goog.defineClass(null, {
        constructor: function () 
        {
            this._i18n = new I18N();
            this._conf = new CONFIG();
            this.CreateToolbar();
        },
        CreateToolbar: function()
        {
            var toolbarForm = document.createElement(goog.dom.TagName.DIV);
            toolbarForm.id = this._conf._ID_BOARD_TOOLBAR;

            var btnBackspace = new BUTTON(this._i18n.getMessageById(this._conf._ID_LABEL_BACKSPACE_BUTTON));
            btnBackspace._btn.setAttribute('data-action', this._conf._NAME_ACT_BACKSPACE);
            toolbarForm.appendChild(btnBackspace._btn);
            document.getElementById("container").appendChild(toolbarForm);
            
            var btnRename = new BUTTON(this._i18n.getMessageById(this._conf._ID_LABEL_RENAME_BUTTON));
            btnRename._btn.setAttribute('data-action', this._conf._NAME_ACT_RENAME_BOARD);
            toolbarForm.appendChild(btnRename._btn);
            document.getElementById("container").appendChild(toolbarForm);
            
            this.CreateBoardPlace();
        },
        CreateBoardPlace: function()
        {
            var boardPlace = document.createElement(goog.dom.TagName.DIV);
            boardPlace.id = this._conf._ID_BOARD_PLACE;
            document.getElementById("container").appendChild(boardPlace);
        },
        DrawBoard: function(board)
        {
            var BoardName = document.createElement(goog.dom.TagName.LABEL);
            BoardName.id = this._conf._ID_LABEL_BOARD_NAME;
            BoardName.innerHTML = board._nameBoard;
            document.getElementById(this._conf._ID_BOARD_PLACE).appendChild(BoardName);
            var i = 0;
            while (i < board.getNumberLists())
            {
                var listDiv = document.createElement(goog.dom.TagName.BUTTON);
                var list = board.getList(i);
                listDiv.innerHTML = list._nameList;
                listDiv.style.color = "white";
                listDiv.style.background = "blue";
                document.getElementById(this._conf._ID_BOARD_PLACE).appendChild(listDiv);
                i += 1;
            }
        }

    });
});