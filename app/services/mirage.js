import Server from 'ember-cli-mirage/server';
import readModules from 'ember-cli-mirage/utils/read-modules';
import ENV from '../config/environment';
import baseConfig, { testConfig } from '../mirage/config';
import _assign from 'lodash/object/assign';

class ServerService extends Server {
  destroy() {
    this.shutdown();
  }
}

ServerService.create = function() {
  let environment = ENV.environment;
  let modules = readModules(ENV.modulePrefix);
  let options = _assign(modules, {environment, baseConfig, testConfig});
  return new ServerService(options);
};

ServerService.isServiceFactory = true;

export default ServerService;
