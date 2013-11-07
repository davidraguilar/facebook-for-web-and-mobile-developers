var util = {
	
	fbGetLoginStatus: function(){
		console.log('fbGetLoginStatus');
		
		FB.getLoginStatus(function(response){
			console.log('Facebook login status');
			
			if(response.status === 'unknown'){
				util.goLogin();
			}
		});
	},
	
	fbGetUserInfo: function(){
		console.log('fbGetUserInfo');
		
		FB.api('/me', function(response) {
			console.log('Facebook user info');
			facebookUserInfo = new FacebookUserInfo(response);
			util.goHome();
		});
	},
	
	fbLogin: function(){
		console.log('fbLogin');
		
		FB.login(function(response){
			if(response.authResponse){
				console.log('Facebook logged in');
				console.log(response);
				facebookAuth = new FacebookAuth(response);
			}
			else{
				console.log('Facebook not logged in');
			}
		}, { scope: 'email,user_status,friends_status,read_stream' });
	},
	
	fbLogout: function(){
		console.log('fbLogout');
		
		FB.logout();
		this.goLogin();
	},
	
	fbFriends: function(){
		console.log('fbFriends');
		
		FB.api('/me/friends', { fields: 'id, name, picture, link' }, function(response){
			console.log('Facebook friends');
			if(response.error){
				alert(JSON.stringify(response.error));
			}
			else{
				facebookFriends = new FriendCollection(response.data);
				console.log(facebookFriends.toJSON());
				util.goFriends();
			}
		});
	},
	
	fbFeed: function(){
		console.log('fbFeed');
		
		FB.api('/me/feed', function(response){
			console.log('Facebook feed');
			if(response.error){
				alert(JSON.stringify(response.error));
			}
			else{
				facebookFeed = new FeedCollection(response.data);
				console.log(facebookFeed.toJSON());
				util.goFeed();
			}
		});
	},
	
	goHome: function(){
		window.location.href = "#home";
	},
	
	goLogin: function(){
		window.location.href = "#login";
	},
	
	goFriends: function(){
		window.location.href = "#friends";
	},
	
	goFeed: function(){
		window.location.href = "#feed";
	},
	
	goBack: function(){
		history.back();
	}
	
};

var tpl = {
	// Hash of preloaded templates for the app
	templates:{},

	// Recursively pre-load all the templates for the app.
	// This implementation should be changed in a production environment. All the template files should be
	// concatenated in a single file.
	loadTemplates:function (names, callback) {

		var that = this;

		var loadTemplate = function (index) {
			var name = names[index];
			console.log('Loading template: ' + name);
			$.get('tpl/' + name + '.html', function (data) {
				that.templates[name] = data;
				index++;
				if (index < names.length) {
					loadTemplate(index);
				} else {
					callback();
				}
			});
		}

		loadTemplate(0);
	},

	// Get template by name from hash of preloaded templates
	get:function (name) {
		return this.templates[name];
	}
};