import isEmpty from "lodash/isEmpty";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { WarningIconSVG } from "../../../../../assets/SVGs/svg_daisyUI";
import { putUpdateOrder } from "../../../../../services/apiServices";
import {
  endPoints,
  loadNames,
  startPoints,
} from "../../../../../utils/arraysUsedOften";

const NEW_DATE = new Date();
const NEW_LOCALE_DATE = NEW_DATE.toLocaleDateString();
const NEW_LOCALE_TIME = NEW_DATE.toLocaleDateString([], {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export default function ModalUpdateOrder(props) {
  const { dataUpdate, resetUpdateData, fetchListOrders } = props;

  const [warningMsg, setWarningMsg] = useState("");
  const [showWarningMsg, setShowWarningMsg] = useState(false);

  const handleClose = () => {
    document.getElementById("modal-update-order").close();

    setShowWarningMsg(false);
    setWarningMsg("");

    setOriginalDate(NEW_DATE);
    setOrderDate(NEW_LOCALE_DATE);
    setStartTime(NEW_LOCALE_TIME);
    setStartPoint(startPoints[0]);
    setEndPoint(endPoints[0]);
    setLoadName(loadNames[0]);
    setLoadAmount(0);
    setLoadWeight(0);
    resetUpdateData();
  };

  const [start_point, setStartPoint] = useState(startPoints[0]);
  const [end_point, setEndPoint] = useState(endPoints[0]);

  const [load_name, setLoadName] = useState(loadNames[0]);
  const [load_amount, setLoadAmount] = useState(0);
  const [load_weight, setLoadWeight] = useState(0);

  const [originalDate, setOriginalDate] = useState(NEW_DATE);
  const [order_date, setOrderDate] = useState(NEW_LOCALE_DATE);
  const [start_time, setStartTime] = useState(NEW_LOCALE_TIME);

  const [cloneLoadAmount, setCloneLoadAmount] = useState(0);
  const [cloneStartTime, setCloneStartTime] = useState(NEW_LOCALE_TIME);

  useEffect(() => {
    if (!isEmpty(dataUpdate)) {
      //Nếu biến dataUpdate ko rỗng thì update state
      setOriginalDate(dataUpdate.order_date);
      setOrderDate(dataUpdate.order_date);
      setStartTime(dataUpdate.start_time);
      setStartPoint(dataUpdate.start_point);
      setEndPoint(dataUpdate.end_point);
      setLoadName(dataUpdate.load_name);
      setLoadAmount(dataUpdate.load_amount);

      setCloneLoadAmount(dataUpdate.load_amount);
      setCloneStartTime(dataUpdate.start_time);
    }
  }, [dataUpdate]);

  const handleSubmitUpdateOrder = async () => {
    const loadAmountStr = String(load_amount);

    if (
      parseFloat(loadAmountStr) < 0 ||
      loadAmountStr.includes("-") ||
      !loadAmountStr
    ) {
      setShowWarningMsg(true);
      setWarningMsg("Load amount must not be negative or contain minus sign!");
      setLoadAmount(cloneLoadAmount);
      return;
    }

    if (
      start_time.length !== 8 ||
      start_time[2] !== ":" ||
      start_time[5] !== ":"
    ) {
      setShowWarningMsg(true);
      setWarningMsg("Start time must be in the format HH:MM:SS!");
      setStartTime(cloneStartTime);
      return;
    }

    let orderWithID = {
      order_id: dataUpdate.order_id,
      order_date,
      start_time,
      start_point,
      end_point,
      load_name,
      load_amount,
      load_weight,
    };

    let res = await putUpdateOrder(orderWithID);

    if (res) {
      //chưa có validate
      toast.success("Update succeeded!");
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
    <dialog id="modal-update-order" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h1 className="pb-4 text-xl font-bold">Update existing order</h1>
        <form>
          <div className="grid grid-cols-2 grid-rows-4 gap-4">
            <label className="form-control w-full max-w-xs">
              <div>
                <div className="label">
                  <span className="label-text">Date (month/date/year)</span>
                </div>
                <DatePicker
                  title="Please enter date in MM/dd/yyyy format (e.g., 12/31/2024)"
                  className="select select-bordered select-warning"
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
                className="input input-bordered input-warning w-full max-w-xs"
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
                className="select select-bordered select-warning"
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
                className="select select-bordered select-warning"
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
                className="select select-bordered select-warning"
                value={load_name}
                type="number"
                onChange={(event) => setLoadName(event.target.value)}
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
                className="input input-bordered input-warning w-full max-w-xs"
                value={load_amount}
                onChange={(event) => setLoadAmount(event.target.value)}
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
        {/* luôn đặt div.modal-action gần phía dưới cùng, ngay trên form.modal-backdrop */}
        <div className="modal-action">
          <button
            className="btn btn-warning"
            onClick={() => handleSubmitUpdateOrder()}
          >
            Update
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

ModalUpdateOrder.propTypes = {
  dataUpdate: PropTypes.object,
  resetUpdateData: PropTypes.func.isRequired,
  fetchListOrders: PropTypes.func.isRequired,
};
