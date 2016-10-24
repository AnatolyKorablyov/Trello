goog.provide("ispring.sample.loader.BoardsLoader");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.loader.BoardLoader");

/**
 * @export
 */
goog.scope(function()
{

    /**
     * @constructor
     * @param {Object} serializedModel
     */
    ispring.sample.loader.BoardsLoader = goog.defineClass(null, {
        constructor: function (serializedModel)
        {
            const Config = ispring.sample.Config;
            this._conf = new Config();
            
            this._serializedModel = serializedModel;
        },

        /**
         * @return {ispring.sample.model.BoardsList}
         */
        loadBoardsModel: function(userName)
        {
            const BoardsList = ispring.sample.model.BoardsList;
            const boardsList = new BoardsList();

            this._loadBoardsId(userName, boardsList.getBoardsID(), this._serializedModel[this._conf._keys.USERS_INFO]);

            this._loadBoards(boardsList.getBoards(), boardsList.getBoardsID(), this._serializedModel[this._conf._keys.BOARDS]);

            //listModel.clearListsID();
            //this._loadCardId(boardModel.getListsID(), board._listsId);
            //this._loadComments(cardModel.getComments(), card._comments);

            return boardsList;
        },

        /**
         * @private
         * @param {string} userName
         * @param {Array} boardsID
         * @param {string} usersJson
         */
        _loadBoardsId: function(userName, boardsID, usersJson)
        {
            if (usersJson != null)
            {
                var localUsers = JSON.parse(usersJson);
                var boards = localUsers[userName];
                if (boards != null)
                {
                    for (var i = 0; i < boards.length; i++)
                    {
                        boardsID.push(boards[i]);
                    }
                }
            }
        },

        /**
         * @private
         * @param {Object} boards
         * @param {Array} boardsId
         * @param {string} boardsJson
         */
        _loadBoards: function(boards, boardsId, boardsJson)
        {
            const BoardLoader = ispring.sample.loader.BoardLoader;
            const boardLoader = new BoardLoader();


            if (boardsJson != null)
            {
                var localBoards = JSON.parse(boardsJson);

                for (var i = 0; i < boardsId.length; i++)
                {
                    boards[boardsId[i]] = boardLoader.loadBoardModel(localBoards[boardsId[i]]);
                }
            }
        },

        /**
         * @param {string} userName
         * @param {ispring.sample.model.BoardsList} model
         */
        saveModelToLocalStorage: function(userName, model)
        {
            var localBoardsID = {};
            if (this._serializedModel[this._conf._keys.USERS_INFO] != null)
            {
                localBoardsID = JSON.parse(this._serializedModel[this._conf._keys.USERS_INFO]);
            }
            localBoardsID[userName] = model.getBoardsID();
            this._serializedModel[this._conf._keys.USERS_INFO] = JSON.stringify(localBoardsID);

            var localBoards = {};
            if (this._serializedModel[this._conf._keys.BOARDS] != null)
            {
                localBoards = JSON.parse(this._serializedModel[this._conf._keys.BOARDS]);
            }
            for (var key in model.getBoards())
            {
                localBoards[key] = model.getBoards()[key];
            }

            this._serializedModel[this._conf._keys.BOARDS] = JSON.stringify(localBoards);
        }

    });
});