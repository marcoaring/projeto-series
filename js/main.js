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