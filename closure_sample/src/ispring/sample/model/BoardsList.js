goog.provide("ispring.sample.model.BoardsList");
goog.require("ispring.sample.model.Board");
goog.require("ispring.sample.Config");

/**
 * @export
 */
goog.scope(function()
{
    const Board = ispring.sample.model.Board;

    /**
     * @constructor
     */
    ispring.sample.model.BoardsList = goog.defineClass(null, {
        constructor: function ()
        {
            const Config = ispring.sample.Config;
            this._conf = new Config();

            this._boardsID = [];
            this._boards = {'0': (new Board("New Board", "0"))};
        },


        _dispatchEventModifiedModel: function()
        {
            document.dispatchEvent(new Event(this._conf._EVENT_MODIFIED_BOARDS_MODEL));
        },
        
        /**
         * @returns {Object}
         */
        getBoards: function()
        {
            return this._boards;
        },

        getBoardsID: function()
        {
            return this._boardsID;
        },

        /**
         * @param {ispring.sample.model.Board} board
         */
        setBoard: function(board)
        {
            this._boards[board.getId()] = board;
            
            this._dispatchEventModifiedModel();
        },
        
        setBoards: function(boards)
        {
            this._boards = boards;
            
            this._dispatchEventModifiedModel();

        },
        
        /**
         * @returns {number}
         */
        getNumberBoards: function()
        {
            return this._boardsID.length;
        },
        
        /**
         * @param {number} numId
         * @returns {ispring.sample.model.Board}
         */
        getUserBoard: function(numId)
        {
            var uId = this._boardsID[numId];
            return this._boards[uId];
        },

        /**
         * @param {string} boardName
         */
        createBoard: function(boardName)
        {
            var unicalID = new Date().getTime().toString();
            this._boards[unicalID] = new Board(boardName, unicalID);
            this._boardsID.push(unicalID);
        
            this._dispatchEventModifiedModel();
        },

        
        getBoard: function(boardID)
        {
            return this._boards[boardID];
        },

        renameBoard: function(id, newName)
        {
            this._boards[id]._nameBoard = newName;
        
            this._dispatchEventModifiedModel();
        }
    });
});