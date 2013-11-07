/****************************** Facebook ******************************/

window.FacebookAuth = new Backbone.Model.extend({
	initialize: function(){
		console.log("FacebookAuth initialize");
	}
});

window.FacebookUserInfo = Backbone.Model.extend({
	initialize: function(){
		console.log("FacebookUserInfo initialize");
	}
});

/****************************** Friend ******************************/

window.Friend = Backbone.Model.extend({
	initialize: function(){
		console.log("Friend initialize");
	}
});

window.FriendCollection = Backbone.Collection.extend({
	model: Friend,
	
	initialize: function(){
		console.log("FriendCollection initialize");
	}
});

/****************************** Feed ******************************/

window.Feed = Backbone.Model.extend({
	initialize: function(){
		console.log("Feed initialize");
	}
});

window.FeedCollection = Backbone.Collection.extend({
	model: Feed,
	
	initialize: function(){
		console.log("FeedCollection initialize");
	}
});