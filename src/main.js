function fetchReposForUsername(username) {
  return $.getJSON('https://api.github.com/users/' + username + '/repos');
}

var searchTemplate = $('#searches-template').html();
var renderSearches = Handlebars.compile(searchTemplate);

var repoTemplate = $('#repos-template').html();
var renderRepos = Handlebars.compile(repoTemplate);

let searches = [];

$('#repo-result-section').hide();

$.ajax({
  type: 'GET',
  url: 'http://localhost:3000/api/searches'
}).then(function(response) {
  searches = response.reverse();
  $('#search-history').append(renderSearches({
    searches: searches
  }));
});

$('#search-button').on('click', function() {
  $('#repo-result-section').hide();
  var username = $('#search-input').val();

  $.ajax({
    type: 'post',
    url: 'http://localhost:3000/api/searches',
    data: {
      term: username,
      createdAt: new Date()
    }
  }).then(function(response) {
    searches.unshift(response);
    $('#search-history').html(renderSearches({
      searches: searches
    }));
  });

  fetchReposForUsername(username).then(function(response) {
    var html = renderRepos({
      repos: response
    });
    $('#repo-result-section').show();
    $('#repos').html(html);
  }, function() {

  });
});
