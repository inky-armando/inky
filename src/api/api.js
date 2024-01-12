export default {
    projects: [
        {
            id: 1,
            body: `<h1 id="serverless-discord-bot-aws-lambda-function-discord-api">Serverless Discord bot - AWS Lambda function + Discord API</h1>
            <p>Por el Inky Armando.</p>
            <h2 id="introducci-n">Introducción</h2>
            <p>La idea de este proyecto es bastante sencilla, quería implementar un bot de discord el cual pudiera buscar imagenes de alta calidad y Gifs de páginas especificas, todo esto para poder automatizar la costumbre que tengo de mandar Idols de Kpop en un servidor de discord que tengo con mis amigos.</p>
            <p>Entonces estaremos extrayendo de <a href="https://www.pinterest.com.mx">Pinterest</a> las imagenes y de <a href="https://tenor.com/es-419/">Tenor</a> los Gifs.</p>
            <h2 id="requisitos">Requisitos</h2>
            <p>Primero necesitamos lo siguiente:</p>
            <ul>
            <li>Un script que haga peticiones HTTP para conseguir nuestras imagenes</li>
            <li>Una función Lambda conectada al Api gateway</li>
            <li>Una aplicación creada como bot en el <a href="https://discord.com/developers/docs/intro">Discord Developer Portal</a></li>
            </ul>
            <h2 id="script-http">Script HTTP</h2>
            <p>Primero que nada y antes que todo crearemos un nuevo proyecto de Node, ya sea con npm init o a mano, el objetivo es instalar axios para poder hacer las llamadas HTTP tanto como a Pinterest como a Tenor.</p>
            <pre><code class="lang-shell">$ npm <span class="hljs-selector-tag">i</span> axios
            </code></pre>
            <h3 id="buscador-de-gif-s-tenor-">Buscador de GIF&#39;s (Tenor)</h3>
            <p>Una vez teniendo installado axios podemos hacer peticiones de la siguiente forma, tomando como ejemplo Tenor ( por que su respuesta es mas sencilla ) haremos lo siguiente:</p>
            <pre><code class="lang-javascript"><span class="hljs-keyword">const</span> axios = <span class="hljs-built_in">require</span>(<span class="hljs-string">'axios'</span>)
            <span class="hljs-keyword">const</span> searchParam = <span class="hljs-string">"Karina aespa"</span>
            <span class="hljs-keyword">const</span> url = <span class="hljs-string">"https://tenor.googleapis.com/v2/search?appversion=browser-r20230928-1&amp;key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8&amp;client_key=tenor_web&amp;locale=es_419&amp;anon_id=AAYHVNajHCIA3iKBmQFkSQ&amp;q="</span> + searchParam + <span class="hljs-string">"&amp;limit=15&amp;contentfilter=low"</span>
            
            axios.get(url)
                .then(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(resp.data.results)
                })
                .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(error)
                })
            </code></pre>
            <p>ahora tambien necesitamos cambiar el formato de lo que estamos buscando, si bien &quot;Karina aespa&quot; puede que funcione para buscarlo, necesitamos parsear como lo hace el servidor que vamos a mandar a llamar.</p>
            <p>Entonces creamos una funcion para hacer el encoding correcto de nuestro url:</p>
            <pre><code class="lang-javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stringUrlEncoder</span><span class="hljs-params">(string, encoderChar)</span> {</span>
                <span class="hljs-keyword">return</span> <span class="hljs-built_in">string</span>.<span class="hljs-keyword">split</span>(<span class="hljs-string">' '</span>).<span class="hljs-keyword">join</span>(encoderChar)
            }
            </code></pre>
            <p>Y la mandamos a llamar para cambiar nuestro search param.</p>
            <pre><code class="lang-javascript"><span class="hljs-keyword">const</span> axios = <span class="hljs-built_in">require</span>(<span class="hljs-string">'axios'</span>)
            <span class="hljs-keyword">const</span> searchParam = stringUrlEncoder(<span class="hljs-string">"Karina aespa"</span>, <span class="hljs-string">'+'</span>)
            <span class="hljs-keyword">const</span> url = <span class="hljs-string">"https://tenor.googleapis.com/v2/search?appversion=browser-r20230928-1&amp;key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8&amp;client_key=tenor_web&amp;locale=es_419&amp;anon_id=AAYHVNajHCIA3iKBmQFkSQ&amp;q="</span> + searchParam + <span class="hljs-string">"&amp;limit=15&amp;contentfilter=low"</span>
            
            axios.get(url)
                .then(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(resp.data.results)
                })
                .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(error)
                })
            </code></pre>
            <p>Con este script sencillo podemos buscar en tenor nuestro &#39;searchParam&#39;.</p>
            <p>Leyendo rapidamente esta respuesta podemos ver que lo que nos interesa está en la propiedad &#39;itemurl&#39;, esta propiedad tiene el enlace al gif que nosotros queremos mostrar, en este caso seria este. entonces hacemos que el script nos regrese todos estos url y los guarde en un arreglo.</p>
            <pre><code class="lang-javascript"><span class="hljs-comment">//GIF Searcher</span>
            <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gifSearcher</span>(<span class="hljs-params">searchParam</span>) </span>{
                <span class="hljs-keyword">const</span> response = axios.get(<span class="hljs-string">"https://tenor.googleapis.com/v2/search?appversion=browser-r20230928-1&amp;key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8&amp;client_key=tenor_web&amp;locale=es_419&amp;anon_id=AAYHVNajHCIA3iKBmQFkSQ&amp;q="</span> + searchParam + <span class="hljs-string">"&amp;limit=15&amp;contentfilter=low"</span>)
                .then(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> {
                    resp.data.results.forEach(<span class="hljs-function"><span class="hljs-params">element</span> =&gt;</span> {
                        arrayGifs.push(element.itemurl)
                    })
                    <span class="hljs-keyword">return</span> arrayGifs
                })
                .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                    <span class="hljs-built_in">console</span>.log(error)
                })
            
                <span class="hljs-keyword">return</span> response
            }
            </code></pre>
            <p>Y de pasada guardamos el codigo en una funcion simplemente para tener un poquito más de control con nuestro flujo. Y como podemos ver, los items que imprima este script son url validos listos para mandarse por discord.</p>
            <p><a href="https://tenor.com/view/aespa-karina-gif-24235807">Gif de Karina</a></p>
            <p>Por ultimo para dejar la función final, vamos a agregar 2 funciones mas, para poder exoger imagenes aleatorias de estos arrays de url&#39;s.</p>
            <pre><code class="lang-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title">selectRandom</span>(array) {
                <span class="hljs-keyword">return</span> <span class="hljs-type">array[getRandomInt(array.length-1)]</span>
            }
            
            <span class="hljs-keyword">function</span> <span class="hljs-title">getRandomInt</span>(max) {
                <span class="hljs-keyword">return</span> <span class="hljs-type">Math.floor(Math.random()</span> * max)
            }
            </code></pre>
            <p>Implementando las funciones quedaría de la siguiente manera:</p>
            <pre><code class="lang-javascript"><span class="hljs-comment">//GIF Searcher</span>
            <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gifSearcher</span>(<span class="hljs-params">searchParam</span>) </span>{
                <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> axios.get(<span class="hljs-string">"https://tenor.googleapis.com/v2/search?appversion=browser-r20230928-1&amp;key=AIzaSyC-P6_qz3FzCoXGLk6tgitZo4jEJ5mLzD8&amp;client_key=tenor_web&amp;locale=es_419&amp;anon_id=AAYHVNajHCIA3iKBmQFkSQ&amp;q="</span> + searchParam + <span class="hljs-string">"&amp;limit=15&amp;contentfilter=low"</span>)
                    .then(<span class="hljs-function"><span class="hljs-params">resp</span> =&gt;</span> {
                        resp.data.results.forEach(<span class="hljs-function"><span class="hljs-params">element</span> =&gt;</span> {
                            arrayGifs.push(element.itemurl)
                        })
                        <span class="hljs-keyword">return</span> selectRandom(arrayGifs)
                    })
                    .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
                        <span class="hljs-built_in">console</span>.log(error)
                    })
                <span class="hljs-keyword">return</span> response
            }
            </code></pre>
            <p>Ahora haremos lo mismo para las imagenes de pinterest</p>
            <h3 id="buscador-de-imagenes-pinterest-">Buscador de imagenes (Pinterest)</h3>
            <p>Como ya tenemos guardada nuestra funcion de gifs, lo correcto sería crear nuestra funcion para imagenes, así que aremos lo mismo.</p>
            <pre><code class="lang-javascript">//Image Searcher
            async function imageSearcher(searchParam) {
                const response = await axios.get(<span class="hljs-string">"https://www.pinterest.com.mx/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D"</span> + searchParam + <span class="hljs-string">"%26rs%3Dtyped&amp;data=%7B%22options%22%3A%7B%22article%22%3Anull%2C%22applied_filters%22%3Anull%2C%22appliedProductFilters%22%3A%22---%22%2C%22auto_correction_disabled%22%3Afalse%2C%22corpus%22%3Anull%2C%22customized_rerank_type%22%3Anull%2C%22filters%22%3Anull%2C%22query%22%3A%22"</span> + searchParam + <span class="hljs-string">"%22%2C%22query_pin_sigs%22%3Anull%2C%22redux_normalize_feed%22%3Atrue%2C%22rs%22%3A%22typed%22%2C%22scope%22%3A%22pins%22%2C%22source_id%22%3Anull%7D%2C%22context%22%3A%7B%7D%7D&amp;_=1696907719625"</span>)
                    .then(<span class="hljs-string">resp =&gt;</span> {
                        console.log(resp.data.resource_response.data.results)
                    })
                    .catch(<span class="hljs-string">error =&gt;</span> {
                        console.log(error)
                    })
                <span class="hljs-keyword">return</span> response
            }
            </code></pre>
            <p>Siguiendo la estructura de la funcion anterior, nuevamente tenemos un url, un tanto complicado tanto en estructura como respuesta, aqui el objeto &#39;resp&#39; contiene muchos más atributos, por lo cual puede ser un poquito mas complicado encontrar las imagenes, aquí pinterest nos maneja diferentes tamaños para las imagenes, así que siempre agarraremos el &#39;original&#39; para tener la mejor calidad posible en las imagenes.</p>
            <pre><code class="lang-javascript">//Image Searcher
            async function imageSearcher(searchParam) {
                const response = await axios.get(<span class="hljs-string">"https://www.pinterest.com.mx/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D"</span> + searchParam + <span class="hljs-string">"%26rs%3Dtyped&amp;data=%7B%22options%22%3A%7B%22article%22%3Anull%2C%22applied_filters%22%3Anull%2C%22appliedProductFilters%22%3A%22---%22%2C%22auto_correction_disabled%22%3Afalse%2C%22corpus%22%3Anull%2C%22customized_rerank_type%22%3Anull%2C%22filters%22%3Anull%2C%22query%22%3A%22"</span> + searchParam + <span class="hljs-string">"%22%2C%22query_pin_sigs%22%3Anull%2C%22redux_normalize_feed%22%3Atrue%2C%22rs%22%3A%22typed%22%2C%22scope%22%3A%22pins%22%2C%22source_id%22%3Anull%7D%2C%22context%22%3A%7B%7D%7D&amp;_=1696907719625"</span>)
                    .then(<span class="hljs-string">resp =&gt;</span> {
                        resp.data.resource_response.data.results.forEach(<span class="hljs-string">element =&gt;</span> {
                          <span class="hljs-keyword">if</span>(Object.keys(element).indexOf(<span class="hljs-string">'images'</span>)){
                            <span class="hljs-keyword">if</span>(element.images !== undefined){
                              arrayImages.push(element.images.orig.url)
                            }
                          }
                        })
                        console.log(selectRandom(arrayImages))
                        <span class="hljs-keyword">return</span> selectRandom(arrayImages)
                    })
                    .catch(<span class="hljs-string">error =&gt;</span> {
                        console.log(error)
                    })
                <span class="hljs-keyword">return</span> response
            }
            </code></pre>
            <h2 id="aws-lambda-function">AWS Lambda function</h2>
            <p>Una vez teniendo estas 2 funciones, ahora procederemos a pasarlo a una funcion lambda de AWS</p>
            `,
            title: "Discord Bot",
            description: "Serverless AWS Discord Bot created to provide media from different KPOP Idols.",
            timeRead: "10 min",
            icon: "fa-brands fa-discord"
        }
    ],
    apps: [
        {

        }
    ],
    experience: [
        {
            id: 1,
            title: "Pasteursoft",
            time_spend: "2 yrs",
            job_title: "Fullstack Developer",
            role_description: `I worked on a complex database migration initiative, involving the transfer of
            extensive MySQL datasets, each ranging from 20-40GB in size, to MongoDB
            databases hosted on AWS EC2 instances. The migration was executed using a
            Dockerized agent written in Java, leveraging the Spring Boot framework for
            schema conversion. Apache Kafka was strategically employed to stream and
            validate data during the migration process, ensuring data accuracy and consistency.`,
            languages: ["fa-brands fa-js", "fa-brands fa-java", "fa-brands fa-react", "fa-brands fa-github", "fa-brands fa-aws"]
        },
        {
            id: 2,
            title: "Free-lance Developer",
            time_spend: "1 yrs",
            job_title: "Web Developer",
            role_description: `As a freelance developer, I collaborated with local startups to design, and implement
            user-friendly and UX-driven web applications. In addition, I played a pivotal role in the
            creation of administrative tools designed to streamline workflows for the company's
            employees. The tech stack I used for these freelance projects included Vue.js for the
            frontend, MongoDB Atlas for robust data management, and Heroku as a reliable
            deployment platform.`,
            languages: ["fa-brands fa-node-js", "fa-brands fa-vuejs", "fa-brands fa-github"]
        },
        {
            id: 3,
            title: "EASE",
            time_spend: "1 yrs",
            job_title: "Backend Developer",
            role_description: `I worked in a project undertaken for a government department, the objective was to
            streamline the administration's control over per diem expenses of workers. In order to
            achieve this, REST APIs were built using Node.js, Plus proficient use of Python was also
            demonstrated through the extraction of vital data from spreadsheets. Also peer reviews
            of frontend code were conducted using Vue, enhancing the overall quality and efficiency
            of the project. Node.js was once again utilized in the generation of comprehensive PDF
            reports, contributing to the project's aim of improved expense management.
            Finally, the infrastructure of the project was managed on GCP virtual machines,
            showcasing skill sets in both development and management of digital infrastructure.
            `,
            languages: ["fa-brands fa-node-js", "fa-brands fa-google", "fa-brands fa-python", "fa-brands fa-github"]
        }
    ],
    certifications: [
        {
            id: 1,
            name: "AWS Cloud Practitioner",
            valid: "2023 - 2026",
            badge: "aws.png",
            link: "https://www.credly.com/badges/286074e5-2b4b-4654-9bc3-ed54efae6943/public_url"
        }
    ]
}