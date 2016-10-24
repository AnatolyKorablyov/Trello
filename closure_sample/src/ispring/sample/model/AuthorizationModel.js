goog.provide("ispring.sample.model.AuthorizationModel");

goog.require("ispring.sample.ShaCrypt");

/**
 * @export
 */
goog.scope(function()
{

    /**
     * @constructor
     */
    ispring.sample.model.AuthorizationModel = goog.defineClass(null, {
        constructor: function ()
        {
            const ShaCrypt = ispring.sample.ShaCrypt;
            /**
             * @type {ispring.sample.ShaCrypt}
             * @private
             */
            this._crypt = new ShaCrypt();

            /**
             * @type {string}
             */
            var defaultName = "admin";

            /**
             * @type {Object}
             * @private
             */
            this._users = {};
            this._users[defaultName] = this._crypt.sha1(defaultName);
            
        },

        /**
         * @returns {Object|*}
         */
        getUsers: function()
        {
            return this._users;
        },

        /**
         * @param users
         */
        setUsers: function(users)
        {  
            this._users = users;
        },
        
        /**
         * @param login
         * @returns {*}
         */
        getPass: function(login)
        {
            return this._users[login];
        },

        /**
         *
         * @param login
         * @param pass
         */
        addUser: function(login, pass) 
        {
            this._users[login] = pass;
        },

        /**
         * @param {string} login
         */
        setUserName: function(login)
        {
            /**
             * @type {string}
             */
            this._userName = login;
        },
        
        getUserName: function()
        {
            return this._userName;
        }
        
    });
});