import {
  Box,
  Button,
  FavouriteIcon,
  HStack,
  ScrollView,
  Text,
  VStack,
  Divider,
  Input,
  ArrowBackIcon,
} from 'native-base';
import React, {useState} from 'react';
import {Image, Pressable, ToastAndroid} from 'react-native';
import {
  getAsyncStorageItem,
  setAsyncStorageItem,
} from '../../utils/async-storage';

function ProductDetail({route, navigation}) {
  const product = route?.params?.product;
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    setValue(value - 1);
  };

  const handleAddToCart = async () => {
    const cart = await getAsyncStorageItem('cart');
    if (cart) {
      const parsedCart = JSON.parse(cart);
      const sameItem = parsedCart.find(item => item?.id === product?.id);
      let newCart = [];
      if (sameItem) {
        newCart = parsedCart.map(item => {
          if (item.id === product.id) {
            return {
              ...item,
              count: item.count + Number(value),
            };
          }
          return {...item};
        });
      } else {
        newCart = [
          ...parsedCart,
          {id: product.id, item: product, count: value},
        ];
      }
      await setAsyncStorageItem('cart', JSON.stringify(newCart));
    } else {
      await setAsyncStorageItem(
        'cart',
        JSON.stringify([{id: product.id, item: product, count: value}]),
      );
    }
    ToastAndroid.show('Success add to cart', ToastAndroid.SHORT);
    navigation.goBack();
  };
  return (
    <Box flex={1} p={4} style={{gap: 8}}>
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowBackIcon size={8} color={'black'} />
      </Pressable>
      <ScrollView>
        <VStack space={4}>
          <Text fontSize={'2xl'}>{product?.title}</Text>
          <Image
            source={{uri: product.image}}
            width={'100%'}
            resizeMode="contain"
            height={300}
          />
          <HStack justifyContent={'space-between'}>
            <Text fontSize={'xl'}>${product?.price}</Text>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <HStack alignItems={'center'} mr={2}>
                <Text fontSize={'xl'}>{product.rating.rate}/5</Text>
                <FavouriteIcon color={'red.500'} />
              </HStack>

              <Text fontSize={'xl'}>{product.rating.count} votes</Text>
            </HStack>
          </HStack>
          <Text fontSize={'md'}>category: {product?.category}</Text>

          <Text fontSize={'lg'}>{product?.description}</Text>
          <Divider />
          <Text fontSize={'md'}>Buy this item</Text>

          <HStack
            style={{flexDirection: 'row', alignItems: 'center'}}
            space={2}>
            <Button onPress={handleDecrement}>-</Button>
            <Input
              w={10}
              value={value.toString()}
              onChangeText={text => setValue(parseInt(text) || 0)}
              keyboardType="numeric"
            />
            <Button onPress={handleIncrement}>+</Button>
          </HStack>
          <Button onPress={handleAddToCart}>Add to Cart</Button>
        </VStack>
      </ScrollView>
    </Box>
  );
}

export default ProductDetail;
