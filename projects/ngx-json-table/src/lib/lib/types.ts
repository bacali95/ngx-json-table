export type JsonTreeEvent = 'add' | 'edit' | 'delete' | 'sort' | 'clean';

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonArray | JsonObject | undefined;

export type JsonArray = Array<JsonValue>;

export type JsonObject = {
  [key: string]: JsonValue;
};
