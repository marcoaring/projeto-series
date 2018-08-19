			<?php if(is_user_logged_in()){ ?>
			<div class="main-search">
				<form action="<?php home_url('/search/')?>" method="get">
			        <div class="input-field">
			        	<input id="search" name="search" type="search" class="main-search__fields" placeholder="Pesquisa...">
			        </div>

			        <a href="#" class="main-search__close">
			        	<i class="material-icons">close</i>
			        </a>
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
		<script src="<?php echo get_template_directory_uri(); ?>/assets/js/vendors.js"></script>
		<script src="<?php echo get_template_directory_uri(); ?>/assets/js/custom.js"></script>
		<?php wp_footer(); ?>
	</body>
</html>