import {Box, Button, Input, Text} from 'native-base';
import React, {useState} from 'react';
import {useAuthStore} from '../../utils/store';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = email => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      setError('invalid email, should follow email format');
      return;
    }

    if (!password) {
      setError('password required');
      return;
    }
    setError('');
    useAuthStore.getState().authenticate();
  };

  return (
    <Box flex={1} p={16} justifyContent={'center'} style={{gap: 12}}>
      <Text fontSize={'3xl'}>bababos marketplace</Text>

      <Input
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <Input
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      {error ? <Text color={'red.500'}>{error}</Text> : null}
      <Button
        onPress={() => {
          handleLogin();
        }}>
        <Text>Login</Text>
      </Button>
    </Box>
  );
};

export default LoginScreen;
