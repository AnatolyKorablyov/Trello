goog.provide("ispring.sample.loader.TrelloLoader");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.model.TrelloModel");
goog.require("ispring.sample.model.Board");

/**
 * @export
 */
goog.scope(function()
{
    const Config = ispring.sample.Config;
    const TrelloModel = ispring.sample.model.TrelloModel;

    /**
     * @constructor
     * @param {Object} serializedModel
     */
    ispring.sample.loader.TrelloLoader = goog.defineClass(null, {
        constructor: function (serializedModel)
        {
            this._conf = new Config();
            this._serializedModel = serializedModel;
        },

        /**
         * @return {ispring.sample.model.TrelloModel}
         */
        loadTrelloModel: function(userName)
        {
            const trelloModel = new TrelloModel(userName);

            this._loadBoardsId(trelloModel.getUserName(), trelloModel.getUserBoardsID(), this._serializedModel[this._conf._keys.USERS_INFO]);

            this._loadBoards(trelloModel.getBoards(), trelloModel.getUserBoardsID(), this._serializedModel[this._conf._keys.BOARDS]);
            
            return trelloModel;
        },

        /**
         * @private
         * @param {ispring.sample.model.TrelloModel} userName
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
         * @param {ispring.sample.model.TrelloModel} boards
         * @param {Array} boardsId
         * @param {string} boardsJson
         */
        _loadBoards: function(boards, boardsId, boardsJson)
        {
            if (boardsJson != null)
            {
                var localBoards = JSON.parse(boardsJson);

                for (var i = 0; i < boardsId.length; i++)
                {
                    boards[boardsId[i]] = localBoards[boardsId[i]];
                }
            }
        },
        
        /**
         * @param {ispring.sample.model.TrelloModel} model
         */
        saveModelToStorage: function(model)
        {
            var localBoardsID = {};
            if (this._serializedModel[this._conf._keys.USERS_INFO] != null)
            {
                localBoardsID = JSON.parse(this._serializedModel[this._conf._keys.USERS_INFO]);
            }
            localBoardsID[model.getUserName()] = model.getUserBoardsID();
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