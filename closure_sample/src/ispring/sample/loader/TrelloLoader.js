goog.provide("ispring.sample.loader.TrelloLoader");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.model.TrelloModel");
goog.require("ispring.sample.loader.BoardsLoader");

/**
 * @export
 */
goog.scope(function()
{
    
    /**
     * @constructor
     * @param {Object} serializedModel
     */
    ispring.sample.loader.TrelloLoader = goog.defineClass(null, {
        constructor: function (serializedModel)
        {
            const Config = ispring.sample.Config;
            /**
             * @type {ispring.sample.Config}
             * @private
             */
            this._conf = new Config();
            this._serializedModel = serializedModel;
        },

        /**
         * @return {ispring.sample.model.TrelloModel}
         */
        loadTrelloModel: function(userName)
        {
            const TrelloModel = ispring.sample.model.TrelloModel;
            const trelloModel = new TrelloModel(userName);

            trelloModel.setBoards(this._loadBoards(userName));

            return trelloModel;
        },
        
        /**
         * @private
         * @param {string} userName
         */
        _loadBoards: function(userName)
        {
            const BoardsLoader = ispring.sample.loader.BoardsLoader;

            /**
             * @type {ispring.sample.loader.BoardsLoader}
             * @private
             */
            this._boardsLoader = new BoardsLoader(this._serializedModel);
            return this._boardsLoader.loadBoardsModel(userName);
        },
        
        /**
         * @param {ispring.sample.model.TrelloModel} model
         */
        saveModelToStorage: function(model)
        {
            this._boardsLoader.saveModelToLocalStorage(model.getUserName(), model.getBoards());
        }
    });
});