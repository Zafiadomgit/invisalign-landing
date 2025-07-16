# Configuración del Envío de Emails

## Pasos para configurar el envío de emails desde el formulario

### 1. Crear archivo .env.local

En la raíz del proyecto, crea un archivo llamado `.env.local` con el siguiente contenido:

```env
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicación
```

### 2. Configurar Gmail para envío de emails

#### Paso 1: Activar verificación en dos pasos
1. Ve a tu cuenta de Google
2. Navega a "Seguridad"
3. Activa "Verificación en dos pasos"

#### Paso 2: Generar contraseña de aplicación
1. En la misma sección de "Seguridad"
2. Busca "Contraseñas de aplicación"
3. Selecciona "Otra (nombre personalizado)"
4. Escribe un nombre como "IPS Mónica Botero Website"
5. Copia la contraseña generada (16 caracteres)

#### Paso 3: Actualizar .env.local
Reemplaza los valores en el archivo `.env.local`:
- `EMAIL_USER`: Tu dirección de Gmail completa
- `EMAIL_PASS`: La contraseña de aplicación generada

### 3. Verificar la configuración

Una vez configurado:
1. El formulario en la página del curso enviará los datos a `odontoesteticabogota@gmail.com`
2. Los emails incluirán toda la información del formulario
3. Se mostrará un mensaje de éxito o error al usuario

### 4. Estructura del email recibido

El email incluirá:
- Nombre completo del interesado
- Correo electrónico
- Teléfono
- Mensaje adicional (si se proporciona)
- Fecha y hora del envío
- Formato profesional con los colores de la marca

### Notas importantes:
- La contraseña de aplicación es diferente a tu contraseña normal de Gmail
- Nunca compartas o subas el archivo `.env.local` a repositorios públicos
- El archivo `.env.local` ya está incluido en `.gitignore` para mayor seguridad 