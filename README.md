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
