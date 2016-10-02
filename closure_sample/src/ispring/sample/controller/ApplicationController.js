goog.provide("ispring.sample.controller.ApplicationController");

goog.require("goog.dom.TagName");

goog.require("ispring.sample.model.ApplicationModel");
goog.require("ispring.sample.view.ApplicationView");

goog.require("ispring.sample.loader.AuthorizationLoader");
goog.require("ispring.sample.controller.AuthorizationController");
goog.require("ispring.sample.loader.TrelloLoader");
goog.require("ispring.sample.controller.TrelloController");

/**
 * @export
 */
goog.scope(function()
{
    const ApplicationModel = ispring.sample.model.ApplicationModel;
    const ApplicationView = ispring.sample.view.ApplicationView;
    const AuthorizationLoader = ispring.sample.loader.AuthorizationLoader;
    const AuthorizationController = ispring.sample.controller.AuthorizationController;
    
    const TrelloLoader = ispring.sample.loader.TrelloLoader;
    const TrelloController = ispring.sample.controller.TrelloController;
    
    /**
     * @constructor
     */
    ispring.sample.controller.ApplicationController = goog.defineClass(null, {
        constructor: function ()
        {



            /**
             * @type {ispring.sample.model.ApplicationModel}
             * @private
             */
            this._applicationModel = new ApplicationModel();

            /**
             * @type {ispring.sample.view.ApplicationView}
             * @private
             */
            this._applicationView = new ApplicationView(this);

            this._loadAuthorization();
        },

        /**
         * @private
         */
        _loadAuthorization: function()
        {
            /**
             * @type {Array}
             * @private
             */
            this._childConstructors = [];

            /**
             * @type {ispring.sample.loader.AuthorizationLoader}
             * @private
             */
            this._authorizationLoader = new AuthorizationLoader(window.localStorage);

            /**
             * @type {ispring.sample.controller.AuthorizationController}
             * @private
             */
            this._authorizationController = new AuthorizationController(this._authorizationLoader.loadAuthorizationModel());
            this._authorizationController.addParentController(this);

            this._childConstructors.push(this._authorizationController);
        },
        
        /**
         * @param {string} lang
         */
        selectLang: function(lang)
        {
            this._applicationModel.setLanguage(lang);
            this._applicationView.changeLanguage(lang);
            
            for (var i = 0; i < this._childConstructors.length; i++)
            {
                this._childConstructors[i].changeLanguage();
            }
        },

        /**
         * @returns {string}
         */
        getLanguage: function()
        {
            return this._applicationModel.getLanguage();
        },
        
        authorizationComplete: function(userName)
        {
            this._authorizationLoader.saveModelToStorage(this._authorizationController.getModel());
            this.loadTrello(userName);
        },

        loadTrello: function(userName)
        {
            this._applicationView.addAccountInfo(userName);
            
            this._childConstructors = [];
            this._trelloLoader = new TrelloLoader(window.localStorage);
            
            this._trelloController = new TrelloController(this._trelloLoader.loadTrelloModel(userName));
            this._trelloController.addParentController(this);

            this._childConstructors.push(this._trelloController);
        },
        
        logout: function()
        {
            this._trelloLoader.saveModelToStorage(this._trelloController.getModel());
            this._applicationView.cleanApplication();

            this._loadAuthorization();
        }
    });
});