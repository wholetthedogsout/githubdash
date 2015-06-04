$(function () {

  $('.userform').on('submit', function (e) {
    e.preventDefault();

    var user = $('.userinput').val();
    $.getJSON('https://api.github.com/users/' + user)
      .done(showUser)
      .fail(showError);

  });

  $('.userform').on('submit', function (e) {
    e.preventDefault();
    var userR = $('.userinput').val();
    $.getJSON('https://api.github.com/users/' + userR + '/repos')
        .done(showRepos)
        .fail(showError);
    });

  function showUser(user) {
    showU('name-avatar', user);
  }

  function showRepos(userR) {
    showR('repolist', userR);
    console.log(userR);
  }

  function showError(req, status, err) {
    err = err || {};
    err.message = err.message || status;
    console.log(err);
    show('gh-error-template', { message: err });
  }

  function showU(template, model) {
    var fn = _.template($('#' + template).html(), { variable: 'm' });
    $('.user-info').html(fn(model));
    console.log(fn);
  }

  function showR(template, model) {
    var fn = _.template($('#' + template).html(), { variable: 'm' });
    $('.repo-info').html(fn(model));
    console.log(fn);
  }

});
