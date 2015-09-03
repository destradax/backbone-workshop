CRM.Views.User = Backbone.View.extend({
	template: JST.templates["user"],

	initialize: function (options) {
		if (options && options.seed){
			this.model = new CRM.Models.User({seed: options.seed});
		} else {
			this.model = new CRM.Models.User();
		}

		this.model.on("sync", this.render, this);
		this.model.fetch();
	},

	render: function () {
		var context = {
      user: this.model.toJSON()
    };
    this.$el.html(this.template(context));
    return this;
	}
});
