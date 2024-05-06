import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorageItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.error('ERROR SET ASYNC STORAGE', e);
    return false;
  }
};

export const getAsyncStorageItem = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error('ERROR GET ASYNC STORAGE', e);
    return null;
  }
};

export const removeAsyncStorageItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};

export const clearAllAsyncStorageItem = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    console.error('ERROR CLEAR ASYNC STORAGE', e);
    return null;
  }
}
