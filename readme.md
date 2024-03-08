## Login au registre de conteneur (acr)
`az acr login --name acrusba`

## Déploiement d'un groupe de conteneur avec un `yaml`
`az container create --resource-group RG_KUILM --file deploy-aci.yaml`

## Voir l'état du groupe de conteneurs
`az container show --resource-group RG_KUILM --name usbaGroup --output table`

## Efface un groupe de conteneurs
`az container delete --resource-group RG_KUILM --name usbaGroup`

## Redémarre et affiche les logs du groupe de conteneurs
`az container attach --resource-group RG_KUILM --name usbaGroup`

## Accède à la console d'un conteneur dans un groupe de conteneurs
`az container exec --resource-group RG_KUILM --name usbaGroup --container-name back --exec-command "/bin/bash"`

## Redémarre le groupe. Pas possible de redémarrer un seul conteneur
`az container restart --resource-group RG_KUILM --name usbaGroup`

## Affiche les logs pour un conteneur dans un groupe
`az container logs --resource-group RG_KUILM --name usbaGroup --container-name back`

## DOC YAML
https://learn.microsoft.com/en-us/azure/container-instances/container-instances-reference-yaml