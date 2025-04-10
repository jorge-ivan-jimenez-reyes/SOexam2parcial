FROM ubuntu:24.04

# No prompts
ENV DEBIAN_FRONTEND=noninteractive

# Instalar wget y unzip para poder descargar y descomprimir
RUN apt-get update && apt-get install -y wget unzip ca-certificates libx11-6 libxcursor1 libxrandr2 libxi6 libgl1 libfontconfig1 libglib2.0-0 && rm -rf /var/lib/apt/lists/*

# Descargar y preparar Godot
RUN wget https://github.com/godotengine/godot/releases/download/4.4-stable/Godot_v4.4-stable_linux.x86_64.zip -O /tmp/godot.zip \
    && unzip /tmp/godot.zip -d /usr/local/bin \
    && rm /tmp/godot.zip \
    && chmod +x /usr/local/bin/Godot_v4.4-stable_linux.x86_64 \
    && ln -s /usr/local/bin/Godot_v4.4-stable_linux.x86_64 /usr/local/bin/godot

# Ejecutar Godot en modo headless
CMD ["godot", "--headless"]

