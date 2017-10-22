import { AsyncStorage } from "react-native";

const NOTEVATE_KEY = "@notevate";

// very inneficient but simple store

export async function get(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(NOTEVATE_KEY);
    if (raw) {
      return JSON.parse(raw);
    } else {
      return [];
    }
  } catch (e) {
    await AsyncStorage.setItem(NOTEVATE_KEY, JSON.stringify([]));
    return [];
  }
}

export async function set(sentence: string): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(NOTEVATE_KEY);
    const parsed: Array<string> = JSON.parse(raw);
    const updated = [sentence, ...parsed];
    await AsyncStorage.setItem(NOTEVATE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return get();
  }
}
