import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import cloneDeep from "lodash/cloneDeep";
import orderBy from "lodash/orderBy";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { deleteOrder } from "../../../../../services/apiServices";

export default function TableOrders(props) {
  const {
    listOrders,
    setListOrders,
    handleClickBtnUpdate,
    handleClickBtnDelete,
  } = props;

  const [selectAll, setSelectAll] = useState(false);

  const tableOrdersRef = useRef(null);
  const [colSpan, setColSpan] = useState(1);

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("order_id");

  const [clonedListOrders, setClonedListOrders] = useState(
    cloneDeep(listOrders),
  );

  const [currentPage, setCurrentPage] = useState(1);

  // auto adjust colSpan
  useEffect(() => {
    if (tableOrdersRef.current) {
      const columnCount = tableOrdersRef.current.rows[0].cells.length;
      setColSpan(columnCount);
    }
  }, []);

  // Clone listOrders whenever it changes
  useEffect(() => {
    setClonedListOrders(cloneDeep(listOrders));
  }, [listOrders]);

  useEffect(() => {
    const sortedOrders = orderBy(cloneDeep(listOrders), [sortField], [sortBy]);
    setClonedListOrders(sortedOrders);
  }, [listOrders, sortBy, sortField]);

  const handleSort = (newSortBy, newSortField) => {
    setSortBy(newSortBy);
    setSortField(newSortField);
  };

  // Remove sorting, back to whichever default order by server
  const removeSorting = () => {
    setClonedListOrders(listOrders);
  };

  // select all checkboxes through header row checkbox
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedOrders = clonedListOrders.map((order) => ({
      ...order,
      selected: newSelectAll,
      highlighted: newSelectAll,
    }));
    setClonedListOrders(updatedOrders);
  };

  const handleCheckbox = (event, item) => {
    const updatedOrders = clonedListOrders.map((order) =>
      order.order_id === item.order_id
        ? {
            ...order,
            selected: event.target.checked,
            highlighted: event.target.checked,
          }
        : order,
    );
    setClonedListOrders(updatedOrders);

    // Check if all checkboxes are selected
    const allSelected = updatedOrders.every((order) => order.selected);
    setSelectAll(allSelected);
  };

  // mass delete
  const handleMassDelete = async () => {
    const selectedOrders = clonedListOrders.filter((order) => order.selected);
    const updatedOrders = clonedListOrders.filter((order) => !order.selected);

    // Delete selected orders from the database
    for (const order of selectedOrders) {
      await deleteOrder(order.order_id);
    }

    setClonedListOrders(updatedOrders);
    setListOrders(updatedOrders);
    setSelectAll(false); // Uncheck the "select all" checkbox after deletion
  };

  // pagination
  const ROWS_PER_PAGE = 5; // number of rows per page

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentRows = clonedListOrders.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(listOrders.length / ROWS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="menu menu-vertical space-y-1">
      <div className="menu menu-horizontal space-x-5 rounded-box">
        <div
          className="tooltip tooltip-bottom"
          data-tip="Delete all selected orders?"
        >
          <button
            id="mass-delete-btn"
            className="btn btn-error btn-sm"
            onClick={handleMassDelete}
          >
            <i className="fa-solid fa-trash-can"></i>
            <span>MASS DELETE</span>
          </button>
        </div>
        <div>
          <button className="btn btn-primary btn-sm" onClick={removeSorting}>
            <i className="fa-solid fa-arrow-up-1-9"></i>
            <span>Remove sorting</span>
          </button>
        </div>
      </div>
      <div className="relative min-h-96">
        <table ref={tableOrdersRef} data-theme="cupcake" className="table">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox-primary checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </label>
              </th>
              <th scope="col">
                <div className="flex justify-between">
                  <span>Order ID</span>
                  <span>
                    <i
                      onClick={() => handleSort("desc", "order_id")}
                      className="fa-solid fa-arrow-down mx-1 cursor-pointer"
                    ></i>
                    <i
                      onClick={() => handleSort("asc", "order_id")}
                      className="fa-solid fa-arrow-up mx-1 cursor-pointer"
                    ></i>
                  </span>
                </div>
              </th>
              <th scope="col">Order date</th>
              <th scope="col">Start time</th>
              <th scope="col">Start point</th>
              <th scope="col">End point</th>
              <th scope="col">Load name</th>
              <th scope="col">Load amount</th>
              <th scope="col">Load weight</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentRows) && currentRows.length > 0 ? (
              currentRows.map((item, index) => (
                <tr
                  key={index}
                  className={item.highlighted ? "bg-primary" : ""}
                >
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={item.selected || false}
                        onChange={(event) => handleCheckbox(event, item)}
                      />
                    </label>
                  </th>
                  <td className="font-bold">{item.order_id}</td>
                  <td>{item.order_date}</td>
                  <td>{item.start_time}</td>
                  <td>{`Point ${item.start_point}`}</td>
                  <td>{`Point ${item.end_point}`}</td>
                  <td>{item.load_name}</td>
                  <td>{`${item.load_amount} units`}</td>
                  <td>{`${item.load_weight} kg`}</td>

                  <td className="flex space-x-2">
                    <button
                      className="btn btn-warning btn-sm w-1/2"
                      onClick={() => handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-error btn-sm w-1/2"
                      onClick={() => handleClickBtnDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={colSpan}>Data not found</td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination className="absolute bottom-0 w-full">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="cursor-pointer"
              />
            </PaginationItem>
            <PaginationItem>
              Page {currentPage} of {totalPages}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="cursor-pointer"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

TableOrders.propTypes = {
  listOrders: PropTypes.arrayOf(PropTypes.object),
  setListOrders: PropTypes.func,
  handleClickBtnUpdate: PropTypes.func,
  handleClickBtnDelete: PropTypes.func,
};
