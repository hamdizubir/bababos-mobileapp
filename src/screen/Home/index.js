import axios from 'axios';
import {
    Box,
    Button,
    FavouriteIcon,
    FlatList,
    HStack,
    Pressable,
    Text,
    VStack,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';

function Home({navigation}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const queryProductList = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://fakestoreapi.com/products/');

      if (res?.status === 200) {
        setProducts(res?.data ?? []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToCart = () => {
    navigation.navigate('Cart');
  };
  const handleNavigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const ProductCard = ({product}) => {
    return (
      <Box
        w={'48%'}
        py={4}
        h={'64'}
        bgColor={'gray.300'}
        borderRadius={'xl'}
        style={{gap: 2}}>
        <Pressable
          onPress={() => {
            navigation.navigate('ProductDetail', {product: product});
          }}>
          <Image
            source={{uri: product.image}}
            width={'100%'}
            resizeMode="contain"
            height={120}
          />
          <VStack p={4}>
            <Text numberOfLines={2}>{product.title}</Text>
            <Text numberOfLines={1}>${product.price}</Text>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
              <HStack alignItems={'center'}>
                <Text>{product.rating.rate}/5</Text>
                <FavouriteIcon color={'red.500'} />
              </HStack>

              <Text>{product.rating.count} votes</Text>
            </HStack>
          </VStack>
        </Pressable>
      </Box>
    );
  };

  useEffect(() => {
    queryProductList();
  }, []);

  return (
    <Box p={4} flex={1}>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'3xl'}>bababos</Text>
        <HStack space={2}>
          <Button onPress={handleNavigateToCart} h={10}>
            Cart
          </Button>
          <Button onPress={handleNavigateToProfile} h={10}>
            Profile
          </Button>
        </HStack>
      </HStack>
      {loading ? (
        <Text>Loading products...</Text>
      ) : (
        <FlatList
          style={{margin: 5}}
          data={products}
          numColumns={2}
          keyExtractor={item => item.id}
          contentContainerStyle={{gap: 10}}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          renderItem={({item}) => <ProductCard product={item} />}
        />
      )}
    </Box>
  );
}

export default Home;
