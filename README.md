# Bienvenido a Mi ToDo App 

Este es un proyecto de [Expo](https://expo.dev) creado con [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
Se trata de una aplicación móvil para gestionar tareas personales, desarrollada con **React Native**, **Expo Router** y **TypeScript**, usando **contextos globales** para manejar el estado del usuario y de las tareas.

---

## Comenzando

1. **Instala las dependencias**

   npm install

2. **Inicia la aplicación**

   npx expo start


En la salida encontrarás opciones para abrir la app en:

* [Build de desarrollo](https://docs.expo.dev/develop/development-builds/introduction/)
* [Emulador de Android](https://docs.expo.dev/workflow/android-studio-emulator/)
* [Simulador de iOS](https://docs.expo.dev/workflow/ios-simulator/)
* [Expo Go](https://expo.dev/go), un entorno limitado para probar la app

Puedes comenzar a desarrollar editando los archivos dentro del directorio **app**. Este proyecto utiliza [navegación basada en archivos](https://docs.expo.dev/router/introduction).

---

## Características principales

* **Inicio de sesión básico:** permite simular acceso con correo y contraseña, almacenando el correo en un contexto global.
* **Gestión de tareas:** crear nuevas tareas, listar todas las tareas y eliminarlas.
* **Diseño moderno y responsive:** degradados, botones redondeados, sombras y estilo limpio.
* **Contextos globales:**

  * `PerfilContext` para manejar el correo del usuario logueado.
  * `TareasContext` para manejar la lista de tareas.
* **Navegación con Stack y Tabs:** pantallas `login`, `home` y `formularioTarea` organizadas con `expo-router`.

---
## Credenciales de prueba

Para iniciar sesión:

* **Correo:** cualquier formato válido (ej. `usuario@correo.com`)
* **Contraseña:** `1234`

---

## Tecnologías utilizadas

* React Native
* Expo Router
* TypeScript

---


## Aprende más

Para aprender más sobre el desarrollo con Expo:

* [Documentación de Expo](https://docs.expo.dev/)
* [Guías de Expo](https://docs.expo.dev/guides)
* [Tutorial paso a paso](https://docs.expo.dev/tutorial/introduction/)

---



## Autor

**Ignacio Lara**
