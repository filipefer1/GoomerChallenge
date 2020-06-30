# Goomer Challenge

Repositório para o desafio da [Goomer](https://github.com/goomerdev/job-dev-backend-interview).

### Tecnologias

- Express Js
- MongoDB
- Mongoose
- Celebrate
- Multer
- TypeScript
- Docker

### Desafios/Problemas
Durante o desenvolvimento do desafio eu aproveitei para implementar tecnologias que eu venho estudando, como typescript e docker, e, por isso, 
eu tive problemas com essas tecnologias, mas que foram superadas com pesquisa. Quanto ao código, os principais desafios foram com a validação dos campos e com os 
testes.

### Melhorias
Observar as melhores práticas de desenvolvimento e criar testes que cubram a maior quantidade de código possível.

### Setup

- Baixe e execute a imagem do mongodb do docker
```
docker run --rm -d -p 27017:27017 mongo
```
- Faça um clone do repositório
``` 
git clone https://github.com/filipefer1/GoomerChallenge.git
```
- Instale todas as dependências

```
yarn
```
- Inicialize a aplicação

```
yarn dev
```

- Execute os testes
```
yarn test
```

#### Estruturas

##### - Restaurante
 ```
 {
	"name": string,
	"picture": string (url de uma imagem),
	"address": {
		"street": string,
		"city": string,
		"zipCode": string,
		"state": string (uf)
	},
	"week": [
		{
			"day": "monday",
			"open": boolean
		},
		{
			"day": "tuesday",
			"open": boolean
		},
		{
			"day": "wednesday",
			"open": boolean,
			"openingTime": string (formato: HH:mm),
			"closingTime": string (formato: HH:mm)
		},
		{
			"day": "thursday",
			"open": boolean,
			"openingTime": string (formato: HH:mm),
			"closingTime": string (formato: HH:mm)
		},
		{
			"day": "friday",
			"open": boolean,
			"openingTime": string (formato: HH:mm),
			"closingTime": string (formato: HH:mm)
		},
		{
			"day": "saturday",
			"open": boolean,
			"openingTime": string (formato: HH:mm),
			"closingTime": string (formato: HH:mm)
		},
		{
			"day": "sunday",
			"open": boolean,
			"openingTime": string (formato: HH:mm),
			"closingTime": string (formato: HH:mm)
		}
	]
}
 ```
 ##### - Produto
 
 ```
 {
	"name": string,
	"picture": string (url de uma imagem),
	"price": number,
	"category": string,
	"promotion": {
		"description": string,
		"promotionalPrice": number,
		"days": [
			{
				"day": "monday",
				"isItInPromotion": boolean,
				"startPromotion": string (formato: HH:mm),
				"endPromotion": string (formato: HH:mm)
			},
			{
				"day": "tuesday",
				"isItInPromotion": boolean,
				"startPromotion": string (formato: HH:mm),
				"endPromotion": string (formato: HH:mm)
			},
			{
				"day": "wednesday",
				"isItInPromotion": boolean,
				"startPromotion": string (formato: HH:mm),
				"endPromotion": string (formato: HH:mm)
			},
			{
				"day": "thursday",
				"isItInPromotion": boolean
			},
			{
				"day": "friday",
				"isItInPromotion": boolean,
				"startPromotion": string (formato: HH:mm),
				"endPromotion": string (formato: HH:mm)
			},
			{
				"day": "saturday",
				"isItInPromotion": boolean
			},
			{
				"day": "sunday",
				"isItInPromotion": boolean
			}
		]
	}
}
 
 ```
 
