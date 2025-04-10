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
