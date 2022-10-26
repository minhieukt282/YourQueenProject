const validateEmail = (username) => {
    return username.match(
        /^[a-z0-9]{6,}$/
    );
};

const validate = () => {
    const $result = $('#result');
    const username = $('#email').val();
    $result.text('');

    if (validateEmail(username)) {
        $result.text( ' correct :)');
        $result.css('color', 'green');
    } else {
        $result.text(' incorrect :(');
        $result.css('color', 'red');
    }
    return false;
}

$('#email').on('input', validate);