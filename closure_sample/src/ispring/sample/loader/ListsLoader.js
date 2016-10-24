goog.provide("ispring.sample.loader.ListsLoader");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.loader.ListLoader");

/**
 * @export
 */
goog.scope(function()
{

    /**
     * @constructor
     * @param {Object} serializedModel
     */
    ispring.sample.loader.ListsLoader = goog.defineClass(null, {
        constructor: function ()
        {
            const Config = ispring.sample.Config;
            this._conf = new Config();
        },

        /**
         * @return {ispring.sample.model.ListsModel}
         */
        loadListsModel: function(lists)
        {
            const ListsModel = ispring.sample.model.ListsModel;
            const listsModel = new ListsModel();

            console.log(lists);
            this._loadListsId(listsModel.getListsID(), lists._listsId);
            this._loadLists(listsModel.getLists(), lists._lists);
            
            return listsModel;
        },

        /**
         * @private
         * @param {Array} newListsID
         * @param {Array} listsID
         */
        _loadListsId: function(newListsID, listsID)
        {
            console.log(listsID);
            for (var i = 0; i < listsID.length; i++)
            {
                newListsID.push(listsID[i]);
            }
        },

        /**
         * @private
         * @param {Object} newLists
         * @param {Object} lists
         */
        _loadLists: function(newLists, lists)
        {
            const ListLoader = ispring.sample.loader.ListLoader;
            const listLoader = new ListLoader();

            for (var key in lists)
            {
                newLists[key] = listLoader.loadListModel(lists[key]);
            }
        }
    });
});