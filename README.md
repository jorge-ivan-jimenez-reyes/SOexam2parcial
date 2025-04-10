# 📄 `README.md` — Examen Primera Parte: Contenedor Godot Headless

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

````bash
CMD ["godot", "--headless"]
```




## Pasos para construir y correr el contenedor

### 1. Construir la imagen

Usé este comando:

```bash
docker buildx build --platform linux/amd64 --load -t godot-container .


Porque:

- Estoy usando una Mac M1/M2 (Apple Silicon), que tiene arquitectura ARM64
- El binario de Godot 4.4 que descargamos es para Linux x86_64 (Intel/AMD).
- Por eso forcé la plataforma a linux/amd64 usando --platform para construirlo compatible.


## Correr el contenedor

Usé este comando:

```bash
docker run --rm --platform linux/amd64 godot-container

## Resultado Esperado

Godot Engine v4.4.stable.official.4c311cbee - https://godotengine.org
````
