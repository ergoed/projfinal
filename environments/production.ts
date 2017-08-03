import { IEnvironment } from "./env-model";

export const prodVariables:IEnvironment = {
  environmentName: 'Prod Environment',
  ionicEnvName: 'prod',

  // Front-end
  apiEndpoint: 'http://localhost:8080',

  // Back-end
  dbHost: 'mongodb://localhost:27017',
  dbName: 'grand-mongo2'
};
