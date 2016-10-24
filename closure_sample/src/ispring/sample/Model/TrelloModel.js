goog.provide("ispring.sample.model.TrelloModel");

goog.require("ispring.sample.model.BoardsList");

/**
 * @export
 */
goog.scope(function() 
{
    const BoardsList = ispring.sample.model.BoardsList;

    /**
     * @constructor
     */
    ispring.sample.model.TrelloModel = goog.defineClass(null, {
        constructor: function (userName)
        {
            this._userName = userName;

            this._boards = new BoardsList();
        },

        getUserName: function()
        {
            return this._userName;
        },

        setBoards: function(boards)
        {
            this._boards = boards;
        },
        
        /**
         * @returns {ispring.sample.model.BoardsList}
         */
        getBoards: function()
        {
            return this._boards;
        },
        
        setUserName: function(userName)
        {
            this._userName = userName;
        }

    });
});
