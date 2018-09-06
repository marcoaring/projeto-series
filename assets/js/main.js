let appVue = new Vue({
    el: ".app-vue",
    data: {
        searchResults: [],
        posts: [],
        singlePost: [],
        episodes: [],
        search: '',
        showSearch: false,
        searchClass: true,
        loadCards: false,
        imdbApi: 'http://www.omdbapi.com/?apikey=ed5d8acc&',
        wpApi: 'http://marcoaring.com.br/clientes/pss/wp-json/wp/v2/',
        user: window.currentUser,
        wpAjax: window.linkAjax
    },

    created: function(){
        this.loadPosts();
        this.loadPostSingle();
    },

    methods:{
        loadSearch: function(event){
            let self = this;
            this.search = event.target.value;
            if(this.search.length >= 2){
                $.ajax({
                    url: self.imdbApi + "s=" + this.search,
                    success: function(result){
                        self.searchResults = result;
                    }
                });
            } else{
                self.searchResults = [];
            }
        },

        loadPosts: function(){
            let self = this;
            $.ajax({
                url: self.wpApi + "entretenimento?author=" + self.user,
                success: function(result){
                    let id = '';

                    $.each(result, function(index, card){
                        id = card.acf.id_imdb;
                        $.ajax({
                            url: self.imdbApi + "i=" + id,
                            success: function(cardItem){
                                self.posts.push(cardItem);
                            }
                        });
                    });
                }
            });
        },

        loadPostSingle: function(){
            let self = this;
            let idimdb = this.getUrlParameter('id');

            if(idimdb){
                $.ajax({
                    url: self.imdbApi + "i=" + idimdb,
                    success: function(single){
                        self.singlePost = single;
                    }
                });
            } else{
                console.log('deu ruim');
            }
        },

        loadSeason: function(id, season){
            if(id && season){
                let self = this;
                let element = $('#season' + season + ' ul');

                $.ajax({
                    url: self.imdbApi + "i=" + id + "&Season=" + season,
                    /*beforeSend: function(){
                        element.append("<span class='loader'></span>");
                    },*/

                    success: function(contSeason){
                        self.episodes = [];
                        self.episodes = contSeason.Episodes;
                        //$('.loader').remove();

                        /*$.each(contSeason.Episodes, function(index, episode){
                            element.append("<li class='main-episodes__item'><p class='main-episodes__name'>"+ episode.Title +"</p><a href='' @click.prevent='teste()' class='main-episodes__link'><i class='small material-icons'>check</i></a></li>");
                        });*/

                        $('html, body').stop().animate({scrollTop: $('#season' + season).parent().offset().top - 55}, 1000);
                    }
                });
            } else{
                console.log('deu ruim');
            }
        },

        checkEpisode: function(titulo, id_serie, season, id_episode){
            let self = this;
            $.ajax({
                url: self.wpAjax,
                type: 'POST',
                data:{
                    'action': 'save_episode',
                    'titulo': titulo,
                    'id_serie': id_serie,
                    'id_episode': id_episode,
                    'author': self.user
                },
                success: function(response){
                    if(response){
                        //self.loadSeason(id_serie, season);
                        M.toast({
                            html: 'Episódio marcado como assistido.',
                            diplayLength: 6000,
                            classes: 'rounded'
                        });
                    }
                }
            });
        },

        getUrlParameter: function(sParam){
            let sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'), sParameterName, i;

            for(i = 0; i < sURLVariables.length; i++){
                sParameterName = sURLVariables[i].split('=');

                if(sParameterName[0] === sParam){
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                } else{
                    return false;
                }
            }
        }
    },

    watch: {
        loadCards: function(){
            this.loadPosts();
            this.loadCards = false;
        }
    }
});
$(document).on('click', '.main-accordion__link', function(){
	if($(this).parent().hasClass('main-accordion__content--active')){
		$(this).parent().removeClass('main-accordion__content--active');
	} else{
		$('.main-accordion__content').removeClass('main-accordion__content--active');
		$(this).parent().addClass('main-accordion__content--active');
	}

	return false;
});