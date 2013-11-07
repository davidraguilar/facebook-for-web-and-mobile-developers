var app = {
	
	initialize: function(){
		console.log("app initialize");
		this.bindEvents();
	},
	
	bindEvents: function(){
		console.log("app bindEvents");
		$(document).on('ready', this.onReady);
	},
	
	onReady: function(){
		console.log('onReady');
		
		FB.init({
			appId      : '648577418525915', // App ID
			channelUrl : '//localhost:8000/channel.html', // Channel File
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});
		
		FB.Event.subscribe('auth.authResponseChange', function(response) {
			console.log("FB Event: auth.authResponseChange");
			console.log(response);
			
			// Here we specify what we do with the response anytime this event occurs. 
			if (response.status === 'connected') {
			  // The response object is returned with a status field that lets the app know the current
			  // login status of the person. In this case, we're handling the situation where they 
			  // have logged in to the app.
			  util.fbGetUserInfo();
			} else if (response.status === 'not_authorized') {
			  // In this case, the person is logged into Facebook, but not into the app, so we call
			  // FB.login() to prompt them to do so. 
			  // In real-life usage, you wouldn't want to immediately prompt someone to login 
			  // like this, for two reasons:
			  // (1) JavaScript created popup windows are blocked by most browsers unless they 
			  // result from direct interaction from people using the app (such as a mouse click)
			  // (2) it is a bad experience to be continually prompted to login upon page load.
			  util.goLogin();
			} else {
			  // In this case, the person is not logged into Facebook, so we call the login() 
			  // function to prompt them to do so. Note that at this stage there is no indication
			  // of whether they are logged into the app. If they aren't then they'll see the Login
			  // dialog right after they log in to Facebook. 
			  // The same caveats as above apply to the FB.login() call here.
			  util.goLogin();
			}
		});
		
		FB.Event.subscribe('auth.login', function(response) {
			console.log('FB Event: auth.login');
			console.log(response);
		});
		FB.Event.subscribe('auth.logout', function(response) {
			console.log('FB Event: auth.logout');
			console.log(response);
		});
		FB.Event.subscribe('auth.sessionChange', function(response) {
			console.log('FB Event: auth.sessionChange');
			console.log(response);
		});
		FB.Event.subscribe('auth.statusChange', function(response) {
			console.log('FB Event: auth.statusChange');
			console.log(response);
		});
		
		tpl.loadTemplates(['MainView','LoginView','HomeView','FriendsView','FriendsListItem','FeedView','FeedListItem'],
			function(){
				router = new AppRouter();
				Backbone.history.start();
			});
		
		util.fbGetLoginStatus();
	}
};

window.AppRouter = Backbone.Router.extend({
	routes: {
		"" : "main",
		"login" : "login",
		"home" : "home",
		"friends" : "friends",
		"feed": "feed"
	},
	
	initialize: function(){
		console.log('AppRouter initialize');
	},
	
	main: function(){
		this.changePage(new MainView());
	},
	
	login: function(){
		this.changePage(new LoginView());
	},
	
	home: function(){
		this.changePage(new HomeView({ model: facebookUserInfo }));
	},
	
	friends: function(){
		this.changePage(new FriendsView());
	},
	
	feed: function(){
		this.changePage(new FeedView());
	},
	
	changePage: function(page){
		console.log('changePage');
		page.render();
		$('#app').empty();
		$('#app').append($(page.el));
	}
});
						   
app.initialize();