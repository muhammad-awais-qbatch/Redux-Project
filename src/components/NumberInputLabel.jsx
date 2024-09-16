import React from "react";
export default function NumberInputLabel(props) {
  return (
    <label
      for={props.for}
      class=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {props.text}
    </label>
  );
}
