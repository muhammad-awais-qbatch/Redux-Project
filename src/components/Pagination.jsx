import { useState } from "react";
import PreviousSvg from "./PreviousSvg";
import NextSvg from "./NextSvg";

const handleClick = (props) => {
  {
    if (props.pageNumber > 1) {
      props.fetch()(props.dispatch, props.pageSize, props.pageNumber - 1);
      props.setPageNumber(props.pageNumber - 1);
    }
  }
};

function Index(props) {
  return (
    <a
      onClick={() => {
        props.fetch()(props.dispatch, props.pageSize, props.index);
        props.setPageNumber(props.index);
      }}
      aria-current="page"
      class={
        props.selected
          ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
      }
    >
      {props.index}
    </a>
  );
}

export default function Pagination(props) {
  console.log(Math.ceil(props.total / props.pageSize));
  return (
    <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">
              {" " + Number(props.pageSize * (props.pageNumber - 1) + 1) + " "}
            </span>
            to
            <span class="font-medium">
              {" " +
                Number(
                  props.pageSize * (props.pageNumber - 1) + props.data.length
                ) +
                " "}
            </span>
            of
            <span class="font-medium">{" " + Number(props.total) + " "}</span>
            results
          </p>
        </div>
        <div>
          <nav
            class="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              onClick={() => handleClick(props)}
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <PreviousSvg />
            </a>

            {Array(Math.ceil(props.total / props.pageSize))
              .fill(0)
              .map((_, index) => (
                <Index
                  index={index + 1}
                  selected={index + 1 === props.pageNumber ? true : false}
                  fetch={props.fetch}
                  dispatch={props.dispatch}
                  pageSize={props.pageSize}
                  setPageNumber={props.setPageNumber}
                />
              ))}

            <a
              onClick={() => {
                if (props.pageSize * props.pageNumber < props.total) {
                  props.fetch()(
                    props.dispatch,
                    props.pageSize,
                    props.pageNumber + 1
                  );
                  props.setPageNumber(props.pageNumber + 1);
                }
              }}
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <NextSvg />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
