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
     */
    ispring.sample.model.Card = goog.defineClass(null, {
        constructor: function (nameCard)
        {
            this._nameCard = nameCard;
            this._comments = [];
        },
        addComment: function(author, text)
        {
            var comment = new COMMENT(author, text);
            this._comments.push(comment);
        }
    });
});