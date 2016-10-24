goog.provide("ispring.sample.controller.TrelloController");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.view.TrelloView");
goog.require("ispring.sample.controller.BoardsController");


/**
 * @export
 */
goog.scope(function()
{
    
    /**
     * @constructor
     * @param {ispring.sample.model.TrelloModel} model
     */
    ispring.sample.controller.TrelloController = goog.defineClass(null, {
        constructor: function (model)
        {
            const Config = ispring.sample.Config;

            /**
             * @type {ispring.sample.Config}
             * @private
             */
            this._conf = new Config();
            this._trelloModel = model;

            /**
             * @type {Array}
             * @private
             */
            this._childConstructors = [];

            const thisPtr = this;

            document.addEventListener(this._conf._EVENT_BACKSPACE_TO_TRELLO, function (e)
            {
                thisPtr._trelloView.showView();
            });

            document.addEventListener(this._conf._EVENT_CLICK_BOARD, function (e)
            {
                thisPtr._trelloView.hideView();
            });

            document.addEventListener(this._conf._EVENT_CLEAN_VIEW, function(e)
            {
                thisPtr._trelloView.cleanView();
            });
        },

        /**
         * @private
         */
        _createBoardsController: function()
        {
            const BoardsController = ispring.sample.controller.BoardsController;
            /**
             * @type {ispring.sample.controller.BoardsController}
             * @private
             */
            this._boardsController = new BoardsController(this._trelloModel.getBoards());
            
            this._boardsController.addParentController(this);
            
        },
        
        _createView: function()
        {
            const TrelloView = ispring.sample.view.TrelloView;
            /**
             * @type {ispring.sample.view.TrelloView}
             * @private
             */
            this._trelloView = new TrelloView(this);

            const thisPtr = this;
            document.addEventListener(this._conf._EVENT_LANGUAGE_MODIFIED, function (e)
            {
                thisPtr._trelloView.changeLanguage();
            });
        },
        
        /**
         * @param {ispring.sample.controller.ApplicationController} controller
         */
        addParentController: function(controller)
        {
            /**
             * @type {ispring.sample.controller.ApplicationController}
             * @private
             */
            this._parentController = controller;
            
            this._createView();
            this._createBoardsController();
        },

        /**
         * @returns {ispring.sample.I18n}
         */
        getI18n: function()
        {
            return this._parentController.getI18n();
        },

        getModel: function()
        {
            return this._trelloModel;
        }
        
    });
});