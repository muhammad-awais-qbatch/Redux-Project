import { useSelector, useDispatch } from "react-redux";
import { requestStarted, requestFailed, requestSucceeded } from "./postSlice";
import RenderIf from "../components/RenderIf";
import NumberInputLabel from "../components/NumberInputLabel";
import NumberInput from "../components/NumberInput";
import FunctionButton from "../components/FunctionButton";
import Table from "../components/Table";
import React from "react";

function fetchData() {
  return async (dispatch, page_size = 10, page_number = 1) => {
    let response;
    try {
      dispatch(requestStarted());
      response = await fetch(
        "https://dummyjson.com/posts?" +
          "skip=" +
          page_size * (page_number - 1) +
          "&limit=" +
          page_size
      )
        .then((res) => res.json())
        .then((res) => {
          dispatch(requestSucceeded(res.posts));
        });
    } catch (error) {
      dispatch(requestFailed(error.message));
      return;
    }
  };
}

export default function Posts() {
  const { loading, success, error, data } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  var pageSizeId = `page_size`;
  var pageNumberId = `page_number`;
  return (
    <>
      <NumberInputLabel for={pageSizeId} text="Enter Page Size:" />
      <NumberInput id={pageSizeId} value="10" />
      <NumberInputLabel for={pageNumberId} text="Enter Page Number:" />
      <NumberInput id={pageNumberId} value="1" />
      <FunctionButton
        text="Fetch"
        func={() => {
          let pageSize = document.getElementById(pageSizeId).value;
          let pageNumber = document.getElementById(pageNumberId).value;
          fetchData()(dispatch, pageSize, pageNumber);
        }}
      />
      <RenderIf
        isTrue={loading === true}
        fallback={
          <RenderIf isTrue={success} fallback={<h1>{error}</h1>}>
            {/* <div>{data?.map((post) => post?.id + " -> ")}</div> */}
            <Table data={data} dispatch={dispatch} />
          </RenderIf>
        }
      >
        <h1>Loading</h1>
      </RenderIf>
    </>
  );
}
