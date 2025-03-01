import { deepExtend } from './helpers';

describe('Helpers', () => {
  describe('deepExtend', () => {
    it('should return false if no objects are provided', () => {
      expect(deepExtend()).toBe(false);
    });

    it('should return false if first argument is not an object', () => {
      expect(deepExtend('not an object' as unknown as object)).toBe(false);
    });

    it('should return the first object if only one object is provided', () => {
      const obj = { a: 1 };
      expect(deepExtend(obj)).toBe(obj);
    });

    it('should extend target object with source object properties', () => {
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };
      const result = deepExtend({} as Record<string, unknown>, target, source) as Record<
        string,
        unknown
      >;

      expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('should handle nested objects', () => {
      const target = {
        a: 1,
        nested: {
          x: 10,
          y: 20,
        },
      };
      const source = {
        b: 2,
        nested: {
          y: 30,
          z: 40,
        },
      };
      const result = deepExtend({} as Record<string, unknown>, target, source) as Record<
        string,
        unknown
      >;

      expect(result).toEqual({
        a: 1,
        b: 2,
        nested: {
          x: 10,
          y: 30,
          z: 40,
        },
      });
    });

    it('should clone arrays instead of extending them', () => {
      const target = { arr: [1, 2, 3] };
      const source = { arr: [4, 5, 6] };
      const result = deepExtend({} as Record<string, unknown>, target, source) as Record<
        string,
        unknown
      >;

      expect(result).toEqual({ arr: [4, 5, 6] });
      expect(result.arr).not.toBe(source.arr); // Should be a clone, not a reference
    });

    it('should handle arrays with objects', () => {
      const target = { arr: [{ a: 1 }] };
      const source = { arr: [{ b: 2 }] };
      const result = deepExtend({} as Record<string, unknown>, target, source) as Record<
        string,
        unknown
      >;

      expect(result).toEqual({ arr: [{ b: 2 }] });
    });

    it('should handle null values', () => {
      const target = { a: 1, b: { c: 3 } };
      const source = { b: null };
      const result = deepExtend({} as Record<string, unknown>, target, source) as Record<
        string,
        unknown
      >;

      expect(result).toEqual({ a: 1, b: null });
    });

    it('should handle primitive values overwriting objects', () => {
      const target = { a: { b: 2 } };
      const source = { a: 1 };
      const result = deepExtend({} as Record<string, unknown>, target, source) as Record<
        string,
        unknown
      >;

      expect(result).toEqual({ a: 1 });
    });

    it('should handle objects overwriting primitive values', () => {
      const target = { a: 1 };
      const source = { a: { b: 2 } };
      const result = deepExtend({} as Record<string, unknown>, target, source) as Record<
        string,
        unknown
      >;

      expect(result).toEqual({ a: { b: 2 } });
    });

    it('should skip non-object sources', () => {
      const target = { a: 1 };
      const source1 = 'not an object';
      const source2 = { b: 2 };
      const result = deepExtend(
        {} as Record<string, unknown>,
        target,
        source1 as unknown as object,
        source2
      ) as Record<string, unknown>;

      expect(result).toEqual({ a: 1, b: 2 });
    });
  });
});
