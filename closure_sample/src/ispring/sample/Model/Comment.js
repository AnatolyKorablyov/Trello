goog.provide("ispring.sample.model.Comment");

/**
 * @export
 */
goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.sample.model.Comment = goog.defineClass(null, {
        constructor: function (author, text)
        {
            this._author = author;
            this._message = text;
        },
        getAuthor: function()
        {
            return this._author.clone();
        },
        getTextMessage: function()
        {
            return this._message.clone();
        }
    });
});