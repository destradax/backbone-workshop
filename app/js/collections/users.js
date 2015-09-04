CRM.Collections.Users = Backbone.Collection.extend({
	model: CRM.Models.User,

	url: "http://api.randomuser.me/?results=20",

	parse: function (response) {
		var users = [];
		response.results.forEach(function (result) {
			var attributes = result.user;
			attributes.title = attributes.name.title;
			attributes.firstName = attributes.name.first;
			attributes.lastName = attributes.name.last;
			users.push(new CRM.Models.User(attributes));
		});

		return users;
	}

});
