import ENV from '../config/environment';

export default {
  name: 'ember-cli-mirage',
  initialize: function(application) {
    if (arguments.length > 1) { // Ember < 2.1
      application = arguments[1];
    }
    let environment = ENV.environment;
    if (_shouldUseMirage(environment, ENV['ember-cli-mirage'])) {
      application.lookup('service:mirage');
    }
  }
};

function _shouldUseMirage(env, addonConfig) {
  let userDeclaredEnabled = typeof addonConfig.enabled !== 'undefined';
  let defaultEnabled = _defaultEnabled(env, addonConfig);

  return userDeclaredEnabled ? addonConfig.enabled : defaultEnabled;
}

/*
  Returns a boolean specifying the default behavior for whether
  to initialize Mirage.
*/
function _defaultEnabled(env, addonConfig) {
  let usingInDev = env === 'development' && !addonConfig.usingProxy;
  let usingInTest = env === 'test';

  return usingInDev || usingInTest;
}
