goog.provide("ispring.sample.model.AuthorizationModel");

goog.require("ispring.sample.ShaCrypt");

/**
 * @export
 */
goog.scope(function()
{
    const ShaCrypt = ispring.sample.ShaCrypt;

    /**
     * @constructor
     */
    ispring.sample.model.AuthorizationModel = goog.defineClass(null, {
        constructor: function ()
        {
            this._crypt = new ShaCrypt();
            this._users = {"admin": this._crypt.sha1("admin")};
            
        },
        
        /**
         *
         * @returns {{admin: *}|*}
         */
        getUsers: function()
        {
            return this._users;
        },

        /**
         * 
         * @param users
         */
        setUsers: function(users)
        {  
            this._users = users;
        },
        
        /**
         *
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
         * 
         * @param login
         */
        setUserName: function(login)
        {
            this._userName = login;
        },
        
        getUserName: function()
        {
            return this._userName;
        }
        
    });
});