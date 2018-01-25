$(document).ready(function() {

    var userName = $('#username');
    var userEmail = $('#email');
    var userCity = $('#city');
    var userState = $('#state');
    var userZip = $('#zip');
    var userBlurb = $('#blurb');
    var userPwd = $('#password');



    $(document).on('click', '#submit', addUser);

    function addUser(event) {
        event.preventDefault();
        // Don't do anything if the name fields hasn't been filled out
        if (!userName.val().trim().trim()) {
            return;
        }

        // Calling the upsertUser function and passing in the value of the name input
        upsertUser({
            username: userName.val().trim(),
            email: userEmail.val().trim(),
            city: userCity.val().trim(),
            state: userState.val().trim(),
            zip: userZip.val().trim(),
            blurb: userBlurb.val().trim(),
            password: userPwd.val().trim(),
        });
    }
    // A function for creating an user. Calls getUsers upon completion
    function upsertUser(userData) {
        $.post('/api/crawler', userData)
            .then(console.log(userData));
    }


    //END document.ready
});