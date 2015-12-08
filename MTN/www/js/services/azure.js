function AzureService (AZURE_SERVICE_BASE_URL, AZURE_KEY) {
  var client = new WindowsAzure.MobileServiceClient(
    AZURE_SERVICE_BASE_URL, AZURE_KEY
  );

  return client;
}
