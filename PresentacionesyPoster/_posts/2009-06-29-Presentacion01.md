---
layout: presentation
title: "Limpieza de datos con R"
main-class: 'presentaciones'
permalink: /Presentacion01
tags:

introduction: 
image: <img src="../../PresentacionesyPoster/images/Rday.png" alt="Rday" class="sticky">
header-includes:
   - \usepackage{amsmath,amssymb,amsthm,amsfonts}
   - \usepackage[sectionbib]{natbib}
   - \usepackage[hidelinks]{hyperref}
output:
  md_document:
    variant: markdown_strict+backtick_code_blocks+autolink_bare_uris+ascii_identifiers+tex_math_single_backslash
    preserve_yaml: TRUE
always_allow_html: yes   
knit: (function(inputFile, encoding) {
  rmarkdown::render(inputFile, encoding = encoding,
  output_dir = "../PresentacionesyPoster/_posts/", output_format = "all"  ) })
bibliography: "../referencias.bib"
csl: "../apa.csl"
link-citations: yes
---







Qué es limpieza de datos?
-------------------------

El DataCleaning o limpieza de datos, es **uno de los aspectos más
importantes** en la ciencia de datos, a tal punto que muchos
investigadores aseguran que en este procedimiento puede emplearse
regularmente desde el `$50\%$` hasta el `$80\%$` del tiempo total de la
investigación, siendo el tiempo restante invertido en los procesos de
recolección, análisis y entrega de resultados.

<h6 align="center">
En qué invierten más tiempo los científicos de datos?
</h6>
![](../PresentacionesyPoster/images/DataCleaning.png)
<p style="font-size: 60%; margin: -1rem auto 1.5rem;">
Fuente:
<a href="https://www.datavisor.com/blog/defeat-fraud-comprehensive-ai-powered-solution/" class="uri">https://www.datavisor.com/blog/defeat-fraud-comprehensive-ai-powered-solution/</a>
</p>

El objetivo principal de la limpieza de datos, es el **asegurar la
calidad de la información** que se usará en los análisis, además de
minimizar el riesgo en la toma de decisiones, en base a información
perdida, poco precisa, duplicada, contradictoria, errónea o incompleta,
ya qué ésta podría influir significativamente en los resultados
estadísticos y conclusiones.

Los procedimientos de limpieza de la información, se realizan **para
mantener los datos, indicadores y reportes lo más precisos, consistentes
y confiables de como sea posible**, ya que en muchas situaciones, es
frecuente encontrar que en el proceso de recolección y almacenamiento de
la información pueden surgir diversos problemas, que terminan generando
datos erróneos, ya sea por la falta de capacitación, falta de honestidad
o errores involuntarios de los responsables de levantar y registrar la
información, entre otros problemas.

Es por ello, que realizar un buen pre-procesamiento de la información
permite **tomar mejores decisiones** y asegurar que los resultados
obtenidos se asemejen a la realidad del objeto de estudio.

De Jonge & Van Der Loo ([2013](#ref-deJonge2013), p. 7) presentan un
esquema que resume los **cinco pasos** que deben seguirse para realizar
un **análisis estadístico adecuado** de la información, y señala en
cuales de éstos es donde realiza el proceso de limpieza de datos.

<h6 align="center">
Análisis estadístico en 5 pasos De Jonge & Van Der Loo
([2013](#ref-deJonge2013), p. 7)
</h6>

<img src="../PresentacionesyPoster/images/AnalisisEstadistico.jpg" style="width:80.0%" />

<button id="Show1" class="btn btn-secondary">
Ver lista de librerías de <tt>R</tt>
</button>
<button id="Hide1" class="btn btn-info">
Ocultar lista de librerías de <tt>R</tt>
</button>
<main id="botoncito1">
<h3 data-toc-skip>
Lista de librerías
</h3>
<p>
Con el fin de realizar el proceso de la limpieza de datos en <tt>R</tt>,
se van a emplear los siguientes paquetes
</p>
<section class="language-r highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code><span class="kc">library</span><span class="p">(</span><span class="n">readxl</span><span class="p">)</span><span class="w">  </span><span class="c1"># Permite leer archivos en formato xlsx</span><span class="w">
</span><span class="kc">library</span><span class="p">(</span><span class="n">janitor</span><span class="p">)</span><span class="w">  </span><span class="c1"># Librería especializada en la limpieza de datos</span><span class="w">
</span><span class="kc">library</span><span class="p">(</span><span class="n">dplyr</span><span class="p">)</span><span class="w">  </span><span class="c1"># Librería especializada para la manipulación de datos</span><span class="w">
</span><span class="kc">library</span><span class="p">(</span><span class="n">magrittr</span><span class="p">)</span><span class="w">  </span><span class="c1"># Librería que probee una serie de operadores 'pipe'</span><span class="w">
</span><span class="kc">library</span><span class="p">(</span><span class="n">editrules</span><span class="p">)</span><span class="w">  </span><span class="c1"># Permite crear codiciones para detectar inconsistencias.</span><span class="w">
</span><span class="kc">library</span><span class="p">(</span><span class="n">forcats</span><span class="p">)</span><span class="w">  </span><span class="c1"># Librería para especializada en variables tipo factor.</span><span class="w">
</span><span class="kc">library</span><span class="p">(</span><span class="n">Hmisc</span><span class="p">)</span><span class="w">  </span><span class="c1"># Posee funciones que permite realizar imputaciones.</span><span class="w">
</span><span class="kc">library</span><span class="p">(</span><span class="n">VIM</span><span class="p">)</span><span class="w">  </span><span class="c1"># Posee funciones que permite realizar imputaciones.</span><span class="w">
</span>
</code></pre>
</section>
</section>
</main>

### Operador pipe de continuidad %&gt;%

Este operador es una función de adición, el cual va tomando los
elementos de izquierda a derecha y los va ejecutando en orden. Para
entender el funcionamiento del operador, suponga un conjunto de datos
`$x$` y las funciones `$f()$`, `$g()$` y `$h()$`.

Suponga además, que se desea realizar la siguiente operación
`\begin{align*} f(g(h(x))) \end{align*}`

entonces, es posible realizar el siguiente procedimiento, en donde se
presenta su equivalencia mediante el operador `$\%>\%$`.

<h6 align="center">
Ilustración Operador pipe de continuidad
</h6>

![](../PresentacionesyPoster/images/PipeForward.jpg)

<button id="Show2" class="btn btn-secondary">
Ver ejemplo para %&gt;%
</button>
<button id="Hide2" class="btn btn-info">
Ocultar ejemplo para %&gt;%
</button>
<main id="botoncito2">
<h3 data-toc-skip>
Ejemplo en <tt>R</tt>
</h3>
<p>
Suponga que \(x\) es un vector compuesto por los números
\(0.3, 3, 0.9\), sea una función \(f() = exp()\), una función
\(g()=abs()\) y una función \(h() = log()\). Entonces si se desea
calcular la función \(f(g(h(x)))\) se tendrá que
</p>
<section class="language-r highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code><span class="c1">### Definimos a una variable X</span><span class="w">
</span><span class="n">x</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="nf">c</span><span class="p">(</span><span class="m">0.3</span><span class="p">,</span><span class="w"> </span><span class="m">3</span><span class="p">,</span><span class="w"> </span><span class="m">0.9</span><span class="p">)</span><span class="w">

</span><span class="c1">### Se realiza el cálculo de forma convencional</span><span class="w">
</span><span class="nf">exp</span><span class="p">(</span><span class="nf">abs</span><span class="p">(</span><span class="nf">log</span><span class="p">(</span><span class="n">x</span><span class="p">)))</span><span class="w">
</span></code></pre>
</section>
</section>
<section class="highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code>[1] 3.333333 3.000000 1.111111
</code></pre>
</section>
</section>
<section class="language-r highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code><span class="c1">### Se realiza el cálculo mediante el empleo de pipe</span><span class="w">
</span><span class="n">x</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="nf">log</span><span class="p">()</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="nf">abs</span><span class="p">()</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="nf">exp</span><span class="p">()</span><span class="w">
</span></code></pre>
</section>
</section>
<section class="highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code>[1] 3.333333 3.000000 1.111111
</code></pre>
</section>
</section>
</main>

### Operador pipe de asignación compuesta %&lt;&gt;%

Este operador funciona de forma similar al pipe de continuidad
`$\%>\%$`, pero con la diferencia, de que luego de realizar las
operaciones deseadas, éste reemplaza la variable `$x$` original, por el
resultado obtenido mediante la secuencia de funciones que se le aplican
a la misma variable `$x$`.

<h6 align="center">
Ilustración operador pipe de asignación compuesta
</h6>

![](../PresentacionesyPoster/images/PipeAssignment.jpg)

<button id="Show3" class="btn btn-secondary">
Ver ejemplo para %&lt;&gt;%
</button>
<button id="Hide3" class="btn btn-info">
Ocultar ejemplo para %&lt;&gt;%
</button>
<main id="botoncito3">
<h3 data-toc-skip>
Ejemplo en <tt>R</tt>
</h3>
<p>
Suponga al igual que en el ejemplo anterior, \(x\) es un vector
compuesto por los números \(0.3, 3, 0.9\), las funciones
\(f() = exp()\), \(g()=abs()\) y \(h() = log()\). Entonces si se desea
calcular la función \(f(g(h(x)))\) y almacenarla en \(x\).
</p>
<section class="language-r highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code><span class="c1">### Se presenta la variable X sin modificar</span><span class="w">
</span><span class="n">x</span><span class="w">
</span></code></pre>
</section>
</section>
<section class="highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code>[1] 0.3 3.0 0.9
</code></pre>
</section>
</section>
<section class="language-r highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code><span class="c1">### Se realiza y almacena el cálculo mediante el empleo de pipe</span><span class="w">
</span><span class="n">x</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="nf">log</span><span class="p">()</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="nf">abs</span><span class="p">()</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="nf">exp</span><span class="p">()</span><span class="w">

</span><span class="c1">### Se presenta el variable X modificada</span><span class="w">
</span><span class="n">x</span><span class="w">
</span></code></pre>
</section>
</section>
<section class="highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code>[1] 3.333333 3.000000 1.111111
</code></pre>
</section>
</section>
</main>

Datos sin procesar a Datos técnicamente correctos
-------------------------------------------------

Los archivos de datos sin procesar, son generalmente bases de datos que
pueden **carecer de encabezados**, contener codificación de **caracteres
especiales** en los nombres o entradas, tener **errores en la
clasificación** del tipos de datos, poseer **ordenes incorrecto** dentro
de sus categorías, entre otros.

Estos problemas puede generar inconvenientes al momento de realizar la
lectura de los datos, manipular la información, o aplicar análisis
estadísticos, podrían arrojar resultados que no son consistentes con la
realidad. Por ello se hace necesario usar alguna herramienta que permita
**corregir dichos problemas**.

Para presenta procedimientos que permitan solucionar dichos problemas,
se emplea la siguiente base de datos, conformada por 10 columnas y 11
filas.

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto; font-size: 90%;"><thead><tr><th style="text-align:left;">Fecha</th>
<th style="text-align:right;">$ID</th><th style="text-align:right;"># telefono</th><th style="text-align:right;">[Estrato]</th><th style="text-align:right;">MUNICIPIO</th><th style="text-align:right;"></th><th style="text-align:right;">Deuda-vivienda?</th><th style="text-align:right;">Costo_vivienda?</th><th style="text-align:right;">% pagado</th>
<th style="text-align:right;">muni</th></tr></thead><tbody><tr><td style="text-align:right;">15/02/2013</td><td style="text-align:right;">1035869</td><td style="text-align:right;">3124751231</td><td style="text-align:right;">2</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">NA</td><td style="text-align:right;">No</td><td style="text-align:right;">NaN</td><td style="text-align:right;">NaN</td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">01/05/2013</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">7 Mar 14</td><td style="text-align:right;">1007306</td><td style="text-align:right;">3434589</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">3083500</td><td style="text-align:right;">Sí</td><td style="text-align:right;">405147000</td><td style="text-align:right;">0.31</td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">encuestado <br>el 12 01 13</td><td style="text-align:right;">3935563</td><td style="text-align:right;">7005931</td><td style="text-align:right;">4</td><td style="text-align:right;">Hola! :D</td><td style="text-align:right;">630700</td><td style="text-align:right;">NA</td><td style="text-align:right;">-62708000</td><td style="text-align:right;">0.18</td><td style="text-align:right;">Hola! :D</td></tr><tr><td style="text-align:right;">01 05 2013</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">15 02 2013</td><td style="text-align:right;">2222985</td><td style="text-align:right;">8660538</td><td style="text-align:right;">10</td><td style="text-align:right;">Sabaneta</td><td style="text-align:right;">Na</td><td style="text-align:right;">Si</td><td style="text-align:right;">3.838e+09</td><td style="text-align:right;">NA</td><td style="text-align:right;">Sabaneta</td></tr><tr><td style="text-align:right;">23/09/2014</td><td style="text-align:right;">3488986</td><td style="text-align:right;">5625266</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">3356600</td><td style="text-align:right;">Sí</td><td style="text-align:right;">186855000</td><td style="text-align:right;">0.75</td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">2/06/2014</td><td style="text-align:right;">1022146</td><td style="text-align:right;">3979642</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">2204800</td><td style="text-align:right;">No responde</td><td style="text-align:right;">NA</td><td style="text-align:right;">0.05</td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">encuestado <br>el 15/12/15</td><td style="text-align:right;">39359318</td><td style="text-align:right;">2304725</td><td style="text-align:right;">1</td><td style="text-align:right;">Itagüi</td><td style="text-align:right;">3428900</td><td style="text-align:right;">Sí</td><td style="text-align:right;">539641705</td><td style="text-align:right;"></td><td style="text-align:right;">Itagüi</td></tr><tr><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">6 Feb 13</td><td style="text-align:right;">32321157</td><td style="text-align:right;">39522101</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;"></td><td style="text-align:right;">Sí</td><td style="text-align:right;">169451000</td><td style="text-align:right;">0.22</td><td style="text-align:right;">La Estrella</td></tr></tbody></table></pre>

Las variables contenidas en la base de datos anterior son:

-   **<tt>Fecha</tt>:** Hace referencia a la fecha en la cual se
    recolectó la información.
-   **<tt>ID</tt>:** Hace referencia a un número de identificación de la
    persona.
-   **<tt>\# de telefono</tt>:** Hace referencia al número de la
    persona.
-   **<tt>Estrato</tt>:** Hace referencia al estrato socioeconómico de
    la vivienda.
-   **<tt>MUNICIPIO</tt>:** Hace referencia al municipio del Valle de
    Aburrá en donde se encuentra radicada la persona.
-   **          :** Hace referencia a los ingresos por concepto laboral.
-   **<tt>Deuda-vivienda?</tt>:** Hace referencia a las personas que
    poseen o no deudas de vivienda.
-   **<tt>Costo vivienda?</tt>:** Hace referencia al costo total de la
    vivienda.
-   **<tt>% pagado</tt>:** Hace referencia al porcentaje del costo total
    pagado de la vivienda.
-   **<tt>muni</tt>:** Variable duplicada, hace referencia al municipio
    en donde se encuentra radicada la persona.

Los base de datos presentada, pueden ser descargada desde el siguiente
[Link](https://github.com/jouninLRMD/jouninlrmd.github.io/raw/master/Dataset/EjemploLimpieza.xlsx){:target="\_blank"}.

### Lectura de datos y pre-visualización de encabezados

Para realizar el proceso de tratamiento de encabezados, <tt>R</tt>
**posee diferentes librerías y funciones que permiten corregir estos
errores**, entre ellas, la librería <code>dplyr</code> la cual provee
una serie de funciones para la manipulación de bases de datos, la
librería <code>lubridate</code> para tratar fechas, la librería
<code>janitor</code> la cual posee una serie de funciones que sirven
para el proceso de limpieza de datos, entre otras.

Para mostrar su empleo, procedemos a cargar la base de datos

<button id="Show4" class="btn btn-secondary">
Ver como cargar datos en <tt>R</tt>
</button>
<button id="Hide4" class="btn btn-info">
Ocultar como cargar datos en <tt>R</tt>
</button>
<main id="botoncito4">
<h3 data-toc-skip>
Cargar base de datos en linea
</h3>
<p>
En este caso habrán dos formas de cargar la base de datos en <tt>R</tt>,
la primera es importando los datos de internet en un archivo temporal y
luego cargando la base de datos desde el archivo temporal.
</p>
<section class="language-r highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code><span class="n">temp</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">tempfile</span><span class="p">(</span><span class="n">fileext</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">".xlsx"</span><span class="p">)</span><span class="w">  </span><span class="c1"># Crea archivo temporal</span><span class="w">
</span><span class="n">URL</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="s2">"https://github.com/jouninLRMD/jouninlrmd.github.io/raw/master/Dataset/EjemploLimpieza.xlsx"</span><span class="w">  </span><span class="c1"># URL base de datos</span><span class="w">
</span><span class="n">download.file</span><span class="p">(</span><span class="n">URL</span><span class="p">,</span><span class="w"> </span><span class="n">destfile</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">temp</span><span class="p">,</span><span class="w"> </span><span class="n">mode</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"wb"</span><span class="p">)</span><span class="w">  </span><span class="c1"># Descarga archivo en el archivo temporal creado</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">read_xlsx</span><span class="p">(</span><span class="n">temp</span><span class="p">)</span><span class="w">  </span><span class="c1"># Carga base de datos desde archivo temporal</span><span class="w">
</span></code></pre>
</section>
</section>
<p>
Una forma alternativa, será descargar la base de datos en una carpeta
del pc, y posteriormente realizando la carga de la base de datos,
buscando el fichero en donde se encuentra guardada.
</p>
<section class="language-r highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code><span class="n">datos</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">read_xlsx</span><span class="p">(</span><span class="n">file.choose</span><span class="p">())</span><span class="w">  </span><span class="c1"># Carga base de datos buscando fichero local</span><span class="w">
</span></code></pre>
</section>
</section>
</main>

Una vez realizada la carga de la base de datos, echamos un vistazo al
nombre de los encabezados de cada columna. Para ello empleamos la
función <tt>names()</tt>.

``` r
datos %>% names()  # Muestra nombre de la base de datos
```

     [1] "Fecha"           "$ID"             "# telefono"     
     [4] "[Estrato]"       "MUNICIPIO"       "...6"           
     [7] "Deuda-vivienda?" "Costo_vivienda?" "% pagado"       
    [10] "muni"           

En la salida anterior, se observa que dentro de los nombres de la base
de datos tenemos, encabezados faltantes, los cuales se identifican por
tener tres puntos, seguidos del número de la columna (Por ejemplo …6).
También tenemos caracteres especiales tales como $, \#, \[, \], %, ?,
uso de espacios, guiones “-”, y abuso de letras en mayúsculas.

### Establecer encabezados faltantes

Para corregir los problemas encontrados en los encabezados, iniciamos
**estableciendo o renombrando** aquellas variables que poseen nombres
faltantes, y para ello empleamos la función <tt>rename</tt> de la
librería <code>dplyr</code>.

``` r
datos %<>% rename(ingresos = "...6")  # renombra columna en la base de datos
datos %>% names()
```

     [1] "Fecha"           "$ID"             "# telefono"     
     [4] "[Estrato]"       "MUNICIPIO"       "ingresos"       
     [7] "Deuda-vivienda?" "Costo_vivienda?" "% pagado"       
    [10] "muni"           

### Eliminar caracteres especiales

Para **corregir los caracteres especiales, espacios, guiones y letras
mayúsculas**, se emplea la función <tt>clean\_names()</tt> de la
librería <code>janitor</code>, la cual entre sus funciones permite:

-   Analizar las mayúsculas y minúsculas y separadores a un formato
    consistente.
-   Maneja caracteres y espacios especiales.
-   Agrega números a nombres duplicados.
-   Convierte “%” en “percent” y “\#” en “number” para conservar el
    significado de la variable.

<!-- -->

``` r
datos %<>% clean_names()  # limpia los nombres nombre de la base de datos
datos %>% names()
```

     [1] "fecha"           "id"              "number_telefono"
     [4] "estrato"         "municipio"       "ingresos"       
     [7] "deuda_vivienda"  "costo_vivienda"  "percent_pagado" 
    [10] "muni"           

### Corregir tipo y clase de los datos

El tipo y clase de los datos juega un papel importante en el tratamiento
de datos, debido a que **su adecuada especificación será la responsable
de que el análisis aplicado a la variable sea el adecuado**.

La razón de ésto se debe a que podrían haber dentro de la base de datos,
**variables numéricas tratadas como factores, factores tratadas como
numéricas, variables ordinales tratadas como si fueran nominales, etc**.
Lo cual haría que pueda aplicarse análisis a las variables de forma
indebida, por ejemplo, realizar un análisis numérico a una variable que
realmente es tipo factor, como es al número de teléfono.

Para observa las clases que poseen los datos, podemos emplear la función
<tt>str()</tt> de la base de <tt>R</tt>, o la función <tt>glimpse()</tt>
de la librería <code>dplyr</code>.

``` r
datos %>% glimpse()  # muestra las clases que poseen los datos
```

    Observations: 11
    Variables: 10
    $ fecha           <chr> "15/02/2013", "01/05/2013", "7 Mar 14", "encue...
    $ id              <chr> "1035869", "1035857", "1007306", "3935563", "1...
    $ number_telefono <chr> "3124751231", "1192334", "3434589", "7005931",...
    $ estrato         <chr> "2", "3", "3", "4", "3", "10", "2", "2", "1", ...
    $ municipio       <chr> "La Estrella", "Bello", "La Estrella", "Hola! ...
    $ ingresos        <chr> "NA", "3114800", "3083500", "630700", "3114800...
    $ deuda_vivienda  <chr> "No", "Sí", "Sí", "NA", "Sí", "Si", "Sí", "No ...
    $ costo_vivienda  <chr> "NaN", "728753400", "405147000", "-62708000", ...
    $ percent_pagado  <chr> "NaN", "0.28999999999999998", "0.31", "0.18", ...
    $ muni            <chr> "La Estrella", "Bello", "La Estrella", "Hola! ...

De la salida anterior, vemos que solo las variables <tt>municipio</tt>,
<tt>deuda\_de\_vivienda</tt> y <tt>muni</tt> poseen una categoría
adecuada, aunque estas variables también podrían ser recodificada a tipo
factor.

La variable <tt>fecha</tt> aparece como tipo carácter (character) cuando
debería ser tipo fecha (date). Por su parte, las variables <tt>id</tt>,
<tt>number\_de\_telefono</tt> y <tt>estrato</tt> es clasificada como
tipo numérica (double) pero éstas representan una cualidad, y por tanto,
dichas variables deberían ser de tipo carácter (character).

Similarmente, las variables <tt>ingresos</tt>, <tt>costo\_vivienda</tt>
y <tt>percent\_pagado</tt> aparecen en la salida como de tipo carácter
(character) cuando realmente éstas variables son de tipo numérica
(double). Lo anterior es causado debido a que entre la información
contenida dentro de las variables numéricas, se encuentran valores tales
como <code style="color: #ff628c!important">NA</code> y
<code style="color: #ff628c!important">NaN</code> los cuales son tomados
como valores especiales por el <tt>R</tt> y otros valores tales como
<code style="color: #ff628c!important">No responde</code> y
<code style="color: #ff628c!important">Na</code>.

**Para convertir una variable de un clase a otra**, existen una serie de
funciones básicas en <tt>R</tt> que permiten hacer dicho procedimiento,
estas funciones son

-   **<tt>as.numeric()</tt>:** Convierte una variable a tipo numérico
    (double).
-   **<tt>as.logical()</tt>:** Convierte una variable a tipo lógico.
-   **<tt>as.integer()</tt>:** Convierte una variable a tipo entero.
-   **<tt>as.factor()</tt>:** Convierte una variable a tipo factor.
-   **<tt>as.character()</tt>:** Convierte una variable a tipo carácter
    (character).
-   **<tt>as.ordered()</tt>:** Convierte una variable a tipo factor
    asumiendo un orden o jerarquía entre los niveles.
-   **<tt>as.Date()</tt>:** Convierte una variable a tipo fecha.

Cada una de estas funciones toma un objeto <tt>R</tt> e intenta
convertirlo a la clase especificada detrás del “as.”, en donde, aquellos
valores que no se pueden convertir al tipo especificado, <tt>R</tt> los
convertirá por defecto a un valor
<code style="color: #ff628c!important">NA</code>.

Para corregir la clase de las variables, usaremos la función
<tt>mutate()</tt> de la librería <tt>dplyr</tt>, junto a las funciones
<tt>as.factor()</tt> y <tt>as.numeric()</tt> de la base de <tt>R</tt>
para realizar la conversión de las variables.

``` r
### Transformar variables a tipo factor
datos %<>% mutate_at(vars(id, number_telefono, estrato, municipio, deuda_vivienda, 
    muni), as.factor) %>% glimpse()
```

    Observations: 11
    Variables: 10
    $ fecha           <chr> "15/02/2013", "01/05/2013", "7 Mar 14", "encue...
    $ id              <fct> 1035869, 1035857, 1007306, 3935563, 1035857, 2...
    $ number_telefono <fct> 3124751231, 1192334, 3434589, 7005931, 1192334...
    $ estrato         <fct> 2, 3, 3, 4, 3, 10, 2, 2, 1, NA, 3
    $ municipio       <fct> La Estrella, Bello, La Estrella, Hola! :D, Bel...
    $ ingresos        <chr> "NA", "3114800", "3083500", "630700", "3114800...
    $ deuda_vivienda  <fct> No, Sí, Sí, NA, Sí, Si, Sí, No responde, Sí, N...
    $ costo_vivienda  <chr> "NaN", "728753400", "405147000", "-62708000", ...
    $ percent_pagado  <chr> "NaN", "0.28999999999999998", "0.31", "0.18", ...
    $ muni            <fct> La Estrella, Bello, La Estrella, Hola! :D, Bel...

``` r
### Transformar variables a tipo numérico (double)
datos %<>% mutate_at(vars(ingresos, costo_vivienda, percent_pagado), as.numeric) %>% 
    glimpse()
```

    Observations: 11
    Variables: 10
    $ fecha           <chr> "15/02/2013", "01/05/2013", "7 Mar 14", "encue...
    $ id              <fct> 1035869, 1035857, 1007306, 3935563, 1035857, 2...
    $ number_telefono <fct> 3124751231, 1192334, 3434589, 7005931, 1192334...
    $ estrato         <fct> 2, 3, 3, 4, 3, 10, 2, 2, 1, NA, 3
    $ municipio       <fct> La Estrella, Bello, La Estrella, Hola! :D, Bel...
    $ ingresos        <dbl> NA, 3114800, 3083500, 630700, 3114800, NA, 335...
    $ deuda_vivienda  <fct> No, Sí, Sí, NA, Sí, Si, Sí, No responde, Sí, N...
    $ costo_vivienda  <dbl> NaN, 728753400, 405147000, -62708000, 72875340...
    $ percent_pagado  <dbl> NaN, 0.29, 0.31, 0.18, 0.29, NA, 0.75, 0.05, N...
    $ muni            <fct> La Estrella, Bello, La Estrella, Hola! :D, Bel...

Ahora, para **transformar la variable ‘fecha’ a tipo fecha (date)**, no
usaremos la función <tt>as.Date()</tt> de la base de <tt>R</tt> si no
que usaremos la librería `lubridate`, dependiendo de la estructura de
como se encuentren registradas las fechas.

-   **<tt>dmy():</tt>** día-mes-año
-   **<tt>mdy():</tt>** mes-día-año
-   **<tt>myd():</tt>** mes-año-día
-   **<tt>ymd():</tt>** año-mes-día
-   **<tt>ydm():</tt>** año-día-mes
-   **<tt>dym():</tt>** día-año-mes

La ventaja que tiene usar las funciones de la librería `lubridate`
respecto a la función <tt>as.Date()</tt>, radica en que dichas funciones
transforma las fechas almacenadas en vectores numéricos y de caracteres
en objetos tipo (date), sin importar que éstas contengan caracteres
adicionales a las de fecha planteada.

Al analizar las entradas que hay en la variable <tt>fecha</tt>,
evidenciamos que éstas poseen la estructura día-mes-año, por tanto se
debe emplear la función <tt>dmy()</tt> de la librería `lubridate` para
realizar la transformación. Además empleamos la función
<tt>mutate\_at</tt> de la librería `dplyr`.

``` r
### Transformar variables a tipo fecha (date)
datos %<>% mutate_at(vars(fecha), dmy) %>% glimpse()
```

    Observations: 11
    Variables: 10
    $ fecha           <date> 2013-02-15, 2013-05-01, 2014-03-07, 2013-01-1...
    $ id              <fct> 1035869, 1035857, 1007306, 3935563, 1035857, 2...
    $ number_telefono <fct> 3124751231, 1192334, 3434589, 7005931, 1192334...
    $ estrato         <fct> 2, 3, 3, 4, 3, 10, 2, 2, 1, NA, 3
    $ municipio       <fct> La Estrella, Bello, La Estrella, Hola! :D, Bel...
    $ ingresos        <dbl> NA, 3114800, 3083500, 630700, 3114800, NA, 335...
    $ deuda_vivienda  <fct> No, Sí, Sí, NA, Sí, Si, Sí, No responde, Sí, N...
    $ costo_vivienda  <dbl> NaN, 728753400, 405147000, -62708000, 72875340...
    $ percent_pagado  <dbl> NaN, 0.29, 0.31, 0.18, 0.29, NA, 0.75, 0.05, N...
    $ muni            <fct> La Estrella, Bello, La Estrella, Hola! :D, Bel...

De la salida anterior, se aprecia que ya todas las variables se
encuentran debidamente codificadas, logrando así, junto con los
procedimientos anteriores **obtener un conjunto de datos técnicamente
correcto**.

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto; font-size: 90%;"><thead><tr><th style="text-align:left;">fecha</th>
<th style="text-align:right;">id</th><th style="text-align:right;">number_telefono</th><th style="text-align:right;">estrato</th><th style="text-align:right;">municipio</th><th style="text-align:right;">ingresos</th><th style="text-align:right;">deuda_vivienda</th><th style="text-align:right;">costo_vivienda</th><th style="text-align:right;">percent_pagado</th><th style="text-align:right;">muni</th></tr></thead><tbody><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">1035869</td><td style="text-align:right;">3124751231</td><td style="text-align:right;">2</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">NA</td><td style="text-align:right;">No</td><td style="text-align:right;">NaN</td><td style="text-align:right;">NaN</td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">2014-03-07</td><td style="text-align:right;">1007306</td><td style="text-align:right;">3434589</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">3083500</td><td style="text-align:right;">Sí</td><td style="text-align:right;">405147000</td><td style="text-align:right;">0.31</td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">2013-01-12</td><td style="text-align:right;">3935563</td><td style="text-align:right;">7005931</td><td style="text-align:right;">4</td><td style="text-align:right;">Hola! :D</td><td style="text-align:right;">630700</td><td style="text-align:right;">NA</td><td style="text-align:right;">-62708000</td><td style="text-align:right;">0.18</td><td style="text-align:right;">Hola! :D</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">2222985</td><td style="text-align:right;">8660538</td><td style="text-align:right;">10</td><td style="text-align:right;">Sabaneta</td><td style="text-align:right;">NA</td><td style="text-align:right;">Si</td><td style="text-align:right;">3.838e+09</td><td style="text-align:right;">NA</td><td style="text-align:right;">Sabaneta</td></tr><tr><td style="text-align:right;">2014-09-23</td><td style="text-align:right;">3488986</td><td style="text-align:right;">5625266</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">3356600</td><td style="text-align:right;">Sí</td><td style="text-align:right;">186855000</td><td style="text-align:right;">0.75</td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">2014-06-02</td><td style="text-align:right;">1022146</td><td style="text-align:right;">3979642</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">2204800</td><td style="text-align:right;">No responde</td><td style="text-align:right;">NA</td><td style="text-align:right;">0.05</td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">2015-12-15</td><td style="text-align:right;">39359318</td><td style="text-align:right;">2304725</td><td style="text-align:right;">1</td><td style="text-align:right;">Itagüi</td><td style="text-align:right;">3428900</td><td style="text-align:right;">Sí</td><td style="text-align:right;">539641705</td><td style="text-align:right;">NA</td><td style="text-align:right;">Itagüi</td></tr><tr><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">2013-02-06</td><td style="text-align:right;">32321157</td><td style="text-align:right;">39522101</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">NA</td><td style="text-align:right;">Sí</td><td style="text-align:right;">169451000</td><td style="text-align:right;">0.22</td><td style="text-align:right;">La Estrella</td></tr></tbody></table></pre>

Datos técnicamente correctos a datos consistentes
-------------------------------------------------

Los datos consistentes **son la etapa en la que el conjunto de
observaciones están listos** para la realización de inferencia
estadística. Éstos datos son los que se asumen como punto de partida en
la mayoría de las teorías estadísticas, aunque **en la práctica no
siempre se emplean éstos**, si no que usan datos sin procesar o
técnicamente correctos.

Aunque es posible emplear datos sin procesar o técnicamente correcto
para realizar inferencia estadística, el evadir el paso de llevar los
datos a su forma consistente, puede tener una seria influencia en los
resultados estadísticos, puesto que **la detección, verificación,
corrección e imputación de datos, puede brindar información valiosa** en
los análisis realizados o en la interpretación de los mismos.

### Detección de datos faltantes

La detección de datos faltantes radica en localizar para cada variable,
si se encuentran casillas vacías, valores especiales, tales como
<code style="color: #ff628c!important">Na, NaN</code> o
<code style="color: #ff628c!important">NULL</code>.

-   **<code style="color: #ff628c!important">NA</code> (Not
    Available):** Es un carácter especial para indicar valores perdidos.
    Éstos pueden ser detectados en <tt>R</tt> mediante la función
    <tt>is.na()</tt>.
-   **<code style="color: #ff628c!important">NaN</code> (Not a
    number):** Es un carácter especial para datos de clase numérica,
    para indicar un valor asociado a un cálculo cuyo resultado es
    desconocido, el cual seguramente no es un número. Este puede
    obtenerse mediante operaciones tales como `$0/0$`, `$Inf/Inf$`,
    `$Inf-Inf$`. Éstos pueden ser detectados en <tt>R</tt> mediante la
    función <tt>is.nan()</tt>, aunque también son detectados por la
    función <tt>is.na()</tt>.
-   **<code style="color: #ff628c!important">NULL</code>:** Es un
    carácter especial para indicar valores indefinidos o indicar la no
    existencia de valor dentro de la base de datos o de una entrada de
    la misma. Éstos pueden ser detectados en <tt>R</tt> mediante la
    función <tt>is.null()</tt>.

Para detectar aquellas filas que se encuentren faltantes dentro de una
base de datos, podemos usar una combinación entre las funciones
<tt>apply()</tt>, <tt>which()</tt>, tal como se muestra en la siguiente
linea de código, adicionando las funciones <tt>is.na()</tt> e
<tt>is.null()</tt>, dentro de la función <tt>which()</tt>.

``` r
## Detectar NA, NaN y NULL dentro de la base de datos Se agrega 'NA' y 'Na' y
## 'NaN' debido a que hay entradas que poseen estas categorías como niveles
## del factor
faltantes <- apply(X = datos, MARGIN = 2, FUN = function(x) which(is.na(x) | 
    is.null(x) | x == "Na" | x == "NA" | x == "NaN"))  # se pueden agregar más caracteres
faltantes
```

    $fecha
    [1] 10

    $id
    [1] 10

    $number_telefono
    [1] 10

    $estrato
    [1] 10

    $municipio
    [1] 10

    $ingresos
    [1]  1  6 10 11

    $deuda_vivienda
    [1]  4 10

    $costo_vivienda
    [1]  1  8 10

    $percent_pagado
    [1]  1  6  9 10

    $muni
    [1] 10

De la salida anterior se observa que en todas las variables aparece con
valores faltantes la fila número `$10$`. Adicionalmente, se aprecian
valores `$NA$` para las variables <tt>municipio</tt>, <tt>ingresos</tt>,
<tt>deuda\_vivienda</tt>, <tt>costo\_vivienda</tt>,
<tt>percent\_pagado</tt> y <tt>muni</tt>, en donde celdas similares se
encontrarán en el proceso de verificación de datos.

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto; font-size: 90%;"><thead><tr><th style="text-align:left;">fecha</th>
<th style="text-align:right;">id</th><th style="text-align:right;">number_telefono</th><th style="text-align:right;">estrato</th><th style="text-align:right;">municipio</th><th style="text-align:right;">ingresos</th><th style="text-align:right;">deuda_vivienda</th><th style="text-align:right;">costo_vivienda</th><th style="text-align:right;">percent_pagado</th><th style="text-align:right;">muni</th></tr></thead><tbody><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">1035869</td><td style="text-align:right;">3124751231</td><td style="text-align:right;">2</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">No</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NaN</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NaN</span></td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">2014-03-07</td><td style="text-align:right;">1007306</td><td style="text-align:right;">3434589</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">3083500</td><td style="text-align:right;">Sí</td><td style="text-align:right;">405147000</td><td style="text-align:right;">0.31</td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">2013-01-12</td><td style="text-align:right;">3935563</td><td style="text-align:right;">7005931</td><td style="text-align:right;">4</td><td style="text-align:right;">Hola! :D</td><td style="text-align:right;">630700</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">-62708000</td><td style="text-align:right;">0.18</td><td style="text-align:right;">Hola! :D</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">2222985</td><td style="text-align:right;">8660538</td><td style="text-align:right;">10</td><td style="text-align:right;">Sabaneta</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">Si</td><td style="text-align:right;">3.838e+09</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">Sabaneta</td></tr><tr><td style="text-align:right;">2014-09-23</td><td style="text-align:right;">3488986</td><td style="text-align:right;">5625266</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">3356600</td><td style="text-align:right;">Sí</td><td style="text-align:right;">186855000</td><td style="text-align:right;">0.75</td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">2014-06-02</td><td style="text-align:right;">1022146</td><td style="text-align:right;">3979642</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">2204800</td><td style="text-align:right;">No responde</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">0.05</td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">2015-12-15</td><td style="text-align:right;">39359318</td><td style="text-align:right;">2304725</td><td style="text-align:right;">1</td><td style="text-align:right;">Itagüi</td><td style="text-align:right;">3428900</td><td style="text-align:right;">Sí</td><td style="text-align:right;">539641705</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">Itagüi</td></tr><tr><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td></tr><tr><td style="text-align:right;">2013-02-06</td><td style="text-align:right;">32321157</td><td style="text-align:right;">39522101</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">Sí</td><td style="text-align:right;">169451000</td><td style="text-align:right;">0.22</td><td style="text-align:right;">La Estrella</td></tr></tbody></table></pre>

### Verificación de datos

El objetivo de esta fase, consta en observar si hay algún tipo de
**restricciones en los datos que está siendo violadas**, tales como
inconsistencias en variables que está limitada a valores no negativos,
variables que deben encontrarse en un rango determinado, variables de
respuesta cerrada que poseen un registro por fuera del rango de
respuestas, problemas debidos al acento (tildes, virgulillas, etc),
entre otras.

Por tanto, se hace necesario **localizar por columna**, los valores que
presenten inconsistencias, y que sepamos poseen restricciones en sus
respuestas. En la base de datos que poseemos, tenemos las siguientes
restricciones.

-   **<tt>estrato</tt>:** Es una variable categórica, sus valores deben
    encontrarse entre 1 y 6.
-   **<tt>municipio</tt>:** Es una variable categórica, sus valores
    están restringidos a los municipios del Valle de Aburrá.
-   **<tt>ingreso</tt>:** Es una variable numérica, no puede contener
    valores negativos.
-   **<tt>deuda\_vivienda</tt>:** Es una variable categórica, sus
    respuestas deberían ser Sí o No.
-   **<tt>costo\_vivienda</tt>:** Es una variable numérica, no puede
    contener valores negativos.
-   **<tt>percent\_pagado</tt>:** Es una variable numérica, sus valores
    deben encontrarse entre 0 y 1.
-   **<tt>muni</tt>:** Es una variable categórica, sus valores están
    restringidos a los municipios del Valle de Aburrá.

Para realizar tal proceso de verificación se debe realizar la
localización de aquellos valores que presenten inconsistencias, en
donde, **inicialmente deben establecerse las restricciones** que posee
la base de datos, y para ellos pueden emplearse las funciones
<tt>editset()</tt> y <tt>violatedEdits()</tt> de la librería
<code>editrules</code>

``` r
## Creamos conjunto de condiciones que deben cumplirse condiciones para
## variables categóricas
CondC <- editset(c("estrato %in% 1:6", "municipio %in% c('Barbosa', 'Girardota', 'Copacabana', 'Bello', 'Medellín', 'Envigado', 'Itagüi', 'Sabaneta', 'La Estrella', 'Caldas')", 
    "deuda_vivienda %in% c('Sí', 'No')", "muni %in% c('Barbosa', 'Girardota', 'Copacabana', 'Bello', 'Medellín', 'Envigado', 'Itagüi', 'Sabaneta', 'La Estrella', 'Caldas')"))
CondC
```


    Data model:
    dat1 : deuda_vivienda %in% c('No', 'Sí')
    dat2 : estrato %in% c('1', '2', '3', '4', '5', '6')
    dat3 : muni %in% c('Barbosa', 'Bello', 'Caldas', 'Copacabana', 'Envigado', 'Girardota', 'Itagüi', 'La Estrella', 'Medellín', 'Sabaneta')
    dat4 : municipio %in% c('Barbosa', 'Bello', 'Caldas', 'Copacabana', 'Envigado', 'Girardota', 'Itagüi', 'La Estrella', 'Medellín', 'Sabaneta') 

    Edit set:
    NULL :  

``` r
# Condiciones para variables númericas
CondN <- editset(c("ingresos > 0", "costo_vivienda > 0", "percent_pagado >= 0", 
    "percent_pagado <= 1"))
CondN
```


    Edit set:
    num1 : 0 < ingresos
    num2 : 0 < costo_vivienda
    num3 : 0 <= percent_pagado
    num4 : percent_pagado <= 1 

``` r
# Presentamos donde ocurren dichas violaciones
Errores <- violatedEdits(c(CondC, CondN), datos)
Errores
```

          edit
    record  num1  num2  num3  num4  dat1  dat2  dat3  dat4
        1     NA    NA    NA    NA FALSE FALSE FALSE FALSE
        2  FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE
        3  FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE
        4  FALSE  TRUE FALSE FALSE  TRUE FALSE  TRUE  TRUE
        5  FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE
        6     NA FALSE    NA    NA  TRUE  TRUE FALSE FALSE
        7  FALSE FALSE FALSE FALSE FALSE FALSE FALSE FALSE
        8  FALSE    NA FALSE FALSE  TRUE FALSE FALSE FALSE
        9  FALSE FALSE    NA    NA FALSE FALSE FALSE FALSE
        10    NA    NA    NA    NA  TRUE  TRUE  TRUE  TRUE
        11    NA FALSE FALSE FALSE FALSE FALSE FALSE FALSE

``` r
# Presentamos de forma gráfica donde se cometen errores
plot(Errores)
```

![](../PresentacionesyPoster/images/Presentacion01unnamed-chunk-13-1.jpg)

En la imagen anterior se presentan dos gráficos. El gráfico superior
muestra **cuales son las condiciones que más se están violando**, en
donde se aprecia que la condición <tt>dat1</tt>, es la que tiene una
mayor porcentaje de errores, con un poco más del `$35\%$` de las
violaciones de la base de datos. Cabe anotar que en el caso de variables
categóricas, **los <code style="color: #ff628c!important">NA</code> son
contados como una violación** debido a que éstas son tomadas como una
categoría y no como un valor faltante. En el gráfico inferior muestra
**cuantas filas contienen
<code style="color: #ff628c!important">NA</code>,
<code style="color: #ff628c!important">NaN</code> o violaciones a las
condiciones establecidas**, y señala cuantas filas no poseen ningún tipo
de violación.

Para localizar la fila en donde se realizan violaciones en cada
variable, podemos emplear la función <tt>localizeErrors()</tt> de la
librería <code>editrules</code> seguida de una combinación entre las
funciones <tt>apply()</tt> y <tt>which()</tt>, de la forma

``` r
# Localiza y muestra por variable las violaciones
loc <- localizeErrors(c(CondC, CondN), datos) %$% adapt
apply(X = loc, MARGIN = 2, FUN = function(x) which(x == TRUE))
```

    $fecha
    named integer(0)

    $id
    named integer(0)

    $number_telefono
    named integer(0)

    $estrato
     6 10 
     6 10 

    $municipio
     4 10 
     4 10 

    $ingresos
     1  6 10 11 
     1  6 10 11 

    $deuda_vivienda
     4  6  8 10 
     4  6  8 10 

    $costo_vivienda
     1  4  8 10 
     1  4  8 10 

    $percent_pagado
     1  6  9 10 
     1  6  9 10 

    $muni
     4 10 
     4 10 

De la salida anterior, observamos que hay violaciones en la entrada
`$5$` y `$10$` de la variable <tt>estrato</tt>, en las entradas `$4, 9$`
y `$10$` de la variable <tt>municipio</tt>, etc, etc, etc. Cabe anotar
que todos los valores faltantes también son detectados por el proceso de
verificación de datos.

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto; font-size: 90%;"><thead><tr><th style="text-align:left;">fecha</th>
<th style="text-align:right;">id</th><th style="text-align:right;">number_telefono</th><th style="text-align:right;">estrato</th><th style="text-align:right;">municipio</th><th style="text-align:right;">ingresos</th><th style="text-align:right;">deuda_vivienda</th><th style="text-align:right;">costo_vivienda</th><th style="text-align:right;">percent_pagado</th><th style="text-align:right;">muni</th></tr></thead><tbody><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">1035869</td><td style="text-align:right;">3124751231</td><td style="text-align:right;">2</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">No</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NaN</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NaN</span></td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">2014-03-07</td><td style="text-align:right;">1007306</td><td style="text-align:right;">3434589</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">3083500</td><td style="text-align:right;">Sí</td><td style="text-align:right;">405147000</td><td style="text-align:right;">0.31</td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">2013-01-12</td><td style="text-align:right;">3935563</td><td style="text-align:right;">7005931</td><td style="text-align:right;">4</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">Hola! :D</span></td><td style="text-align:right;">630700</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">-62708000</span></td><td style="text-align:right;">0.18</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">Hola! :D</span></td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">2222985</td><td style="text-align:right;">8660538</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">10</span></td><td style="text-align:right;">Sabaneta</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">Si</span></td><td style="text-align:right;">3.838e+09</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">Sabaneta</td></tr><tr><td style="text-align:right;">2014-09-23</td><td style="text-align:right;">3488986</td><td style="text-align:right;">5625266</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">3356600</td><td style="text-align:right;">Sí</td><td style="text-align:right;">186855000</td><td style="text-align:right;">0.75</td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">2014-06-02</td><td style="text-align:right;">1022146</td><td style="text-align:right;">3979642</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">2204800</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">No responde</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">0.05</td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">2015-12-15</td><td style="text-align:right;">39359318</td><td style="text-align:right;">2304725</td><td style="text-align:right;">1</td><td style="text-align:right;">Itagüi</td><td style="text-align:right;">3428900</td><td style="text-align:right;">Sí</td><td style="text-align:right;">539641705</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">Itagüi</td></tr><tr><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td></tr><tr><td style="text-align:right;">2013-02-06</td><td style="text-align:right;">32321157</td><td style="text-align:right;">39522101</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">Sí</td><td style="text-align:right;">169451000</td><td style="text-align:right;">0.22</td><td style="text-align:right;">La Estrella</td></tr></tbody></table></pre>

### Identificación de outlier

Para definir un outlier o dato atípico existe una gran cantidad de
definiciones, pero en general puede entenderse como observaciones que
pueden parecer anormales o extremas en un conjunto de datos, los cuales
**pueden afectar significativamente la inferencia estadística**
realizada.

Similarmente, existen diferentes metodologías para determinar datos
atípicos, en donde, **la mayoría dependen de los estimadores insesgados
asociados a la distribución de probabilidades** que presenta mejor
ajuste al conjunto de observaciones.

En el caso en el cual no se conoce las distribuciones de probabilidad,
pero se observa que **los datos son más o menos unimodales y
distribuidos simétricamente**, puede emplearse el método de caja y
bigotes de Tukey, McGill, & Larsen ([1978](#ref-Tukey1978)) para
detección de datos atípicos.

En este método se emplean estadísticos de orden no paramétricos, para
calcular un gráfico de caja y bigotes, con el fin de visualizar los
datos atípicos que se encuentren por encima y por debajo de `$1.5$`
veces el rango intercuartílico.

<h6 align="center">
Gráfico de caja y bigotes
</h6>

![](../PresentacionesyPoster/images/BoxPlot.jpg) En <tt>R</tt> dicho
gráfico puede realizarse mediante la función <tt>boxplot()</tt>,
mientras que, los valores atípicos o la fila asociada dichos valores
atípicos pueden ser calculados con la siguiente función.

<button id="Show5" class="btn btn-secondary">
Ver función Outliers
</button>
<button id="Hide5" class="btn btn-info">
Ocultar función Outliers
</button>
<main id="botoncito5">
<h3 data-toc-skip>
Creación de función Outliers
</h3>
<p>
Creo la función ya que no encontré una función que lo hiciera :D
</p>
<section class="language-r highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code><span class="c1"># Función para extraer valores atípicos de variables numéricas</span><span class="w">
</span><span class="n">Outliers</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="k">function</span><span class="p">(</span><span class="n">data</span><span class="p">,</span><span class="w"> </span><span class="n">row</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="kc">TRUE</span><span class="p">)</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="o">!</span><span class="n">require</span><span class="p">(</span><span class="n">magrittr</span><span class="p">))</span><span class="w"> 
        </span><span class="n">install.packages</span><span class="p">(</span><span class="s2">"magrittr"</span><span class="p">)</span><span class="w">
    </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="o">!</span><span class="n">require</span><span class="p">(</span><span class="n">dplyr</span><span class="p">))</span><span class="w"> 
        </span><span class="n">install.packages</span><span class="p">(</span><span class="s2">"dplyr"</span><span class="p">)</span><span class="w">
    </span><span class="n">require</span><span class="p">(</span><span class="n">magrittr</span><span class="p">)</span><span class="w">
    </span><span class="n">require</span><span class="p">(</span><span class="n">dplyr</span><span class="p">)</span><span class="w">
    </span><span class="n">vars</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">data</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">select_if</span><span class="p">(</span><span class="n">is.numeric</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="nf">names</span><span class="p">()</span><span class="w">
    </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">row</span><span class="w"> </span><span class="o">!=</span><span class="w"> </span><span class="kc">TRUE</span><span class="w"> </span><span class="o">&amp;</span><span class="w"> </span><span class="n">row</span><span class="w"> </span><span class="o">!=</span><span class="w"> </span><span class="kc">FALSE</span><span class="p">)</span><span class="w"> 
        </span><span class="n">stop</span><span class="p">(</span><span class="s2">"row argument must be equal to TRUE or FALSE"</span><span class="p">)</span><span class="w">
    </span><span class="n">aux</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="k">function</span><span class="p">(</span><span class="n">data</span><span class="p">,</span><span class="w"> </span><span class="n">vars</span><span class="p">)</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="n">Outlier</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">data</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">select</span><span class="p">(</span><span class="n">vars</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">boxplot</span><span class="p">(</span><span class="n">plot</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="kc">FALSE</span><span class="p">)</span><span class="w"> </span><span class="o">%$%</span><span class="w"> </span><span class="n">out</span><span class="w">
        </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">row</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="kc">TRUE</span><span class="p">)</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="n">Outlier</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">suppressWarnings</span><span class="p">(</span><span class="n">which</span><span class="p">(</span><span class="n">eval</span><span class="p">(</span><span class="n">parse</span><span class="p">(</span><span class="n">text</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">paste</span><span class="p">(</span><span class="s2">"data$"</span><span class="p">,</span><span class="w"> 
                </span><span class="n">vars</span><span class="p">)))</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="n">Outlier</span><span class="p">))</span><span class="w">
        </span><span class="p">}</span><span class="w">
        </span><span class="nf">return</span><span class="p">(</span><span class="n">vars</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">Outlier</span><span class="p">)</span><span class="w">
    </span><span class="p">}</span><span class="w">
    </span><span class="n">sapply</span><span class="p">(</span><span class="n">vars</span><span class="p">,</span><span class="w"> </span><span class="n">aux</span><span class="p">,</span><span class="w"> </span><span class="n">data</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">data</span><span class="p">)</span><span class="w">
</span><span class="p">}</span><span class="w">
</span></code></pre>
</section>
</section>
</main>

``` r
## Empleo de la función Outliers Muestra fila en la que se encuentra el
## Outlier
datos %>% Outliers(row = FALSE)
```

    $ingresos
    [1] 630700

    $costo_vivienda
    [1] 3838000000

    $percent_pagado
    [1] 0.75 0.05

De la salida anterior, se aprecia que la observación atípica de la
variable <tt>ingresos</tt> corresponde a un salario de `$630700$` pesos,
mientras que, para la variable <tt>costo\_vivienda</tt> corresponde a un
costo de vivienda de `$3838$` millones de pesos, y para la variable
<tt>percent\_pagado</tt> lo porcentajes de `$0.05$` y `$0.75$`.

Es de anotar que de estos datos, solo el valor atípico de
<tt>costo\_vivienda</tt> es el único que parece tener un valor excesivo,
pues se cree que se agregó un `$0$` de más.

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto; font-size: 90%;"><thead><tr><th style="text-align:left;">fecha</th>
<th style="text-align:right;">id</th><th style="text-align:right;">number_telefono</th><th style="text-align:right;">estrato</th><th style="text-align:right;">municipio</th><th style="text-align:right;">ingresos</th><th style="text-align:right;">deuda_vivienda</th><th style="text-align:right;">costo_vivienda</th><th style="text-align:right;">percent_pagado</th><th style="text-align:right;">muni</th></tr></thead><tbody><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">1035869</td><td style="text-align:right;">3124751231</td><td style="text-align:right;">2</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">NA</td><td style="text-align:right;">No</td><td style="text-align:right;">NaN</td><td style="text-align:right;">NaN</td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">2014-03-07</td><td style="text-align:right;">1007306</td><td style="text-align:right;">3434589</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">3083500</td><td style="text-align:right;">Sí</td><td style="text-align:right;">405147000</td><td style="text-align:right;">0.31</td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">2013-01-12</td><td style="text-align:right;">3935563</td><td style="text-align:right;">7005931</td><td style="text-align:right;">4</td><td style="text-align:right;">Hola! :D</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">630700</span></td><td style="text-align:right;">NA</td><td style="text-align:right;">-62708000</td><td style="text-align:right;">0.18</td><td style="text-align:right;">Hola! :D</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">2222985</td><td style="text-align:right;">8660538</td><td style="text-align:right;">10</td><td style="text-align:right;">Sabaneta</td><td style="text-align:right;">NA</td><td style="text-align:right;">Si</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">3.838e+09</span></td><td style="text-align:right;">NA</td><td style="text-align:right;">Sabaneta</td></tr><tr><td style="text-align:right;">2014-09-23</td><td style="text-align:right;">3488986</td><td style="text-align:right;">5625266</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">3356600</td><td style="text-align:right;">Sí</td><td style="text-align:right;">186855000</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">0.75</span></td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">2014-06-02</td><td style="text-align:right;">1022146</td><td style="text-align:right;">3979642</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">2204800</td><td style="text-align:right;">No responde</td><td style="text-align:right;">NA</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">0.05</span></td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">2015-12-15</td><td style="text-align:right;">39359318</td><td style="text-align:right;">2304725</td><td style="text-align:right;">1</td><td style="text-align:right;">Itagüi</td><td style="text-align:right;">3428900</td><td style="text-align:right;">Sí</td><td style="text-align:right;">539641705</td><td style="text-align:right;">NA</td><td style="text-align:right;">Itagüi</td></tr><tr><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">2013-02-06</td><td style="text-align:right;">32321157</td><td style="text-align:right;">39522101</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">NA</td><td style="text-align:right;">Sí</td><td style="text-align:right;">169451000</td><td style="text-align:right;">0.22</td><td style="text-align:right;">La Estrella</td></tr></tbody></table></pre>

#### Corrección de datos

La métodos de corrección tienen por objetivo revisar en lo posible,
aquellas observaciones en las que se encontraron inconsistencias,
removiendo filas o columnas vacías, eliminando filas o columnas
duplicadas, corrección deductiva e imputando datos.

#### Remover filas o columnas vacías

Para asegurarnos que las celdas faltantes detectadas con “NA”, “Na”,
“NaN”, “999”, etc, en la subsección [Detección de datos
faltantes](https://jouninlrmd.github.io/Presentacion01#detección-de-datos-faltantes){:target="\_blank"},
se transformen a <code style="color: #ff628c!important">NA</code>,
pueden emplearse las funciones <tt>na\_if()</tt> o
<tt>convert\_to\_NA()</tt> de las librerías `dplyr` y `janitor`,
respectivamente.

<tt>na\_if()</tt> **se emplea cuando no existan variables de tipo
<tt>date</tt>** en la base de datos, ya que ésta genera errores cuando
trata de realizar la transformación, mientras que,
<tt>convert\_to\_NA()</tt> **se emplea cuando existan variables tipo
<tt>date</tt>** en la base de datos.

``` r
# Reemplaza valores 'NA', 'NaN' y 'Na' dentro de variables tipo factor
datos %<>% convert_to_NA("NA") %>% convert_to_NA("NaN")  # Se pueden agregar más caracteres
```

Como puede ocurrir que al eliminar los “NA” de las variables tipo
<tt>factor</tt>, **puede quedar categorías sin uso** dentro de las
variables factor, se procede a eliminar dichos niveles mediante la
función <tt>droplevels()</tt> de la base de <tt>R</tt>.

``` r
# Elimina niveles sin uso dentro de variables tipo factor
datos %<>% droplevels()
```

Finalmente, para **eliminar aquellas filas o columnas poseen solo
valores <code style="color: #ff628c!important">NA</code>** dentro de una
base de datos, es posible usar la función <tt>remove\_empty()</tt> de la
librería `janitor`, la cual verifica todas las filas y todas las
columnas, para observar en cuales de ellas se presentan solo valores
<code style="color: #ff628c!important">NA</code>.

``` r
# Elimina filas y columnas que poseen solo valores NA
datos %<>% remove_empty()
```

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto; font-size: 90%;"><thead><tr><th style="text-align:left;">fecha</th>
<th style="text-align:right;">id</th><th style="text-align:right;">number_telefono</th><th style="text-align:right;">estrato</th><th style="text-align:right;">municipio</th><th style="text-align:right;">ingresos</th><th style="text-align:right;">deuda_vivienda</th><th style="text-align:right;">costo_vivienda</th><th style="text-align:right;">percent_pagado</th><th style="text-align:right;">muni</th></tr></thead><tbody><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">1035869</td><td style="text-align:right;">3124751231</td><td style="text-align:right;">2</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">NA</td><td style="text-align:right;">No</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">2014-03-07</td><td style="text-align:right;">1007306</td><td style="text-align:right;">3434589</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">3083500</td><td style="text-align:right;">Sí</td><td style="text-align:right;">405147000</td><td style="text-align:right;">0.31</td><td style="text-align:right;">La Estrella</td></tr><tr><td style="text-align:right;">2013-01-12</td><td style="text-align:right;">3935563</td><td style="text-align:right;">7005931</td><td style="text-align:right;">4</td><td style="text-align:right;">Hola! :D</td><td style="text-align:right;">630700</td><td style="text-align:right;">NA</td><td style="text-align:right;">-62708000</td><td style="text-align:right;">0.18</td><td style="text-align:right;">Hola! :D</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td><td style="text-align:right;">Bello</td></tr><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">2222985</td><td style="text-align:right;">8660538</td><td style="text-align:right;">10</td><td style="text-align:right;">Sabaneta</td><td style="text-align:right;">NA</td><td style="text-align:right;">Si</td><td style="text-align:right;">3.838e+09</td><td style="text-align:right;">NA</td><td style="text-align:right;">Sabaneta</td></tr><tr><td style="text-align:right;">2014-09-23</td><td style="text-align:right;">3488986</td><td style="text-align:right;">5625266</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">3356600</td><td style="text-align:right;">Sí</td><td style="text-align:right;">186855000</td><td style="text-align:right;">0.75</td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">2014-06-02</td><td style="text-align:right;">1022146</td><td style="text-align:right;">3979642</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">2204800</td><td style="text-align:right;">No responde</td><td style="text-align:right;">NA</td><td style="text-align:right;">0.05</td><td style="text-align:right;">Caldas</td></tr><tr><td style="text-align:right;">2015-12-15</td><td style="text-align:right;">39359318</td><td style="text-align:right;">2304725</td><td style="text-align:right;">1</td><td style="text-align:right;">Itagüi</td><td style="text-align:right;">3428900</td><td style="text-align:right;">Sí</td><td style="text-align:right;">539641705</td><td style="text-align:right;">NA</td><td style="text-align:right;">Itagüi</td></tr><tr><td style="text-align:right;">2013-02-06</td><td style="text-align:right;">32321157</td><td style="text-align:right;">39522101</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">NA</td><td style="text-align:right;">Sí</td><td style="text-align:right;">169451000</td><td style="text-align:right;">0.22</td><td style="text-align:right;">La Estrella</td></tr></tbody></table></pre>

#### Eliminar duplicados

Esta fase tiene como objetivo eliminar aquellas filas y columnas que
poseen registros duplicados, es decir, filas o columnas que son
exactamente iguales. **Para eliminar las filas duplicadas**, es posible
emplear la función <tt>distinct()</tt> de la librería `dplyr`, mientras
que, **para eliminar las columnas duplicadas**, es posible emplear la
función <tt>select\_if()</tt> de la librería `dplyr`, en combinación con
las funciones <tt>duplicated()</tt> y <tt>as.list()</tt> de la librería
base de <tt>R</tt>.

``` r
# Elimina filas que poseen registros duplicados
datos %<>% distinct()

# Elimina colúmnas que poseen registros duplicados
datos %<>% select_if(!duplicated(as.list(.)))
```

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto; font-size: 90%;"><thead><tr><th style="text-align:left;">fecha</th>
<th style="text-align:right;">id</th><th style="text-align:right;">number_telefono</th><th style="text-align:right;">estrato</th><th style="text-align:right;">municipio</th><th style="text-align:right;">ingresos</th><th style="text-align:right;">deuda_vivienda</th><th style="text-align:right;">costo_vivienda</th><th style="text-align:right;">percent_pagado</th></tr></thead><tbody><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">1035869</td><td style="text-align:right;">3124751231</td><td style="text-align:right;">2</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">NA</td><td style="text-align:right;">No</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td></tr><tr><td style="text-align:right;">2014-03-07</td><td style="text-align:right;">1007306</td><td style="text-align:right;">3434589</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">3083500</td><td style="text-align:right;">Sí</td><td style="text-align:right;">405147000</td><td style="text-align:right;">0.31</td></tr><tr><td style="text-align:right;">2013-01-12</td><td style="text-align:right;">3935563</td><td style="text-align:right;">7005931</td><td style="text-align:right;">4</td><td style="text-align:right;">Hola! :D</td><td style="text-align:right;">630700</td><td style="text-align:right;">NA</td><td style="text-align:right;">-62708000</td><td style="text-align:right;">0.18</td></tr><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">2222985</td><td style="text-align:right;">8660538</td><td style="text-align:right;">10</td><td style="text-align:right;">Sabaneta</td><td style="text-align:right;">NA</td><td style="text-align:right;">Si</td><td style="text-align:right;">3.838e+09</td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">2014-09-23</td><td style="text-align:right;">3488986</td><td style="text-align:right;">5625266</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">3356600</td><td style="text-align:right;">Sí</td><td style="text-align:right;">186855000</td><td style="text-align:right;">0.75</td></tr><tr><td style="text-align:right;">2014-06-02</td><td style="text-align:right;">1022146</td><td style="text-align:right;">3979642</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">2204800</td><td style="text-align:right;">No responde</td><td style="text-align:right;">NA</td><td style="text-align:right;">0.05</td></tr><tr><td style="text-align:right;">2015-12-15</td><td style="text-align:right;">39359318</td><td style="text-align:right;">2304725</td><td style="text-align:right;">1</td><td style="text-align:right;">Itagüi</td><td style="text-align:right;">3428900</td><td style="text-align:right;">Sí</td><td style="text-align:right;">539641705</td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">2013-02-06</td><td style="text-align:right;">32321157</td><td style="text-align:right;">39522101</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">NA</td><td style="text-align:right;">Sí</td><td style="text-align:right;">169451000</td><td style="text-align:right;">0.22</td></tr></tbody></table></pre>

### Corrección deductiva

Esta fase es la más complicada de todo del procedimiento de limpieza,
debido a que es necesario **revisar detalladamente junto a un experto en
el tema**, la información obtenida en las fases de [Verificación de
datos](https://jouninlrmd.github.io/Presentacion01#verificación-de-datos){:target="\_blank“}
y [Identificación de
Outliers](https://jouninlrmd.github.io/Presentacion01#identificación-de-outlier){:target=”\_blank"},
ya que **es necesario revisar las casillas en las que se encontraron
violaciones** y tratar de transformar dichos valores no válidos, basados
en información de valores válidos.

Para realizar tal procedimiento, podemos usar las funciones
<tt>mutate</tt> de la librería `dplyr`, en combinación con las funciones
<tt>if\_else()</tt> de la librería `dplyr`, <tt>fct\_recode()</tt> de la
librería `forcats` y <tt>droplevels()</tt> de la base de <tt>R</tt>,
para establecer condiciones que permitan modificar las otras variables.

``` r
## Corrección deductiva Estrato 10 no existe, así que se reemplaza valor por
## un NA (se escribe NULL)
datos %<>% mutate(estrato = fct_recode(estrato, `NULL` = "10")) %>% droplevels()

# El municipio 'Hola! :D' no existe, así que se reemplaza dicho valor por NA
datos %<>% mutate(municipio = fct_recode(municipio, `NULL` = "Hola! :D")) %>% 
    droplevels()

# Se recodifica el nivel Si sin tilde de la variable deuda_vivienda por el
# nivel Sí con tilde
datos %<>% mutate(deuda_vivienda = fct_recode(deuda_vivienda, Sí = "Si")) %>% 
    droplevels()

# La variable costo_vivienda no puede ser negativa
datos %<>% mutate(costo_vivienda = if_else(costo_vivienda < 0, abs(costo_vivienda), 
    costo_vivienda))

# Se cree que se agregó un cero extra en el costo de la vivienda que aparece
# por un valor de 3838 millones de pesos, así que se le elimina un cero.
datos %<>% mutate(costo_vivienda = if_else(costo_vivienda == "3838000000", costo_vivienda/10, 
    costo_vivienda))

# Puede asumirse, que deuda_vivienda es igual a 'Sí' cuando se reporta valor
# en costo_vivienda o percent_pagado.
datos %<>% mutate(deuda_vivienda = if_else(costo_vivienda > 0 | percent_pagado > 
    0, "Sí", "No", "No"))
```

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto; font-size: 90%;"><thead><tr><th style="text-align:left;">fecha</th>
<th style="text-align:right;">id</th><th style="text-align:right;">number_telefono</th><th style="text-align:right;">estrato</th><th style="text-align:right;">municipio</th><th style="text-align:right;">ingresos</th><th style="text-align:right;">deuda_vivienda</th><th style="text-align:right;">costo_vivienda</th><th style="text-align:right;">percent_pagado</th></tr></thead><tbody><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">1035869</td><td style="text-align:right;">3124751231</td><td style="text-align:right;">2</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">NA</td><td style="text-align:right;">No</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td></tr><tr><td style="text-align:right;">2014-03-07</td><td style="text-align:right;">1007306</td><td style="text-align:right;">3434589</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">3083500</td><td style="text-align:right;">Sí</td><td style="text-align:right;">405147000</td><td style="text-align:right;">0.31</td></tr><tr><td style="text-align:right;">2013-01-12</td><td style="text-align:right;">3935563</td><td style="text-align:right;">7005931</td><td style="text-align:right;">4</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">630700</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">Sí</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">62708000</span></td><td style="text-align:right;">0.18</td></tr><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">2222985</td><td style="text-align:right;">8660538</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">NA</span></td><td style="text-align:right;">Sabaneta</td><td style="text-align:right;">NA</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">Sí</span></td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">383800000</span></td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">2014-09-23</td><td style="text-align:right;">3488986</td><td style="text-align:right;">5625266</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">3356600</td><td style="text-align:right;">Sí</td><td style="text-align:right;">186855000</td><td style="text-align:right;">0.75</td></tr><tr><td style="text-align:right;">2014-06-02</td><td style="text-align:right;">1022146</td><td style="text-align:right;">3979642</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">2204800</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">Sí</span></td><td style="text-align:right;">NA</td><td style="text-align:right;">0.05</td></tr><tr><td style="text-align:right;">2015-12-15</td><td style="text-align:right;">39359318</td><td style="text-align:right;">2304725</td><td style="text-align:right;">1</td><td style="text-align:right;">Itagüi</td><td style="text-align:right;">3428900</td><td style="text-align:right;">Sí</td><td style="text-align:right;">539641705</td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">2013-02-06</td><td style="text-align:right;">32321157</td><td style="text-align:right;">39522101</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">NA</td><td style="text-align:right;">Sí</td><td style="text-align:right;">169451000</td><td style="text-align:right;">0.22</td></tr></tbody></table></pre>

### Imputación de datos

La imputación es un procedimiento que **consta en estimar o derivar
valores para campos que poseen datos faltantes**, en donde, dichas
acciones tendrán una fuerte influencia en los resultados de un análisis
estadístico. Tal procedimient poseen una gran cantidad de metodologías
diferentes, las cuales se escapan de esta presentación, y por tanto nos
centraremos en unos cuantos.

De Jonge & Van Der Loo ([2013](#ref-deJonge2013), p. 46) presentan una
tabla en donde presenta las diferentes librerías de <tt>R</tt>, que
ofrecen alguna función que permita la realización de imputaciones,
enumeran éstas con una serie de métodos de imputación basados en modelos
populares. **De Waal, Pannekoek, & Scholtus ([2011](#ref-deWaal2011),
cap. 7) realizan una revisión general de varios métodos de imputación**.

<h6 align="center">
Librerías que permites métodos de imputación en <tt>R</tt> De Jonge &
Van Der Loo ([2013](#ref-deJonge2013), p. 46)
</h6>

<img src="../PresentacionesyPoster/images/MetodosImputacion.jpg" style="width:80.0%" />

Para ilustrar los diferentes métodos de imputación, se presentan el
método de imputación numérica, método de imputación Hot deck, y método
de imputación kNN.

#### Imputación numérica

Como su nombre lo indica, este método de imputación se realiza solo para
variables numéricas y **lo que haces es emplear medidas de tendencias
central**, tal como la media, mediana, media recortada o moda, para
imputar los valores faltantes. Dichas medidas de tendencia central,
pueden consultarse en el siguiente link [Medidas de tendencia
central](../../EstadisticaI/EstIClase01.html#medidas-estadísticas){:target="\_blank"}.

Para la realización de esta imputación pueden emplearse las funciones
<tt>mutate()</tt>, <tt>if\_else()</tt> de la librería `dplyr`, junto con
la función, <tt>is.na()</tt>, de la librería base de <tt>R</tt>, y la
función <tt>impute()</tt> de la librería `Hmisc`. También será necesario
seleccionar la medida de tendencia central de interés, entre ellas se
tiene, <tt>mean()</tt> para la media o media recortada,
<tt>median()</tt> para la mediana, <tt>Moda()</tt> (ver función en
[Medidas de tendencia
central](../../EstadisticaI/EstIClase01.html#medidas-estadísticas){:target="\_blank"}.)
para la moda.

``` r
# Se crea nueva base de datos para mostrar diferentes métodos de imputación
NumImp <- datos

# Se imputan los ingresos con la mediana
NumImp %<>% mutate(ingresos = impute(ingresos, median))

# Se imputa costo_vivienda (restringido a deuda_vivienda) con la media
NumImp %<>% mutate(costo_vivienda = if_else(is.na(costo_vivienda) & deuda_vivienda == 
    "Sí", mean(costo_vivienda, na.rm = TRUE), costo_vivienda))

# Se imputa percent_pagado (restringido a deuda_vivienda) con la media
# recortada al 20%
NumImp %<>% mutate(percent_pagado = if_else(is.na(percent_pagado) & deuda_vivienda == 
    "Sí", mean(percent_pagado, na.rm = TRUE, trim = 0.2), percent_pagado))
```

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto; font-size: 90%;"><thead><tr><th style="text-align:left;">fecha</th>
<th style="text-align:right;">id</th><th style="text-align:right;">number_telefono</th><th style="text-align:right;">estrato</th><th style="text-align:right;">municipio</th><th style="text-align:right;">ingresos</th><th style="text-align:right;">deuda_vivienda</th><th style="text-align:right;">costo_vivienda</th><th style="text-align:right;">percent_pagado</th></tr></thead><tbody><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">1035869</td><td style="text-align:right;">3124751231</td><td style="text-align:right;">2</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">3099150</span></td><td style="text-align:right;">No</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td></tr><tr><td style="text-align:right;">2014-03-07</td><td style="text-align:right;">1007306</td><td style="text-align:right;">3434589</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">3083500</td><td style="text-align:right;">Sí</td><td style="text-align:right;">405147000</td><td style="text-align:right;">0.31</td></tr><tr><td style="text-align:right;">2013-01-12</td><td style="text-align:right;">3935563</td><td style="text-align:right;">7005931</td><td style="text-align:right;">4</td><td style="text-align:right;">NA</td><td style="text-align:right;">630700</td><td style="text-align:right;">Sí</td><td style="text-align:right;">62708000</td><td style="text-align:right;">0.18</td></tr><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">2222985</td><td style="text-align:right;">8660538</td><td style="text-align:right;">NA</td><td style="text-align:right;">Sabaneta</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">3099150</span></td><td style="text-align:right;">Sí</td><td style="text-align:right;">383800000</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">0.25</span></td></tr><tr><td style="text-align:right;">2014-09-23</td><td style="text-align:right;">3488986</td><td style="text-align:right;">5625266</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">3356600</td><td style="text-align:right;">Sí</td><td style="text-align:right;">186855000</td><td style="text-align:right;">0.75</td></tr><tr><td style="text-align:right;">2014-06-02</td><td style="text-align:right;">1022146</td><td style="text-align:right;">3979642</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">2204800</td><td style="text-align:right;">Sí</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">847222301</span></td><td style="text-align:right;">0.05</td></tr><tr><td style="text-align:right;">2015-12-15</td><td style="text-align:right;">39359318</td><td style="text-align:right;">2304725</td><td style="text-align:right;">1</td><td style="text-align:right;">Itagüi</td><td style="text-align:right;">3428900</td><td style="text-align:right;">Sí</td><td style="text-align:right;">539641705</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">0.25</span></td></tr><tr><td style="text-align:right;">2013-02-06</td><td style="text-align:right;">32321157</td><td style="text-align:right;">39522101</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">3099150</span></td><td style="text-align:right;">Sí</td><td style="text-align:right;">169451000</td><td style="text-align:right;">0.22</td></tr></tbody></table></pre>

#### Imputación Hot Deck

Este método de imputación se realiza para variables numéricas y
categóricas, y **lo que haces es emplear registros que se encuentren en
la base de datos**, para imputar los valores faltantes. Además,
dependiendo del método Hot Deck empleado, **se recomienda emplear la
metodología, solo cuando se tenga una gran cantidad de registros**,
debido a que si son pocos, es posible que no hayan registros lo
suficientemente similares, para realizar la imputación de forma
adecuada.

Entre los métodos de imputación Hot Deck, el más simple es el **método
aleatorio**, el cual consta de elegir un valor de forma uniforme y
aleatoriamente de la misma base de datos y reemplaza con éste el valor
faltante. Éste método puede ser implementado mediante la función
<tt>impute()</tt> de la librería `Hmisc`. Dado que el método de
imputación se realiza de forma aleatoria **se recomienda establecer una
semilla <tt>set.seed()</tt> antes de aplicar el método**, para poder
replicar los resultados.

Entonces, para la realización de esta imputación, pueden emplearse las
funciones <tt>mutate\_at()</tt>, <tt>mutate()</tt>, <tt>if\_else()</tt>
de la librería `dplyr`, junto con las funciones, <tt>as.numeric()</tt>,
de la librería base de <tt>R</tt>, y la función <tt>impute()</tt> de la
librería `Hmisc`.

``` r
# Se crea nueva base de datos para mostrar diferentes métodos de imputación
HotImp <- datos

# Se establece una semilla cualquiera
set.seed(1844)

# Se imputan todas las variables excepto, costo_vivienda y percent_pagado
# debido a que tienen una restricción
HotImp %<>% mutate_at(vars(-c(costo_vivienda, percent_pagado)), ~impute(., "random"))

# Se imputa costo_vivienda (restringido a deuda_vivienda) con la media
HotImp %<>% mutate(costo_vivienda = if_else(deuda_vivienda == "Sí", as.numeric(impute(costo_vivienda, 
    "random")), costo_vivienda))

# Se imputa percent_pagado (restringido a deuda_vivienda) con la media
# recortada al 20%
HotImp %<>% mutate(percent_pagado = if_else(deuda_vivienda == "Sí", as.numeric(impute(percent_pagado, 
    "random")), percent_pagado))
```

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto; font-size: 90%;"><thead><tr><th style="text-align:left;">fecha</th>
<th style="text-align:right;">id</th><th style="text-align:right;">number_telefono</th><th style="text-align:right;">estrato</th><th style="text-align:right;">municipio</th><th style="text-align:right;">ingresos</th><th style="text-align:right;">deuda_vivienda</th><th style="text-align:right;">costo_vivienda</th><th style="text-align:right;">percent_pagado</th></tr></thead><tbody><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">1035869</td><td style="text-align:right;">3124751231</td><td style="text-align:right;">2</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">3356600</span></td><td style="text-align:right;">No</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td></tr><tr><td style="text-align:right;">2014-03-07</td><td style="text-align:right;">1007306</td><td style="text-align:right;">3434589</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">3083500</td><td style="text-align:right;">Sí</td><td style="text-align:right;">405147000</td><td style="text-align:right;">0.31</td></tr><tr><td style="text-align:right;">2013-01-12</td><td style="text-align:right;">3935563</td><td style="text-align:right;">7005931</td><td style="text-align:right;">4</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">Itagüi</span></td><td style="text-align:right;">630700</td><td style="text-align:right;">Sí</td><td style="text-align:right;">62708000</td><td style="text-align:right;">0.18</td></tr><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">2222985</td><td style="text-align:right;">8660538</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">2</span></td><td style="text-align:right;">Sabaneta</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">3356600</span></td><td style="text-align:right;">Sí</td><td style="text-align:right;">383800000</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">0.31</span></td></tr><tr><td style="text-align:right;">2014-09-23</td><td style="text-align:right;">3488986</td><td style="text-align:right;">5625266</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">3356600</td><td style="text-align:right;">Sí</td><td style="text-align:right;">186855000</td><td style="text-align:right;">0.75</td></tr><tr><td style="text-align:right;">2014-06-02</td><td style="text-align:right;">1022146</td><td style="text-align:right;">3979642</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">2204800</td><td style="text-align:right;">Sí</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">3838000000</span></td><td style="text-align:right;">0.05</td></tr><tr><td style="text-align:right;">2015-12-15</td><td style="text-align:right;">39359318</td><td style="text-align:right;">2304725</td><td style="text-align:right;">1</td><td style="text-align:right;">Itagüi</td><td style="text-align:right;">3428900</td><td style="text-align:right;">Sí</td><td style="text-align:right;">539641705</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">0.29</span></td></tr><tr><td style="text-align:right;">2013-02-06</td><td style="text-align:right;">32321157</td><td style="text-align:right;">39522101</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">3083500</span></td><td style="text-align:right;">Sí</td><td style="text-align:right;">169451000</td><td style="text-align:right;">0.22</td></tr></tbody></table></pre>

#### Imputación kNN

El método de imputación del `$k$`-ésimo vecino más cercano (`$k$`
Nearest Neighbor), también puede ser aplicado a variables numéricas y
variables factor, y consta de la aplicación de una función de distancia
`$d(i, j)$` que calcula una medida de disimilitud (poca semejanza) entre
los registros, y **selecciona para reemplazar el dato faltante, a aquel
valor que tenga una distancia más pequeña respecto al valor de
interés**, es decir, a su vecino más cercano.

Para el cálculo del método de imputación kNN, es posible emplear la
función <tt>kNN</tt> librería `VIM`, la cual emplea la función de
distancia de Gower ([1971](#ref-Gower1971), p. 859), para definir cuál
es el vecino más cercano. \*\*Dado que dicha función no permite el uso
de restricciones\*, debe realizarse la imputación en dos pasos, el
primero paso es imputar toda la base de datos, y el segundo paso es
recuperar desde la base original aquellas variables que poseen
restricciones.

Para realizar el procedimiento de imputación de emplean la funciones
<tt>mutate()</tt>, <tt>if\_else()</tt> de la librería `dplyr` y la
función <tt>kNN</tt> de la librería `VIM`.

``` r
# Se crea una nueva base de datos realizando la imputación total
knnImp <- kNN(datos, imp_var = FALSE)

## Se recuperan los valores dadas las restricciones establecidas Se recupera
## costo_vivienda
knnImp %<>% mutate(costo_vivienda = if_else(deuda_vivienda == "No", datos$costo_vivienda, 
    costo_vivienda))

# Se recupera percent_pagado
knnImp %<>% mutate(percent_pagado = if_else(deuda_vivienda == "No", datos$percent_pagado, 
    percent_pagado))
```

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto; font-size: 90%;"><thead><tr><th style="text-align:left;">fecha</th>
<th style="text-align:right;">id</th><th style="text-align:right;">number_telefono</th><th style="text-align:right;">estrato</th><th style="text-align:right;">municipio</th><th style="text-align:right;">ingresos</th><th style="text-align:right;">deuda_vivienda</th><th style="text-align:right;">costo_vivienda</th><th style="text-align:right;">percent_pagado</th></tr></thead><tbody><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">1035869</td><td style="text-align:right;">3124751231</td><td style="text-align:right;">2</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">3114800</span></td><td style="text-align:right;">No</td><td style="text-align:right;">NA</td><td style="text-align:right;">NA</td></tr><tr><td style="text-align:right;">2013-05-01</td><td style="text-align:right;">1035857</td><td style="text-align:right;">1192334</td><td style="text-align:right;">3</td><td style="text-align:right;">Bello</td><td style="text-align:right;">3114800</td><td style="text-align:right;">Sí</td><td style="text-align:right;">728753400</td><td style="text-align:right;">0.29</td></tr><tr><td style="text-align:right;">2014-03-07</td><td style="text-align:right;">1007306</td><td style="text-align:right;">3434589</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;">3083500</td><td style="text-align:right;">Sí</td><td style="text-align:right;">405147000</td><td style="text-align:right;">0.31</td></tr><tr><td style="text-align:right;">2013-01-12</td><td style="text-align:right;">3935563</td><td style="text-align:right;">7005931</td><td style="text-align:right;">4</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">La Estrella</span></td><td style="text-align:right;">630700</td><td style="text-align:right;">Sí</td><td style="text-align:right;">62708000</td><td style="text-align:right;">0.18</td></tr><tr><td style="text-align:right;">2013-02-15</td><td style="text-align:right;">2222985</td><td style="text-align:right;">8660538</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">2</span></td><td style="text-align:right;">Sabaneta</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">3114800</span></td><td style="text-align:right;">Sí</td><td style="text-align:right;">383800000</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">0.29</span></td></tr><tr><td style="text-align:right;">2014-09-23</td><td style="text-align:right;">3488986</td><td style="text-align:right;">5625266</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">3356600</td><td style="text-align:right;">Sí</td><td style="text-align:right;">186855000</td><td style="text-align:right;">0.75</td></tr><tr><td style="text-align:right;">2014-06-02</td><td style="text-align:right;">1022146</td><td style="text-align:right;">3979642</td><td style="text-align:right;">2</td><td style="text-align:right;">Caldas</td><td style="text-align:right;">2204800</td><td style="text-align:right;">Sí</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">186855000</span></td><td style="text-align:right;">0.05</td></tr><tr><td style="text-align:right;">2015-12-15</td><td style="text-align:right;">39359318</td><td style="text-align:right;">2304725</td><td style="text-align:right;">1</td><td style="text-align:right;">Itagüi</td><td style="text-align:right;">3428900</td><td style="text-align:right;">Sí</td><td style="text-align:right;">539641705</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">0.29</span></td></tr><tr><td style="text-align:right;">2013-02-06</td><td style="text-align:right;">32321157</td><td style="text-align:right;">39522101</td><td style="text-align:right;">3</td><td style="text-align:right;">La Estrella</td><td style="text-align:right;"><span style="border-radius: 4px; padding-right: 4px; padding-left: 4px; background-color: #974c55 !important;">3114800</span></td><td style="text-align:right;">Sí</td><td style="text-align:right;">169451000</td><td style="text-align:right;">0.22</td></tr></tbody></table></pre>
<h1 data-toc-skip>
Muchas gracias! :D
</h1>

Ejercicio
---------

Suponga la siguiente base de datos compuesta por 10 variables 30
entradas, que tiene por objetivo caracterizar a las personas que asisten
a una congregación Cristiana. Dada la poca experiencia de los
encuestadores, la base de datos posee una gran cantidad de errores los
cuales, se espera en lo posible puedan ser corregidos.

La base de datos contiene las siguientes variables.

-   **fecha- encuesta:** Fecha en la que se realizó la encuesta.
-   **$ID:** Número de identificación con el cual aparece registrada la
    persona en la congregación.
-   **tipo-documento:** Representa el tipo de documento que posee la
    persona. Los niveles son:
    -   Cédula de ciudadanía
    -   Tarjeta de identidad
    -   Tarjeta de extranjería
    -   Registro civil
-   **\# cédula:** Hace referencia el número de cédula de la persona
    encuestada.
-   **“Estrato”:** Estrato socioeconómico de la persona encuestada.
-   **COmúna:** Hace referencia a la comúna de la ciudad de Medellín
    donde vive la persona. Los niveles son:
    -   Aranjuez
    -   Belén
    -   Buenos Aires
    -   Castilla
    -   Doce de octubre
    -   Guayabal
    -   La América
    -   La Candelaria
    -   Laureles
    -   Manrique
    -   Poblado
    -   Popular
    -   Robledo
    -   San Javier
    -   Santa Cruz
    -   Villa Hermosa
-   **          :** Número de hijos que posee la persona encuestada.
-   **Asist\_Prom:** Hace referencia al número promedio de veces al mes
    que asiste la persona a la congregación.
-   **‘Tiemp\_Prom’:** Tiempo promedio que pasa la persona semanalmente
    en la congregación.
-   <strong>Prom\*Caridad:</strong> Hace referencia a la cantidad
    promedio en pesos que aporta la persona mensualmente a la
    congregación como caridad.

La base de datos puede encontrarse en el siguiente
[Link](https://github.com/jouninLRMD/jouninlrmd.github.io/raw/master/Dataset/EjercicioLimpieza.xlsx){:target="\_blank"}.

Con esta base realice el siguiente procedimiento.

1.  Revise la base de datos de forma visual y trate de listar los
    posibles valores que ésta posea.
2.  Limpie los encabezados y establezca aquellos encabezados faltantes.
3.  Corregir el tipo y clase de las variables. Revise las variables
    numéricas y corrija en posible aquellos valores que no son numéricos
    antes transformar la variables.
4.  Encuente los valores faltantes.
    -   NA
    -   NaN
    -   NULL
    -   Na
    -   nA
    -   999
5.  Verifique que los datos posean las categorías.
6.  De las variables numéricas, identifique aquellos valores atípicos, y
    trate de establecer cuales de ellos pueden ser corregidos y bajo qué
    condiciones.
7.  Realice las correcciones que considere necesarias.
8.  Emplee el método kNN de imputación y presente la base de datos
    definitiva.

<button id="Show6" class="btn btn-secondary">
Ver Solucion en <tt>R</tt>
</button>
<button id="Hide6" class="btn btn-info">
Ocultar Solucion en <tt>R</tt>
</button>
<main id="botoncito6">
<h3 data-toc-skip>
Solución <tt>R</tt>
</h3>
<section class="language-r highlighter-rouge">
<section class="highlight">
<pre class="highlight"><code><span class="c1">### Se cargan librerías</span><span class="w">
</span><span class="n">library</span><span class="p">(</span><span class="n">readxl</span><span class="p">)</span><span class="w">  </span><span class="c1"># Permite leer archivos en formato xlsx</span><span class="w">
</span><span class="n">library</span><span class="p">(</span><span class="n">janitor</span><span class="p">)</span><span class="w">  </span><span class="c1"># Librería especializada en la limpieza de datos</span><span class="w">
</span><span class="n">library</span><span class="p">(</span><span class="n">dplyr</span><span class="p">)</span><span class="w">  </span><span class="c1"># Librería especializada para la manipulación de datos</span><span class="w">
</span><span class="n">library</span><span class="p">(</span><span class="n">magrittr</span><span class="p">)</span><span class="w">  </span><span class="c1"># Librería que probee una serie de operadores 'pipe'</span><span class="w">
</span><span class="n">library</span><span class="p">(</span><span class="n">editrules</span><span class="p">)</span><span class="w">  </span><span class="c1"># Permite crear codiciones para detectar inconsistencias.</span><span class="w">
</span><span class="n">library</span><span class="p">(</span><span class="n">forcats</span><span class="p">)</span><span class="w">  </span><span class="c1"># Librería para especializada en variables tipo factor.</span><span class="w">
</span><span class="n">library</span><span class="p">(</span><span class="n">lubridate</span><span class="p">)</span><span class="w">  </span><span class="c1"># Librería que permite analizar y manipular fechas.</span><span class="w">
</span><span class="n">library</span><span class="p">(</span><span class="n">Hmisc</span><span class="p">)</span><span class="w">  </span><span class="c1"># Posee funciones que permite realizar imputaciones.</span><span class="w">
</span><span class="n">library</span><span class="p">(</span><span class="n">VIM</span><span class="p">)</span><span class="w">  </span><span class="c1"># Posee funciones que permite realizar imputaciones.</span><span class="w">

</span><span class="c1">### Se hace lectura de los datos</span><span class="w">
</span><span class="n">temp</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">tempfile</span><span class="p">(</span><span class="n">fileext</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">".xlsx"</span><span class="p">)</span><span class="w">  </span><span class="c1"># Crea archivo temporal</span><span class="w">
</span><span class="n">URL</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="s2">"https://github.com/jouninLRMD/jouninlrmd.github.io/raw/master/Dataset/EjercicioLimpieza.xlsx"</span><span class="w">  </span><span class="c1"># URL base de datos</span><span class="w">
</span><span class="n">download.file</span><span class="p">(</span><span class="n">URL</span><span class="p">,</span><span class="w"> </span><span class="n">destfile</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">temp</span><span class="p">,</span><span class="w"> </span><span class="n">mode</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"wb"</span><span class="p">)</span><span class="w">  </span><span class="c1"># Descarga archivo en el archivo temporal creado</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">read_xlsx</span><span class="p">(</span><span class="n">temp</span><span class="p">)</span><span class="w">  </span><span class="c1"># Carga base de datos desde archivo temporal</span><span class="w">

</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">rename</span><span class="p">(</span><span class="n">numero_hijos</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"...7"</span><span class="p">)</span><span class="w">  </span><span class="c1"># renombra columna en la base de datos</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">clean_names</span><span class="p">()</span><span class="w">  </span><span class="c1"># limpia los nombres nombre de la base de datos</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">rename</span><span class="p">(</span><span class="n">comuna</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"c_omuna"</span><span class="p">)</span><span class="w">  </span><span class="c1"># renombra columna c_omuna en la base de datos</span><span class="w">

</span><span class="c1">### Transformar variables a tipo factor</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">mutate_at</span><span class="p">(</span><span class="n">vars</span><span class="p">(</span><span class="n">id</span><span class="p">,</span><span class="w"> </span><span class="n">tipo_documento</span><span class="p">,</span><span class="w"> </span><span class="n">number_cedula</span><span class="p">,</span><span class="w"> </span><span class="n">estrato</span><span class="p">,</span><span class="w"> </span><span class="n">c_omuna</span><span class="p">),</span><span class="w"> 
    </span><span class="n">as.factor</span><span class="p">)</span><span class="w">

</span><span class="c1">### Revisar variables numéricas para detectar valores especiales</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">select</span><span class="p">(</span><span class="n">numero_hijos</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">table</span><span class="p">()</span><span class="w">  </span><span class="c1"># Se detectan valores 'dos y uno'</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">select</span><span class="p">(</span><span class="n">asist_prom</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">table</span><span class="p">()</span><span class="w">  </span><span class="c1"># Se detectan valores 'Ninguna'</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">select</span><span class="p">(</span><span class="n">tiemp_prom</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">table</span><span class="p">()</span><span class="w">  </span><span class="c1"># No se detecta ningun valor no numerico</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">select</span><span class="p">(</span><span class="n">prom_caridad</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">table</span><span class="p">()</span><span class="w">  </span><span class="c1"># No se detecta ningun valor no numerico</span><span class="w">

</span><span class="c1">### Se corrigen valores especiales en numero_hijos y asist_prom, antes de</span><span class="w">
</span><span class="c1">### transformar</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">mutate_at</span><span class="p">(</span><span class="n">vars</span><span class="p">(</span><span class="n">numero_hijos</span><span class="p">),</span><span class="w"> </span><span class="o">~</span><span class="n">replace</span><span class="p">(</span><span class="n">.</span><span class="p">,</span><span class="w"> </span><span class="n">.</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="s2">"dos"</span><span class="p">,</span><span class="w"> </span><span class="s2">"2"</span><span class="p">))</span><span class="w">  </span><span class="c1"># Se reemplaza el 2 en variable numero_hijos</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">mutate_at</span><span class="p">(</span><span class="n">vars</span><span class="p">(</span><span class="n">numero_hijos</span><span class="p">),</span><span class="w"> </span><span class="o">~</span><span class="n">replace</span><span class="p">(</span><span class="n">.</span><span class="p">,</span><span class="w"> </span><span class="n">.</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="s2">"uno"</span><span class="p">,</span><span class="w"> </span><span class="s2">"1"</span><span class="p">))</span><span class="w">  </span><span class="c1"># Se reemplaza el 1 en variable numero_hijos</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">mutate_at</span><span class="p">(</span><span class="n">vars</span><span class="p">(</span><span class="n">asist_prom</span><span class="p">),</span><span class="w"> </span><span class="o">~</span><span class="n">replace</span><span class="p">(</span><span class="n">.</span><span class="p">,</span><span class="w"> </span><span class="n">.</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="s2">"ninguna"</span><span class="p">,</span><span class="w"> </span><span class="s2">"0"</span><span class="p">))</span><span class="w">  </span><span class="c1"># Se reemplaza el 1 en variable asist_prom</span><span class="w">

</span><span class="c1">### Transformar variables a tipo numérico (double)</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">mutate_at</span><span class="p">(</span><span class="n">vars</span><span class="p">(</span><span class="n">numero_hijos</span><span class="p">,</span><span class="w"> </span><span class="n">asist_prom</span><span class="p">,</span><span class="w"> </span><span class="n">tiemp_prom</span><span class="p">,</span><span class="w"> </span><span class="n">prom_caridad</span><span class="p">),</span><span class="w"> 
    </span><span class="n">as.numeric</span><span class="p">)</span><span class="w">

</span><span class="c1">### Transformar variables a tipo fecha (date) (se encuentra mes-día-año)</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">mutate_at</span><span class="p">(</span><span class="n">vars</span><span class="p">(</span><span class="n">fecha_encuesta</span><span class="p">),</span><span class="w"> </span><span class="n">mdy</span><span class="p">)</span><span class="w">


</span><span class="c1">## Creamos conjunto de condiciones que deben cumplirse condiciones para</span><span class="w">
</span><span class="c1">## variables categóricas</span><span class="w">
</span><span class="n">CondC</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">editset</span><span class="p">(</span><span class="nf">c</span><span class="p">(</span><span class="s2">"tipo_documento %in% c('Cédula de ciudadanía', 'Tarjeta de identidad', 'Tarjeta de extranjería', 'Registro civil')"</span><span class="p">,</span><span class="w"> 
    </span><span class="s2">"estrato %in% 1:6"</span><span class="p">,</span><span class="w"> </span><span class="s2">"comuna %in% c('Popular', 'Santa Cruz', 'Manrique', 'Aranjuez', 'Castilla', 'Doce de octubre', 'Robledo', 'Villa Hermosa', 'Buenos Aires', 'La Candelaria',
                   'Laureles', 'La América', 'San Javier', 'Poblado', 'Guayabal', 'Belén')"</span><span class="p">))</span><span class="w">
</span><span class="n">CondC</span><span class="w">

</span><span class="c1"># Condiciones para variables númericas</span><span class="w">
</span><span class="n">CondN</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">editset</span><span class="p">(</span><span class="nf">c</span><span class="p">(</span><span class="s2">"numero_hijos &gt;= 0"</span><span class="p">,</span><span class="w"> </span><span class="s2">"asist_prom &gt;= 0"</span><span class="p">,</span><span class="w"> </span><span class="s2">"tiemp_prom &gt;= 0"</span><span class="p">,</span><span class="w"> 
    </span><span class="s2">"prom_caridad &gt;= 0"</span><span class="p">))</span><span class="w">
</span><span class="n">CondN</span><span class="w">

</span><span class="c1"># Presentamos donde ocurren dichas violaciones</span><span class="w">
</span><span class="n">Errores</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">violatedEdits</span><span class="p">(</span><span class="nf">c</span><span class="p">(</span><span class="n">CondC</span><span class="p">,</span><span class="w"> </span><span class="n">CondN</span><span class="p">),</span><span class="w"> </span><span class="n">datos</span><span class="p">)</span><span class="w">
</span><span class="n">Errores</span><span class="w">

</span><span class="c1"># Localiza y muestra por variable las violaciones</span><span class="w">
</span><span class="n">loc</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">localizeErrors</span><span class="p">(</span><span class="nf">c</span><span class="p">(</span><span class="n">CondC</span><span class="p">,</span><span class="w"> </span><span class="n">CondN</span><span class="p">),</span><span class="w"> </span><span class="n">datos</span><span class="p">)</span><span class="o">$</span><span class="n">adapt</span><span class="w">
</span><span class="n">apply</span><span class="p">(</span><span class="n">X</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">loc</span><span class="p">,</span><span class="w"> </span><span class="n">MARGIN</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="m">2</span><span class="p">,</span><span class="w"> </span><span class="n">FUN</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="k">function</span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">which</span><span class="p">(</span><span class="n">x</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="kc">TRUE</span><span class="p">))</span><span class="w">


</span><span class="c1">## Detectar NA, NaN, NULL..... dentro de la base de datos estas categorías</span><span class="w">
</span><span class="c1">## como niveles del factor</span><span class="w">
</span><span class="n">faltantes</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">apply</span><span class="p">(</span><span class="n">X</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">datos</span><span class="p">,</span><span class="w"> </span><span class="n">MARGIN</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="m">2</span><span class="p">,</span><span class="w"> </span><span class="n">FUN</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="k">function</span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="n">which</span><span class="p">(</span><span class="nf">is.na</span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">|</span><span class="w"> 
    </span><span class="nf">is.null</span><span class="p">(</span><span class="n">x</span><span class="p">)</span><span class="w"> </span><span class="o">|</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="s2">"Na"</span><span class="w"> </span><span class="o">|</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="s2">"NA"</span><span class="w"> </span><span class="o">|</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="s2">"NaN"</span><span class="w"> </span><span class="o">|</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="s2">"999"</span><span class="w"> </span><span class="o">|</span><span class="w"> </span><span class="n">x</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="s2">"nA"</span><span class="p">))</span><span class="w">  </span><span class="c1"># se pueden agregar más caracteres</span><span class="w">
</span><span class="n">faltantes</span><span class="w">

</span><span class="c1"># Función para extraer valores atípicos de variables numéricas</span><span class="w">
</span><span class="n">Outliers</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="k">function</span><span class="p">(</span><span class="n">data</span><span class="p">,</span><span class="w"> </span><span class="n">row</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="kc">TRUE</span><span class="p">)</span><span class="w"> </span><span class="p">{</span><span class="w">
    </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="o">!</span><span class="n">require</span><span class="p">(</span><span class="n">magrittr</span><span class="p">))</span><span class="w"> 
        </span><span class="n">install.packages</span><span class="p">(</span><span class="s2">"magrittr"</span><span class="p">)</span><span class="w">
    </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="o">!</span><span class="n">require</span><span class="p">(</span><span class="n">dplyr</span><span class="p">))</span><span class="w"> 
        </span><span class="n">install.packages</span><span class="p">(</span><span class="s2">"dplyr"</span><span class="p">)</span><span class="w">
    </span><span class="n">require</span><span class="p">(</span><span class="n">magrittr</span><span class="p">)</span><span class="w">
    </span><span class="n">require</span><span class="p">(</span><span class="n">dplyr</span><span class="p">)</span><span class="w">
    </span><span class="n">vars</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">data</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">select_if</span><span class="p">(</span><span class="n">is.numeric</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="nf">names</span><span class="p">()</span><span class="w">
    </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">row</span><span class="w"> </span><span class="o">!=</span><span class="w"> </span><span class="kc">TRUE</span><span class="w"> </span><span class="o">&amp;</span><span class="w"> </span><span class="n">row</span><span class="w"> </span><span class="o">!=</span><span class="w"> </span><span class="kc">FALSE</span><span class="p">)</span><span class="w"> 
        </span><span class="n">stop</span><span class="p">(</span><span class="s2">"row argument must be equal to TRUE or FALSE"</span><span class="p">)</span><span class="w">
    </span><span class="n">aux</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="k">function</span><span class="p">(</span><span class="n">data</span><span class="p">,</span><span class="w"> </span><span class="n">vars</span><span class="p">)</span><span class="w"> </span><span class="p">{</span><span class="w">
        </span><span class="n">Outlier</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">data</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">select</span><span class="p">(</span><span class="n">vars</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">boxplot</span><span class="p">(</span><span class="n">plot</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="kc">FALSE</span><span class="p">)</span><span class="w"> </span><span class="o">%$%</span><span class="w"> </span><span class="n">out</span><span class="w">
        </span><span class="k">if</span><span class="w"> </span><span class="p">(</span><span class="n">row</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="kc">TRUE</span><span class="p">)</span><span class="w"> </span><span class="p">{</span><span class="w">
            </span><span class="n">Outlier</span><span class="w"> </span><span class="o">&lt;-</span><span class="w"> </span><span class="n">suppressWarnings</span><span class="p">(</span><span class="n">which</span><span class="p">(</span><span class="n">eval</span><span class="p">(</span><span class="n">parse</span><span class="p">(</span><span class="n">text</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">paste0</span><span class="p">(</span><span class="s2">"data$"</span><span class="p">,</span><span class="w"> 
                </span><span class="n">vars</span><span class="p">)))</span><span class="w"> </span><span class="o">==</span><span class="w"> </span><span class="n">Outlier</span><span class="p">))</span><span class="w">
        </span><span class="p">}</span><span class="w">
        </span><span class="nf">return</span><span class="p">(</span><span class="n">vars</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">Outlier</span><span class="p">)</span><span class="w">
    </span><span class="p">}</span><span class="w">
    </span><span class="n">sapply</span><span class="p">(</span><span class="n">vars</span><span class="p">,</span><span class="w"> </span><span class="n">aux</span><span class="p">,</span><span class="w"> </span><span class="n">data</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">data</span><span class="p">)</span><span class="w">
</span><span class="p">}</span><span class="w">

</span><span class="c1">## Empleo de la función Outliers Muestra fila en la que se encuentra el</span><span class="w">
</span><span class="c1">## Outlier</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">Outliers</span><span class="p">(</span><span class="n">row</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="kc">FALSE</span><span class="p">)</span><span class="w">

</span><span class="c1"># Reemplaza valores 'NA', 'NaN' y 'Na' dentro de variables tipo factor</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">convert_to_NA</span><span class="p">(</span><span class="s2">"NA"</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">convert_to_NA</span><span class="p">(</span><span class="s2">"NaN"</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">convert_to_NA</span><span class="p">(</span><span class="s2">"Na"</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> 
    </span><span class="n">convert_to_NA</span><span class="p">(</span><span class="s2">"999"</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">convert_to_NA</span><span class="p">(</span><span class="s2">"NULL"</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">convert_to_NA</span><span class="p">(</span><span class="s2">"nA"</span><span class="p">)</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> 
    </span><span class="n">convert_to_NA</span><span class="p">(</span><span class="s2">"Na"</span><span class="p">)</span><span class="w">  </span><span class="c1"># Se pueden agregar más caracteres</span><span class="w">

</span><span class="c1"># Elimina niveles sin uso dentro de variables tipo factor</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">droplevels</span><span class="p">()</span><span class="w">

</span><span class="c1"># Elimina filas y columnas que poseen solo valores NA</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">remove_empty</span><span class="p">()</span><span class="w">

</span><span class="c1"># Elimina filas que poseen registros duplicados</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">distinct</span><span class="p">()</span><span class="w">
</span><span class="n">datos</span><span class="w">

</span><span class="c1"># Elimina colúmnas que poseen registros duplicados</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">select_if</span><span class="p">(</span><span class="o">!</span><span class="n">duplicated</span><span class="p">(</span><span class="n">as.list</span><span class="p">(</span><span class="n">.</span><span class="p">)))</span><span class="w">

</span><span class="c1">## Corrección deductiva tipo_documento 'Cedula' se reemplaza por 'Cédula de</span><span class="w">
</span><span class="c1">## ciudadanía'</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">mutate</span><span class="p">(</span><span class="n">tipo_documento</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">fct_recode</span><span class="p">(</span><span class="n">tipo_documento</span><span class="p">,</span><span class="w"> </span><span class="n">`Cédula de ciudadanía`</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"Cedula"</span><span class="p">))</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> 
    </span><span class="n">droplevels</span><span class="p">()</span><span class="w">

</span><span class="c1"># estrato '0' no existe, así que se reemplaza por NA</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">mutate</span><span class="p">(</span><span class="n">estrato</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">na_if</span><span class="p">(</span><span class="n">estrato</span><span class="p">,</span><span class="w"> </span><span class="s2">"0"</span><span class="p">))</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">droplevels</span><span class="p">()</span><span class="w">

</span><span class="c1"># estrato 'uno' se reemplaza por 1 y 'dos se reemplaza por 2</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">mutate</span><span class="p">(</span><span class="n">estrato</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">fct_recode</span><span class="p">(</span><span class="n">estrato</span><span class="p">,</span><span class="w"> </span><span class="n">`1`</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"uno"</span><span class="p">,</span><span class="w"> </span><span class="n">`2`</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"dos"</span><span class="p">))</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> 
    </span><span class="n">droplevels</span><span class="p">()</span><span class="w">

</span><span class="c1"># comuna 'No sabe' se reemplaza por 'NA' para imputarlo</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">mutate</span><span class="p">(</span><span class="n">comuna</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">fct_recode</span><span class="p">(</span><span class="n">comuna</span><span class="p">,</span><span class="w"> </span><span class="n">`NULL`</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"No sabe"</span><span class="p">))</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">droplevels</span><span class="p">()</span><span class="w">

</span><span class="c1"># comuna 'San Pedro', 'Guatapé' y se reemplaza por 'Fuera de Medellín'</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">mutate</span><span class="p">(</span><span class="n">comuna</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">fct_recode</span><span class="p">(</span><span class="n">comuna</span><span class="p">,</span><span class="w"> </span><span class="n">`Fuera de Medellín`</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"San Pedro"</span><span class="p">,</span><span class="w"> 
    </span><span class="n">`Fuera de Medellín`</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="s2">"Guatapé"</span><span class="p">))</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">droplevels</span><span class="p">()</span><span class="w">

</span><span class="c1"># tiemp_prom se cambian valores negativos a positivos</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&lt;&gt;%</span><span class="w"> </span><span class="n">mutate</span><span class="p">(</span><span class="n">tiemp_prom</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="n">if_else</span><span class="p">(</span><span class="n">tiemp_prom</span><span class="w"> </span><span class="o">&lt;</span><span class="w"> </span><span class="m">0</span><span class="p">,</span><span class="w"> </span><span class="nf">abs</span><span class="p">(</span><span class="n">tiemp_prom</span><span class="p">),</span><span class="w"> </span><span class="n">tiemp_prom</span><span class="p">))</span><span class="w">

</span><span class="c1"># Se realiza imputación kNN de toda la base de datos, dado que no hay</span><span class="w">
</span><span class="c1"># restricciones aparentes</span><span class="w">
</span><span class="n">datos</span><span class="w"> </span><span class="o">%&gt;%</span><span class="w"> </span><span class="n">kNN</span><span class="p">(</span><span class="n">imp_var</span><span class="w"> </span><span class="o">=</span><span class="w"> </span><span class="kc">FALSE</span><span class="p">)</span><span class="w">
</span></code></pre>
</section>
</section>
</main>

Referencias
-----------

De Jonge, E., & Van Der Loo, M. (2013). *An introduction to data
cleaning with r*. Statistics Netherlands Heerlen.

De Waal, T., Pannekoek, J., & Scholtus, S. (2011). *Handbook of
statistical data editing and imputation* (Vol. 563). John Wiley & Sons.

Gower, J. (1971). A general coefficient of similarity and some of its
properties. *Biometrics*, 857–871.

Tukey, J., McGill, R., & Larsen, W. (1978). Variations of box plots.
*The American Statistician*, *32*(1), 12–16.
