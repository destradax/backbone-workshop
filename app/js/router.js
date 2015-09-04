CRM.Routers.Router = Backbone.Router.extend({
	routes: {
		"": "randomUserRoute",
		"user": "randomUserRoute",
		"user/:seed": "userRoute",
		"users": "userListRoute"
	},

	randomUserRoute: function () {
		var view = new CRM.Views.User();
		$("#main").html(view.render().el);
	},

	userRoute: function (seed) {
		var view = new CRM.Views.User({seed: seed});
		$("#main").html(view.render().el);
	},

	userListRoute: function () {
		var view = new CRM.Views.UserList();
		$("#main").html(view.render().el);
	}
});
