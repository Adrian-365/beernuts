$("#create-crawl").on("click", function(e) {
    console.log("hey")
    e.preventDefault();
    $.ajax({
            url: "api/crawls",
            method: "POST",
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            data: {
                CrawlerID: JSON.parse(window.atob(localStorage.getItem("token").split('.')[1])).id
            }
        })
        .done(function(response) {
            console.log(response);
            location.assign("/makecrawl?crawlId=" + response.id)
        })
})
$(".my-crawls").on("click", function() {
    $('#crawl-info').empty();
    axios.get('my-crawls')
        .then(function(response) {
            var crawls = response.data;
            var ul = $('<ul class="list-group">');

            console.log(crawls);
            for (var i = 0; i < crawls.length; i++) {
                var li = $('<li class="list-group-item">');
                li.append(`<p>${crawls[i].createdAt}</p>`);
                ul.append(li);
                li.append(`<p>${crawls[i].CrawlerId}</p>`);
                ul.append(li);
            }
            $('#crawl-info').append(ul);
        });
})