/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../Layout/HOC";
import TableLayout from "../../Component/TableLayout";
import { getApi, removeApi } from "../../Repository/Repository";
import  CreateBook  from "../../Component/Modals/Modals";
import Pagination from "../../Component/Pagination";
import { debouncedSetQuery } from "../../utils/utils";


const thead = ["Sno.", "Title", "Author", "Genre", "Published Year", "Action"];

const AllBooks = () => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [response, setResponse] = useState({ data: [] });
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");


  const fetchHandler = useCallback(() => {
    getApi({
      url: `api/book/getall/book?page=${page}&limit=${limit}&search=${search}`,
      setResponse,
      setLoading,
    });
  }, [limit, search, page]);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const deleteHandler = (id) => {
    const additionalFunctions = [fetchHandler];
    removeApi({
      url: `api/book/deleteBookById/${id}`,
      successMsg: "Removed!",
      additionalFunctions,
    });
  };


  const tbody = response?.books?.map((i, index) => [
    `#${index + 1}`,
    i.title,
    i.author,
    i.genre,
    i.published_year,
    <span className="flexCont">
      <i
        className="fa-solid fa-pen-to-square"
        onClick={() => {
          setId(i._id);
          setEdit(true);
          handleEditClick(i)
        }}
      />
      <i className="fa-sharp fa-solid fa-trash" onClick={() => deleteHandler(i._id)}></i>
    </span>,
  ]);

  const handleEditClick = (data) => {
    setSelected(data);
    setShow(true);
  };

  return (
    <>
      <CreateBook
        show={show}
        handleClose={() => setShow(false)}
        edit={edit}
        id={id}
        fetchApi={fetchHandler}
        data={selected}
      />
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold "
            style={{ fontSize: "1.5rem" }}
          >
            All Books({response?.totalItems || 0})
          </span>

          <button
            className="submitBtn"
            onClick={() => {
              setEdit(false);
              setShow(true);
            }}
          >
            Create New
          </button>
        </div>

        <div className="filterBox">
          <img
            src="https://t4.ftcdn.net/jpg/01/41/97/61/360_F_141976137_kQrdYIvfn3e0RT1EWbZOmQciOKLMgCwG.jpg"
            alt=""
          />
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) =>
              debouncedSetQuery({ term: e.target.value, setSearch })
            }
          />
        </div>

        <TableLayout thead={thead} tbody={tbody} loading={loading} />
        {(!response || response !== null) && (
          <Pagination
            hasNextPage={response?.data?.hasNextPage}
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            totalPages={response?.totalPages}
          />
        )}
      </section>
    </>
  );
};

export default HOC(AllBooks);
