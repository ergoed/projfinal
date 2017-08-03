import { IEnvironment } from "./env-model";

export const prodVariables:IEnvironment = {
  environmentName: 'Prod Environment',
  ionicEnvName: 'prod',

  // Front-end
  apiEndpoint: 'https://polar-woodland-68468.herokuapp.com',

  // Back-end
  dbHost: 'mongodb://ed:asdfrewq1234@ds061206.mlab.com:61206',
  dbName: 'grand-mongo'
};
