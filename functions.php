<?php
//Suporte a menus no wordpress
function register_my_menu() {
   register_nav_menu( 'primary-menu', __( 'Primary Menu' ) );
}
add_action( 'init', 'register_my_menu' );

//Removo a barra de cima do WordPress no front
add_filter('show_admin_bar', '__return_false');

// Ação de callback do Ajax
function save_item(){
	$urlConsult = "http://www.omdbapi.com/?apikey=ed5d8acc&i=" . $_POST['imdbId'];
	$response = json_decode(file_get_contents($urlConsult));

	$idPost = wp_insert_post( array(
		'post_status' => 'publish',
		'post_title' => $response->Title, 
		'post_author' => $_POST['author'], 
		'post_type' => 'entretenimento'
	));
	update_post_meta($idPost, 'id_imdb', $response->imdbID);
	update_post_meta($idPost, 'categoria_imdb', $response->Type);

	wp_publish_post($idPost);
	clean_post_cache($idPost);

	echo (get_post_status($idPost) == 'publish') ? 'true' : 'false';
  	die();
}
add_action( 'wp_ajax_nopriv_save_item', 'save_item' );
add_action( 'wp_ajax_save_item', 'save_item' );
?>
