goog.provide("ispring.sample.I18n");

goog.require("ispring.sample.languages.ru");
goog.require("ispring.sample.languages.en");

/**
 * @export
 */
goog.scope(function()
{
    const RU_LANGUAGE = ispring.sample.languages.ru;
    const EN_LANGUAGE = ispring.sample.languages.en;

    /**
     * @constructor
     */
    ispring.sample.I18n = goog.defineClass(null, {
        constructor: function (lang)
        {
            if (lang == "ru")
            {
                this._messageMap = new RU_LANGUAGE();
            }
            else
            {
                this._messageMap = new EN_LANGUAGE();
            }
        },
        
        setLanguage: function(lang)
        {
            if (lang == "ru")
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