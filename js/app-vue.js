new Vue({
   el: ".app-vue",
   data: {
      home: [],
      posts: [],
   },
   created: function () {
      this.loadHome();
      this.loadPosts();
   },
   methods: {
      loadHome(){
         var self = this;
         $.ajax({
            url: "http://www.omdbapi.com/?apikey=ed5d8acc&s=Agents&type=series",
            success: function (result){
               self.home = result;
            }
         });
      },
      loadPosts(){
         var self = this;
         $.ajax({
            url: "http://marcoaring.com.br/clientes/pss/wp-json/wp/v2/posts",
            success: function (result){
               self.posts = result;
            }
         });
      }
   },
});