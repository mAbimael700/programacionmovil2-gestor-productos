import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Button, buttonTextVariants, buttonVariants } from '~/components/ui/button';

import { Text } from '~/components/ui/text';
import { crearTablaProducto, insertarProducto, obtenerProductos } from '~/features/product/productoDao';
import { Input } from '~/components/ui/input';
import { Product } from '~/features/product/product.type';
import { cn } from '~/lib/utils';


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
    <View className='p-6'>
      <Text>Registrar producto</Text>

      <View className='flex gap-4'>

        <Input placeholder="Nombre"
          value={product.nombre}
          onChangeText={handleOnChangeNombre}
        />
        <Input placeholder="Precio"
          value={product.precio}
          onChangeText={handleOnChangePrecio}
          keyboardType="decimal-pad" />

        <Button onPress={guardar} className={cn(buttonTextVariants(), buttonVariants())}>
          <Text>
            Guardar
          </Text>
        </Button>
      </View>


      <View className='pt-5'>
        <Text className='font-semibold'>Listado:</Text>
        <FlatList
          className=''
          data={productos}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <Text>{item.nombre} - ${item.precio.toFixed(2)}</Text>
          )}
        />
      </View>
    </View>
  );
}



