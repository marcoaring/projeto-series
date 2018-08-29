let appVue = new Vue({
   el: ".app-vue",
   data: {
      searchResults: [],
      posts: [],
      search: '',
      showSearch: false,
      searchClass: true,
      loadCards: false,
      user: window.currentUser,
      wpAjax: window.linkAjax
   },

   created: function(){
      this.loadPosts();
   },

   methods:{
      loadSearch: function(event){
         let self = this;
         this.search = event.target.value;
         if(this.search.length >= 2){
            $.ajax({
               url: "http://www.omdbapi.com/?apikey=ed5d8acc&s=" + this.search,
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
            url: "http://marcoaring.com.br/clientes/pss/wp-json/wp/v2/entretenimento?author=" + self.user,
            success: function(result){
               let id = '';

               $.each(result, function(index, card){
                  id = card.acf.id_imdb;
                  $.ajax({
                     url: "http://www.omdbapi.com/?apikey=ed5d8acc&i=" + id,
                     success: function(cardItem){
                        self.posts.push(cardItem);
                     }
                  });

               });
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
      }

   },

   watch: {
      loadCards: function(){
         this.loadPosts();
         this.loadCards = false;
      }
   }
});
$(document).ready(function(){

});