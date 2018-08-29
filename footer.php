			<?php if(is_user_logged_in()){ ?>
			<div v-bind:class="[showSearch ? 'main-search--open': '', searchClass ? 'main-search' : '']">
				<form autocomplete="off">
					<a href="#" class="main-search__close" @click.prevent="showSearch = false; $('.main-search__fields').val(''); searchResults = [];">
			        	<i class="material-icons">close</i>
			        </a>

			        <div class="input-field">
			        	<input id="search" name="search" type="search" class="main-search__fields" placeholder="Pesquisa..." autocomplete="off" v-on:keyup="loadSearch">
			        </div>

			        <ul class="collection main-search__result" v-if="searchResults.Search">
					    <li class="collection-item avatar main-search__item" v-if="index <= 4" v-for="(itemSearch, index) in searchResults.Search">
					      <img :src="[itemSearch.Poster != 'N/A' ? itemSearch.Poster : '<?php echo get_template_directory_uri(); ?>/assets/img/no-picture.jpg']" alt="" class="responsive-img circle">
					      <a :href="'<?php echo home_url('/'); ?>catalogo?id=' + itemSearch.imdbID">
					      	<span class="title">{{itemSearch.Title}}</span>
					      </a>
					      <p>Tipo: {{itemSearch.Type}}</p>
					      <a href="#!" class="secondary-content blue-text" @click.prevent="addItem(itemSearch.imdbID)"><i class="material-icons">add</i></a>
					    </li>
					</ul>
					<a :href="'<?php echo home_url(); ?>/busca?s=' + search" class="waves-effect waves-light btn-large blue" v-if="searchResults.totalResults > 5">Ver Todos</a>
			    </form>
			</div>
			<footer class="main-footer blue">
				<nav class="navigation">
					<ul class="navigation__list">
						<li class="navigation__item navigation__item--active">
							<a href="" class="navigation__link"><i class="material-icons">live_tv</i>Séries</a>
						</li>
						<li class="navigation__item">
							<a href="" class="navigation__link"><i class="material-icons">movie</i>Filmes</a>
						</li>
					</ul>
				</nav>
			</footer>
			<?php } ?>
	  	</div>
	  	<script>
	  		window.currentUser = <?php echo get_current_user_id(); ?>;
	  		window.linkAjax = "<?php echo admin_url('admin-ajax.php'); ?>";
	  	</script>
		<script src="<?php echo get_template_directory_uri(); ?>/assets/js/vendor.js"></script>
		<script src="<?php echo get_template_directory_uri(); ?>/assets/js/main.min.js"></script>
		<?php wp_footer(); ?>
	</body>
</html>