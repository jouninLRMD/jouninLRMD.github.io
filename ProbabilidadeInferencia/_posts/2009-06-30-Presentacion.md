---
layout: post
title: "Presentación Curso"
main-class: 'presentacion'
permalink: /ProbabilidadeInferencia/PeIE:title.html
tags:

introduction: |
  Presentación del curso de Probabilidad e inferencia estadística. <br/>
  Generalidades a tener en cuenta.
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
  output_dir = "../../ProbabilidadeInferencia/_posts/", output_format = "all"  ) })
bibliography: "../../referencias.bib"
csl: "../../apa.csl"
---







Descripción general del curso
-----------------------------

Los ingenieros industriales se enfrentan a múltiples problemas en los
que deben tomar decisiones que pueden llegar a ser trascendentales en
algunos procesos. Puesto que la aleatoriedad es una de las
características principales de la información, el análisis estadístico
de datos se convierte en el argumento más importante a la hora de
verificar una hipótesis de interés. El curso de Probabilidad e
Inferencia Estadística se desarrolla en torno a tres ejes de interés.
Como herramienta, la inferencia estadística, le ayudará al ingeniero en
la toma de decisiones al permitirle validar ciertas hipótesis basadas en
la evidencia (datos muestrales). Previo a esta validación, siempre será
de utilidad emplear el análisis exploratorio de los datos como base
fundamental para el planteamiento de dichas hipótesis. Los conceptos de
probabilidad y las funciones de distribución serán la base para
fundamentar la teoría del trabajo inferencial. Se espera que el
estudiante adquiera las competencias necesarias para enfrentar cursos
del área de producción, logística y calidad, como: Logística, Gestión de
Procesos II, Administración de la Producción y del Servicio, Diseño de
Sistemas Productivos y Confiabilidad; y del área
administrativa-financiera, como: Ingeniería del Trabajo, Gestión
Financiera, Ingeniería Económica, Administración I, Administración II,
Evaluación de Proyectos, Emprendimiento y Formulación de Proyectos de
Investigación.

Unidad de competencia
---------------------

Modelar sistemas y procesos haciendo uso de herramientas matemáticas,
estadísticas y computacionales para la toma de decisiones.

Elementos de competencia
------------------------

-   Obtener información de un proceso a partir de datos representativos
    tomados de él, haciendo uso de herramientas de la estadística
    descriptiva.
-   Aplicar pruebas de hipótesis para la toma de decisiones en un
    proceso de acuerdo con la teoría de la probabilidad y la inferencia
    estadística.

Metodología
-----------

El curso se desarrolla con sesiones teóricas en el aula de clase y
sesiones prácticas en sala de cómputo. Se busca que algunas clases se
desarrollen a través de lúdicas, permitiendo llegar al conocimiento a
través del método inductivo. Se pretende que los ejemplos desarrollados
en clase y en las sesiones prácticas, estén relacionados con problemas
de la ingeniería industrial en el contexto actual, al analizar una base
de datos multivariada y usando como herramienta software estadístico
actualizado.

Temática detallada
------------------

### Fundamentos de probabilidad

-   Experimento aleatorio
-   Espacios muestrales
-   Eventos
-   Teoría de conjuntos
-   Probabilidad de un evento
-   Reglas aditivas
-   Probabilidad condicional, independencia y regla del producto
-   Regla de Bayes

### Estadística descriptiva

-   Datos, Población, Muestra, variable.
-   Ramas de la estadística.
-   Tipos de datos
-   Escalas de medición
-   Presentación tabular de la información
-   Medidas de tendencia central  
-   Medidas de forma
-   Medidas de localización
-   Medidas de dispersión
-   Medidas de asociación
-   Técnicas gráficas para explorar datos

### Variables aleatorias y distribuciones de probabilidad

-   Variables aleatorias discretas
    -   Distribuciones de probabilidad
    -   Parámetros de una distribución de probabilidad
    -   Función de distribución acumulada
    -   Valor esperado y varianza
    -   Ensayos Bernoulli
    -   Distribución Binomial
    -   Distribución Poisson
-   Variables aleatorias continuas
    -   Funciones de densidad de probabilidad
    -   Función de distribución acumulada
    -   Valor esperado y varianza
    -   Distribución exponencial
    -   Distribución Weibull
    -   Distribución normal
    -   Distribución normal estándar

### Distribuciones muestrales es intervalos de confianza

-   Definición de estadístico (media, varianza, proporción)
-   Definición de muestra aleatoria (i.i.d)
-   Derivación de una distribución de muestreo
-   Teorema del limite central
-   Distribución de la media muestral con población Normal
-   Distribución de una combinación lineal (variables aleatorias
    normales)
-   Distribución de la proporción (normal)
-   Distribución muestral de la media (distribución t-Student)
-   Distribución muestral de la varianza (distribución Chi-cuadrado)
-   Distribución muestral de diferencia de medias (t-Student)
-   Distribución muestral de razón de varianza (F)
-   Definición de Inferencia estadística: estimación de parámetros y
    pruebas de hipótesis.
-   Desarrollo de un intervalo de confianza para la media con población
    normal.
-   Intervalo de confianza para la proporción.
-   Interpretación de un intervalo de confianza
-   Relación entre nivel de confianza, precisión y tamaño de muestra
-   Intervalo de confianza para la diferencia de medias con varianza
    conocida
-   Intervalo de confianza para la razón de varianzas

### Prueba de hipótesis

-   Generalidades de pruebas de hipótesis PH
    -   Hipótesis estadística
    -   Hipótesis nula
    -   Hipótesis alternativa
    -   Tipos de pruebas
    -   Error tipo I
    -   Error tipo II
    -   Potencia de la prueba
-   Inferencia sobre la media de una población con varianza conocida
-   Inferencia sobre la media de una población con varianza desconocida
-   Inferencia sobre la diferencia de medias independientes
-   Inferencia sobre la proporción de una población
-   Calculo de tamaño de muestra
-   Inferencia sobre la diferencia de proporciones
-   Pruebas de bondad de ajuste
    -   Chi cuadrado
    -   Kolmogorov Smirnov
    -   Anderson darling
    -   Shapiro-Wilk
    -   Jarque Bera
    -   Kolmogorov-Smirnov
    -   Shapiro-Francia
    -   Anderson Darling
    -   Carmer Von Mises
    -   Lilliefors
    -   Chi cuadrado de Pearson

Evaluación del curso
--------------------

Los instrumentos de evaluación de cada módulo se llevan a cabo, mediante
exámenes escritos individuales y proyectos elaborados en equipo, los
cuales evalúan los conocimientos, habilidades, valores y actitudes
propias del módulo.

<pre style="font-family: 'Open Sans',sans-serif; margin-bottom: -3rem; margin-top: -3rem;">
<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto;">
 <thead>
  <tr>
   <th style="text-align:left;"> Evaluación </th>
   <th style="text-align:left;"> Porcentaje </th>
   <th style="text-align:left;"> Temas </th>
   <th style="text-align:left;"> Semana para Evaluación </th>
   <th style="text-align:left;"> Modalidad </th>
  </tr>
 </thead>
<tbody>
  <tr>
   <td style="text-align:left;"> Examen No.1 </td>
   <td style="text-align:left;"> 20% </td>
   <td style="text-align:left;width: 5cm; "> Fundamentos de Probabilidad </td>
   <td style="text-align:left;"> Cuarta semana </td>
   <td style="text-align:left;width: 3cm; "> Individual </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Examen No.2 </td>
   <td style="text-align:left;"> 20% </td>
   <td style="text-align:left;width: 5cm; "> Variables aleatorias y distribuciones de probabilidad </td>
   <td style="text-align:left;"> Novena semana </td>
   <td style="text-align:left;width: 3cm; "> Individual </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Examen No.3 </td>
   <td style="text-align:left;"> 20% </td>
   <td style="text-align:left;width: 5cm; "> Distribuciones muestrales e intervalos de confianza </td>
   <td style="text-align:left;"> Decimotercera semana </td>
   <td style="text-align:left;width: 3cm; "> Individual </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Examen No.4 </td>
   <td style="text-align:left;"> 20% </td>
   <td style="text-align:left;width: 5cm; "> Pruebas de Hipótesis </td>
   <td style="text-align:left;"> Decimosexta semana </td>
   <td style="text-align:left;width: 3cm; "> Individual </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Trabajo </td>
   <td style="text-align:left;"> 10% </td>
   <td style="text-align:left;width: 5cm; "> Estadística descriptiva </td>
   <td style="text-align:left;"> Sexta semana </td>
   <td style="text-align:left;width: 3cm; "> Parejas </td>
  </tr>
  <tr>
   <td style="text-align:left;"> Quices </td>
   <td style="text-align:left;"> 10% </td>
   <td style="text-align:left;width: 5cm; "> Temas relacionados a cada parcial </td>
   <td style="text-align:left;"> Tercera, Séptima, Décima,
Decimoquinta Semana </td>
   <td style="text-align:left;width: 3cm; "> Individual </td>
  </tr>
</tbody>
</table>
</pre>

Malla curricular Programas
--------------------------

[Ingeniería
Industrial](https://sites.google.com/site/mallasingindustrial/_/rsrc/1467895226507/version-8-estudiantes-2011-1-a-201-1/Malla%20versi%C3%B3n%207%20Ing%20Industrial.png){:target="\_blank"}
Versión 7.

[Ingeniería
Industrial](https://sites.google.com/site/mallasingindustrial/_/rsrc/1467895226323/version-8-estudiantes-2011-1-a-201/Malla%20versi%C3%B3n%208%20Ing%20Industrial.png){:target="\_blank"}
Versión 8.

[Ingeniería
Industrial](https://sites.google.com/site/mallasingindustrial/_/rsrc/1467895228876/home/Malla%20versi%C3%B3n%209%20Ing%20Industrial.png){:target="\_blank"}
Versión 9.

Bibliografía del curso
----------------------

Canavos, G., Meyer, P., Spiegel, M., y Mendenhall, S. (1988).
Probabilidad y estadística. McGraw-Hill, Primera edición.
[(Link)](https://gsosa61.files.wordpress.com/2008/03/10-canavos-g-probabilidad-y-estadistica-aplicaciones-y-metodos.pdf){:target="\_blank"}

Devore, J. (2015). Probability and Statistics for Engineering and the
Sciences. Cengage Learning. Ninth edition.
[(Descargar)](http://booksdl.org/get.php?md5=98c7c798530f9d7287e36760b999fae3){:target="\_blank"}

Wackerly, D., Muñoz, R., y Humbertotr, J. (2010). Estadística matemática
con aplicaciones. Cengage Learning, Séptima edición.
[(Link)](https://www.cimat.mx/ciencia_para_jovenes/bachillerato/libros/%5BWackerly,Mendenhall,Scheaffer%5DEstadistica_Matematica_con_Aplicaciones.pdf){:target="\_blank"}

Walpole, R. , Myers, R. , Myers, S. , y Ye, K. (2012). Probabilidad y
estadística para ingeniería y ciencias. Pearson, Novena edición.
[(Link)](https://vereniciafunez94hotmail.files.wordpress.com/2014/08/8va-probabilidad-y-estadistica-para-ingenier-walpole_8.pdf){:target="\_blank"}
