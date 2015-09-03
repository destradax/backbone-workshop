CRM.Models.User = Backbone.Model.extend({
	url: "http://api.randomuser.me/",

	parse: function (response) {
		var attributes = {};
		var user = response.results[0].user;
		attributes = user;
		attributes.title = attributes.name.title;
		attributes.firstName = attributes.name.first;
		attributes.lastName = attributes.name.last;

		return attributes;
	}
});
