import {
  ArrowBackIcon,
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {getAsyncStorageItem} from '../../utils/async-storage';

function Cart({navigation}) {
  const [cart, setCart] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const countCartTotalPrice = cart => {
    let totalPrice = 0;
    for (const product of cart) {
      totalPrice = totalPrice + product.item.price * product.count;
    }
    setCartTotalPrice(totalPrice);
  };

  const queryCart = async () => {
    try {
      setLoading(true);
      const res = await getAsyncStorageItem('cart');
      if (res) {
        setCart(JSON.parse(res));
        countCartTotalPrice(JSON.parse(res));
      } else {
        setCart([]);
      }
    } catch (error) {
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queryCart();
  }, []);

  return (
    <Box flex={1} p={4} style={{gap: 8}}>
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowBackIcon size={8} color={'black'} />
      </Pressable>
      <Text fontSize={'5xl'}>Cart</Text>
      {loading ? (
        'Loading cart...'
      ) : cart.length > 0 ? (
        <ScrollView>
          <VStack space={4}>
            {cart.map(product => {
              return (
                <HStack w={'100%'} flex={1} space={4}>
                  <Image
                    source={{uri: product.item.image}}
                    width={'20%'}
                    resizeMode="contain"
                    height={100}
                  />
                  <VStack>
                    <Text>{product.item.title}</Text>
                    <Text>price @: ${product.item.price}</Text>
                    <Text>amount: {product.count}</Text>
                  </VStack>
                </HStack>
              );
            })}

            <Text fontSize={'3xl'}>Total price: ${cartTotalPrice}</Text>

            <Button onPress={() => navigation.navigate('ThankYou')}>
              Checkout
            </Button>
          </VStack>
        </ScrollView>
      ) : (
        <Text>Your cart is empty!</Text>
      )}
    </Box>
  );
}

export default Cart;
