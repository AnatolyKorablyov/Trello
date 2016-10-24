goog.provide("ispring.sample.controller.ListsController");

goog.require("ispring.sample.Config");

goog.require("ispring.sample.view.ListsView");

/**
 * @export
 */
goog.scope(function()
{


    /**
     * @constructor
     * @param {ispring.sample.model.ListsController} model
     */
    ispring.sample.controller.ListsController = goog.defineClass(null, {
        constructor: function(model)
        {
            const Config = ispring.sample.Config;
            this._conf = new Config();

            this._listsModel = model;

            const thisPtr = this;
            document.addEventListener(this._conf._EVENT_ADD_LIST, function (e)
            {
                thisPtr.createList();
            });

            document.addEventListener(this._conf._EVENT_MODIFIED_LISTS_MODEL, function (e)
            {
                thisPtr.drawLists();
            });
        },

        _createView: function()
        {
            const ListsView = ispring.sample.view.ListsView;

            /**
             * @type {ispring.sample.view.ListsView}
             * @private
             */
            this._listsView = new ListsView(this);

            this.drawLists();
        },

        /**
         * @param {ispring.sample.controller.BoardController} controller
         */
        addParentController: function(controller)
        {
            /**
             * @type {ispring.sample.controller.BoardController}
             * @private
             */
            this._parentController = controller;
            this._createView();
        },


        /**
         * @returns {ispring.sample.I18n}
         */
        getI18n: function()
        {
            return this._parentController.getI18n();
        },
        
        removeChildren: function(node)
        {
            while (node.firstChild)
            {
                node.removeChild(node.firstChild);
            }
        },
        
        renameList: function(id, newName)
        {
            this._listsModel.renameList(id, newName);
        },

        renameCard: function(id, numId, newName)
        {
            this._listsModel.renameCard(id, numId, newName);
        },

        drawLists: function()
        {
            this._listsView.cleanView();
            var i = 0;
            while (i < this._listsModel.getNumberLists())
            {
                this._listsView.drawLists(this._listsModel.getList(i));
                i += 1;
            }
        },

        clickAddCard: function(id)
        {
            this._listsModel.addCardInLists(id);
        },

        createList: function()
        {
            this._listsModel.createList();
        },

        getModel: function()
        {
            return this._listsModel;
        }

    });
});