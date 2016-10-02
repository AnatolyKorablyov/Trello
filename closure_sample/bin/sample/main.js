goog.provide("Sample");

goog.require("ispring.sample.controller.ApplicationController");

/**
 * @export
 */
Sample.start = function()
{
	const ApplicationController = ispring.sample.controller.ApplicationController;
	const app = new ApplicationController();
};
