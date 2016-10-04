goog.provide("ispring.sample.controller.BoardController");

goog.require("goog.dom.TagName");
goog.require("ispring.sample.Config");

goog.require("ispring.sample.view.BoardView");

/**
 * @export
 */
goog.scope(function()
{
    

    /**
     * @constructor
     * @param {ispring.sample.model.BoardModel} model
     */
    ispring.sample.controller.BoardController = goog.defineClass(null, {
        constructor: function(model)
        {
            const Config = ispring.sample.Config;
            this._conf = new Config();
            this._boardModel = model;
            
            const BoardView = ispring.sample.view.BoardView;
            
            this._boardView = new BoardView(this);
            this.drawLists();
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
            this._boardView.changeLanguage(this._parentController.getLanguage());
            this.drawLists();
        },

        removeChildren: function(node)
        {
            while (node.firstChild)
            {
                node.removeChild(node.firstChild);
            }
        },

        clickBackspace: function()
        {
            this._parentController.clickBackspace(this.getModel());
            this._boardView.deleteView();
        },
        
        renameList: function(id, newName)
        {
            this._boardModel.renameList(id, newName);
        },

        renameCard: function(id, numId, newName)
        {
            this._boardModel.renameCard(id, numId, newName);    
        },
        
        drawLists: function()
        {
            this.removeChildren(document.getElementById(this._conf._ID_LIST_PLACE));
            var i = 0;
            while (i < this._boardModel.getNumberLists())
            {
                this._boardView.drawLists(this._boardModel.getList(i));
                i += 1;
            }
        },

        clickAddCard: function(id)
        {
            this._boardModel.addCardInLists(id);
            this.drawLists();
        },
        
        createList: function(listName)
        {
            //this._trelloModel.createBoard(listName);
            this.drawLists();
        },

        getModel: function()
        {
            return this._boardModel;
        }

    });
});