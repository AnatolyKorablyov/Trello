goog.provide("ispring.sample.model.Board");
goog.require("ispring.sample.model.ListsModel");

/**
 * @export
 */
goog.scope(function()
{
    
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
            
            const ListsModel = ispring.sample.model.ListsModel;

            /**
             * @type {ispring.sample.model.ListsModel}
             * @private
             */
            this._lists = new ListsModel();
        },
        
        getName: function()
        {
            return this._nameBoard;
        },
        
        getId: function()
        {
            return this._id;
        },
        
        getLists: function()
        {
            return this._lists;
        }
    });
});