import {
    ArrowBackIcon,
    Box,
    Button,
    Pressable,
    Text,
    VStack
} from 'native-base';
import React from 'react';
import { useAuthStore } from '../../utils/store';

function Profile({navigation}) {

    const handleLogout = async() => {
        await useAuthStore.getState().logout();
    }
    
  return (
    <Box flex={1} p={4}>
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowBackIcon size={8} color={'black'} />
      </Pressable>

      <VStack space={4}>
        <Text fontSize={'5xl'}>bababos</Text>
        <Text fontSize={'md'}>
          Gedung Centennial Tower Lt.29 Unit D-F Jl. Jendral Gatot Subroto Kav
          24-25 RT 002 RW 002 Karet Semanggi, Setiabudi Jakarta Selatan, DKI
          Jakarta 
        </Text>
        <Text fontSize={'md'}>
        Email : contact@bababos.com
        </Text>
        <Text fontSize={'md'}>
        Phone : 0123123123
        </Text>
          
      <Button onPress={handleLogout}>Logout</Button>
      </VStack>

    </Box>
  );
}

export default Profile;
