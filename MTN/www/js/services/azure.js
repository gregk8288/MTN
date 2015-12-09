angular.module('app.services')
  .service('azureClient', function() {
      var SERVICE_BASE_URI = "http://hellocrowdmtn.azure-mobile.net/api";
      var AZURE_SERVICE_BASE_URL = "http://hellocrowdmtn.azure-mobile.net/";
      var AZURE_KEY = "ZzVvRBxdiOfCVdoxNPnKqWezEMRZuY86";
  var client = new WindowsAzure.MobileServiceClient(
    AZURE_SERVICE_BASE_URL, AZURE_KEY
  );

  return client;
});
