goog.provide("ispring.sample.loader.CardLoader");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.model.Card");

/**
 * @export
 */
goog.scope(function()
{

    /**
     * @constructor
     * @param {Object} serializedModel
     */
    ispring.sample.loader.CardLoader = goog.defineClass(null, {
        constructor: function ()
        {
            const Config = ispring.sample.Config;
            this._conf = new Config();
        },

        /**
         * @return {ispring.sample.model.Card}
         */
        loadCardModel: function(card)
        {
            const Card = ispring.sample.model.Card;

            const cardModel = new Card(card._cardName, card._id);

            this._loadComments(cardModel.getComments(), card._comments);

            return cardModel;
        },

        /**
         * @private
         * @param {Array} boardModelListsId
         * @param {Array} listsId
         */
        _loadListsId: function(boardModelListsId, listsId)
        {
            var lengthArray = listsId.length;
            for (var i = 0; i < lengthArray; i++)
            {
                boardModelListsId.push(listsId[i]);
            }
        },

        /**
         * @param {Array} listModelCards // CardList
         * @param {Array} cards
         * @private
         */
        _loadComments: function(listModelCards, cards)
        {
            for (var i = 0; i < cards.length; i++)
            {
                listModelCards.push(cards[i]);
            }
        }
    });
});