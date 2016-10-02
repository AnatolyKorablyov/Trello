goog.provide("ispring.sample.model.ApplicationModel");

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
        },

        /**
         * @param {string} lang
         */
        setLanguage: function(lang)
        {
            this._language = lang;    
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