<?php get_header(); ?>
<main class="main-content">
	<div class="row main-content__series" v-if="home.Response">
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
</main>
<?php get_footer(); ?>