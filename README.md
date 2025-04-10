# — Examen Primera Parte: Contenedor Godot Headless

## Descripción

Este proyecto contiene un **Dockerfile** que crea un **contenedor para Godot Engine 4.4** en modo **headless** (sin interfaz gráfica), basado en **Ubuntu 24.04**.

El contenedor permite levantar Godot en servidores o pipelines de CI/CD para **compilar** y **exportar proyectos** de manera automática, sin necesidad de una interfaz de usuario.

---

## Estructura de archivos

| Archivo      | Descripción                                           |
| :----------- | :---------------------------------------------------- |
| `Dockerfile` | Define el entorno para correr Godot en modo headless. |
| `README.md`  | Instrucciones para construir y correr el contenedor.  |

---

## Contenido del Dockerfile

- **Imagen base:** `ubuntu:24.04`
- **Instalaciones:**
  - `wget`, `unzip`, `ca-certificates`, y librerías gráficas necesarias.
  - Se agregó `libfontconfig1` para eliminar warnings de fuentes en Godot.
- **Descarga:**
  - Godot Engine 4.4 estable (`linux.x86_64` build oficial).
- **Modo de ejecución:**
  - Godot se ejecuta automáticamente en **modo headless** con:

```dockerfile
CMD ["godot", "--headless"]
```

---

## Pasos para construir y correr el contenedor

### 1. Construir la imagen

Usé el siguiente comando:

```bash
docker buildx build --platform linux/amd64 --load -t godot-container .
```

**¿Por qué?**

- Estoy usando una **Mac M1/M2 (Apple Silicon)**, que tiene arquitectura **ARM64**.
- El binario de **Godot 4.4** descargado es para **Linux x86_64 (Intel/AMD)**.
- Por eso forcé la plataforma a **linux/amd64** usando `--platform` para hacerlo compatible.
- El flag `--load` asegura que la imagen se cargue en el motor Docker clásico.

---

### 2. Correr el contenedor

Usé este comando:

```bash
docker run --rm --platform linux/amd64 godot-container
```

**¿Por qué?**

- Nuevamente, debido a la arquitectura **ARM64** de mi Mac, al correr la imagen necesito forzar la emulación a **linux/amd64**.
- Esto permite que Docker utilice **QEMU** para correr imágenes diseñadas para Intel/AMD en mi Mac Apple Silicon.

---

## Resultado esperado

Cuando corro el contenedor, obtengo como salida:

```plaintext
Godot Engine v4.4.stable.official.4c311cbee - https://godotengine.org
```

✅ Esto confirma que **Godot Engine arrancó correctamente en modo headless**.

---

## Notas adicionales

- **Warnings de fuentes:** Inicialmente Godot mostraba errores de `fontconfig` porque no encontraba librerías de fuentes.  
  Se solucionó instalando `libfontconfig1` en el `Dockerfile`.
- **Modo headless:**  
  El contenedor está configurado para correr Godot sin interfaz gráfica, ideal para **exportar proyectos automáticamente** o usar en **pipelines de integración continua (CI/CD)**.

---

# 📦 Comandos principales usados

```bash
docker buildx build --platform linux/amd64 --load -t godot-container .
docker run --rm --platform linux/amd64 godot-container
```

---

✅ **Este proyecto cumple con los requisitos de la Primera Parte del Examen** y demuestra cómo correr Godot Engine en modo automático dentro de un contenedor Docker usando Mac ARM64.


# Examen Segunda Parte: Aplicación de Misiones Espaciales

## Descripción

Este proyecto es una aplicación full-stack para gestionar misiones espaciales. Consta de un frontend en React, un backend en Go, y una base de datos PostgreSQL, todo containerizado usando Docker.

## Estructura del Proyecto

- `client/`: Contiene la aplicación frontend en React
- `server/`: Contiene el servidor backend en Go
- `docker-compose.yml`: Configura los servicios de Docker para la aplicación

## Tecnologías Utilizadas

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Go
- gorilla/mux (para enrutamiento)

### Base de Datos
- PostgreSQL

### Containerización
- Docker
- Docker Compose

## Componentes Principales

### Frontend (React)

1. **Dashboard (`Dashboard.jsx`)**: 
   - Componente principal que muestra la lista de misiones espaciales.
   - Permite agregar, eliminar y ver misiones.

2. **WelcomeScreen (`WelcomeScreen.jsx`)**: 
   - Pantalla de bienvenida inicial.

3. **MessageDisplay (`MessageDisplay.jsx`)**: 
   - Componente para mostrar mensajes (no completamente implementado).

4. **API Service (`api.js`)**: 
   - Maneja las llamadas a la API del backend.

### Backend (Go)

1. **Servidor Principal (`main.go`)**: 
   - Configura y ejecuta el servidor HTTP.
   - Maneja la conexión a la base de datos.

2. **Manejadores (`handlers/handlers.go`)**: 
   - Implementa los endpoints de la API para CRUD de misiones espaciales.

3. **Base de Datos (`database/database.go`)**: 
   - Define la estructura de la base de datos y las operaciones CRUD.

## Configuración de Docker

El archivo `docker-compose.yml` define tres servicios:

1. **frontend**: Aplicación React
2. **backend**: Servidor Go
3. **db**: Base de datos PostgreSQL

## Cómo Ejecutar el Proyecto

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Navega al directorio raíz del proyecto.
3. Ejecuta el siguiente comando:

   ```
   docker-compose up --build
   ```

4. Accede a la aplicación en `http://localhost:80`

## API Endpoints

- `GET /space-missions`: Obtener todas las misiones espaciales
- `POST /space-missions`: Crear una nueva misión espacial
- `GET /space-missions/{id}`: Obtener una misión espacial específica
- `PUT /space-missions/{id}`: Actualizar una misión espacial
- `DELETE /space-missions/{id}`: Eliminar una misión espacial

## Notas Adicionales

- La aplicación utiliza CORS para permitir la comunicación entre el frontend y el backend.
- Se implementó un sistema de manejo de errores tanto en el frontend como en el backend.
- La base de datos se inicializa con datos de ejemplo para facilitar las pruebas.

---

✅ **Este proyecto cumple con los requisitos de la Segunda Parte del Examen**, demostrando la implementación de una aplicación full-stack containerizada con Docker.
