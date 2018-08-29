<?php 
get_header(); 
	if(is_user_logged_in()){
?>

	<main class="main-content">
		<div class="row main-content__series" v-if="singlePost.length != 0">
			<h1>{{singlePost.Title}}</h1>
			<img :src="[singlePost.Poster != 'N/A' ? singlePost.Poster : '<?php echo get_template_directory_uri(); ?>/assets/img/no-picture.jpg']" class="responsive-img">
		</div>
	</main>
<?php 
	} else{
		$redirect = home_url();
		header("location:$redirect");
	}
get_footer();
?>