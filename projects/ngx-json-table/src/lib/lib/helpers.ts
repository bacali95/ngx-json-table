import { cloneDeep } from 'lodash';

/**
 * Extending object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
export const deepExtend = function <T extends object>(...objects: T[]): T | false {
  if (objects.length < 1 || typeof objects[0] !== 'object') {
    return false;
  }

  if (objects.length < 2) {
    return objects[0];
  }

  const target = objects[0] as Record<string, unknown>;

  // Cut off target object and process remaining objects
  const sources = objects.slice(1);

  let val: unknown;
  let src: unknown;

  sources.forEach(obj => {
    // skip argument if it is array or isn't object
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      return;
    }

    Object.keys(obj as object).forEach(key => {
      src = target[key]; // source value
      val = (obj as Record<string, unknown>)[key]; // new value

      // recursion prevention
      if (val === target) {
        return;

        /**
         * if new value isn't object then just overwrite by new value
         * instead of extending.
         */
      } else if (typeof val !== 'object' || val === null) {
        target[key] = val;
        return;

        // just clone arrays (and recursive clone objects inside)
      } else if (Array.isArray(val)) {
        target[key] = cloneDeep(val);
        return;

        // overwrite by new value if source isn't object or array
      } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
        target[key] = deepExtend({}, val as object) as unknown;
        return;

        // source value and new value is objects both, extending...
      } else {
        target[key] = deepExtend(src as object, val as object) as unknown;
        return;
      }
    });
  });

  return target as T;
};
