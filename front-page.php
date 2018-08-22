<?php 
get_header(); 
	if(is_user_logged_in()){
?>

	<main class="main-content">
		<div class="row main-content__series" v-if="posts.length != 0">
			<div class="col s12 m6" v-for="(item, index) in home.Search">
				<div class="card">
					<div class="card-image">
						<img :src="[item.Poster != 'N/A' ? item.Poster : '<?php echo get_template_directory_uri(); ?>/assets/img/no-picture.jpg']" class="responsive-img">
						<a :href="'catalog/' + item.imdbID" class="btn-floating btn-large halfway-fab waves-effect waves-light blue">
							<i class="material-icons">add</i>
						</a>
					</div>
					<div class="card-content">
						<span class="card-title">{{item.Title}}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="row main-404" v-if="posts.length == 0">
			<h1 class="main-404__title">Você ainda não adicionou nenhuma série ou filme a sua biblioteca.</h1>
			<a href="#" class="waves-effect waves-light btn-large blue open-search" @click.prevent="showSearch = true">Pesquisar Agora</a>
		</div>
	</main>
<?php 
	} else{
?>
	<main class="main-unlogin">
		<div class="row">
			<h1 class="main-unlogin__title">Ops! Parece que você ainda não está logado.</h1>
			<a href="<?php echo home_url('wp-admin'); ?>" class="waves-effect waves-light btn blue">Login</a>
			<a href="#" class="waves-effect waves-light btn blue">Cadastre-se</a>
		</div>
	</main>
<?php
	}
get_footer();
?>