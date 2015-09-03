window.CRM = {
	Collections: {},
	Models: {},
	Routers: {},
	Views: {}
};

$(document).ready(function () {
	window.mark = new CRM.Models.User();
	window.mark.on("sync", function () {
		console.log(window.mark.attributes);
	});
	window.mark.fetch();
});
