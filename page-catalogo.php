<?php 
get_header(); 
	if(is_user_logged_in()){
?>

	<main class="catalog-content">
		<div class="row" v-if="singlePost.length != 0">
			<div class="col s12">
				<h1 class="catalog-content__title blue-text">{{singlePost.Title}}</h1>
				<img :src="[singlePost.Poster != 'N/A' ? singlePost.Poster : '<?php echo get_template_directory_uri(); ?>/assets/img/no-picture.jpg']" class="responsive-img catalog-content__img">
				<p class="catalog-content__plot">{{singlePost.Plot}}</p>
			</div>
		</div>

		<section class="catalog-content__accordion main-accordion">
			<div class="main-accordion__content" v-for="season in Number(singlePost.totalSeasons)">
				<a :href="'#season' + season" class="main-accordion__link blue white-text" @click.prevent="loadSeason(singlePost.imdbID, season)">
					{{season}}ª Temporada
					<span class="material-icons">chevron_left</span>
				</a>
				<div :id="'season' + season" class="main-accordion__episodes">
					<ul class="main-episodes"></ul>
				</div>
			</div>
		</section>
	</main>
<?php 
	} else{
		$redirect = home_url();
		header("location:$redirect");
	}
get_footer();
?>