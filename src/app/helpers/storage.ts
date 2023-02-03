import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export const storage = {
  keyExists: async (key: string): Promise<boolean> => {
    const keys = await SecureStoragePlugin.keys();
    if (keys.value && keys.value.includes(key)) {
      return await storage.get(key) !== null;
    }
    return false;
  },
  get: async (key: string): Promise<any> => {
    try {
      const storage = await SecureStoragePlugin.get({ key });
      return JSON.parse(storage.value);
    } catch (err) {
      return null;
    }
  },
  set: async (key: string, value: any): Promise<boolean> => {
    const res = await SecureStoragePlugin.set({
      key: key,
      value: JSON.stringify(value)
    });
    return res.value;
  },
  remove: async (key: string): Promise<boolean> => {
    const rm = await SecureStoragePlugin.remove({ key });
    return rm.value;
  },
  clear: async (): Promise<boolean> => {
    const cl = await SecureStoragePlugin.clear();
    return cl.value;
  }
};
