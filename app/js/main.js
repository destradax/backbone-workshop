window.CRM = {
	Collections: {},
	Models: {},
	Routers: {},
	Views: {}
};

$(document).ready(function () {
	new CRM.Routers.Router();
	Backbone.history.start();
});
