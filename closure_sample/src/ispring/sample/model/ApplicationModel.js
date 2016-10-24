goog.provide("ispring.sample.model.ApplicationModel");
goog.require("ispring.sample.I18n");

goog.require("ispring.sample.Config");

/**
 * @export
 */
goog.scope(function()
{
    /**
     * @constructor
     */
    ispring.sample.model.ApplicationModel = goog.defineClass(null, {
        constructor: function ()
        {
            /**
             * @type {string}
             * @private
             */
            this._language = "ru";
            
            const I18n = ispring.sample.I18n;
            
            this._i18n = new I18n(this._language);

            const Config = ispring.sample.Config;

            /**
             * @type {ispring.sample.Config}
             * @private
             */
            this._conf = new Config();
        },

        /**
         * @returns {ispring.sample.I18n}
         */
        getI18n: function()
        {
            return this._i18n;   
        },
        
        /**
         * @param {string} lang
         * @returns {boolean}
         */
        setLanguage: function(lang)
        {
            if (this._language != lang)
            {
                this._language = lang;
                this._i18n.setLanguage(this._language);
                document.dispatchEvent(new Event(this._conf._EVENT_LANGUAGE_MODIFIED));
                return true;
            }
            return false;
        },
        
        /**
         * @param {string} userName
         */
        setUserName: function(userName)
        {
            /**
             * @type {string}
             * @private
             */
            this._userName = userName;
        },

        /**
         * @returns {string}
         */
        getLanguage: function() 
        {
            return this._language;
        },

        /**
         * @returns {string}
         */
        getUserName: function()
        {
            return this._userName;
        }
    });
});