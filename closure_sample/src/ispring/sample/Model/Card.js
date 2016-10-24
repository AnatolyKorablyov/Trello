goog.provide("ispring.sample.model.Card");
goog.require("ispring.sample.model.Comment");

/**
 * @export
 */
goog.scope(function()
{
    const COMMENT = ispring.sample.model.Comment;

    /**
     * @constructor
     * @param {string} cardName
     * @param {string} id
     */
    ispring.sample.model.Card = goog.defineClass(null, {
        constructor: function (cardName, id)
        {
            /**
             * @type {Array}
             * @private
             */
            this._comments = [];

            /**
             * @type {string}
             * @private
             */
            this._cardName = cardName;


            /**
             * @type {string}
             * @private
             */
            this._id = id;

        },
        
        getCardName: function()
        {
            return this._cardName;    
        },
        
        getCardId: function()
        {
            return this._id;
        },

        renameCard: function(newName)
        {
            this._cardName = newName;
        },
        
        getComments: function()
        {
            return this._comments;
        },
        
        addComment: function(author, text)
        {
            var comment = new COMMENT(author, text);
            this._comments.push(comment);
        }
    });
});