/****************************** MainView ******************************/

window.MainView = Backbone.View.extend({
	initialize: function(){
		console.log('MainView initialize');
		this.template = _.template(tpl.get("MainView"));
	},
	
	render: function(){
		console.log("MainView render");
		$(this.el).html(this.template());
		return this;
	}
});

/****************************** LoginView ******************************/

window.LoginView = Backbone.View.extend({
	
	events: {
		"click #login" : "login"
	},
	
	login: function(){
		console.log('login');
		util.fbLogin();
	},
	
	initialize: function(){
		console.log('LoginView initialize');
		this.template = _.template(tpl.get("LoginView"));
	},
	
	render: function(){
		console.log("LoginView render");
		$(this.el).html(this.template());
		return this;
	}
});

/****************************** HomeView ******************************/

window.HomeView = Backbone.View.extend({
	
	events: {
		"click #friends" : "friends",
		"click #feed" : "feed",
		"click #logout" : "logout"
	},
	
	friends: function(){
		console.log('friends');
		util.fbFriends();
	},
	
	feed: function(){
		console.log('feed');
		util.fbFeed();
	},
	
	logout: function(){
		console.log('logout');
		util.fbLogout();
	},
	
	initialize: function(){
		console.log('HomeView initialize');
		this.template = _.template(tpl.get("HomeView"));
	},
	
	render: function(){
		console.log("HomeView render");
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

/****************************** FriendsView ******************************/

window.FriendsView = Backbone.View.extend({
	
	events: {
		"click #back" : "back"
	},
	
	back: function(){
		console.log('back');
		util.goBack();
	},
	
	initialize: function(){
		console.log('FriendsView initialize');
		this.template = _.template(tpl.get("FriendsView"));
	},
	
	render: function(){
		console.log("FriendsView render");
		$(this.el).html(this.template());
		this.friendsList = new FriendsListView({el: $("#grp-friends", this.el), model: facebookFriends });
		this.friendsList.render();
		return this;
	}
});

window.FriendsListView = Backbone.View.extend({
	initialize: function(){
		console.log("FriendsListView initialize");
	},

	render: function(){
		$(this.el).empty();
		console.log("FriendsListView render");
		_.each(this.model.models, function (friend) {
			$(this.el).append(new FriendsItemView({model:friend}).render().el);
		}, this);
		return this;
	}
});

window.FriendsItemView = Backbone.View.extend({
	initialize: function(){
		this.template = _.template(tpl.get("FriendsListItem"));
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}

});

/****************************** FeedView ******************************/

window.FeedView = Backbone.View.extend({
	
	events: {
		"click #back" : "back"
	},
	
	back: function(){
		console.log('back');
		util.goBack();
	},
	
	initialize: function(){
		console.log('FeedView initialize');
		this.template = _.template(tpl.get("FeedView"));
	},
	
	render: function(){
		console.log("FeedView render");
		$(this.el).html(this.template());
		this.feedList = new FeedListView({el: $("#grp-feed", this.el), model: facebookFeed });
		this.feedList.render();
		return this;
	}
});

window.FeedListView = Backbone.View.extend({
	initialize: function(){
		console.log("FeedListView initialize");
	},

	render: function(){
		$(this.el).empty();
		console.log("FeedListView render");
		_.each(this.model.models, function (feed) {
			$(this.el).append(new FeedItemView({model:feed}).render().el);
		}, this);
		return this;
	}
});

window.FeedItemView = Backbone.View.extend({
	initialize: function(){
		this.template = _.template(tpl.get("FeedListItem"));
	},

	render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}

});