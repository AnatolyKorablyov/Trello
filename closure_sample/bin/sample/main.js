goog.provide("Sample");

goog.require("ispring.sample.TrelloController");

/**
 * @export
 */
Sample.start = function()
{
	var trelloSystem = ispring.sample.TrelloController;
	var trello = new trelloSystem();
};
