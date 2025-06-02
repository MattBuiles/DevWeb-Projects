# 🚀 DevWeb-Projects: Explorando el Desarrollo de Juegos Web 🎮

Este repositorio alberga una colección de mini-juegos desarrollados con tecnologías web (HTML, CSS y JavaScript). El objetivo principal es practicar y demostrar conceptos de desarrollo front-end, lógica de programación y manipulación del DOM a través de la creación de experiencias interactivas.

## 🎯 Objetivos del Proyecto

*   **Aprendizaje Práctico**: Aplicar conocimientos teóricos de HTML, CSS y JavaScript en proyectos concretos.
*   **Lógica de Programación**: Desarrollar algoritmos y estructuras de datos para la mecánica de los juegos.
*   **Manipulación del DOM**: Interactuar dinámicamente con la interfaz de usuario.
*   **Gestión de Estado**: Manejar el estado de la aplicación (puntuaciones, temporizadores, progreso del juego).
*   **Diseño Responsivo**: Asegurar que los juegos sean usables en diferentes tamaños de pantalla (cuando aplique).
*   **Modularidad y Reusabilidad**: Escribir código limpio, organizado y, en la medida de lo posible, reutilizable.

## 🎲 Los Juegos

Actualmente, el repositorio incluye los siguientes tres proyectos:

### 1. 🃏 Juego de Memoria (Memory Card Game)

*   **Descripción**: El clásico juego de encontrar pares. Los jugadores deben voltear cartas para encontrar coincidencias de imágenes en el menor número de movimientos y tiempo posible.
*   **Desarrollo Destacado**:
    *   Generación dinámica del tablero de juego.
    *   Lógica de comparación de cartas y manejo de turnos.
    *   Implementación de temporizador y contador de movimientos.
    *   Barajado aleatorio de cartas.
    *   Manejo de eventos de clic y actualización de la UI.
*   **Tecnologías**: HTML, CSS, JavaScript.
*   **Ubicación**: `/memory-card`

### 2. 🏓 Anotador de Ping Pong (Ping Pong Score Keeper)

*   **Descripción**: Una aplicación sencilla para llevar la puntuación de un partido de Ping Pong. Los jugadores pueden incrementar su puntuación y el juego determina un ganador cuando se alcanza el límite de puntos seleccionado.
*   **Desarrollo Destacado**:
    *   Manejo de eventos para los botones de puntuación y reinicio.
    *   Actualización dinámica del marcador en la interfaz.
    *   Lógica para determinar el ganador basada en un puntaje objetivo seleccionable.
    *   Deshabilitación de botones una vez que hay un ganador.
    *   Uso del framework CSS Bulma para el estilo.
*   **Tecnologías**: HTML, CSS (Bulma), JavaScript.
*   **Ubicación**: `/ping-pong`

### 3. ❤️ Propuesta de San Valentín (Valentine's Day Proposal)

*   **Descripción**: Una divertida página interactiva donde el botón "No" intenta escapar del cursor del usuario, mientras que el botón "Sí" permanece estático. Al hacer clic en "Sí", se muestra un mensaje cariñoso.
*   **Desarrollo Destacado**:
    *   Manipulación del DOM para mover un elemento de forma aleatoria en la pantalla.
    *   Uso de las propiedades `window.innerWidth/Height` y `element.offsetWidth/Height` para calcular posiciones.
    *   Cambio de contenido y visibilidad de elementos basado en la interacción del usuario.
    *   Estilo con CSS para posicionamiento absoluto y apariencia.
*   **Tecnologías**: HTML, CSS, JavaScript.
*   **Ubicación**: `/san-valentin`

## 🛠️ Proceso de Desarrollo y Aprendizaje

Cada juego se aborda como una oportunidad para:

*   **Planificación**: Definir la mecánica del juego, la interfaz de usuario y los componentes necesarios.
*   **Implementación Iterativa**: Comenzar con la funcionalidad básica y añadir características progresivamente.
*   **Depuración**: Identificar y solucionar errores utilizando las herramientas de desarrollo del navegador.
*   **Refactorización**: Mejorar la estructura y la legibilidad del código a medida que el proyecto evoluciona.
*   **Pruebas (Manuales)**: Asegurar que el juego funcione como se espera en diferentes escenarios.

## 🚀 Cómo Empezar con un Juego Específico

1.  Navega a la carpeta del juego que te interese (ej. `cd memory-card`).
2.  Abre el archivo `index.html` principal de esa carpeta en tu navegador web.
3.  ¡Explora el código y diviértete jugando!


¡Gracias por visitar este repositorio! Espero que encuentres los proyectos interesantes y útiles como ejemplos de desarrollo de juegos web básicos.