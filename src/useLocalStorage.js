import { useEffect, useState, useCallback } from "react";
import util from "util";

const useLocalStorage = (
  key,
  initialValue,
  { override = false, parse = v => v, format = v => String(v), onChange, name }
) => {
  if (typeof key !== "string") {
    throw new Error(
      `[Error] Parameter [key] must be a string. key: ${util.inspect(key)}`
    );
  }
  const [value, _setValue] = useState(() => {
    let valueToStore =
      initialValue instanceof Function ? initialValue() : initialValue;
    valueToStore = format(valueToStore);
    if (window.localStorage.getItem(key) === null) {
      window.localStorage.setItem(key, valueToStore);
      return parse(valueToStore);
    } else if (override === true) {
      window.localStorage.setItem(key, valueToStore);
      return parse(valueToStore);
    }
    return parse(window.localStorage.getItem(key));
  });

  const setValue = useCallback(
    newValue => {
      _setValue(prev => {
        let valueToStore =
          newValue instanceof Function ? newValue(prev) : newValue;
        window.localStorage.setItem(key, format(valueToStore));
        return valueToStore;
      });
    },
    [key, format]
  );

  useEffect(() => {
    const storageHandler = e => {
      const target = e.key;
      const newValue = e.newValue;
      if (key === target && format(value) !== newValue) {
        setValue(parse(newValue));
      }
      if (onChange instanceof Function) {
        onChange(newValue);
      }
    };
    window.addEventListener("storage", storageHandler);
    return () => {
      window.removeEventListener("storage", storageHandler);
    };
  }, [key, value, setValue, parse, format, onChange, name]);

  return [value, setValue];
};

export default useLocalStorage;
