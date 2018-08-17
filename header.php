<!doctype html>
<html lang="pt-BR">
	<head>
	 	<meta charset="utf-8">
	  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	  	<meta name="viewport" content="width=device-width, initial-scale=1">

	  	<title><?php wp_title(); ?></title>

	  	<link rel="profile" href="//gmpg.org/xfn/11" />

	  	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

		<!--Import Google Icon Font-->
		<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

		<!--Import materialize.css-->
		<link type="text/css" rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/materialize.min.css" />

		<link href="<?php echo get_template_directory_uri(); ?>/css/main.css" rel="stylesheet">

		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
		<div class="app-vue">
			<header class="main-header blue">
				<div class="main-header__logo"></div>
				<div class="main-header__buttons buttons">
					<a href="#" class="buttons__link">
						<i class="white-text small material-icons">search</i>
					</a>
					<a href="#" class="buttons__link"></a>
				</div>
			</header>