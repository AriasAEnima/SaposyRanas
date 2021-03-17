# Sapos y Ranas
### Quise realizar un pequeño juego para probar javascript en general.

### _Tambien se utilizo a modo de prueba para integracion con Jira - Github para CI/CD_

>> *En el momento he probado CD*

En el archivo CI.yml:

```
uses: HighwayThree/jira-upload-deployment-info@master
with:
  client-id: '${{ secrets.CLIENT_ID }}'
  client-secret: '${{ secrets.CLIENT_SECRET }}'
  cloud-instance-base-url: '${{ secrets.CLOUD_INSTANCE_BASE_URL }}'
  issue-keys: "${{ steps.jira_keys.outputs.jira-keys }}"
  display-name: "Deployment Number 1"
  description: "Test Deployment"
  last-updated: '${{github.event.head_commit.timestamp}}'
  label: 'Test Deployment Label'
  state: '${{env.DEPLOY_STATE}}'
  environment-id: 'Test'
  environment-display-name: 'Test'
  environment-type: 'testing'
```

![image](/other/Captura.PNG)
![image](/other/Captura2.PNG)
![image](/other/Captura4.PNG)

## Ya existe otra rama ademas produccion

![image](/other/Captura3.PNG)

----

## Jugar

## Objetivo: Llevar a cada grupo al lado contrario.

> Reglas del juego: Sapos (rojos) , Ranas (verdes):
>> 1. Los sapos solo pueden saltar hacia la derecha
>> 2. Las Ranas solo pueden saltar hacia la izquierda
>> 3. Solo se puede saltar sobre __una sola__ rana o sapo o hacia una piedra a continuacion (siempre y cuando a la piedra que se llegue esté vacia).



## Disponible en AWS: (http://s3saposyranas.s3-website-us-east-1.amazonaws.com/)
## Disponible en Heroku : (https://saposyranas.herokuapp.com/index.html)






