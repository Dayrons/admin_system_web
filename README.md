# Admin System Web

## Descripción
Admin System Web es una aplicación web diseñada para la gestión administrativa. Este documento proporciona las instrucciones necesarias para configurar y desplegar la aplicación en un entorno de producción.

---

## 1. Preparación del Entorno
Antes de desplegar, asegúrate de tener las dependencias instaladas y generar la versión de producción.

### Comandos:
```bash
# Instalar dependencias
npm install

# Generar el build de producción
npm run build
```

---

## 2. Configuración del Servidor (Node & Serve)
Utilizamos `serve` para gestionar las rutas de la Single Page Application (SPA).

### Comandos:
```bash
# Instalar el servidor de forma global
npm install -g serve

# Verificar rutas críticas
# Directorio de binarios NVM
echo $NVM_BIN

# Ruta de Serve
which serve

# Ruta de Node
which node
```

---



## 3. Configuración del Servicio (Systemd)
Para mantener la aplicación activa tras reinicios o caídas, configuramos un servicio en el sistema.
### Probar antes de crear service

```bash
    serve -s dist
```

### Crear el archivo del servicio:
```bash
sudo nano /etc/systemd/system/admin_system_web.service
```

### Configuración del archivo:
```ini
[Unit]
Description=Servicio web Admin System
After=network.target

[Service]
Type=simple
User=root
Group=root
WorkingDirectory=/opt/admin_system_web

# Cargamos el PATH de NVM para que el servicio encuentre Node y Serve
Environment="PATH=/root/.nvm/versions/node/v24.12.0/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# Comando de inicio (ajusta la ruta a tu carpeta dist/build)
ExecStart=/root/.nvm/versions/node/v24.12.0/bin/serve -s dist -l 3000

Restart=always
RestartSec=5
SyslogIdentifier=admin_system_web
StandardOutput=journal+console

[Install]
WantedBy=multi-user.target
```

---

## 4. Gestión del Servicio
Comandos principales para administrar la aplicación:

### Comandos:
```bash
# Recargar cambios en el archivo service
sudo systemctl daemon-reload

# Habilitar inicio automático al arrancar el servidor
sudo systemctl enable admin_system_web

# Iniciar / Detener / Reiniciar
sudo systemctl start admin_system_web
sudo systemctl stop admin_system_web
sudo systemctl restart admin_system_web

# Ver estado y logs en tiempo real
sudo systemctl status admin_system_web
sudo journalctl -u admin_system_web -f
```

---

## Notas Adicionales
- **Puerto:** La aplicación estará disponible en el puerto `3000`.
- **SPA:** El flag `-s` en el comando `serve` asegura que todas las rutas internas de React funcionen correctamente (evita el error 404 al recargar).
- **NVM:** Si actualizas la versión de Node, recuerda actualizar las rutas en el archivo `.service`.