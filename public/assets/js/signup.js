$(document).ready(function () {

    var username = $('#username');
    var user_email = $('#user_email');
    var user_city = $('#user_city');
    var user_state = $('#user_state');
    var user_zip = $('#user_zip');
    var user_blurb = $('#user_blurb');
    var user_password = $('#user_password');



    $(document).on('click', '#submit', addUser);

    function addUser(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!username.val().trim().trim()) {
            return;
        }

        // Calling the upsertUser function and passing in the value of the name input
        upsertUser({
            username: username.val().trim(),
            // user_email: user_email.val().trim(),
            // user_city: user_city.val().trim(),
            // user_state: user_state.val().trim(),
            // user_zip: user_zip.val().trim(),
            // user_blurb: user_blurb.val().trim(),
            // user_password: user_password.val().trim(),
        });
    }
    // A function for creating an user. Calls getUsers upon completion
    function upsertUser(userData) {
        $.post('/api/crawlers', userData)
            .then(console.log(userData));
    }


    //END document.ready
});