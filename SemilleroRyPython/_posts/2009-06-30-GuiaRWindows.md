---
layout: post
title: "Instalación R y Rstudio en Windows"
main-class: 'guia'
permalink: /SemilleroRyPython/SRyP:title.html
tags: Guía_Instalación
rawtags: Guía_Instalación
introduction: Guía detallada para la instalación de los programas R-project y Rstudio en Windows.
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
  output_dir = "../../SemilleroRyPython/_posts/", output_format = "all"  ) })
bibliography: "../../referencias.bib"
csl: "../../apa.csl"
---







Instalación de R-Project
------------------------

Para la descarga de la última versión del programa R-project en Windows,
haga click en el siguiente enlace [(Descargar
R-project)](https://cloud.r-project.org/bin/windows/base/){:target="\_blank"}.
Una vez realizado click en el enlace, se abrirá la siguiente venta

![](../../SemilleroRyPython/images/GuiaW1.jpg) Haga click en el recuadro
rojo que aparece en la imagen anterior e iniciará la descarga de un
archivo con nombre R-3.x.x-win.exe donde x.x hace referencia a la
versión del programa que se está descargando.

Una vez completada la descarga, haga doble click sobre el instalador
para que éste inicie

![](../../SemilleroRyPython/images/GuiaW2.jpg)

En la ventana de idioma, seleccione idioma Español, o el idioma de su
preferencia y haga click en Aceptar

![](../../SemilleroRyPython/images/GuiaW3.jpg)

En la ventana de información, puede leer la información allí presentado
si es de su interés, y de click en el botón siguiente

![](../../SemilleroRyPython/images/GuiaW4.jpg)

En la ventana de selección de carpeta de destino, puede presionar el
botón examinar y seleccionar otra ubicación para la instalación del
programa R, aunque esto no es recomendado puesto que en ocasiones, ésto
puede generar problemas en la instalación o lectura de librerías.
Seguidamente, presione el botón siguiente

![](../../SemilleroRyPython/images/GuiaW5.jpg)

En la ventana de selección de componentes, escoja una de las dos
versiones de R dependiendo del sistema operativo que tiene instalado

![](../../SemilleroRyPython/images/GuiaW6.jpg)

La versión del sistema operativo puede ser consultada, al presionar las
teclas <tt>Windows + Pausa</tt>. En este caso, el sistema operativo es
de 64bits, y por tanto se selecciona la opción “64 bits Files”, y se da
click en el botón siguiente del instalador.

![](../../SemilleroRyPython/images/GuiaW7.jpg)

En la ventana de opciones de configuración, se deja seleccionada la
opción “No” y se da click en siguiente

![](../../SemilleroRyPython/images/GuiaW8.jpg)

En la ventana de tareas adicionales, puede seleccionar “Crear un icono
en el escritorio” y/o “Crear un icono en Inicio Rápido”, y de click en
siguiente

![](../../SemilleroRyPython/images/GuiaW9.jpg)

Esto hará que aparezca la ventana de instalación, espere un par de
minutos mientras el proceso finaliza.

![](../../SemilleroRyPython/images/GuiaW10.jpg)

Finalmente haga click en de botón Finalizar, y con ésto concluirá la
instalación del programa.

Instalación de RStudio
----------------------

Para la descarga de la última versión del programa Rstudio, haga click
en el siguiente enlace [(Descargar
RStudio)](https://www.rstudio.com/products/rstudio/download/#download){:target="\_blank"}.

Una vez realizado click en el enlace, se abrirá la siguiente venta

![](../../SemilleroRyPython/images/GuiaW11.jpg)

Haga click sobre la versión de Rstudio que sea compatible con su sistema
operativo para que comience la descarga.

Una vez completada la descarga, haga doble click sobre el instalador
para que éste inicie

![](../../SemilleroRyPython/images/GuiaW12.jpg)

En la ventana de bienvenida, seleccione siguiente

![](../../SemilleroRyPython/images/GuiaW13.jpg)

En la ventana de selección de carpeta de destino, puede presionar el
botón examinar y seleccionar otra ubicación para la instalación del
programa RStudio, aunque esto no es recomendado puesto que en ocasiones,
ésto puede generar problemas en la instalación o lectura de librerías o
compatibilidad con <tt>R</tt>. Seguidamente, presione el botón siguiente

![](../../SemilleroRyPython/images/GuiaW14.jpg)

En la ventana de selección de carpeta del Menú Inicio, presione el botón
instalar, para que inicie el proceso de instalación

![](../../SemilleroRyPython/images/GuiaW15.jpg)

En la ventana de instalación, espere a que el proceso termine. Una vez
completado se presentará la siguiente ventana

![](../../SemilleroRyPython/images/GuiaW16.jpg)

Finalmente haga click en el botón Terminar, y con ésto concluirá la
instalación del programa.
