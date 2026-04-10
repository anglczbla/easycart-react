import { useCallback, useRef } from "react";

export function useDebounceCallback<T>(
  callback: (arg: T) => void,
  delay: number,
) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction = useCallback(
    (arg: T) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        callback(arg);
      }, delay);
    },
    [callback, delay],
  );

  return debouncedFunction;
}
