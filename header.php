<!doctype html>
<html lang="pt-BR">
	<head>
	 	<meta charset="utf-8">
	  	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	  	<meta name="viewport" content="width=device-width, initial-scale=1">

	  	<title><?php echo bloginfo('name'); ?></title>

	  	<link rel="profile" href="//gmpg.org/xfn/11" />

	  	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	  	
		<link href="<?php echo get_template_directory_uri(); ?>/assets/css/vendor.css" rel="stylesheet">

		<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">

		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
		<div class="app-vue">
			<?php if(is_user_logged_in()){ ?>
			<header class="main-header blue">
				<div class="main-header__logo"></div>
				<div class="main-header__buttons buttons">
					<a href="#" class="buttons__link open-search">
						<i class="white-text small material-icons">search</i>
					</a>
					<a href="#" class="buttons__link"></a>
				</div>
			</header>
			<?php } ?>