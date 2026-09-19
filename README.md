# 🔍 El Último Archivo de Clara — Frontend

> Si estás buscando a Clara, estás empezando por el final.

**Aplicación web** construida con **Vue 3** para _El último archivo de Clara_, un escape room narrativo de investigación. Desarrollada con **Vite**, **Vue Router** y **Pinia**, estilizada con **Tailwind CSS**, consume la API REST del backend con **axios** y está verificada con **Vitest** y **Playwright**.

---

## 📑 Índice

- [Descripción](#-descripción)
- [Tecnologías](#-tecnologías)
- [Autora](#-autora)

---

## 📋 Descripción

Interfaz web del escape room _El último archivo de Clara_. Es la contraparte frontend de [`escape-room-clara-backend`](https://github.com/Jennydev-25/escape-room-clara-backend), con quien se comunica mediante una API REST autenticada con JWT.

El proyecto sigue una arquitectura por vistas y componentes reutilizables, con gestión de estado centralizada en Pinia y estilos con utilidades de **Tailwind CSS** en vez de CSS a medida. Testeado con **TDD** en la lógica de negocio mediante **Vitest**, con cobertura medida con `@vitest/coverage-v8`, y con tests end-to-end de los flujos completos de usuario mediante **Playwright**.

[Volver al índice](#-índice)

---

## 🛠️ Tecnologías

- **[Vue 3](https://vuejs.org/)** — Framework de la interfaz, con Composition API (`<script setup>`)
- **[Vite](https://vite.dev/)** — Entorno de desarrollo y build del proyecto
- **[Vue Router](https://router.vuejs.org/)** — Enrutado entre las distintas vistas de la aplicación
- **[Pinia](https://pinia.vuejs.org/)** — Gestión del estado global (sesión del jugador, progreso)
- **[Axios](https://axios-http.com/)** — Cliente HTTP para consumir la API REST del backend, con soporte para interceptores (cabecera JWT, manejo centralizado de errores)
- **[Tailwind CSS](https://tailwindcss.com/)** — Sistema de estilos basado en utilidades, sin imponer un aspecto visual propio
- **[Vitest](https://vitest.dev/)** — Framework de tests unitarios (TDD)
- **[Vue Test Utils](https://test-utils.vuejs.org/)** — Utilidades oficiales para testear componentes Vue
- **[Playwright](https://playwright.dev/)** — Tests end-to-end de los flujos de usuario
- **[npm](https://www.npmjs.com/)** — Gestor de dependencias y scripts del proyecto
- **[Git](https://git-scm.com/)** / **[GitHub](https://github.com/)** — Control de versiones y alojamiento del proyecto, con flujo Gitflow (`main` ← `dev` ← `feature/...`)

---

## 👩‍💻 Autora

**[Jenny Sánchez Requejo](https://github.com/Jennydev-25)**

[Volver al índice](#-índice)
