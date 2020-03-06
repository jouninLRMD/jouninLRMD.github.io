---
layout: post
title: "Instalación R y Rstudio en Ubuntu"
main-class: 'guia'
permalink: /SemilleroRyPython/SRyP:title.html
tags: Guía_Instalación
rawtags: Guía_Instalación
introduction: Guía detallada para la instalación de los programas R-project y Rstudio en Ubuntu.
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







Instalación del programa R
--------------------------

Para la descarga de la última versión del programa R-project en Ubuntu,
es necesario abrir una terminal, y escribir en ésta, las siguientes
lineas de código

    sudo add-apt-repository 'deb https://cloud.r-project.org/bin/linux/ubuntu bionic-cran35/'
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E084DAB9
    sudo apt update

![](../../SemilleroRyPython/images/GuiaU1.png)

en caso de tener problemas con la segunda linea de código, probar con

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys E084DAB9

una vez terminada la actualización, se escribe en la terminal la
siguiente línea de código

    sudo apt install r-base r-base-core r-recommended

![](../../SemilleroRyPython/images/GuiaU2.png)

Cuando se le pregunte si desea continuar, escriba la tecla S, presione
la tecla Enter y espere hasta que termine la instalación. Para iniciar
el programa <tt>R-project</tt>, abra una terminal y escriba la siguiente
linea de código

    R

![](../../SemilleroRyPython/images/GuiaU3.png)

Instalación RStudio
-------------------

Para la descarga de la última versión del programa Rstudio, haga click
en el siguiente enlace [(Descargar
RStudio)](https://www.rstudio.com/products/rstudio/download/#download){:target="\_blank"}.

Una vez realizado click en el enlace, se abrirá la siguiente venta

![](../../SemilleroRyPython/images/GuiaU4.png)

Haga click sobre la versión de Rstudio que sea compatible con su sistema
operativo para que comience la descarga.

![](../../SemilleroRyPython/images/GuiaU5.png)

Una vez completada la descarga, vaya a la carpeta de descargas y haga
doble click sobre el instalador para que ésta inicie

![](../../SemilleroRyPython/images/GuiaU6.png)

En la ventana emergente, presione el botón de Instalar para que inicie
la descarga

![](../../SemilleroRyPython/images/GuiaU7.png)

Esto generará una ventana de autenticación, ingrese la contraseña del
usuario correspondiente a la sección en donde va a realizar la
instalación

![](../../SemilleroRyPython/images/GuiaU8.png)

Luego de ésto, comenzará la instalación, espere a que el proceso termine
y con ésto concluirá la instalación del programa.
