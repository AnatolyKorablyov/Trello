goog.provide("ispring.sample.controller.ApplicationController");

//goog.require("goog.dom.TagName");

goog.require("ispring.sample.Config");

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
   // const TrelloLoader = ispring.sample.loader.TrelloLoader;
   // const TrelloController = ispring.sample.controller.TrelloController;
    
    /**
     * @constructor
     */
    ispring.sample.controller.ApplicationController = goog.defineClass(null, {
        constructor: function ()
        {
            const thisPtr = this;

            const Config = ispring.sample.Config;

            /**
             * @type {ispring.sample.Config}
             * @private
             */
            this._conf = new Config();


            const ApplicationModel = ispring.sample.model.ApplicationModel;

            /**
             * @type {ispring.sample.model.ApplicationModel}
             * @private
             */
            this._applicationModel = new ApplicationModel();

            const ApplicationView = ispring.sample.view.ApplicationView;
            /**
             * @type {ispring.sample.view.ApplicationView}
             * @private
             */
            this._applicationView = new ApplicationView(this);


            this._loadAuthorization();

            document.addEventListener(this._conf._EVENT_LANGUAGE_MODIFIED, function (e) 
            {
                thisPtr._applicationView.changeLanguage();
            });

            document.addEventListener(this._conf._EVENT_CLEAN_VIEW, function(e)
            {
                thisPtr._applicationView.cleanApplication();
            });

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
            
            const AuthorizationLoader = ispring.sample.loader.AuthorizationLoader;
            
            /**
             * @type {ispring.sample.loader.AuthorizationLoader}
             * @private
             */
            this._authorizationLoader = new AuthorizationLoader(window.localStorage);

            const AuthorizationController = ispring.sample.controller.AuthorizationController;

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
        },

        /**
         * @returns {string}
         */
        getLanguage: function()
        {
            return this._applicationModel.getLanguage();
        },

        /**
         * @returns {ispring.sample.I18n}
         */
        getI18n: function()
        {
            return this._applicationModel.getI18n();
        },
        
        authorizationComplete: function(userName)
        {
            this._authorizationLoader.saveModelToStorage(this._authorizationController.getModel());
            this._authorizationController = null;
            this._loadTrello(userName);
        },

        /**
         * @param {string} userName
         * @private
         */
        _loadTrello: function(userName)
        {
            this._applicationView.addAccountInfo(userName);

            this._childConstructors = [];
            const TrelloLoader = ispring.sample.loader.TrelloLoader;
            /**
             * @type {ispring.sample.loader.TrelloLoader}
             * @private
             */
            this._trelloLoader = new TrelloLoader(window.localStorage);


            const TrelloController = ispring.sample.controller.TrelloController;
            /**
             * @type {ispring.sample.controller.TrelloController}
             * @private
             */
            this._trelloController = new TrelloController(this._trelloLoader.loadTrelloModel(userName));
            this._trelloController.addParentController(this);

            this._childConstructors.push(this._trelloController);
        },
        
        logout: function()
        {
            this._trelloLoader.saveModelToStorage(this._trelloController.getModel());

            document.dispatchEvent(new Event(this._conf._EVENT_CLEAN_VIEW));
            this._loadAuthorization();
        }
    });
});