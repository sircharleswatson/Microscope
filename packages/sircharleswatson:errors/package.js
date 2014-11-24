Package.describe({
  name: 'sircharleswatson:errors',
  summary: 'A pattern to display application errors to the user',
  version: '1.0.0',
});

Package.onUse(function(api, where) {
  api.versionsFrom('1.0');

  api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');

  api.addFiles(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');
  
  if (api.export)
    api.export('Errors');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('sircharleswatson:errors');
  api.addFiles('sircharleswatson:errors-tests.js');
});