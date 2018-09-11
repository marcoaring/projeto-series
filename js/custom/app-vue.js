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
            let type = this.getUrlParameter('type');
            let filter = (type) ? '&filter[meta_key]=categoria_imdb&filter[meta_value]=' + type : '';

            console.log(type);

            $.ajax({
                url: self.wpApi + "entretenimento?author=" + self.user + filter,
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

                    success: function(contSeason){
                        self.episodes = [];
                        self.episodes = contSeason.Episodes;

                        $.each(self.episodes, function(index, episode){
                            $.ajax({
                                url: self.wpApi + "episodes/?filter[meta_key]=id_episode&filter[meta_value]=" + episode.imdbID,
                                success: function(resultEpisode){
                                    if(resultEpisode.length > 0){
                                        self.$set(self.episodes[index], 'watched', true);
                                    } else{
                                        self.$set(self.episodes[index], 'watched', false);
                                    }
                                }
                            });
                        });

                        $('html, body').stop().animate({scrollTop: $('#season' + season).parent().offset().top - 55}, 1000);
                    }
                });
            } else{
                console.log('deu ruim');
            }
        },

        checkEpisode: function(titulo, id_episode, season, id_serie){
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
                        self.loadSeason(id_serie, season);
                        M.toast({
                            html: 'Episódio marcado como assistido.',
                            diplayLength: 6000,
                            classes: 'rounded'
                        });
                    }
                }
            });
        },

        addItem: function(id){
            let self = this;
            $.ajax({
                url: self.wpAjax,
                type: 'POST',
                data:{
                    'action': 'save_item',
                    'imdbId': id,
                    'author': self.user
                },

                success: function(response){
                    if(response){
                        self.showSearch = false;
                        self.searchClass = true;
                        self.loadCards = true;
                        M.toast({
                            html: 'Item cadastrado na Biblioteca.',
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