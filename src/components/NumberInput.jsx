import React from "react";
export default function NumberInput(props) {
  return (
    <input
      type="number"
      id={props.id}
      class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 m-2.5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      // placeholder={props.value}
      Value={props.value}
    />
  );
}
