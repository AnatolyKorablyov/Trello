goog.provide("ispring.sample.model.List");
goog.require("ispring.sample.model.Card");

/**
 * @export
 */
goog.scope(function()
{
    const CARD = ispring.sample.model.Card;

    /**
     * @constructor
     */
    ispring.sample.model.List = goog.defineClass(null, {
        constructor: function (nameList, id)
        {
            this._nameList = nameList;
            this._id = id;
            this._cards = [];
        },
        
        addCard: function(nameCard)
        {
            this._comments.push(new CARD(nameCard));
        }
        
    });
});