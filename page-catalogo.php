<?php 
get_header(); 
	if(is_user_logged_in()){
?>

	<main class="main-content">
	</main>
<?php 
	} else{
		$redirect = home_url();
		header("location:$redirect");
	}
get_footer();
?>