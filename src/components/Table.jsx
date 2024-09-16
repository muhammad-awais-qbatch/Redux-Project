import { edits, deletes } from "../page/postSlice";
import Modal from "./Modal";
import "flowbite";
import React from "react";

function Th(props) {
  return <th class="text-left p-3 px-5">{props.text}</th>;
}
function TrTh(props) {
  return (
    <tr class="border-b">
      {props.keys.map((val) => (
        <Th text={val} />
      ))}
    </tr>
  );
}
function Td(props) {
  return (
    <td class="p-3 px-5">
      <input type="text" value={props.text} class="bg-transparent" />
    </td>
  );
}
function TrTd(props) {
  return (
    <tr class="border-b hover:bg-orange-100 bg-gray-100">
      {props.value.map((val) => (
        <Td text={val} />
      ))}
      <td class="p-3 px-5  justify-end">
        {/* <button
          type="button"
          class="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          // onClick={() => navigate("/edits/" + props.value[0])}
          // props.dispatch(edits(props.value[0]))

        >
          Edit
        </button> */}

        <Modal id={props.value[0]} />
      </td>
      <td class="p-3 px-5  justify-end">
        <button
          type="button"
          class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={() => props.dispatch(deletes(props.value[0]))}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

function TableData(props) {
  let keys = Object.keys(props.data[0]).filter(
    (val) => !props.restrict.includes(val)
  );
  return (
    <>
      <TrTh keys={keys.concat(["Edit", "Delete"])} />
      {props.data.map((vals) => (
        <TrTd value={keys.map((key) => vals[key])} dispatch={props.dispatch} />
      ))}
    </>
  );
}
export default function Table(props) {
  // console.log(Object.keys(props.data));
  return (
    <div class="text-gray-900 bg-gray-200">
      <div class="p-4 flex">
        <h1 class="text-3xl">Users</h1>
      </div>
      <div class="px-3 py-4 flex justify-center">
        <table class="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <TableData
              data={props.data}
              restrict={["userId", "reactions"]}
              dispatch={props.dispatch}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
