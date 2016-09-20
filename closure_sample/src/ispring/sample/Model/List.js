goog.provide("ispring.sample.Model.List");
goog.require("ispring.sample.Model.Card");

/**
 * @export
 */
goog.scope(function()
{
    const CARD = ispring.sample.Model.Card;

    /**
     * @constructor
     */
    ispring.sample.Model.List = goog.defineClass(null, {
        constructor: function (nameList)
        {
            this._nameList = nameList;
            this._cards = [];
        },
        addCard: function(nameCard)
        {
            this._comments.push(new CARD(nameCard));
        }
    });
});