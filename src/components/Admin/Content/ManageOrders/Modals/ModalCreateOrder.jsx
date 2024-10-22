import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { WarningIconSVG } from "../../../../../assets/SVGs/svg_daisyUI";
import { postCreateOrder } from "../../../../../services/apiServices";
import {
  endPoints,
  loadNames,
  startPoints,
} from "../../../../../utils/arraysUsedOften";
const NEW_DATE = new Date();
const NEW_LOCALE_DATE = NEW_DATE.toLocaleDateString();
const NEW_LOCALE_TIME = NEW_DATE.toLocaleTimeString([], {
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

// console.log("🚀 ~ NEW_DATE:", NEW_DATE);
// console.log("🚀 ~ NEW_DATE date localized:", NEW_DATE.toLocaleDateString("vi-VN"));

export default function ModalCreateOrder(props) {
  const { fetchListOrders } = props;

  const [start_point, setStartPoint] = useState(startPoints[0]);
  const [end_point, setEndPoint] = useState(endPoints[0]);

  const [load_name, setload_name] = useState(loadNames[0]);
  const [load_amount, setload_amount] = useState(0);
  const [load_weight, setLoadWeight] = useState(0);

  const [originalDate, setOriginalDate] = useState(NEW_DATE);
  const [order_date, setOrderDate] = useState(NEW_LOCALE_DATE);
  const [start_time, setStartTime] = useState(NEW_LOCALE_TIME);

  const [warningMsg, setWarningMsg] = useState("");
  const [showWarningMsg, setShowWarningMsg] = useState(false);

  const handleClose = () => {
    document.getElementById("modal-create-order").close();

    setShowWarningMsg(false);
    setWarningMsg("");

    setOriginalDate(NEW_DATE);
    setOrderDate(NEW_LOCALE_DATE);
    setStartTime(NEW_LOCALE_TIME);
    setStartPoint(startPoints[0]);
    setEndPoint(endPoints[0]);
    setload_amount(0);
    setload_name(loadNames[0]);
  };

  const handleSubmitCreateOrder = async () => {
    const loadAmountStr = String(load_amount);

    if (
      parseFloat(loadAmountStr) < 0 ||
      loadAmountStr.includes("-") ||
      !loadAmountStr
    ) {
      setShowWarningMsg(true);
      setWarningMsg("Load amount must not be negative or contain minus sign!");

      setload_amount(0);
      return;
    }

    if (
      start_time.length !== 8 ||
      start_time[2] !== ":" ||
      start_time[5] !== ":"
    ) {
      setShowWarningMsg(true);
      setWarningMsg("Start time must be in the format HH:MM:SS!");
      setStartTime(NEW_LOCALE_TIME);
      return;
    }

    let order = {
      order_date,
      start_time,
      start_point,
      end_point,
      load_name,
      load_amount,
      load_weight,
    };

    let res = await postCreateOrder(order);

    console.log(">>> response from create order API:", res);
    if (res) {
      toast.success("Order successfully added!");
      handleClose();
      await fetchListOrders();
    }
  };

  useEffect(() => {
    let weightPerUnit = 0;
    if (load_name === "Stone") {
      weightPerUnit = 1;
    } else if (load_name === "Cement") {
      weightPerUnit = 2;
    } else if (load_name === "Iron") {
      weightPerUnit = 3;
    }
    setLoadWeight(weightPerUnit * load_amount);
  }, [load_name, load_amount]);

  return (
    <dialog id="modal-create-order" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h1 className="pb-4 text-xl font-bold">Add new order</h1>
        <form>
          <div className="grid grid-cols-2 grid-rows-4 gap-4">
            <label className="form-control w-full max-w-xs">
              <div>
                <div className="label">
                  <span className="label-text">Date (month/date/year)</span>
                </div>
                <DatePicker
                  title="Please enter date in MM/dd/yyyy format (e.g., 12/31/2024)"
                  className="select select-bordered select-accent"
                  toggleCalendarOnIconClick
                  preventOpenOnFocus
                  customInput={
                    <input
                      maxLength={10}
                      className="input input-bordered w-80 max-w-xs"
                    />
                  }
                  selected={originalDate}
                  minDate={NEW_DATE}
                  dateFormat="MM/dd/yyyy"
                  onChange={(date) => {
                    setOriginalDate(date);
                    // setOrderDate(date.toJSON()); // ! bị chậm theo giờ UTC
                    setOrderDate(date.toLocaleDateString()); // * đúng theo giờ local
                  }}
                />
              </div>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Start time</span>
              </div>
              <input
                type="text"
                className="input input-bordered input-accent w-full max-w-xs"
                value={start_time}
                onChange={(event) => setStartTime(event.target.value)}
                maxLength={8}
                pattern="^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$"
                title="Please enter time in hh:mm:ss format (e.g., 14:30:00)"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Start point</span>
              </div>
              <select
                className="select select-bordered select-accent"
                value={start_point}
                type="number"
                onChange={(event) => setStartPoint(event.target.value)}
              >
                {startPoints.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">End point</span>
              </div>
              <select
                className="select select-bordered select-accent"
                value={end_point}
                type="number"
                onChange={(event) => setEndPoint(event.target.value)}
              >
                {endPoints.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Load name</span>
              </div>
              <select
                className="select select-bordered select-accent"
                value={load_name}
                type="number"
                onChange={(event) => setload_name(event.target.value)}
              >
                {loadNames.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Load amount</span>
              </div>
              <input
                type="number"
                min={0}
                className="input input-bordered input-accent w-full max-w-xs"
                value={load_amount}
                onChange={(event) => setload_amount(event.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Load weight (calculated)</span>
              </div>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                value={load_weight}
                readOnly
              />
            </label>

            {showWarningMsg == true && (
              <div role="alert" className="alert alert-warning col-span-2 my-2">
                <WarningIconSVG />
                <span>Warning: {warningMsg}</span>
              </div>
            )}
          </div>
        </form>

        {/* luôn đặt modal-action phía dưới cùng */}
        <div className="modal-action">
          <button
            className="btn btn-accent"
            onClick={() => handleSubmitCreateOrder()}
          >
            Create order
          </button>
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
              onClick={handleClose}
            >
              ✕
            </button>
            <button className="btn btn-ghost" onClick={handleClose}>
              Cancel
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={handleClose}>
          Click outside to close - this btn cannot be seen
        </button>
      </form>
    </dialog>
  );
}

ModalCreateOrder.propTypes = {
  fetchListOrders: PropTypes.func,
};
