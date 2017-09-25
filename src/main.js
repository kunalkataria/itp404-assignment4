function fetchReposForUsername(username) {
  return $.getJSON('https://api.github.com/users/' + username + '/repos');
}

$('#search-button').on('click', function() {
  var searchTemplate = $('#search-template').html();
  var renderSearches = Handlebars.compile(searchTemplate);

  var username = $('#search-input').val();

  fetchReposForUsername(username).then(function(response) {

  }, function() {
    
  });
});
