import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import "react-toastify/dist/ReactToastify.css";
import { getAllOrders } from "../../../../services/apiServices";
import TableOrders from "./DraftTable/TableOrders";
import ModalCreateOrder from "./Modals/ModalCreateOrder";
import ModalCsvGuide from "./Modals/ModalCsvGuide";
import ModalDeleteOrder from "./Modals/ModalDeleteOrder";
import ModalUpdateOrder from "./Modals/ModalUpdateOrder";

export default function ManageOrder() {
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [listOrders, setListOrders] = useState([]);

  const [dataExport, setDataExport] = useState([]);

  const fetchListOrders = async () => {
    let res = await getAllOrders();
    // console.log(">>> res: ", res);
    setListOrders(res); //xem database để đặt thêm sau res
  };

  const handleClickBtnUpdate = (order) => {
    document.getElementById("modal-update-order").showModal();
    setDataUpdate(order);
    console.log(">>> update order ", order);
  };

  const handleClickBtnDelete = (order) => {
    document.getElementById("modal-delete-order").showModal();
    console.log(">>> delete order: ", order);
    setDataDelete(order);
  };

  const resetUpdateData = () => {
    setDataUpdate({});
  };

  useEffect(() => {
    fetchListOrders();
  }, []);

  const getOrdersExport = (event, done) => {
    let result = [];
    if (listOrders && listOrders.length > 0) {
      result.push([
        "agv_id",
        "order_date",
        "start_time",
        "start_point",
        "end_point",
        "load_name",
        "load_amount",
      ]);
      listOrders.map((item) => {
        let arr = [];
        arr[0] = item.agv_id;
        arr[1] = item.order_date;
        arr[2] = item.start_time;
        arr[3] = item.start_point;
        arr[4] = item.end_point;
        arr[5] = item.load_name;
        arr[6] = item.load_amount;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  const handleSearch = debounce((event) => {
    let term = event.target.value;
    if (term) {
      let cloneListOrders = cloneDeep(listOrders);
      cloneListOrders = cloneListOrders.filter((item) =>
        item.order_date.includes(term),
      );
      setListOrders(cloneListOrders);
    } else {
      fetchListOrders();
    }
  }, 500);

  // console.log(">>> listOrders: ", listOrders);

  // console.log(">>> a: ", a); //*dòng này dùng test lỗi: code sai thay vì nát UI thì sẽ đẩy sang fallback UI nhờ react-error-boundary
  return (
    <div>
      <h2 className="my-1 text-3xl font-bold">Manage Orders</h2>
      <div className="-space-y-3">
        <div className="menu">
          <div className="menu menu-horizontal space-x-5 rounded-box">
            <button
              className="btn btn-accent btn-wide"
              onClick={() =>
                document.getElementById("modal-create-order").showModal()
              }
            >
              <i className="fa-solid fa-circle-plus"></i>
              <span>Create order</span>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() =>
                document.getElementById("modal-csv-guide").showModal()
              }
            >
              <i className="fa-solid fa-lightbulb"></i>
              <span>Import CSV</span>
            </button>
            <CSVLink
              filename={"orders_export.csv"}
              className="btn btn-info"
              data={dataExport}
              asyncOnClick={true}
              onClick={(event, done) => getOrdersExport(event, done)}
            >
              <i className="fa-solid fa-file-export"></i>
              <span>Export CSV</span>
            </CSVLink>
            <label
              data-theme="light"
              className="input input-bordered flex items-center gap-2"
            >
              <input
                type="text"
                className="grow"
                placeholder="Search order by date"
                onChange={(event) => handleSearch(event)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>

        <div className="table-orders-container overflow-x-auto">
          <TableOrders
            listOrders={listOrders}
            setListOrders={setListOrders}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
          />
        </div>

        <ModalCreateOrder fetchListOrders={fetchListOrders} />

        <ModalUpdateOrder
          dataUpdate={dataUpdate}
          fetchListOrders={fetchListOrders}
          resetUpdateData={resetUpdateData}
        />

        <ModalDeleteOrder
          dataDelete={dataDelete}
          fetchListOrders={fetchListOrders}
        />

        <ModalCsvGuide fetchListOrders={fetchListOrders} />
      </div>
    </div>
  );
}
