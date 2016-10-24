goog.provide("ispring.sample.loader.AuthorizationLoader");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.model.AuthorizationModel");

/**
 * @export
 */
goog.scope(function()
{

    /**
     * @constructor
     * @param {Object} serializedModel
     */
    ispring.sample.loader.AuthorizationLoader = goog.defineClass(null, {
        constructor: function (serializedModel)
        {
            const Config = ispring.sample.Config;
            /**
             * @type {ispring.sample.Config}
             * @private
             */
            this._conf = new Config();

            this._serializedModel = serializedModel;
        },

        /**
         * @return {ispring.sample.model.AuthorizationModel}
         */
        loadAuthorizationModel: function()
        {
            const AuthorizationModel = ispring.sample.model.AuthorizationModel;

            /**
             * @type {ispring.sample.model.AuthorizationModel}
             */
            const authorizationModel = new AuthorizationModel();

            this._loadUsersLoginPass(authorizationModel.getUsers(), this._serializedModel[this._conf._keys.USERS]);

            return authorizationModel;
        },

        /**
         * @private
         * @param {Object|*} users
         * @param {string} usersJson
         */
        _loadUsersLoginPass: function(users, usersJson)
        {
            if (usersJson != null)
            {
                var localUsers = JSON.parse(usersJson);
                for (var key in localUsers)
                {
                    users[key] = localUsers[key];
                }
            }
        },


        /**
         * @param {ispring.sample.model.AuthorizationModel} model
         */
        saveModelToStorage: function(model)
        {
            this._serializedModel[this._conf._keys.USERS] = JSON.stringify(model.getUsers());
        }
    });
});