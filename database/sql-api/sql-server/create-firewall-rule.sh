az sql server firewall-rule create \
    --subscription YOUR-SUBSCRIPTION-ID-OR-NAME \
    --resource-group YOUR-RESOURCE-GROUP \
    --server YOUR-RESOURCE-NAME \
    --name AllowYourIp \
    --start-ip-address YOUR-CLIENT-IP \
    --end-ip-address YOUR-CLIENT-IP