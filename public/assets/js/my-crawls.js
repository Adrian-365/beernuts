
$(".my-crawls").on("click", function() {
    axios.get('my-crawls')
    .then(function(response){
        var crawls = response.data;
    });
})