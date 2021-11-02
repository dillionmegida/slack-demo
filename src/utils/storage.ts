type Keys = 'last_opened_channel';

export function getStorageItem(key: Keys): string | null {
  return localStorage.getItem(key);
}

export function setStorageItem(key: Keys, value: any) {
  localStorage.setItem(key, value);
}
