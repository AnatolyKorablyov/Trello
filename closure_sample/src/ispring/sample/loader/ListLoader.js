goog.provide("ispring.sample.loader.ListLoader");

goog.require("ispring.sample.Config");

//goog.require("ispring.sample.model.Board");
goog.require("ispring.sample.model.List");
goog.require("ispring.sample.loader.CardLoader");

/**
 * @export
 */
goog.scope(function()
{

    /**
     * @constructor
     * @param {Object} serializedModel
     */
    ispring.sample.loader.ListLoader = goog.defineClass(null, {
        constructor: function ()
        {
            const Config = ispring.sample.Config;
            this._conf = new Config();
        },

        /**
         * @return {ispring.sample.model.List}
         */
        loadListModel: function(list)
        {
            const List = ispring.sample.model.List;
            const listModel = new List(list._nameList, list._id);


            //listModel.clearListsID();
            //this._loadCardId(boardModel.getListsID(), board._listsId);
            this._loadCards(listModel.getCards(), list._cards);

            return listModel;
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
        _loadCards: function(listModelCards, cards)
        {
            const CardLoader = ispring.sample.loader.CardLoader;
            const cardLoader = new CardLoader();

            for (var i = 0; i < cards.length; i++)
            {
               listModelCards.push(cardLoader.loadCardModel(cards[i]));
            }
        }
    });
});