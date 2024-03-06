YAML_FILE=compose.prod.acr.yml
ACR=acrusba

az login

echo "*** Création du .env général"
sed -n p front/.env api/.env > .env
echo "*** Build"
docker compose --file=${YAML_FILE} build
echo "*** Login sur l'ACR ${ACR}"
az acr login --name ${ACR}
echo "*** Push sur Azure"
docker compose --file=${YAML_FILE} push