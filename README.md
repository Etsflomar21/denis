# Miel del Huallan

Tienda de miel y productos apícolas con catálogo, filtros, búsqueda, carrito y pedidos por WhatsApp. Los importes se muestran en soles peruanos.

## Inicio rápido

Descarga o clona el repositorio y abre `index.html` en un navegador moderno. Conserva la carpeta `assets` junto al HTML. También puedes servir esta carpeta con cualquier servidor de archivos estáticos.

El proyecto utiliza HTML, CSS y JavaScript del navegador. No requiere instalación de paquetes ni compilación.

## Estructura

```text
.
├── index.html                 # Contenido, navegación, secciones y formularios
├── assets/
│   ├── css/
│   │   └── styles.css         # Colores, componentes y diseño adaptable
│   └── js/
│       ├── config.js          # WhatsApp y ubicación de la tienda
│       ├── products.js        # Catálogo y precios
│       └── app.js             # Búsqueda, filtros, carrito y pedidos
└── docs/
    ├── EDICION.md             # Cómo cambiar contenido y productos
    └── FUNCIONAMIENTO.md      # Flujo de compra, almacenamiento y publicación
```

## Cambios habituales

| Quieres cambiar | Archivo |
| --- | --- |
| Número de WhatsApp o ubicación | `assets/js/config.js` |
| Productos, precios, fotos o presentaciones | `assets/js/products.js` |
| Textos de portada, historia y contacto | `index.html` |
| Colores, tipografías, tamaños y vista móvil | `assets/css/styles.css` |
| Comportamiento de la búsqueda o del pedido | `assets/js/app.js` |

Lee [la guía de edición](docs/EDICION.md) y [el funcionamiento de la tienda](docs/FUNCIONAMIENTO.md).

## Pedido por WhatsApp

El cliente agrega productos, revisa cantidades y completa su nombre y una referencia de entrega opcional. Al pulsar el botón de pedido se abre WhatsApp con productos, cantidades, precios unitarios, subtotales y total. El cliente envía ese mensaje y coordina disponibilidad, entrega y pago con la tienda.

El número configurado es `+51 918 260 798`. Los productos, precios y fotografías del catálogo son de demostración y necesitan revisión del propietario antes de usarlos para ventas reales.

## Comprobación manual

1. Abre la página y revisa las secciones en computadora y celular.
2. Filtra por categoría y busca `propoleo`. Comprueba también una búsqueda sin resultados.
3. Agrega dos unidades de miel de 1 kg y una de 500 g. Con el catálogo actual, el total debe ser S/ 115.00.
4. Cambia cantidades y reduce un producto a cero para quitarlo.
5. Recarga y comprueba que se conserve el carrito cuando el navegador permite almacenamiento local.
6. Completa el nombre y abre el pedido. Revisa el destinatario, productos y total en WhatsApp.
7. Abre y cierra el carrito con el teclado y con Escape.

## Publicación

Sube `index.html` y la carpeta `assets` completa al mismo sitio. Las rutas son relativas y funcionan en una subcarpeta de alojamiento como GitHub Pages. Puedes incluir `README.md` y `docs` para mantener la documentación disponible.

La publicación depende de la configuración del servicio de alojamiento. Subir los archivos a GitHub deja disponible el código del sitio. Consulta la guía de funcionamiento para los pasos de GitHub Pages.
