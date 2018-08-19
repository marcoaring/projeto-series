let aap_vue = new Vue({
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
$(document).ready(function(){
  $(document).on('click', '.main-search__close', function(){
    $('.main-search').removeClass('main-search--open');
    return false;
  });

  $(document).on('click', '.open-search', function(){
    $('.main-search').addClass('main-search--open');
    return false;
  });
});