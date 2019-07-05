'use strict';

function getRepos(query) {

    const url = `https://api.github.com/users/${query}/repos`;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            $('#results').find('h2').text(`Search Results For User ${query}`)
            displayResults(responseJson);
        })
        .catch(err => {
            console.log("whyyyyy");
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
            $('#results').find('h2').text(`Search Results`)
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        $('#results-list').empty();
        $('#js-search-term').val('');
        $('#js-error-message').text('');
        getRepos(searchTerm);
    });
}

function displayResults(responseJson) {
    console.log(responseJson);
    responseJson.map( item => {
        $('#results-list').append(
            `<li>
                <h3>${item.full_name}</h3>
                <p><a href="${item.html_url}" target="_blank">view repo on github</a></p>
            </li>`
        );
    })

    $('#results').removeClass('hidden');
}

$(watchForm);