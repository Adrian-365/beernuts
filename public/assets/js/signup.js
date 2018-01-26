function getJWTPayload() {
    return JSON.parse(window.atob(localStorage.getItem("token").split('.')[1]));
}
$(document).ready(function() {

    var email = $('#email');
    var city = $('#city');
    var state = $('#state');
    var zip = $('#zip');
    var blurb = $('#blurb');
    var password = $('#password');



    $(document).on('click', '#submit', addUser);

    function addUser(event) {
        event.preventDefault();
        console.log("submit")
            // Don't do anything if the email fields hasn't been filled out
        if (!email.val().trim().trim()) {
            return;
        }

        // Calling the upsertUser function and passing in the value of the name input
        upsertUser({

            email: email.val().trim(),
            city: city.val().trim(),
            state: state.val().trim(),
            zip: zip.val().trim(),
            blurb: blurb.val().trim(),
            password: password.val().trim(),
        });
    }
    // A function for adding an user. Calls getUsers upon completion
    function upsertUser(userData) {
        $.post('/auth/register', userData)
            .done(function(resp) {
                window.location.assign("/");
            })
    }

    $("#signin").on("click", function(e) {
        console.log("yo")
        e.preventDefault();
        $.post("/auth/login", {
                email: email.val(),
                password: password.val()
            })
            .done(function(resp) {
                console.log(resp);
                document.cookie = "token=" + resp.token;
                window.localStorage.setItem("token", resp.token)
                location.assign("/interface")
            })
    })

    console.log(window.location)
    if (window.location.pathname === "/interface") {
        var payload = getJWTPayload();
        console.log(payload)
        $.ajax({
            url: "api/crawls",
            headers: { 'Authorization': "Bearer " + window.localStorage.getItem("token") },
            method: "GET"
        }).done(function(resp) {
            console.log(resp);
        })
    }
    //END document.ready
});