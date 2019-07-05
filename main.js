'use strict';

const apiKey = config.API_NEWS;

const searchURL = 'https://newsapi.org/v2/everything';


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
    return queryItems.join('&');
}

function getNews(query, maxResults=10) {
    const params = {
        q: query,
        language: "en",
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    const options = {
        headers: new Headers({
            "X-Api-Key": apiKey})
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(err => {
            console.log("whyyyyy");
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getNews(searchTerm, maxResults);
    });
}

function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i=0; i < responseJson.articles.length & i < maxResults; i++) {
        $('#results-list').append(
          `<li><h3><a href="${responseJson.articles[i].url}">${responseJson.articles[i].title}</a></h3>
              <p>${responseJson.articles[i].source.name}</p>
              <p>By ${responseJson.articles[i].author}</p>
              <p>${responseJson.articles[i].description}</p>
              <img src='${responseJson.articles[i].urlToImage}'>
          </li>`
        )
    }
    $('#results').removeClass('hidden');
}

$(watchForm);