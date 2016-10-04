goog.provide("ispring.sample.model.Board");
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
    ispring.sample.model.Board = goog.defineClass(null, {
        constructor: function (nameBoard, id)
        {
            /**
             * @type {string}
             * @private
             */
            this._nameBoard = nameBoard;
            /**
             * @type {string}
             * @private
             */
            this._id = id;
            /**
             * @type {Array}
             */
            this._listsId = [];
            /**
             * @type {{}}
             */
            this._lists = {};
            this._createBasicLists();
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
        
        getName: function()
        {
            return this._nameBoard.clone();
        },
        
        getId: function()
        {
            return this._id.clone();
        },
        
        getList: function(numId)
        {
            return this._lists[this._listsId[numId]];
        },

        /**
         * @param {string} id
         * @param {string} newName
         */
        renameList: function(id, newName)
        {
            this._lists[id]._nameList = newName;
        },

        renameCard: function(id, numId, newName)
        {
            // TODO:: убрать прямое включение, абстрагировать
            this._lists[id].renameCard(numId, newName);
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
         * @returns {{}}
         */
        getLists: function()
        {
            return this._lists;
        },
        
        addCardInLists: function(id)
        {
            this._lists[id].addCard("");
        }
    });
});