# Funcionamiento y publicación

## Componentes

`index.html` contiene la portada, los beneficios, el catálogo, la historia, el contacto, el pie de página y el diálogo del carrito. `styles.css` define su presentación. `config.js` y `products.js` contienen los datos editables. `app.js` conecta esos datos con los elementos de la página.

## Catálogo

`renderFilters()` crea los botones de categoría. `setFilter()` cambia la selección y vuelve a dibujar las fichas con `renderProducts()`. El campo de búsqueda normaliza mayúsculas y tildes para que una consulta como `propoleo` encuentre `Propóleo`.

El precio es por unidad de la presentación del producto. El equivalente por kilo utiliza `pesoKg` cuando está definido.

## Carrito

`cart` relaciona cada identificador de producto con una cantidad. `addToCart()` agrega una unidad y `changeQty()` modifica la cantidad. Al llegar a cero, el producto se elimina del carrito. `renderCart()` calcula subtotales y total a partir de los precios actuales del catálogo.

`save()` guarda el carrito en `localStorage` bajo la clave `huallan-cart`. Este almacenamiento pertenece al navegador y al origen desde donde se abrió la tienda. Puede variar entre un archivo local y una dirección publicada. Si el navegador restringe el almacenamiento, el carrito sigue funcionando durante la visita.

El diálogo nativo del carrito admite cierre con Escape, controla el foco del teclado y bloquea la interacción con el contenido de fondo mientras está abierto.

## Pedido y consulta

`checkout()` valida el nombre, reúne los artículos y prepara el mensaje con cantidades, precios, subtotales, total y referencia de entrega. `whatsappLink()` codifica el mensaje y construye un enlace `https://wa.me/` usando el teléfono de configuración.

El formulario de contacto prepara otra conversación con el nombre y la consulta. Ambos botones abren WhatsApp, donde el cliente revisa el texto y pulsa Enviar.

Los datos del nombre y la referencia de entrega se utilizan al generar el enlace. El carrito guardado contiene identificadores y cantidades.

## Alcance actual

La tienda es un sitio estático. La confirmación del pedido, el pago, el stock y la entrega se coordinan con el dueño por WhatsApp. Las imágenes se cargan desde Unsplash y las fuentes desde Google Fonts. Estas dependencias requieren conexión a Internet. Las fotografías y los precios actuales son ejemplos.

## GitHub Pages

Para alojar esta estructura en el repositorio `Etsflomar21/denis`, entra en Settings, luego Pages. Si tu cuenta y repositorio tienen Pages disponible, selecciona el despliegue desde una rama, elige `main` y la carpeta raíz, y guarda los cambios.

Espera a que GitHub muestre la dirección publicada. Abre esa dirección y realiza las comprobaciones manuales del README, especialmente las rutas de los archivos y el mensaje de WhatsApp.

Estos pasos describen la configuración. La reorganización del código no activa automáticamente GitHub Pages.
