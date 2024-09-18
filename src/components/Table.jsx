import { useEffect } from "react";
import Modal from "./Modal";
import "flowbite";
import RenderIf from "./RenderIf";

function TrTh(props) {
  return (
    <tr class="border-b">
      {props.keys.map((val) => (
        <th class="text-left p-3 px-5">{val}</th>
      ))}
    </tr>
  );
}
function TrTd(props) {
  return (
    <tr class="border-b hover:bg-orange-100 bg-gray-100">
      {props.value.map((val) => (
        <td class="p-3 px-5">
          <input type="text" value={val} class="bg-transparent" />
        </td>
      ))}
      <td class="p-3 px-5  justify-end">
        <button
          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => {
            props.dispatch(props.editId(props.value[0]));
          }}
        >
          Edit
        </button>
      </td>
      <td class="p-3 px-5  justify-end">
        <button
          type="button"
          class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={() => props.dispatch(props.deletes(props.value[0]))}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

function TableData(props) {
  return (
    <>
      <TrTh keys={props.keys.concat(["Edit", "Delete"])} />
      {props.data.map((vals) => (
        <TrTd
          value={props.keys.map((key) => vals[key])}
          dispatch={props.dispatch}
          edits={props.edits}
          deletes={props.deletes}
          keys={props.keys}
          editId={props.editId}
        />
      ))}
    </>
  );
}
export default function Table(props) {
  let keys = Object.keys(props.data[0]).filter(
    (val) => !props.restrict.includes(val)
  );
  return (
    <div class="text-gray-900 bg-gray-200">
      <div class="p-4 flex justify-between">
        <h1 class="text-3xl">{props.headline}</h1>
        <button
          class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => {
            props.dispatch(props.getId());
          }}
        >
          + Add
        </button>
      </div>
      <div class="px-3 py-4 flex justify-center">
        <table class="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <TableData
              data={props.data}
              dispatch={props.dispatch}
              edits={props.edits}
              deletes={props.deletes}
              editId={props.editId}
              keys={keys}
            />
          </tbody>
        </table>
        <RenderIf isTrue={props.id}>
          <Modal
            id={props.id}
            edits={props.edits}
            keys={keys}
            value={Object.values(
              Object.fromEntries(
                Object.entries(
                  props.data.filter((val) => val.id === props.id)[0] || {}
                ).filter(([k]) => !props.restrict.includes(k))
              )
            )}
            dispatch={props.dispatch}
            editId={props.editId}
            addId={props.addId}
            numeric={props.numeric}
            uneditable={props.uneditable}
            text={
              props.data.filter((val) => val.id === props.id).length === 0
                ? "Create"
                : "Edit"
            }
          />
        </RenderIf>
      </div>
    </div>
  );
}
