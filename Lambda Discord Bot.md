# Serverless Discord bot - AWS Lambda function + Discord API
Por el Inky Armando.

## Introducción
La idea de este proyecto es bastante sencilla, quería implementar un bot de discord el cual pudiera buscar imagenes de alta calidad y Gifs de páginas especificas, todo esto para poder automatizar la costumbre que tengo de mandar Idols de Kpop en un servidor de discord que tengo con mis amigos.

Entonces estaremos extrayendo de [Pinterest](https://www.pinterest.com.mx) las imagenes y de [Tenor](https://tenor.com/es-419/) los Gifs.

## Requisitos
Primero necesitamos lo siguiente:
- Un script que haga peticiones HTTP para conseguir nuestras imagenes
- Una función Lambda conectada al Api gateway
- Una aplicación creada como bot en el [Discord Developer Portal](https://discord.com/developers/docs/intro)

## Script HTTP
Primero que nada y antes que todo crearemos un nuevo proyecto de Node, ya sea con npm init o a mano, el objetivo es instalar axios para poder hacer las llamadas HTTP tanto como a Pinterest como a Tenor.

```shell
$ npm i axios
```

### Buscador de GIF's (Tenor)
Una vez teniendo installado axios podemos hacer peticiones de la siguiente forma, tomando como ejemplo Tenor ( por que su respuesta es mas sencilla ) haremos lo siguiente:

```javascript
const axios = require('axios')
const searchParam = "Karina aespa"
const url = "https://tenor.googleapis.com/v2/search?appversion=browser-r20230928-1&key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8&client_key=tenor_web&locale=es_419&anon_id=AAYHVNajHCIA3iKBmQFkSQ&q=" + searchParam + "&limit=15&contentfilter=low"

axios.get(url)
    .then(resp => {
        console.log(resp.data.results)
    })
    .catch(error => {
        console.log(error)
    })
```

ahora tambien necesitamos cambiar el formato de lo que estamos buscando, si bien "Karina aespa" puede que funcione para buscarlo, necesitamos parsear como lo hace el servidor que vamos a mandar a llamar.

Entonces creamos una funcion para hacer el encoding correcto de nuestro url:
```javascript
function stringUrlEncoder(string, encoderChar) {
    return string.split(' ').join(encoderChar)
}
```

Y la mandamos a llamar para cambiar nuestro search param.
```javascript
const axios = require('axios')
const searchParam = stringUrlEncoder("Karina aespa", '+')
const url = "https://tenor.googleapis.com/v2/search?appversion=browser-r20230928-1&key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8&client_key=tenor_web&locale=es_419&anon_id=AAYHVNajHCIA3iKBmQFkSQ&q=" + searchParam + "&limit=15&contentfilter=low"

axios.get(url)
    .then(resp => {
        console.log(resp.data.results)
    })
    .catch(error => {
        console.log(error)
    })
```


Con este script sencillo podemos buscar en tenor nuestro 'searchParam'.

Leyendo rapidamente esta respuesta podemos ver que lo que nos interesa está en la propiedad 'itemurl', esta propiedad tiene el enlace al gif que nosotros queremos mostrar, en este caso seria este. entonces hacemos que el script nos regrese todos estos url y los guarde en un arreglo.
```javascript
//GIF Searcher
async function gifSearcher(searchParam) {
    const response = axios.get("https://tenor.googleapis.com/v2/search?appversion=browser-r20230928-1&key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8&client_key=tenor_web&locale=es_419&anon_id=AAYHVNajHCIA3iKBmQFkSQ&q=" + searchParam + "&limit=15&contentfilter=low")
    .then(resp => {
        resp.data.results.forEach(element => {
            arrayGifs.push(element.itemurl)
        })
        return arrayGifs
    })
    .catch(error => {
        console.log(error)
    })

    return response
}
```

Y de pasada guardamos el codigo en una funcion simplemente para tener un poquito más de control con nuestro flujo. Y como podemos ver, los items que imprima este script son url validos listos para mandarse por discord.

[Gif de Karina](https://tenor.com/view/aespa-karina-gif-24235807)

Por ultimo para dejar la función final, vamos a agregar 2 funciones mas, para poder exoger imagenes aleatorias de estos arrays de url's.

```javascript
function selectRandom(array) {
    return array[getRandomInt(array.length-1)]
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}
```
Implementando las funciones quedaría de la siguiente manera:
```javascript
//GIF Searcher
async function gifSearcher(searchParam) {
    const response = await axios.get("https://tenor.googleapis.com/v2/search?appversion=browser-r20230928-1&key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8&client_key=tenor_web&locale=es_419&anon_id=AAYHVNajHCIA3iKBmQFkSQ&q=" + searchParam + "&limit=15&contentfilter=low")
        .then(resp => {
            resp.data.results.forEach(element => {
                arrayGifs.push(element.itemurl)
            })
            return selectRandom(arrayGifs)
        })
        .catch(error => {
            console.log(error)
        })
    return response
}
```

Ahora haremos lo mismo para las imagenes de pinterest

### Buscador de imagenes (Pinterest)

Como ya tenemos guardada nuestra funcion de gifs, lo correcto sería crear nuestra funcion para imagenes, así que aremos lo mismo.

```javascript
//Image Searcher
async function imageSearcher(searchParam) {
    const response = await axios.get("https://www.pinterest.com.mx/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D" + searchParam + "%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22article%22%3Anull%2C%22applied_filters%22%3Anull%2C%22appliedProductFilters%22%3A%22---%22%2C%22auto_correction_disabled%22%3Afalse%2C%22corpus%22%3Anull%2C%22customized_rerank_type%22%3Anull%2C%22filters%22%3Anull%2C%22query%22%3A%22" + searchParam + "%22%2C%22query_pin_sigs%22%3Anull%2C%22redux_normalize_feed%22%3Atrue%2C%22rs%22%3A%22typed%22%2C%22scope%22%3A%22pins%22%2C%22source_id%22%3Anull%7D%2C%22context%22%3A%7B%7D%7D&_=1696907719625")
        .then(resp => {
            console.log(resp.data.resource_response.data.results)
        })
        .catch(error => {
            console.log(error)
        })
    return response
}
```

Siguiendo la estructura de la funcion anterior, nuevamente tenemos un url, un tanto complicado tanto en estructura como respuesta, aqui el objeto 'resp' contiene muchos más atributos, por lo cual puede ser un poquito mas complicado encontrar las imagenes, aquí pinterest nos maneja diferentes tamaños para las imagenes, así que siempre agarraremos el 'original' para tener la mejor calidad posible en las imagenes.

```javascript
//Image Searcher
async function imageSearcher(searchParam) {
    const response = await axios.get("https://www.pinterest.com.mx/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D" + searchParam + "%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22article%22%3Anull%2C%22applied_filters%22%3Anull%2C%22appliedProductFilters%22%3A%22---%22%2C%22auto_correction_disabled%22%3Afalse%2C%22corpus%22%3Anull%2C%22customized_rerank_type%22%3Anull%2C%22filters%22%3Anull%2C%22query%22%3A%22" + searchParam + "%22%2C%22query_pin_sigs%22%3Anull%2C%22redux_normalize_feed%22%3Atrue%2C%22rs%22%3A%22typed%22%2C%22scope%22%3A%22pins%22%2C%22source_id%22%3Anull%7D%2C%22context%22%3A%7B%7D%7D&_=1696907719625")
        .then(resp => {
            resp.data.resource_response.data.results.forEach(element => {
              if(Object.keys(element).indexOf('images')){
                if(element.images !== undefined){
                  arrayImages.push(element.images.orig.url)
                }
              }
            })
            console.log(selectRandom(arrayImages))
            return selectRandom(arrayImages)
        })
        .catch(error => {
            console.log(error)
        })
    return response
}
```

## AWS Lambda function

Una vez teniendo estas 2 funciones, ahora procederemos a pasarlo a una funcion lambda de AWS




