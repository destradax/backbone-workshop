CRM.Views.User = Backbone.View.extend({
	className: "user-view",

	events: {
		"submit .frm-user": "updateUser"
	},

	template: JST.templates["user"],

	initialize: function (options) {
		if (options && options.seed){
			this.model = new CRM.Models.User({seed: options.seed});
		} else {
			this.model = new CRM.Models.User();
		}

		this.model.on("sync change", this.render, this);
		this.model.fetch();
	},

	render: function () {
		var context = {
      user: this.model.toJSON()
    };
    this.$el.html(this.template(context));
    return this;
	},

	updateUser: function (event) {
		event.preventDefault();
		var title = this.$("input[name=name-title]").val();
		var firstName = this.$("input[name=name-first]").val();
		var lastName = this.$("input[name=name-last]").val();
		this.model.set("title", title);
		this.model.set("firstName", firstName);
		this.model.set("lastName", lastName);
	}
});
