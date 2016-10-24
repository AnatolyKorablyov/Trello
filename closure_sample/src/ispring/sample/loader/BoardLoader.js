goog.provide("ispring.sample.loader.BoardLoader");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.model.Board");
goog.require("ispring.sample.loader.ListsLoader");
//goog.require("ispring.sample.model.List");

/**
 * @export
 */
goog.scope(function()
{

    /**
     * @constructor
     * @param {Object} serializedModel
     */
    ispring.sample.loader.BoardLoader = goog.defineClass(null, {
        constructor: function ()
        {
            const Config = ispring.sample.Config;
            this._conf = new Config();
        },

        /**
         * @return {ispring.sample.model.Board}
         */
        loadBoardModel: function(board)
        {
            const Board = ispring.sample.model.Board;

            const boardModel = new Board(board._nameBoard, board._id);

            this._loadLists(boardModel.getLists(), board._lists);

            return boardModel;
        },

        /**
         * @param {Object} boardModelLists
         * @param {Object} lists
         * @private
         */
        _loadLists: function(boardModelLists, lists)
        {
            const ListsLoader = ispring.sample.loader.ListsLoader;
            const listsLoader = new ListsLoader();

            boardModelLists = listsLoader.loadListsModel(lists);
        }
    });
});