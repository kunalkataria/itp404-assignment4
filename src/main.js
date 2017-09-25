function fetchReposForUsername(username) {
  return $.getJSON('https://api.github.com/users/' + username + '/repos');
}

var searchTemplate = $('#searches-template').html();
var renderSearches = Handlebars.compile(searchTemplate);

// var repoTemplate = $('#repos-template').html();
// var renderRepos = Handlebars.compile(repoTemplate);

let searches = [];

$.ajax({
  type: 'GET',
  url: 'http://localhost:3000/api/searches'
}).then(function(response) {
  $('#search-history').append(renderSearches({
    searches: response
  }));
  searches = response;
  console.log(response);
});

$('#search-button').on('click', function() {
  var username = $('#search-input').val();

  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/api/searches',
    data: {
      term: username,
      createdAt: new Date()
    }
  }).then(function(response) {
    searches.push(response);

  });

  fetchReposForUsername(username).then(function(response) {
    console.log(response);
  }, function() {

  });
});
