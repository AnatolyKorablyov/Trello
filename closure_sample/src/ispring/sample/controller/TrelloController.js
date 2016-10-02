goog.provide("ispring.sample.controller.TrelloController");

goog.require("goog.dom.TagName");
goog.require("ispring.sample.Config");

goog.require("ispring.sample.view.TrelloView");
goog.require("ispring.sample.loader.BoardLoader");
goog.require("ispring.sample.controller.BoardController");


/**
 * @export
 */
goog.scope(function()
{
    const Config = ispring.sample.Config;
    const TrelloView = ispring.sample.view.TrelloView;

    /**
     * @constructor
     * @param {ispring.sample.model.TrelloModel} model
     */
    ispring.sample.controller.TrelloController = goog.defineClass(null, {
        constructor: function (model)
        {
            this._conf = new Config();
            this._trelloModel = model;
            this._trelloView = new TrelloView(this);
            
            this._childConstructors = [];
            this.drawBoards();
        },
        
        /**
         * @param {ispring.sample.controller.ApplicationController} controller
         */
        addParentController: function(controller)
        {
            this._parentController = controller;
        },

        /**
         * @returns {string}
         */
        getLanguage: function()
        {
            return this._parentController.getLanguage();
        },
        
        changeLanguage: function()
        {
            this._trelloView.changeLanguage(this._parentController.getLanguage());
            
            for (var i = 0; i < this._childConstructors.length; i++)
            {
                this._childConstructors[i].changeLanguage();
            }
        },
        
        removeChildren: function(node)
        {
            while (node.firstChild)
            {
                node.removeChild(node.firstChild);
            }
        },

        clickBackspace: function(modelBoard)
        {
            this._trelloModel.setBoard(modelBoard);
            console.log(this._trelloModel);
            this._trelloView.showView();
        },

        drawBoards: function()
        {
            this.removeChildren(document.getElementById(this._conf._ID_BOARDS_PANEL));
            var i = 0;
            while (i < this._trelloModel.getNumberBoards())
            {
                this._trelloView.drawBoards(this._trelloModel.getUserBoard(i));
                i += 1;
            }
        },

        createBoard: function(boardName)
        {
            this._trelloModel.createBoard(boardName);
            this.drawBoards();
        },

        clickBoard: function(boardId)
        {
            this._trelloView.hideView();

            const BoardLoader = ispring.sample.loader.BoardLoader;
            
            const _boardLoader = new BoardLoader();

            const BoardController = ispring.sample.controller.BoardController;

            /**
             * @type {ispring.sample.controller.BoardController}
             * @private
             */
            var _boardController = new BoardController(_boardLoader.loadBoardModel(this._trelloModel.getBoard(boardId)));
            _boardController.addParentController(this);
            this._childConstructors.push(_boardController);
        },
        
        getModel: function()
        {
            return this._trelloModel;
        }
        
    });
});