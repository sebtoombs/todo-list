import { useState } from "react";

/**
 * Custom hook to read and save state to localstorage
 *
 * @param {any} initialState
 * @param {string} localStorageKey
 * @returns [state: any, (any)=>void]
 */
export default function useStateWithLocalStorage(
  initialState = null,
  localStorageKey = "todo_state"
) {
  // Set up our state hook using either the value from localStorage, or the initial value
  const [stateValue, setStateValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(localStorageKey);
      return storedValue ? JSON.parse(storedValue) : initialState;
    } catch (error) {
      // We should probably handle the error, if it's important
      // If failing silently is ok, then this will do
      console.log(error);
      return initialState;
    }
  });

  // Implement a state update method that also updates the localstorage key
  // This could be done with a useEffect hook instead
  const setValue = (value) => {
    try {
      // We allow 'value' to be either a function or a value, to closely replicate
      // the useState hook
      const newValue =
        typeof value === "function" ? value.call(null, stateValue) : value;

      setStateValue(newValue);

      window.localStorage.setItem(localStorageKey, JSON.stringify(newValue));
    } catch (error) {
      // We should probably handle the error, if it's important
      // If failing silently is ok, then this will do
      console.log(error);
    }
  };
  return [stateValue, setValue];
}
