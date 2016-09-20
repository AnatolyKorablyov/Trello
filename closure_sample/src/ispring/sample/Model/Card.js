goog.provide("ispring.sample.Model.Card");
goog.require("ispring.sample.Model.Comment");

/**
 * @export
 */
goog.scope(function()
{
    const COMMENT = ispring.sample.Model.Comment;

    /**
     * @constructor
     */
    ispring.sample.Model.Card = goog.defineClass(null, {
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