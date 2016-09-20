goog.provide("ispring.sample.Button");
goog.require("goog.dom.TagName");

/**
 * @export
 */
goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.sample.Button = goog.defineClass(null, {
        constructor: function (nameBtn)
        {
            this._btn = document.createElement(goog.dom.TagName.INPUT);
            this._btn.type = "button";
            this._btn.value = nameBtn;
        }
    });
});