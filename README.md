# Proyecto-Integrador

#SERVIDOR

Como configurar Slim en XAMPP

Para configurar Slim se necesita descargar el framework. Una vez descargado descomprimir y renombrar de Slim-Skeleton-master a ApiInstituto. 
Copiar el framework y lo pegar en /xampp/htdocs.

Ahora la estructura de proyecto se visualiza así:

/xampp/htdocs/ApiInstituto

Para este artículo se asumirá se tiene instalado Composer. Ahora abrir la terminal (cmd) y navegar al directorio del proyecto. 

# cd /xampp/htdocs/ApiInstituto

Y ejecutar el siguiente comando:

# composer update

Crear Un Host Vitual en XAMPP

Paso 1: Abrir el archivo C:\XAMPP\apache\conf\extra\httpd-vhosts.conf y agregar las siguientes lineas:

<VirtualHost *:80>
    DocumentRoot "C:\XAMPP\htdocs\mi-api\public"
    ServerName mi-api
  <Directory "C:\XAMPP\htdocs\mi-api\public">
    Order allow,deny
    Allow from all
  </Directory>
</VirtualHost>

También se deberá descomentar la linea NameVirtualHost *:80 de este archivo. 