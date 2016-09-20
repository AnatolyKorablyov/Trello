goog.provide("ispring.sample.Model.Board");
goog.require("ispring.sample.Model.List");

/**
 * @export
 */
goog.scope(function()
{
    const LIST = ispring.sample.Model.List;

    /**
     * @constructor
     */
    ispring.sample.Model.Board = goog.defineClass(null, {
        constructor: function (nameBoard, id)
        {
            this._nameBoard = nameBoard;
            this._id = id;
            this._lists = [];
            this.createBasicLists();
        },
        createBasicLists: function()
        {
            this._lists.push(new LIST("To Do"));
            this._lists.push(new LIST("Doing"));
            this._lists.push(new LIST("Done"));
        },
        getNumberLists: function()
        {
            return this._lists.length;
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
            return this._lists[numId];
        }
        
    });
});