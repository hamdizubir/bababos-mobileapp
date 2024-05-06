import React from 'react';

import {CommonActions} from '@react-navigation/native';
import {Box, Button, HStack, Text} from 'native-base';

import {Clipboard} from 'react-native';
import {removeAsyncStorageItem} from '../../utils/async-storage';

function ThankYou({navigation}) {
  const handleCopy = () => {
    Clipboard.setString('asdad123sd');
  };

  const handleGoBack = async () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Home'}],
      }),
    );

    await removeAsyncStorageItem('cart');
  };
  return (
    <Box flex={1} p={4} style={{gap: 8}}>
      <Text fontSize={'5xl'}>bababos</Text>
      <Text fontSize={'xl'}>Thankyou for your purchase!</Text>
      <Text fontSize={'md'}>Transaction id:</Text>
      <HStack justifyContent={'space-between'} px={20}>
        <Text fontSize={'md'}>asdad123sd</Text>
        <Button onPress={handleCopy}>Copy</Button>
      </HStack>
      <Button onPress={handleGoBack}>Go Back</Button>
    </Box>
  );
}

export default ThankYou;
