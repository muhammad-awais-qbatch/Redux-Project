import { useSelector, useDispatch } from "react-redux";
import { requestStarted, requestFailed, requestSucceeded } from "./PostSlice";
import RenderIf from "../components/RenderIf";
// import NumberInputLabel from "../components/NumberInputLabel";
// import NumberInput from "../components/NumberInput";
// import FunctionButton from "../components/FunctionButton";
import Table from "../components/Table";
import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import {
  edits,
  deletes,
  editId,
  addId,
  getId,
  setTotal,
} from "./PostSlice";

const fetchData =
  () =>
  async (dispatch, page_size = 10, page_number = 1) => {
    console.log("call");
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
          dispatch(setTotal(res.total));
          console.log(res);
        });
    } catch (error) {
      dispatch(requestFailed(error.message));
      return;
    }
  };

export default function Posts() {
  // console.log("1")
  const { loading, success, error, data, id, total } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  // var pageSizeId = `page_size`;
  // var pageNumberId = `page_number`;
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  useEffect(() => {
    !loading && success === null && fetchData()(dispatch, 10, 1);
  }, []);
  return (
    <>
      {/* <NumberInputLabel for={pageSizeId} text="Enter Page Size:" />
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
      /> */}
      <RenderIf isTrue={!loading} fallback={<h1>Loading</h1>}>
        <RenderIf isTrue={success} fallback={<h1>{error}</h1>}>
          <Table
            data={data}
            dispatch={dispatch}
            restrict={["userId", "reactions"]}
            numeric={["id", "views"]}
            uneditable={"id"}
            edits={edits}
            deletes={deletes}
            id={id}
            editId={editId}
            addId={addId}
            getId={getId}
            headline="Posts"
          />
          <Pagination
            fetch={fetchData}
            dispatch={dispatch}
            total={total}
            pageSize={pageSize}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            data={data}
          />
        </RenderIf>
      </RenderIf>
    </>
  );
}
