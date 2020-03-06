library(readxl)  # Permite leer archivos en formato xlsx
library(janitor)  # Librería especializada en la limpieza de datos
library(dplyr)  # Librería especializada para la manipulación de datos
library(magrittr)  # Librería que probee una serie de operadores 'pipe'
library(editrules) # Permite crear codiciones para detectar inconsistencias.
library(forcats) # Librería para especializada en variables tipo factor.
library(lubridate) # Librería que permite analizar y manipular fechas.
library(Hmisc) # Posee funciones que permite realizar imputaciones.
library(VIM) # Posee funciones que permite realizar imputaciones.


temp2 = tempfile(fileext = ".xlsx") # Crea archivo temporal
URL <- "https://github.com/jouninLRMD/jouninlrmd.github.io/raw/master/Dataset/EjemploLimpieza.xlsx" # URL base de datos
download.file(URL, destfile=temp2, mode='wb') # Descarga archivo en el archivo temporal creado
datos <- read_xlsx(temp2) # Carga base de datos desde archivo temporal

datos %<>% rename(ingresos = "...6") # renombra columna en la base de datos
datos %<>% clean_names() # limpia los nombres nombre de la base de datos

### Transformar variables a tipo factor
datos %<>% mutate_at(vars(id, number_telefono, estrato, municipio, deuda_vivienda, muni), as.factor) %>% glimpse()

### Transformar variables a tipo numérico (double)
datos %<>% mutate_at(vars(ingresos, costo_vivienda, percent_pagado), as.numeric) %>% glimpse()

### Transformar variables a tipo fecha (date)
datos %<>% mutate_at(vars(fecha), dmy) %>% glimpse()


## Creamos conjunto de condiciones que deben cumplirse
# condiciones para variables categóricas
CondC <- editset(c("estrato %in% 1:6", 
                   "municipio %in% c('Barbosa', 'Girardota', 'Copacabana', 'Bello', 'Medellín', 'Envigado', 'Itagüí', 'Sabaneta', 'La Estrella', 'Caldas')",
                   "deuda_vivienda %in% c('Sí', 'No')",
                   "muni %in% c('Barbosa', 'Girardota', 'Copacabana', 'Bello', 'Medellín', 'Envigado', 'Itagüi', 'Sabaneta', 'La Estrella', 'Caldas')"))
CondC

# Condiciones para variables númericas
CondN <-  editset(c("ingresos > 0",
                    "costo_vivienda > 0",
                    "percent_pagado >= 0",
                    "percent_pagado <= 1"))
CondN

# Presentamos donde ocurren dichas violaciones
Errores <- violatedEdits(c(CondC, CondN), datos)
Errores

# Localiza y muestra por variable las violaciones
loc <- localizeErrors(c(CondC, CondN), datos)$adapt
apply(X = loc, MARGIN = 2, FUN = function(x) which(x == TRUE))


## Detectar NA, NaN y NULL dentro de la base de datos
# Se agrega "NA" y "Na" y "NaN" debido a que hay entradas que poseen
# estas categorías como niveles del factor
faltantes <- apply(X = datos, MARGIN = 2, FUN = function(x) which(is.na(x) | is.null(x) | x == "Na" | x == "NA" | x == "NaN")) # se pueden agregar más caracteres
faltantes %>%
faltantes

# Función para extraer valores atípicos de variables numéricas
Outliers <- function(data, row = TRUE){
  if(!require(magrittr)) install.packages("magrittr")
  if(!require(dplyr)) install.packages("dplyr")
  require(magrittr)
  require(dplyr)
  vars <- data %>% select_if(is.numeric) %>% names()
  if(row != TRUE & row != FALSE) stop("row argument must be equal to TRUE or FALSE")
  aux <- function(data, vars){
    Outlier <- data %>% select(vars) %>% boxplot(plot = FALSE) %$% out
    if(row == TRUE){
      Outlier <- suppressWarnings(which(eval(parse(text=paste0("data$", vars))) == Outlier))
    }
    return(vars = Outlier)
  }
  sapply(vars, aux, data = data)
}

## Empleo de la función Outliers
# Muestra fila en la que se encuentra el Outlier
datos %>% Outliers(row = FALSE)

# Reemplaza valores "NA", "NaN" y "Na" dentro de variables tipo factor
datos %<>% convert_to_NA("NA") %>% convert_to_NA("NaN") %>%  convert_to_NA("Na") # Se pueden agregar más caracteres

# Elimina niveles sin uso dentro de variables tipo factor
datos %<>% droplevels()

# Elimina filas y columnas que poseen solo valores NA
datos %<>% remove_empty()

# Elimina filas que poseen registros duplicados
datos %<>% distinct()
datos

# Elimina colúmnas que poseen registros duplicados
datos %<>% select_if(!duplicated(as.list(.)))


## Corrección deductiva
# Estrato 10 no existe, así que se reemplaza valor por un NA (se escribe NULL)
datos %<>% mutate(estrato = fct_recode(estrato, NULL = "10")) %>% droplevels()

# El municipio "Hola! :D" no existe, así que se reemplaza dicho valor por NA
datos %<>% mutate(municipio = fct_recode(municipio, NULL = "Hola! :D")) %>% droplevels()

# Se recodifica el nivel Si sin tilde de la variable deuda_vivienda por 
# el nivel Sí con tilde
datos %<>% mutate(deuda_vivienda = fct_recode(deuda_vivienda, "Sí" = "Si")) %>% droplevels()

# La variable costo_vivienda no puede ser negativa
datos %<>% mutate(costo_vivienda = if_else(costo_vivienda < 0, abs(costo_vivienda), costo_vivienda))

# Se cree que se agregó un cero extra en el costo de la vivienda que aparece
# por un valor de 3838 millones de pesos, así que se le elimina un cero.
datos %<>% mutate(costo_vivienda = if_else(costo_vivienda == "3838000000", costo_vivienda/10, costo_vivienda))

# Puede asumirse, que deuda_vivienda es igual a "Sí" cuando se reporta valor 
# en costo_vivienda o percent_pagado.
datos %<>% mutate(deuda_vivienda = if_else(costo_vivienda > 0 | percent_pagado > 0, "Sí", "No", "No"))

### Imputación de datos
## Imputación númerica
# Se crea nueva base de datos para mostrar diferentes métodos de imputación
NumImp <- datos

# Se imputan los ingresos con la mediana 
NumImp %<>% mutate(ingresos = impute(ingresos, median))

# Se imputa costo_vivienda (restringido a deuda_vivienda) con la media
NumImp %<>% mutate(costo_vivienda = if_else(is.na(costo_vivienda) & deuda_vivienda == "Sí", mean(costo_vivienda, na.rm = TRUE), costo_vivienda))

# Se imputa percent_pagado (restringido a deuda_vivienda) con la media recortada al 20%
NumImp %<>% mutate(percent_pagado = if_else(is.na(percent_pagado) & deuda_vivienda == "Sí", mean(percent_pagado, na.rm = TRUE, trim = 0.2), percent_pagado))

## Imputación Hot Deck
# Se crea nueva base de datos para mostrar diferentes métodos de imputación
HotImp <- datos

# Se establece una semilla cualquiera
set.seed(1844)

# Se imputan todas las variables excepto, costo_vivienda y percent_pagado 
# debido a que tienen una restricción
HotImp %<>% mutate_at(vars(-c(costo_vivienda, percent_pagado)), ~impute(., "random"))

# Se imputa costo_vivienda (restringido a deuda_vivienda) con la media
HotImp %<>% mutate(costo_vivienda = if_else(deuda_vivienda == "Sí", as.numeric(impute(costo_vivienda, "random")), costo_vivienda))

# Se imputa percent_pagado (restringido a deuda_vivienda) con la media recortada al 20%
HotImp %<>% mutate(percent_pagado = if_else(deuda_vivienda == "Sí", as.numeric(impute(percent_pagado, "random")), percent_pagado))

# Se crea una nueva base de datos realizando la imputación total
knnImp <- kNN(datos, imp_var = FALSE)

# Se recuperan los valores dadas las restricciones establecidas
knnImp %<>% mutate(costo_vivienda = if_else(deuda_vivienda == "No", datos$costo_vivienda, costo_vivienda)) %>%
               mutate(percent_pagado = if_else(deuda_vivienda == "No", datos$percent_pagado, percent_pagado))


############################################## Solucion ##############################################



