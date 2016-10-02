goog.provide("ispring.sample.loader.BoardLoader");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.model.Board");
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


            this._loadListsId(boardModel.getListsID(), board._listsId);
            this._loadLists(boardModel.getLists(), boardModel.getListsID(), board._lists);
            return boardModel;
        },

        /**
         * @private
         * @param {ispring.sample.model.Board} boardModelListsId
         * @param {Array} listsId
         */
        _loadListsId: function(boardModelListsId, listsId)
        {
            boardModelListsId = [];
            var lengthArray = listsId.length;
            for (var i = 0; i < lengthArray; i++)
            {
                boardModelListsId.push(listsId[i]);
            }
        },

        /**
         * @param {ispring.sample.model.Board} boardModelLists
         * @param {Array} listsId
         * @param {{}} lists
         * @private
         */
        _loadLists: function(boardModelLists, listsId, lists)
        {
            boardModelLists = {};
            var lengthArray = listsId.length;
            for (var i = 0; i < lengthArray; i++)
            {
                boardModelLists[listsId[i]] = lists[listsId[i]];
            }
        }
    });
});