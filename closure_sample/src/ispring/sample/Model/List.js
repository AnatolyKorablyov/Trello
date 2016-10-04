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
            this._cards = []; // new CardList();
        },

        getCards: function()
        {
            return this._cards;    
        },
        
        /**
         * @returns {Number}
         */
        getCardsLength: function()
        {
            return this._cards.length;
        },
        
        addCard: function(nameCard)
        {
            this._cards.push(new CARD(nameCard));
        },
        
        renameCard: function(numId, newName)
        {
            this._cards[numId]._nameCard = newName;
        }
        
    });
});