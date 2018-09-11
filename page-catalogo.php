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
					<ul class="main-episodes">
						<li class="main-episodes__item" v-for="(episode, index) in episodes">
							<a href="" :id="episode.imdbID" @click.prevent="checkEpisode(episode.Title, episode.imdbID, season, singlePost.imdbID)" class="main-episodes__link" v-if="!episode.watched">
								<p class="main-episodes__name">{{episode.Title}}</p>
								<i class="small material-icons">check</i>
							</a>

							<div class="main-episodes__watched" v-if="episode.watched">
								<p class="main-episodes__name">{{episode.Title}}</p>
								<span class="tag-watched green-text">Visto</span>
							</div>
						</li>
					</ul>
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