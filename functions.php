<?php
//Suporte a menus no wordpress
function register_my_menu() {
    register_nav_menu( 'primary-menu', __( 'Primary Menu' ) );
}
add_action( 'init', 'register_my_menu' );
?>
