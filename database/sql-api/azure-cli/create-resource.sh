# Create Cosmos DB SQL API Resource with firewall for client IP
az cosmosdb create \
--subscription YOUR-SUBSCRIPTION-ID-OR-NAME \
--resource-group YOUR-RESOURCE-GROUP \
--name YOUR-RESOURCE-NAME \
--kind GlobalDocumentDB \
--ip-range-filter YOUR-CLIENT-IP
