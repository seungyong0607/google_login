export const storage = localStorage;

export  const getItem = (key, defaultValue) => {
  try {
    const value = storage.getItem(key);
    // key 에 해당하는 값이 있다면 parsing 하고 없으면 defaultValue 리턴
    
    return value ? JSON.parse(value) : defaultValue;
  } catch(e) {
    // parsing 하다 에러가 생기면 defaultValue리턴
    return defaultValue;
  }
}

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch(e) {
    // ignore
  }
}

export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch(e) {
    // ignore
  }
} 