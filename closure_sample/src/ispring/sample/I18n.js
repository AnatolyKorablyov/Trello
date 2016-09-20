goog.provide("ispring.sample.I18n");

goog.require("ispring.sample.ru");
goog.require("ispring.sample.en");

/**
 * @export
 */
goog.scope(function()
{
    const RU_LANGUAGE = ispring.sample.ru;
    const EN_LANGUAGE = ispring.sample.en;

    /**
     * @constructor
     */
    ispring.sample.I18n = goog.defineClass(null, {
        constructor: function ()
        {
            if (window.language == "ru")
            {
                this._messageMap = new RU_LANGUAGE();
            }
            else
            {
                this._messageMap = new EN_LANGUAGE();
            }
        },
        getMessageById: function (strId)
        {
            return this._messageMap.MESSAGES[strId];
        }
    });
});