
// $(".my-crawls").on("click", function() {
//      axios.get('my-crawls')
//     .then(function(response){
//         var crawls = response.data;
//         var ul = $('<ul class="list-group">');

//         console.log(crawls);
//         for( var i = 0; i < crawls.length; i++) {
//             var li = $('<li class="list-group-item">');
//             li.append(`<p>${crawls[i].createdAt}</p>`);
//             ul.append(li);
//             li.append(`<p>${crawls[i].CrawlerId}</p>`);
//             ul.append(li);
//         }
//         $('#crawl-info').append(ul);
//     });
// })