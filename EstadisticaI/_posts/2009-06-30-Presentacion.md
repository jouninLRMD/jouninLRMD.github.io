---
layout: post
title: "Presentación Curso"
main-class: 'presentacion'
permalink: /EstadisticaI/EstI:title.html
tags:

introduction: Presentación del curso de Estadística I y generalidades a tener en cuenta.
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
  output_dir = "../../EstadisticaI/_posts/", output_format = "all"  ) })
bibliography: "../../referencias.bib"
csl: "../../apa.csl"
---







Descripción general del curso
-----------------------------

La mayoría de los datos disponibles en la amplia gama de áreas del
conocimiento, entre las cuales se encuentran las ciencias económicas,
corresponden a datos observados que provienen de un fenómeno o ley
aleatoria, la cual es de gran importancia conocer con el objetivo de
obtener conclusiones, realizar contrastes de hipótesis, hacer
predicciones, tomar decisiones óptimas, entre muchas otras. No obstante,
para poder afrontar dichos fines es necesario conocer y familiarizarse
primero con los conceptos provistos por la teoría de la probabilidad y
la estadística matemática.

En este sentido, este curso está diseñado para proveer al estudiante con
un sólido y bien balanceado entendimiento de estos conceptos, tales como
las nociones de probabilidad clásica, condicionamiento, independencia,
variables aleatorias, funciones de distribución, esperanza matemática,
entre otras. Aunque, el curso se concentra principalmente en los
conceptos más que en los detalles matemáticos, los resultados teóricos
son presentados en la manera más precisa y rigurosa posible. El curso
contiene numerosos ejemplos de aplicaciones, tanto teóricas como con
datos reales.

Objetivo general
----------------

Que el estudiante adquiera los elementos básicos de la teoría de la
probabilidad y sus aplicaciones. Que desarrolle las técnicas de la
estadística descriptiva por el medio de manejo de calculadora y el
paquete estadístico <tt>R</tt> en el computador. Lo anterior servirá
como base para desarrollar posteriormente en la estadística II, la
estadística inferencial (estimación, prueba de hipótesis, predicción) y
de algunas técnicas usadas en el muestreo estadístico.

Objetivo específico
-------------------

-   Trabajar la estadística descriptiva por medio de las distribuciones
    de frecuencias y de gráficos. Utilizar el computador y la
    calculadora como herramientas adicionales y a la vez saber
    interpretar los resultados que estos instrumentos arrojan.
-   Conocer las técnicas de conteo (análisis combinatorio) que facilitan
    el cálculo de las probabilidades.
-   Conocer las distribuciones de probabilidades tanto discretas como
    continuas, proporcionando áreas de aplicaciones a cada una de ellas.

Unidades detalladas
-------------------

### Unidad No.1: Estadística Descriptiva

-   Introducción
-   Tipo de datos
-   Medidas de tendencia central
-   Medidas de localización
-   Medidas de variabilidad
-   Medidas de asimetría
-   Métodos gráficos y tabular en estadística descriptiva

### Unidad No.2: Probabilidad

-   Espacios muestrales y eventos
-   Técnicas de conteo
-   Probabilidad de un evento
-   Reglas aditivas
-   Probabilidad condicional, independencia y regla del producto
-   Regla de Bayes

### Unidad No.3: Variables aleatorias y distribuciones de probabilidad

-   Concepto de variable aleatoria
-   Distribuciones de probabilidad de variables aleatorias discretas
-   Distribuciones de probabilidad de variables aleatorias continuas
-   Distribuciones de probabilidad conjunta

### Unidad No.4: Esperanza matemáticas

-   Media de una variable aleatoria
-   Varianza y covarianza de variables aleatorias
-   Medias y varianza de combinaciones lineales de variables aleatorias
-   Teorema de Chebyshev

### Unidad No.5: Algunas distribuciones discretas de probabilidad

-   Distribución uniforme discreta
-   Distribución de Bernoulli y binomial
-   Distribución hipergeométrica
-   Distribución binomial negativa
-   Distribución geométrica
-   Distribución de Poisson

### Unidad No.6: Algunas distribuciones continuas de probabilidad

-   Distribución uniforme continua
-   Distribución normal
-   Aproximación normal de la binomial
-   Aproximación normal de la Poisson
-   Distribución gamma
-   Distribución exponencial
-   Relación entre la distribución exponencial y Poisson

### Unidad No.7: Funciones de variables aleatorias

-   Momentos
-   Funciones generadoras de momentos

Evaluación del curso
--------------------

<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto;">
<thead>
<tr>
<th style="text-align:left;">
Actividad
</th>
<th style="text-align:left;">
Porcentaje
</th>
<th style="text-align:left;">
Unidades
</th>
<th style="text-align:left;">
Semana para Evaluación
</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left;">
Parcial No.1
</td>
<td style="text-align:left;">
20%
</td>
<td style="text-align:left;">
1 y 2
</td>
<td style="text-align:left;">
Quinta semana
</td>
</tr>
<tr>
<td style="text-align:left;">
Parcial No.2
</td>
<td style="text-align:left;">
20%
</td>
<td style="text-align:left;">
3
</td>
<td style="text-align:left;">
Novena semana
</td>
</tr>
<tr>
<td style="text-align:left;">
Parcial No.3
</td>
<td style="text-align:left;">
30%
</td>
<td style="text-align:left;">
4 y 5
</td>
<td style="text-align:left;">
Duodécima semana
</td>
</tr>
<tr>
<td style="text-align:left;">
Parcial No.4
</td>
<td style="text-align:left;">
30%
</td>
<td style="text-align:left;">
6 y 7
</td>
<td style="text-align:left;">
Décimo cuarta semana
</td>
</tr>
</tbody>
</table>

Malla curricular Programas
--------------------------

[Administración de
Empresas](http://www.udea.edu.co/wps/wcm/connect/udea/af91e1c8-2160-4da1-b77c-75a857af84f7/MallaProgramaAdmon.pdf?MOD=AJPERES&CVID=ljvFNrm){:target="\_blank"}
Versión 7.

[Administración de
Empresas](http://www.udea.edu.co/wps/wcm/connect/udea/7289d5f7-e816-429d-88dc-5900896e222e/Malla+Administración+UdeA_Plan+de+estudios+V8.pdf?MOD=AJPERES&CVID=mHm8gYY){:target="\_blank"}
Versión 8.

[Economía](http://www.udea.edu.co/wps/wcm/connect/udea/8c28c40c-ebe3-4211-be14-8d49c8b7efd4/Malla+Version+7.0+agosto2015.pdf?MOD=AJPERES&CVID=kZxI1y6){:target="\_blank"}
Versión 7.

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
