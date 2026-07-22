# Dron FPV Manta 3.6" — Taller Escolar

Página web educativa para el taller de armado y configuración del **Dron FPV AxisFlying Manta 3.6"**.

## Estructura del Proyecto

```
Drone_FPV/
├── index.html              ← Página de inicio (portada)
├── modulo-teorico.html     ← Módulo 1: Fundamentos teóricos del vuelo FPV
├── modulo-armado.html      ← Módulo 2: Armado y configuración del Manta 3.6"
├── assets/
│   ├── css/
│   │   └── main.css        ← Sistema de diseño (inspirado en el proyecto DGAC)
│   ├── js/
│   │   ├── theme.js        ← Toggle de tema claro/oscuro
│   │   └── utils.js        ← Scroll reveal, accordion, partículas, etc.
│   └── images/             ← ⬅️ AQUÍ van todas tus imágenes
└── README.md
```

## 📸 Cómo agregar tus imágenes

Copia tus imágenes a la carpeta **`assets/images/`** usando los nombres exactos de abajo.
El código las referencia automáticamente. Si no existe la imagen, muestra un placeholder informativo.

### Imágenes del Módulo Teórico
| Nombre del archivo | Descripción |
|---|---|
| `hero-fpv.webp` | Imagen de fondo del hero (portada del módulo teórico) |
| `drone-fpv-overview.jpg` | Vista general de un dron FPV acrobático |
| `fpv-goggles.jpg` | Gafas FPV |
| `manta-chasis-esquema.jpg` | Esquema del chasis con componentes marcados |
| `stack-argus-f7.jpg` | Foto del Stack Argus Mini F7 (FC + ESC) |
| `motor-c206.jpg` | Foto del motor AxisFlying C206 2750KV |
| `receptor-superd.jpg` | Foto del receptor BetaFPV SuperD ELRS |
| `bateria-lipo-6s.jpg` | Foto de la batería LiPo 6S con XT60 |

### Imágenes del Módulo de Armado
| Nombre del archivo | Descripción |
|---|---|
| `hero-armado.webp` | Imagen de fondo del hero del módulo armado |
| `wiring-diagram-manta.jpg` | Diagrama de conexiones eléctrico / PCB |
| `chasis-manta-partes.jpg` | Partes del chasis Manta desarmadas |
| `chasis-manta-armado.jpg` | Chasis armado con separadores |
| `motor-c206-instalacion.jpg` | Motor instalado en el brazo |
| `motor-pernos-longitud.jpg` | Verificación de longitud de pernos del motor |
| `esc-soldadura-motores.jpg` | Cables de motores soldados en el ESC |
| `condensador-esc.jpg` | Condensador soldado en los pads de batería |
| `stack-montado.jpg` | Stack FC + ESC completamente ensamblado |
| `manta-armado-completo.jpg` | Dron completamente armado (vista final) |
| `betaflight-ports.jpg` | Captura de pantalla de Betaflight — Puertos |
| `literadio-2-se.jpg` | Foto de la emisora LiteRadio 2 SE |
| `receptor-superd-instalado.jpg` | Receptor instalado en el dron |

### Imagen del Index
| Nombre del archivo | Descripción |
|---|---|
| `hero-drone.webp` | Imagen de fondo del hero principal |

> **Tip:** Puedes usar cualquier formato de imagen (`.jpg`, `.png`, `.webp`).
> Los archivos `.webp` dan mejor rendimiento en navegadores modernos.

## Características del Diseño

- **Tema claro/oscuro** con persistencia en localStorage
- **Colores:** Naranja/rojo FPV como acento principal
- **Animaciones:** Scroll reveal, partículas flotantes en el hero, acordeones
- **Tipografía:** Outfit + Inter (Google Fonts)
- **Responsive:** Adaptado para móvil, tablet y desktop
- **Sin dependencias:** Solo HTML, CSS y JavaScript vanilla

## Módulos

### Módulo 1 — Teórico
1. ¿Qué es el vuelo FPV?
2. Clasificaciones de drones FPV
3. Modos de vuelo (Angle, Horizon, Acro)
4. Anatomía del dron (tabla de componentes)
5. Radio y transmisión de video (ELRS vs. analógico vs. digital)
6. Baterías LiPo y LiHV
7. Normativa DGAC Chile (DAN 91, DAN 151)

### Módulo 2 — Armado y Configuración
1. Lista de materiales y herramientas
2. Diagrama de conexiones eléctrico
3. Paso 1: Preparación del chasis
4. Paso 2: Instalación de motores
5. Paso 3: Montaje del Stack Argus Mini F7
6. Paso 4: Periféricos (VTX, cámara, receptor, GPS)
7. Configuración en Betaflight (UARTs, protocolos)
8. Vinculación LiteRadio 2 SE ↔ SuperD ELRS
9. Checklist pre-vuelo

---

**Ing. Christopher Ruiz** — Liceo Bicentenario de Excelencia Polivalente San Nicolás
