import { AsyncStorage } from "react-native";

const NOTEVATE_KEY = "@notevate";

// very inneficient but simple store

async function setEmpty() {
  await AsyncStorage.setItem(NOTEVATE_KEY, JSON.stringify([]));
  return [];
}

export async function get(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(NOTEVATE_KEY);
    if (raw != null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        console.log("Sentences:", parsed);
        return parsed;
      } else {
        return setEmpty();
      }
    } else {
      return setEmpty();
    }
  } catch (e) {
    return setEmpty();
  }
}

export async function add(sentence: string): Promise<string[]> {
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

export async function remove(sentence: string): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(NOTEVATE_KEY);
    const parsed: Array<string> = JSON.parse(raw);
    const updated = parsed.filter(s => s !== sentence);
    await AsyncStorage.setItem(NOTEVATE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return get();
  }
}
