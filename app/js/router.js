CRM.Routers.Router = Backbone.Router.extend({
	routes: {
		"": "randomUserRoute",
		"user": "randomUserRoute",
		"user/:seed": "userRoute"
	},

	randomUserRoute: function () {
		window.user = new CRM.Models.User();
		window.user.on("sync", function () {
			console.log(window.user.attributes);
		});
		window.user.fetch();
	},

	userRoute: function (seed) {
		window.user = new CRM.Models.User({seed: seed});
		window.user.on("sync", function () {
			console.log(window.user.attributes);
		});
		window.user.fetch();
	},
});
