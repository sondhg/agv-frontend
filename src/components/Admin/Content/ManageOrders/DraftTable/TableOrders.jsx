import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import cloneDeep from "lodash/cloneDeep";
import orderBy from "lodash/orderBy";
import { ArrowDown, ArrowUp, ArrowUp01, Trash } from "lucide-react";
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

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("order_id");

  const [clonedListOrders, setClonedListOrders] = useState(
    cloneDeep(listOrders),
  );

  const [currentPage, setCurrentPage] = useState(1);

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

  // edit tableHeaders if you want more columns
  const tableHeaders = [
    { label: "Order ID", sortKey: "order_id" },
    { label: "Order date", sortKey: "order_date" },
    { label: "Start time", sortKey: "start_time" },
    { label: "Start point", sortKey: "start_point" },
    { label: "End point", sortKey: "end_point" },
    { label: "Load name", sortKey: "load_name" },
    { label: "Load amount", sortKey: "load_amount" },
    { label: "Load weight", sortKey: "load_weight" },
    { label: "Action", sortKey: null },
  ];

  return (
    <div className="menu menu-vertical space-y-1">
      <div className="menu menu-horizontal space-x-5 rounded-box">
        <div
          className="tooltip tooltip-bottom"
          data-tip="Delete selected orders?"
        >
          <button
            id="mass-delete-btn"
            className="btn btn-error btn-sm"
            onClick={handleMassDelete}
          >
            <Trash size={16} />
            <span>MASS DELETE</span>
          </button>
        </div>
        <div>
          <button className="btn btn-neutral btn-sm" onClick={removeSorting}>
            <ArrowUp01 />
            <span>Remove sorting</span>
          </button>
        </div>
      </div>
      <div className="relative min-h-96">
        <table ref={tableOrdersRef} className="table bg-white text-black">
          <thead className="text-black">
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox-error checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </label>
              </th>
              {tableHeaders.map((header) => (
                <th key={header.label} scope="col">
                  <div className="flex justify-between">
                    <span>{header.label}</span>
                    {header.sortKey && (
                      <span className="flex">
                        <ArrowUp
                          size={16}
                          onClick={() => handleSort("asc", header.sortKey)}
                          className="cursor-pointer"
                        />
                        <ArrowDown
                          size={16}
                          onClick={() => handleSort("desc", header.sortKey)}
                          className="cursor-pointer"
                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(currentRows) && currentRows.length > 0 ? (
              currentRows.map((item, index) => (
                <tr
                  key={index}
                  className={item.highlighted ? "bg-neutral-content" : ""}
                >
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox-primary checkbox"
                        checked={item.selected || false}
                        onChange={(event) => handleCheckbox(event, item)}
                      />
                    </label>
                  </th>
                  {tableHeaders.map((header) => (
                    <td
                      key={header.label}
                      className={header.label === "Order ID" ? "font-bold" : ""}
                    >
                      {header.label === "Action" ? (
                        <div className="flex space-x-2">
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
                        </div>
                      ) : (
                        item[header.sortKey]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHeaders.length + 1}>No orders found.</td>
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
