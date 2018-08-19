let aap_vue = new Vue({
   el: ".app-vue",
   data: {
      home: [],
      posts: [],
   },
   created: function () {
      this.loadHome();
      this.loadPosts();
   },
   methods: {
      loadHome(){
         var self = this;
         $.ajax({
            url: "http://www.omdbapi.com/?apikey=ed5d8acc&s=Agents&type=series",
            success: function (result){
               self.home = result;
            }
         });
      },
      loadPosts(){
         var self = this;
         $.ajax({
            url: "http://marcoaring.com.br/clientes/pss/wp-json/wp/v2/posts",
            success: function (result){
               self.posts = result;
            }
         });
      }
   },
});
$(document).ready(function(){
	$(document).on('submit', '#login', function(){
		var login = $(this).find('input[name=login]').val();
		var pass = $(this).find('input[name=password]').val();

		$.post('http://marcoaring.com.br/clientes/pss/wp-json/jwt-auth/v1/token', {
        	username: login,
        	password: pass
      	})
      	.then(function(response){
      		localStorage.setItem("token", response.token);
      		window.location = "index.html";
      	})
      	.catch(function(error){
        	console.error('Error', error.data[0]);
      	});
		return false;
	});
});