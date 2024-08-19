# HomeWork 1

[Volver a Inicio](../README.md)

## Consigna:

### Actividad 1

Crear y planificar el DER del proyecto a implementar tomando en cuenta la siguientes consideraciones. La aplicación consistirá en un e-commerce en el cual...

[Diagrama ER](diagrama-entidad-relacion.drawio)

Un Usuario podrá registrarse e ingresar a la aplicación mediante usuario y contraseña.

El Usuario registrado puede realizar compras de productos mediante un carrito de compras (solo una unidad de cada producto) emitiendo una Orden de compra que registra la información en un Detalle de Compras.

Las Órdenes de compras son asociadas al Usuario y estas a su vez tienen asociado un Detalle de Compra con la información de los productos adquiridos.

Un Usuario Administrador, tendrá la posibilidad de actualizar la información de los productos cargados en la base de datos así como actualizar stock o agregar imágenes mediante un servicio de nube.
