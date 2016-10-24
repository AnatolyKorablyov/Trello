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
         * @returns {number}
         */
        getCardsLength: function()
        {
            return this._cards.length;
        },
        
        addCard: function(nameCard)
        {
            var unicalID = new Date().getTime().toString();
            this._cards.push(new CARD(nameCard, unicalID));
        },
        
        renameCard: function(Id, newName)
        {
            for (var i = 0; i < this._cards.length; ++i)
            {
                if (Id == this._cards[i].getCardId())
                {
                    this._cards[i].renameCard(newName);
                }
            }
        }
        
    });
});