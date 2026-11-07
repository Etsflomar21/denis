# Guía de edición

## WhatsApp y ubicación

Abre `assets/js/config.js` y edita los valores de `CONFIG`.

```js
const CONFIG = {
  whatsapp: '51918260798',
  ubicacion: 'Perú · Entregas por coordinar'
};
```

El número debe incluir el código de país y contener únicamente dígitos. Para Perú se usa `51` seguido de los nueve dígitos del celular. La aplicación usa ese valor para los pedidos y las consultas.

El enlace de contacto en `index.html`, dentro de `phone-text`, también contiene el número. Si cambias de teléfono, actualiza su `href` para que coincida con `CONFIG.whatsapp`.

## Productos

Abre `assets/js/products.js`. Cada objeto de `PRODUCTOS` representa un artículo.

| Campo | Uso |
| --- | --- |
| `id` | Identificador numérico único y estable |
| `nombre` | Nombre visible, incluida su presentación |
| `categoria` | Categoría usada por los filtros |
| `precio` | Precio de una unidad de esa presentación, en soles |
| `descripcion` | Texto breve de la ficha |
| `etiqueta` | Distintivo de la fotografía |
| `imagen` | URL de una imagen o ruta relativa |

Ejemplo de un producto del catálogo actual.

```js
{
  id: 1,
  nombre: 'Miel de abeja · 1 kg',
  categoria: 'Miel',
  precio: 45,
  descripcion: 'Presentación familiar para acompañar tus desayunos y recetas.',
  etiqueta: 'Favorito',
  imagen: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=700&auto=format&fit=crop&q=80'
}
```

Escribe el precio como número con punto decimal cuando corresponda. Conserva los identificadores existentes porque el carrito guardado los utiliza. Un identificador eliminado no debe reutilizarse para otro producto.

Los filtros actuales son `Todos`, `Miel` y `Derivados`. Para añadir una categoría, actualiza también la lista de `renderFilters()` en `assets/js/app.js`.

### Precio por kilo

El precio principal corresponde a la presentación indicada en el nombre. La ficha de miel muestra además su equivalente por kilogramo.

El catálogo define `pesoKg` para cada presentación de miel. Para una presentación de 500 g usa `pesoKg: 0.5`. El equivalente se calcula dividiendo `precio` entre `pesoKg`. Si agregas miel, indica su peso en kilogramos.

### Imágenes propias

Crea `assets/images` cuando tengas fotografías y guarda allí los archivos. Cambia `imagen` por una ruta como `assets/images/miel-1kg.jpg`. Las rutas se resuelven desde `index.html`. Usa fotos optimizadas para que la página cargue con rapidez.

Las fotografías de portada y de la sección de historia están definidas en `assets/css/styles.css`. Busca `.hero` y `.about-photo` para cambiarlas.

## Diseño y textos

Los colores globales se encuentran en `:root`, al principio de `assets/css/styles.css`. Los ajustes para pantallas pequeñas están agrupados en reglas `@media`.

Los textos de la tienda están en `index.html`. Conserva los atributos `id` de los elementos porque la aplicación los utiliza para conectar el catálogo, el carrito y los formularios.

## Orden de los scripts

Al final de `index.html` se cargan `config.js`, `products.js` y `app.js`, en ese orden y con `defer`. La aplicación necesita que la configuración y el catálogo estén disponibles al iniciarse. Estos scripts clásicos también permiten que los botones del HTML llamen a las funciones de la aplicación.
