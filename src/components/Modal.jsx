import "flowbite";
import "./Modal.css";
import CrossSvg from "./CrossSvg";
import { useEffect, useState } from "react";
import RenderIf from "./RenderIf";

function handleForm(e, props) {
  // (e) => {
  e.preventDefault();
  props.text === "Create"
    ? props.dispatch(
        props.addId(
          Object.fromEntries(
            props.keys.map((key) => [
              key,
              document.getElementById(key).value || props.value[key] || 0,
            ])
          )
        )
      )
    : props.dispatch(
        props.edits(
          Object.fromEntries(
            props.keys.map((key) => [
              key,
              document.getElementById(key).value || props.value[key],
            ])
          )
        )
      );
  // };
}

function FormElement(props) {
  const [state, setState] = useState(props.value[props.index]);

  useEffect(() => {
    setState(props.value[props.index]);
  }, [props.value[props.index]]);

  return (
    <div>
      <label
        for={props.propKey}
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.propKey}
      </label>
      <RenderIf
        isTrue={props.disabled}
        fallback={
          <input
            type={props.type}
            name={props.propKey}
            id={props.propKey}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        }
      >
        <input
          type={props.type}
          name={props.propKey}
          id={props.propKey}
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          value={props.propKey === "id" ? state || props.id : state}
          onChange={(e) => setState(e.target.value)}
          required
          disabled
        />
      </RenderIf>
    </div>
  );
}

export default function Modal(props) {
  // let keys = props.keys.filter((key) => !props.uneditable.includes(key));
  console.log(props.text);
  return (
    <>
      <div
        id="edit-modal"
        tabindex="-1"
        aria-hidden="true"
        class="edit-modal overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {props.text + ": " + props.id}
              </h3>
              <button
                type="button"
                class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  props.dispatch(props.editId(0));
                }}
              >
                <CrossSvg />
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div class="p-4 md:p-5">
              <form class="space-y-4" onSubmit={(e) => handleForm(e, props)}>
                <div>
                  {props.keys.map((key, index) => (
                    <FormElement
                      propKey={key}
                      index={index}
                      id={props.id}
                      value={props.value}
                      type={props.numeric.includes(key) ? "number" : "text"}
                      disabled={props.uneditable.includes(key)}
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {props.text}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
