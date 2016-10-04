goog.provide("ispring.sample.model.TrelloModel");

goog.require("ispring.sample.model.Board");

/**
 * @export
 */
goog.scope(function() {

    const BOARD = ispring.sample.model.Board;

    /**
     * @constructor
     */
    ispring.sample.model.TrelloModel = goog.defineClass(null, {
        constructor: function (userName)
        {
            this._userName = userName;
            this._userBoards = [];
            this._boards = {'0': (new BOARD("New Board", "0"))};
        },
        
        getUserBoardsID: function()
        {
            return this._userBoards;
        },

        getUserName: function()
        {
            return this._userName;
        },
        
        getBoards: function()
        {
            return this._boards;
        },
        
        setUserName: function(userName)
        {
            this._userName = userName;
        },

        /**
         * @param {ispring.sample.model.Board} board
         */
        setBoard: function(board)
        {
            this._boards[board._id]._listsId = []; // лишнее действие
            // нельзя обращаться к приватным переменным

            for (var i = 0; i < board.getNumberLists(); i++)
            {
                this._boards[board._id]._listsId.push(board._listsId[i]);
            }

            this._boards[board._id]._lists = {};
            const lists = board.getLists();
            for (var key in lists)
            {
                this._boards[board._id]._lists[key] = lists[key];
            }

        },
        
        createBoard: function(boardName)
        {
            var unicalID = new Date().getTime().toString();
            this._boards[unicalID] = new BOARD(boardName, unicalID);
            this._userBoards.push(unicalID);
        },
        
        getUserBoard: function(numId)
        {
            var uId = this._userBoards[numId];
            return this._boards[uId];
        },
        
        getNumberBoards: function()
        {
            return this._userBoards.length;
        },
        
        getBoard: function(boardID)
        {
            return this._boards[boardID];
        },
        
        renameBoard: function(id, newName)
        {
            this._boards[id]._nameBoard = newName;
        }
    });
});
