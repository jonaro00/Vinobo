import React from "react";

/**
 * Custom hook that registers a model attribute that the View is dependent on.
 * Registers an observer to recieve updates of the model attribute, and only re-renders
 * when this attribute changed.
 * @param {*} model An observable object.
 * @param {*} propertyName Attribute name in the model.
 * @returns The value of the model attribute (stateful).
 */
export default function useModelProperty(model, propertyName) {
  // Use a state in the component
  const [value, setValue] = React.useState(model[propertyName]);
  React.useEffect(
    () => {
      // The observer updates the local state
      const obs = () => setValue(model[propertyName]);
      model.addObserver(obs); // subscribe
      return () => model.removeObserver(obs); // unsubscribe
    },
    [model] // though model never changes
  );
  return value;
}
