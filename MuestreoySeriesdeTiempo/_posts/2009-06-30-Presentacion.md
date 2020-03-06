---
layout: post
title: "Presentación Curso"
main-class: 'presentacion'
permalink: /MuestreoySeriesdeTiempo/MyST:title.html
tags:

introduction: |
  Presentación del curso de Series de tiempo y muestreo. <br/>
  Exposición de la metodología. <br/>
  Explicación de la evaluación del curso. <br/>
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
  output_dir = "../../MuestreoySeriesdeTiempo/_posts/", output_format = "all"  ) })
bibliography: "../../referencias.bib"
csl: "../../apa.csl"
---







Descripción general del curso
-----------------------------

Este curso abarca dos temáticas. Por un lado se presenta el tema de
pronósticos que se estudia a través de modelos paramétricos y no
parámetricos de series de tiempo. Por otro lado, se expone el tema de
muestreo, el cual se enfoca en la elaboración de encuestas y
construcción de planes de muestreo, debido a que en ocasiones la
estimación de la demanda debe realizarse a través de estudios de
muestreo.

Adicionalmente, el curso de series de tiempo y muestreo, pretende que el
estudiante desarrolle habilidades para realizar pronósticos y estudios
por muestreo en diversas áreas de una empresa, de tal forma que ayude en
la toma de decisiones de una forma más acertada.

Unidad de competencia
---------------------

Que el estudiante adquiera la habilidad de modelar sistemas y procesos
haciendo uso de herramientas matemáticas, estadísticas y computacionales
para la toma de decisiones.

Elementos de competencia
------------------------

-   Construir modelos de pronósticos de acuerdo con metodologías
    avanzadas de series de tiempo.
-   Definir metodologías para la selección de elementos representativos
    de la población considerando criterios de exactitud y precisión.

Metodología
-----------

El curso se desarrolla en sala de computadores, utiliza como medios
didácticos herramientas computacionales estadísticas (específicamente se
usa excel, el software estadístico <tt>R</tt> y un motor de encuestas) y
material audiovisual. Además, se usa simulación de situaciones de la
vida real, elaboración de proyectos y aprendizaje basado en problemas
como estrategias de enseñanza-aprendizaje.

Temática detallada
------------------

### Introducción

-   Tipos de métodos de pronóstico
-   Factores a tener en cuenta en la selección de métodos de pronósticos
-   Componentes de una serie de tiempo
-   Funciones de pérdida
-   Modelo de regresión lineal simple
-   Función de Autocorrelación - ACF con bandas
-   Proceso de ruido blanco

### Métodos no-paramétricos de series temporales

-   Modelos para series estacionarias:
    -   Medias Móviles Simples
    -   Suavización Exponencial Simple
    -   Suavización Exponencial de Brown
    -   Suavización Exponencial de Holt

### Metodología Box-Jenkins

-   Modelos para series estacionales:
    -   Suavización Exponencial de Holt-Winter Aditivo
    -   Suavización Exponencial de Holt-Winter Multiplicativo
-   Conceptos de proceso estocástico
-   Procesos estocásticos estacionarios
-   Función de autocorrelación (ACF)
-   Función de autocorrelación parcial (PACF)
-   Proceso de ruido blanco gaussiano
-   Representación de un proceso lineal infinito:
    -   Medias móviles (MA)
    -   Representación autorregresiva (AR)
-   Operador de rezagos
-   Condiciones de estacionaridad e invertibilidad
-   Procesos autorregresivos de orden p (AR(p))
-   Procesos de medias móviles de orden q (MA(q))
-   Procesos mixtos autorregresivos y de medias móviles de orden p, q
    (ARMA(p,q))
-   Modelos estocásticos lineales no estacionarios homogéneos
    ARIMA(p,d,q).
    -   El operador diferencia para estacionarizar en media.
    -   Transformaciones de potencia para estacionarizar en varianza
    -   El modelo ARIMA(p,d,q) general
    -   Casos particulares de un ARIMA(p,d,q)
-   Identificación de un proceso ARIMA(p,d,q)
    -   El valor de lambda (transformación de potencia)
    -   El valor de d (operador diferencia)
    -   Orden del modelo (p,q)
-   Estimación del modelo
    -   Métodos de estimación de parámetros
    -   Estimación de los parámetros del modelo
-   Validación de los supuestos del modelo
    -   Detección y tratamiento de outliers y sus implicaciones sobre
        los supuestos de normalidad y varianza constante.
    -   Normalidad de los residuos.
    -   Varianza constante de los residuos.
    -   Independencia de los residuos.
-   Criterios de comparación de modelos
-   Cálculo de pronósticos
-   IC para los pronósticos
-   Modelos estacionales autorregresivos y de medias móviles integrados
    ARIMA(p,d,q)(P,D,Q)s
    -   Identificación del modelo: lambda; d, D; P, Q, p, q
    -   Estimación del modelo
    -   Validación de los supuestos del modelo
    -   Cálculo de los Pronósticos

### Muestreo

-   Diseño de un cuestionario:
    -   Contenido de las preguntas
    -   Estructura del cuestionario
    -   Prueba piloto
    -   Difusión del cuestionario
-   Muestreo probabilístico:
    -   MAS, muestreo sistemático
    -   MAE, muestreo por conglomerados
    -   Muestreo polietápico.
-   Cálculo de tamaño de muestra en encuestas multipropósito
-   El problema de la no respuesta
-   Estimaciones de los errores debidos al muestreo

Evaluación del curso
--------------------

Los instrumentos de evaluación de cada módulo se llevan a cabo, mediante
exámenes escritos individuales y proyectos elaborados en equipo, los
cuales evalúan los conocimientos, habilidades, valores y actitudes
propias del módulo.

<table class="table table-striped" style="width: auto !important; margin-left: auto; margin-right: auto;">
<thead>
<tr>
<th style="text-align:left;">
Evaluación
</th>
<th style="text-align:left;">
Porcentaje
</th>
<th style="text-align:left;">
Temas
</th>
<th style="text-align:left;">
Semana para Evaluación
</th>
<th style="text-align:left;">
Modalidad
</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left;">
Examen No.1
</td>
<td style="text-align:left;">
15%
</td>
<td style="text-align:left;width: 5cm; ">
Identificación de componentes de una serie de tiempo, ACF, funciones de
pérdida y modelo de regresión lineal simple
</td>
<td style="text-align:left;">
Cuarta semana
</td>
<td style="text-align:left;width: 3cm; ">
Individual
</td>
</tr>
<tr>
<td style="text-align:left;">
Examen No.2
</td>
<td style="text-align:left;">
25%
</td>
<td style="text-align:left;width: 5cm; ">
Métodos no-paramétricos de series temporales
</td>
<td style="text-align:left;">
Sexta semana
</td>
<td style="text-align:left;width: 3cm; ">
Parejas
</td>
</tr>
<tr>
<td style="text-align:left;">
Examen No.3
</td>
<td style="text-align:left;">
15%
</td>
<td style="text-align:left;width: 5cm; ">
Identificación de procesos ARIMA(p,d,q)
</td>
<td style="text-align:left;">
Décima semana
</td>
<td style="text-align:left;width: 3cm; ">
Individual
</td>
</tr>
<tr>
<td style="text-align:left;">
Examen No.4
</td>
<td style="text-align:left;">
25%
</td>
<td style="text-align:left;width: 5cm; ">
Modelos Box-Jenkins
</td>
<td style="text-align:left;">
Duodécima semana
</td>
<td style="text-align:left;width: 3cm; ">
Parejas
</td>
</tr>
<tr>
<td style="text-align:left;">
Trabajo
</td>
<td style="text-align:left;">
20%
</td>
<td style="text-align:left;width: 5cm; ">
Trabajo de muestreo
</td>
<td style="text-align:left;">
Décimo sexta semana
</td>
<td style="text-align:left;width: 3cm; ">
Individual, Parejas, Grupal
</td>
</tr>
</tbody>
</table>

Horario Monitor
---------------

Nombre: Daniel

-   Lunes: 12-2, Salón 20-339.
-   Miércoles: 2-4, Salón 20-350.

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

Anguita, J., et al. (2003). La encuesta como técnica de investigación.
Elaboración de cuestionarios y tratamiento estadı́stico de los datos (i).
Atención Primaria, 31(8), 527–538.
[(Link)](https://www.sciencedirect.com/science/article/pii/S0212656703707288){:target="\_blank"}

George, E., Gwilym, M., Gregory, C., and Greta, M. (2015). Time series
analysis: Forecasting and control, Fifth edition, Wiley.
[(Descargar)](http://booksdl.org/get.php?md5=bb617eac4cb4ec545575a49dbd7825dd){:target="\_blank"}

Gutiérrez, H. (2015). Estrategias de muestreo. Diseño de encuestas y
estimación de parámetros, Segunda edición, Universidad Santo Tomas.
Lemoine Editores.
[(Descargar)](http://booksdl.org/get.php?md5=f1583a4d5c882fd2c5bb7049b40cd081){:target="\_blank"}

Medina, F. (1998). Tamaño óptimo de muestra en encuestas de propósitos
múltiples. Santiago de Chile: CEPAL.
[(Link)](http://www.intranus.net/archivos/Tamanooptimomuestraencueestas.pdf){:target="\_blank"}

Montgomery, D., Jennings, C., and Kulahci, M. (2015). Introduction to
time series analysis and forecasting. John Wiley & Sons.
[(Descargar)](http://booksdl.org/get.php?md5=43cada32a445b5c0321ba21f2a95d3d3){:target="\_blank"}

Spyros, G., Makridakis, S. C., and Rob, J. (1997). Forecasting: Methods
and applications, Third edition. Wiley.
[(Descargar)](http://booksdl.org/get.php?md5=c5ff1e3372ad7f7b8bfb65ed4dfb0674){:target="\_blank"}

Wei, W. (2006). Time series analysis: Univariate and multivariate
methods. Pearson Addison Wesley.
[(Descargar)](http://booksdl.org/get.php?md5=A1A8148B4F28DE0AE6574E8B1134BCB6){:target="\_blank"}
