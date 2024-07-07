import { kv } from "@vercel/kv";

export async function get<T>(key: string): Promise<T | null> {
  try {
    return await kv.get<T>(key);
  } catch (error) {
    throw error;
  }
}

export async function setKV<T>(
  key: string,
  value: T,
  ex: number
): Promise<"OK" | T | null> {
  try {
    return await kv.set(key, value, { ex: ex });
  } catch (error) {
    throw error;
  }
}
