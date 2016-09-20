goog.provide("ispring.sample.TrelloController");
goog.require("goog.dom.TagName");

goog.require("ispring.sample.Authorization");
goog.require("ispring.sample.Model.TrelloModel");
goog.require("ispring.sample.View.MainView");
goog.require("ispring.sample.View.BoardView");
goog.require("ispring.sample.Config");
goog.require("ispring.sample.Button");

goog.scope(function()
{
    const CONFIG = ispring.sample.Config;
    const AUTHORIZATION = ispring.sample.Authorization;
    const TRELLO_MODEL = ispring.sample.Model.TrelloModel;
    const MAIN_VIEW = ispring.sample.View.MainView;
    const BUTTON = ispring.sample.Button;
    const BOARD_VIEW = ispring.sample.View.BoardView;
    
    /**
     * @constructor
     */
    ispring.sample.TrelloController = goog.defineClass(null, {
        constructor: function ()
        {
            this._conf = new CONFIG();
            this._authorization = new AUTHORIZATION();
            this._trelloModel = new TRELLO_MODEL();
            this._mainView = new MAIN_VIEW();


            var btnSend = new BUTTON("SEND");
            const thisPtr = this;
            btnSend._btn.onclick = function () {
                if (thisPtr._authorization.ValidationUser())
                {
                    thisPtr.CreateBasicMenu();
                }
            };
            document.getElementById(this._conf._ID_AUTHORIZATION_FORM).appendChild(btnSend._btn);
        },
        RemoveChildren: function(node)
        {
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
        },
        DrawBoards: function()
        {
            this.RemoveChildren(document.getElementById(this._conf._ID_BOARDS_PANEL));
            var i = 0;
            while (i < this._trelloModel.getNumberBoards())
            {
                this._mainView.DrawBoards(this._trelloModel.getUserBoard(i));
                i += 1;
            }
        },
        CreateBasicMenu: function()
        {
            this._trelloModel.setUserName(window.varLogin);
            this._mainView.CreateToolbar();
            this.CreateToolbarActs();
            this.DrawBoards();
            this.CreateBoardsActs();
        },
        CreateBoard: function()
        {
            this._trelloModel.createBoard();
            this.DrawBoards();
        },
        ClickBoard: function(boardID)
        {
            document.getElementById(this._conf._ID_MAIN_TOOLBAR).style.display = "none";
            document.getElementById(this._conf._ID_BOARDS_PANEL).style.display = "none";
            this._boardView = new BOARD_VIEW();
            this._boardId = boardID;
            this.CreateBoardToolbarActs();
            this._boardView.DrawBoard(this._trelloModel.getBoard(this._boardId));
        },
        ClickBackspace: function()
        {

            document.getElementById("container").removeChild(document.getElementById(this._conf._ID_BOARD_TOOLBAR));
            document.getElementById("container").removeChild(document.getElementById(this._conf._ID_BOARD_PLACE));

            document.getElementById(this._conf._ID_MAIN_TOOLBAR).style.display = "block";
            document.getElementById(this._conf._ID_BOARDS_PANEL).style.display = "block";
            this.DrawBoards();
        },
        RenameBoard: function()
        {
            var nameBoard = this._trelloModel.getBoard(this._boardId)._nameBoard;
            var newNameBoard = prompt("Rename", nameBoard);
            if (newNameBoard != null)
            {
                this._trelloModel.RenameBoard(this._boardId, newNameBoard);
            }
        },
        CreateBoardToolbarActs: function()
        {
            const thisPtr = this;
            function BoardMenu(elem) {
                this.backspace = function() {
                    thisPtr.ClickBackspace();
                };
                this.renameBoard = function() {
                    thisPtr.RenameBoard();
                };
                var self = this;

                elem.onclick = function(e) {
                    var target = e.target;
                    var action = target.getAttribute('data-action');
                    if (action) {
                        self[action]();
                    }
                };
                document.getElementById("container").insertBefore(elem, document.getElementById(thisPtr._conf._ID_BOARD_PLACE));
            }
            BoardMenu(document.getElementById(this._conf._ID_BOARD_TOOLBAR));
        },
        CreateBoardsActs: function()
        {
            const thisPtr = this;
            function Boards(elem) {
                this.clickBoard = function(boardID) {
                    thisPtr.ClickBoard(boardID);
                };

                var self = this;

                elem.onclick = function(e) {
                    var target = e.target;
                    var action = target.getAttribute('data-action');
                    if (action) {
                        self[action](e.target.id);
                    }
                };
                document.getElementById("container").appendChild(elem);
            }
            Boards(document.getElementById(this._conf._ID_BOARDS_PANEL));
        },
        CreateToolbarActs: function()
        {
            const thisPtr = this;
            function Menu(elem) {
                this.createBoard = function() {
                   thisPtr.CreateBoard();
                };
                this.load = function() {
                    alert( 'загружаю' );
                };
                this.search = function() {
                    alert( 'ищу' );
                };

                var self = this;

                elem.onclick = function(e) {
                    var target = e.target;
                    var action = target.getAttribute('data-action');
                    if (action) {
                        self[action]();
                    }
                };
                document.getElementById("container").insertBefore(elem, document.getElementById(thisPtr._conf._ID_BOARDS_PANEL));
            }
            Menu(document.getElementById(this._conf._ID_MAIN_TOOLBAR));
        }
    });
});