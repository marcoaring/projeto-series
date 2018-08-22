let appVue = new Vue({
   el: ".app-vue",
   data: {
      searchResults: [],
      posts: [],
      search: '',
      showSearch: false,
      searchClass: true,
      user: window.currentUser
   },
   created: function(){
      this.loadSearch();
      this.loadPosts();
   },
   methods: {
      loadSearch: function(event){
         var self = this;
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
         var self = this;
         $.ajax({
            //+ self.user
            url: "http://marcoaring.com.br/clientes/pss/wp-json/wp/v2/entretenimento?author=2",
            success: function(result){
               self.posts = result;
               console.log(self.posts);
            }
         });
      }
   }
});