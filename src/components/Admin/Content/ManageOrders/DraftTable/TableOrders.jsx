import cloneDeep from "lodash/cloneDeep";
import orderBy from "lodash/orderBy";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { deleteOrder } from "../../../../../services/apiServices";

export default function TableOrders(props) {
  const {
    listOrders,
    setListOrders,
    handleClickBtnUpdate,
    handleClickBtnDelete,
  } = props;

  // search bar
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  // State to hold the cloned list of orders
  const [clonedListOrders, setClonedListOrders] = useState(
    cloneDeep(listOrders),
  );

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

  // actually this is sort by date and time (default sort of django orders_draft)
  const removeSorting = () => {
    setClonedListOrders(listOrders);
  };

  // select all checkboxes
  const [selectAll, setSelectAll] = useState(false);

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
      order.id === item.id
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

  const handleMassDelete = async () => {
    const selectedOrders = clonedListOrders.filter((order) => order.selected);
    const updatedOrders = clonedListOrders.filter((order) => !order.selected);

    // Delete selected orders from the database
    for (const order of selectedOrders) {
      await deleteOrder(order.id);
    }

    setClonedListOrders(updatedOrders);
    setListOrders(updatedOrders);
    setSelectAll(false); // Uncheck the "select all" checkbox after deletion
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

      <table className="table table-xs">
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
                    onClick={() => handleSort("desc", "id")}
                    className="fa-solid fa-arrow-down mx-1 cursor-pointer"
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "id")}
                    className="fa-solid fa-arrow-up mx-1 cursor-pointer"
                  ></i>
                </span>
              </div>
            </th>
            <th scope="col">
              <div className="flex justify-between">
                <span>AGV ID</span>
                <span>
                  <i
                    onClick={() => handleSort("desc", "agv_id")}
                    className="fa-solid fa-arrow-down mx-1 cursor-pointer"
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "agv_id")}
                    className="fa-solid fa-arrow-up mx-1 cursor-pointer"
                  ></i>
                </span>
              </div>
            </th>
            <th scope="col">
              <div className="flex justify-between">
                <span>Order date</span>
              </div>
            </th>
            <th scope="col">
              <div className="flex justify-between">
                <span>Start time</span>
              </div>
            </th>
            <th scope="col">From node</th>
            <th scope="col">To node</th>
            <th scope="col">Load name</th>
            <th scope="col">Load weight</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clonedListOrders && clonedListOrders.length > 0 ? (
            clonedListOrders.map((item, index) => (
              <tr
                key={`table-orders-${index}`}
                className={item.highlighted ? "bg-neutral" : ""}
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
                <td className="font-bold">{item.id}</td>
                <td>{item.agv_id}</td>
                <td>{item.order_date}</td>
                <td>{item.start_time}</td>
                <td>Node {item.start_point}</td>
                <td>Node {item.end_point}</td>
                <td>{item.load_name}</td>
                <td>{item.load_weight} kg</td>
                <td className="actions-cell">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleClickBtnUpdate(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleClickBtnDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={"10"}>Data not found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

TableOrders.propTypes = {
  listOrders: PropTypes.arrayOf(PropTypes.object),
  setListOrders: PropTypes.func,
  handleClickBtnUpdate: PropTypes.func,
  handleClickBtnDelete: PropTypes.func,
};
