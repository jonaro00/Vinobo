import React from "react";

/**
 * Custom hook that registers a model getter that the View is dependent on.
 * Registers an observer to recieve updates of the model getter, and only re-renders
 * when this attribute changed.
 * @param {*} model An observable object.
 * @param {*} getterName Method name in the model.
 * @returns The value of the model attribute (stateful).
 */
export default function useModelGetter(model, getterName) {
  // Use a state in the component
  const [value, setValue] = React.useState(model[getterName]());
  React.useEffect(
    () => {
      // The observer updates the local state
      const obs = () => setValue(model[getterName]());
      model.addObserver(obs); // subscribe
      return () => model.removeObserver(obs); // unsubscribe
    },
    [model] // though model never changes
  );
  return value;
}
