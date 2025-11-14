# 🖥️ Sistema de Administración de Alarmas

Aplicación de escritorio para la **gestión, monitoreo y administración de alarmas** en entornos de telecomunicaciones.  
Permite registrar, visualizar y gestionar alarmas, así como notificar a los usuarios correspondientes según la zona o tipo de incidencia.

---

## 📋 Descripción

El sistema fue diseñado para optimizar la comunicación y respuesta ante alertas de diferentes equipos o infraestructuras de telecomunicaciones.

Cuando se genera una alarma, el sistema notifica a los usuarios responsables para que se comuniquen con las personas involucradas y puedan **verificar, actuar o descartar** posibles fallas.

Esta herramienta busca mejorar la **eficiencia operativa** y reducir el tiempo de atención ante eventos críticos.

---

## ⚙️ Características principales

- 🕐 Creación, edición y eliminación de alarmas.
- 🔔 Notificaciones automáticas a usuarios asignados por zona.
- 🗺️ Clasificación por zonas.
- 📊 Historial de eventos y registro de acciones tomadas.
- 👥 Gestión de usuarios y permisos.
- 💾 Base de datos ligera con **SQLite**.
- 💻 Interfaz moderna desarrollada con **React + Tailwind CSS**.
- 🔧 Backend robusto en **Laravel**.

---

## 🧩 Tecnologías utilizadas

| Componente           | Tecnología             |
| -------------------- | ---------------------- |
| Frontend             | React 18, Tailwind CSS |
| Backend              | Laravel 11 (PHP 8.2+)  |
| Base de datos        | SQLite                 |
| Build Tool           | Vite                   |
| Control de versiones | Git / GitHub           |

---

## 🚀 Instalación y configuración

### Requisitos previos

- Node.js >= 18
- npm o yarn
- PHP >= 8.2
- Composer
- SQLite
- Git

---

### Pasos de instalación

1. **Clonar el repositorio:**
    ```bash
    git clone https://github.com/elrubiomorado/react-admin.git
    cd tu-repo
    Instalar dependencias del frontend:
    ```

bash
Copiar código
npm install
Instalar dependencias del backend:

bash
Copiar código
composer install
Configurar variables de entorno:
Copia el archivo de ejemplo y configura tus datos locales:

bash
Copiar código
cp .env.example .env
php artisan key:generate
Ejecutar migraciones y poblar la base de datos:

bash
Copiar código
php artisan migrate --seed
Iniciar los servidores:

Backend:

bash
Copiar código
php artisan serve
Frontend:

bash
Copiar código
npm run dev
Abrir la aplicación:
Abre el navegador en:
👉 http://localhost:8000

🧪 Uso básico
Inicia sesión con un usuario registrado.

Crea una nueva alarma de acuerdo a los datos que se te piden.

Los usuarios asignados recibirán una alerta.

Cada usuario puede confirmar, verificar o descartar la alarma según corresponda.

El sistema registra todas las acciones en el historial.

👥 Equipo de desarrollo
Nataly
Edgar
Jesús

Colaboradores del equipo de monitoreo y soporte de telecomunicaciones.
