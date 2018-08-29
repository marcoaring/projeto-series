let appVue = new Vue({
    el: ".app-vue",
    data: {
        searchResults: [],
        posts: [],
        singlePost: [],
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