import { useSelector, useDispatch } from "react-redux";
import {
  requestStarted,
  requestFailed,
  requestSucceeded,
  edits,
  deletes,
  editId,
  addId,
  getId,
  setTotal,
} from "./ProductSlice";
import RenderIf from "../components/RenderIf";
import Table from "../components/Table";
import React, { useState } from "react";
import Pagination from "../components/Pagination";
import { useEffect } from "react";
import array from "./ProductRestricts";

const fetchData =
  () =>
  async (dispatch, page_size = 10, page_number = 1) => {
    let response;
    try {
      dispatch(requestStarted());
      response = await fetch(
        "https://dummyjson.com/products?" +
          "skip=" +
          page_size * (page_number - 1) +
          "&limit=" +
          page_size
      )
        .then((res) => res.json())
        .then((res) => {
          dispatch(requestSucceeded(res.products));
          dispatch(setTotal(res.total));
          console.log(res);
        });
    } catch (error) {
      dispatch(requestFailed(error.message));
      return;
    }
  };

const Products = () => {
  const { loading, success, error, data, id, total } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();
  // var pageSizeId = `page_size`;
  // var pageNumberId = `page_number`;
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  // let pageSize = 10;
  // let pageNumber = 1;
  useEffect(
    () =>
      !loading &&
      success === null &&
      fetchData()(dispatch, pageSize, pageNumber),
    []
  );
  return (
    <>
      <RenderIf isTrue={!loading} fallback={<h1>Loading</h1>}>
        <RenderIf isTrue={success} fallback={<h1>{error}</h1>}>
          <Table
            data={data}
            dispatch={dispatch}
            restrict={array}
            numeric={["id", "price", "stock"]}
            uneditable={"id"}
            edits={edits}
            deletes={deletes}
            id={id}
            editId={editId}
            addId={addId}
            getId={getId}
            headline="Products"
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
};

export default Products;
