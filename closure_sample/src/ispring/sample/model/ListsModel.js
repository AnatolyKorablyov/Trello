goog.provide("ispring.sample.model.ListsModel");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.model.List");

/**
 * @export
 */
goog.scope(function()
{
    const LIST = ispring.sample.model.List;

    /**
     * @constructor
     */
    ispring.sample.model.ListsModel = goog.defineClass(null, {
        constructor: function ()
        {
            const Config = ispring.sample.Config;
            this._conf = new Config();


            /**
             * @type {Array}
             * @private
             */
            this._listsId = [];

            /**
             * @type {Object}
             * @private
             */
            this._lists = {};

            this._createBasicLists();
        },

        dispatchEventModifiedModel: function()
        {
            document.dispatchEvent(new Event(this._conf._EVENT_MODIFIED_LISTS_MODEL));
        },

        /**
         * @private
         */
        _createBasicLists: function()
        {
            var unicalID = new Date().getTime().toString();
            this._listsId.push(unicalID);
            this._lists[unicalID] = new LIST("To Do", unicalID);

            unicalID = new Date().getTime().toString() + "1";
            this._listsId.push(unicalID);
            this._lists[unicalID] = new LIST("Doing", unicalID);


            unicalID = new Date().getTime().toString() + "2";
            this._listsId.push(unicalID);
            this._lists[unicalID] = new LIST("Done", unicalID);
        },

        getNumberLists: function()
        {
            return this._listsId.length;
        },

        getList: function(numId)
        {
            return this._lists[this._listsId[numId]];
        },

        createList: function()
        {
            var unicalID = new Date().getTime().toString();
            this._listsId.push(unicalID);
            this._lists[unicalID] = new LIST("Complete", unicalID);

            this.dispatchEventModifiedModel();
        },

        /**
         * @param {string} id
         * @param {string} newName
         */
        renameList: function(id, newName)
        {
            this._lists[id]._nameList = newName;
            this.dispatchEventModifiedModel();
        },

        renameCard: function(id, numId, newName)
        {
            // TODO:: убрать прямое включение, абстрагировать
            this._lists[id].renameCard(numId, newName)
            this.dispatchEventModifiedModel();
        },

        clearListsID: function()
        {
            this._listsId = [];
            this._lists = {};
        },
        
        /**
         * @returns {Array}
         */
        getListsID: function()
        {
            return this._listsId;
        },

        /**
         * @returns {Object}
         */
        getLists: function()
        {
            return this._lists;
        },

        addCardInLists: function(id)
        {
            this._lists[id].addCard("");
            this.dispatchEventModifiedModel();
        }
    });
});