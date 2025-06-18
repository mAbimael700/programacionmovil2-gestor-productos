import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Button } from '~/components/ui/button';

import { Text } from '~/components/ui/text';
import { crearTablaProducto, insertarProducto, obtenerProductos } from '~/productoDao';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Product } from '~/features/product/product.type';


const defaultvalue = {
  nombre: "",
  precios: null
}



export default function Screen() {

  const [product, setProduct] = React.useState<any>(defaultvalue)
  const [productos, setProductos] = React.useState<Product[]>([]);


  React.useEffect(() => {
    crearTablaProducto();
    cargarProductos();
  }, []);


  const cargarProductos = async () => {
    const products = await obtenerProductos();
    setProductos(products);
  };

  const guardar = async () => {
    if (!product.nombre || !product.precio) return;

    try {

      await insertarProducto(product.nombre, product.precio);
      setProduct(defaultvalue);
      cargarProductos()
    } catch (error) {

    }

  };

  function handleOnChangeNombre(nombre: string) {
    setProduct((prev: object) => ({ ...prev, nombre }))
  }
  function handleOnChangePrecio(precio: string) {
    setProduct((prev: object) => ({ ...prev, precio }))
  }

  return (
    <View>
      <Text>Gestor de Productos</Text>
      <Input placeholder="Nombre"
        value={product.nombre}
        onChangeText={handleOnChangeNombre} />
      <Input placeholder="Precio"
        value={product.precio}
        onChangeText={handleOnChangePrecio}
        keyboardType="decimal-pad" />
      <Button onPress={guardar}>Guardar</Button>
      <Label >Listado:</Label>
      <FlatList
        data={productos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Text>{item.nombre} - ${item.precio.toFixed(2)}</Text>
        )}
      />
    </View>
  );
}



