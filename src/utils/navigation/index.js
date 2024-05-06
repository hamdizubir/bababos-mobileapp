import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import Home from '../../screen/Home';
import LoginScreen from '../../screen/Login';
import { useAuthStore } from '../store';
import ProductDetail from '../../screen/ProductDetail';
import Cart from '../../screen/Cart';
import ThankYou from '../../screen/ThankYou';
import Profile from '../../screen/Profile';

const Stack = createNativeStackNavigator();

function AuthenticationStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="ThankYou" component={ThankYou} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export function Navigation() {
  const navigationRef = useNavigationContainerRef();
  const authStatus = useAuthStore(state => state.isAuthenticated);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await useAuthStore.getState().isAuthenticated;
      setIsAuthenticated(res);
    } catch (error) {
      setIsAuthenticated(false);
    } 
  };

  useEffect(() => {
    checkAuth();
  }, [authStatus]);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {isAuthenticated ? (
          <AuthenticatedStackNavigator />
        ) : (
          <AuthenticationStackNavigator />
        )}
      </NavigationContainer>
    </>
  );
}
