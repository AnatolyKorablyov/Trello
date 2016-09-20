goog.provide("ispring.sample.Model.TrelloModel");

goog.require("ispring.sample.Model.Board");
/**
 * @export
 */
goog.scope(function() {
    
    const BOARD = ispring.sample.Model.Board;
    
    /**
     * @constructor
     */
    ispring.sample.Model.TrelloModel = goog.defineClass(null, {
        constructor: function ()
        {
            this._userName = "";
            this.takeUsersInfoFromLocalStorage();
            this.takeAllBoardsFromLocalStorage();
        },
        setUserName: function(userName)
        {
            this._userName = userName;

            this._userBoards = this._usersInfo[this._userName];
            if (this._userBoards == null)
            {
                this._userBoards = [];
            }
        },
        takeUsersInfoFromLocalStorage: function()
        {
            this._usersInfo = {"admin": ["0"]};
            var UsersStorage = window.localStorage.getItem("usersInfo");
            if (UsersStorage != null)
            {
                this._usersInfo = JSON.parse(UsersStorage);
            }
        },
        takeAllBoardsFromLocalStorage: function()
        {
            this._boards = {'0': (new BOARD("New Board", "0"))};
            var BoardsStorage = window.localStorage.getItem('boards');
            if (BoardsStorage != null)
            {
                this._boards = JSON.parse(BoardsStorage);
            }
        },
        createBoard: function()
        {
            var unicalID = new Date().getTime().toString();
            this._boards[unicalID] = new BOARD("New Board", unicalID);
            window.localStorage.setItem('boards', JSON.stringify(this._boards));
            this._userBoards.push(unicalID);
            this._usersInfo[this._userName] = this._userBoards;

            window.localStorage.setItem("usersInfo", JSON.stringify(this._usersInfo));
        },
        getUserBoard: function(numId)
        {
            var uId = this._userBoards[numId];
            return this._boards[this._userBoards[numId]];
        },
        getNumberBoards: function()
        {
            return this._userBoards.length;
        },
        getBoard: function(boardID)
        {
            return this._boards[boardID];
        },
        RenameBoard: function(id, newName)
        {
            this._boards[id]._nameBoard = newName;
            window.localStorage.setItem('boards', JSON.stringify(this._boards));
        }
    });
});
