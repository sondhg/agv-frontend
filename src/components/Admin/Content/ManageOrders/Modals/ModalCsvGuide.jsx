import PropTypes from "prop-types";
import { useState } from "react";
import {
  InfoIconSVG,
  WarningIconSVG,
} from "../../../../../assets/SVGs/svg_daisyUI";
import handleImportCSV from "../../../../../services/csvImportServices";

export default function ModalCsvGuide(props) {
  const { fetchListOrders } = props;

  const [warningMsg, setWarningMsg] = useState("");
  const [showWarningMsg, setShowWarningMsg] = useState(false);

  const handleClose = () => {
    document.getElementById("modal-csv-guide").close();
    setShowWarningMsg(false);
    setWarningMsg("");
  };

  return (
    <dialog id="modal-csv-guide" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h1 className="mb-2 text-xl font-bold">Correct CSV file format</h1>
        <div className="space-y-5">
          <div role="alert" className="alert shadow-lg">
            <InfoIconSVG />
            <span>
              File must have a <b>header row</b> containing the{" "}
              <b>exact column names</b>, in the <b>exact order</b> from left to
              right, as shown below:
            </span>
          </div>

          <div className="mockup-code">
            <pre data-prefix="$" className="text-success">
              <code>
                order_date,start_time,start_point,end_point,load_name,load_weight
              </code>
            </pre>
            <pre data-prefix="$">
              <code>7/29/2024,16:30:00,1,3,Stone,5</code>
            </pre>
            <pre data-prefix="$">
              <code>7/29/2024,16:35:00,9,4,Steel,10</code>
            </pre>
            <pre data-prefix="$">
              <code>7/30/2024,09:00:00,2,8,Cement,2</code>
            </pre>
          </div>
          <div role="alert" className="alert shadow-lg">
            <InfoIconSVG />
            <span>
              <code className="text-success">order_date</code> should be in
              format: <code className="text-primary">dd/MM/yyyy</code> (
              <b>date/month/year</b>)
            </span>
          </div>
          <div role="alert" className="alert shadow-lg">
            <InfoIconSVG />
            <span>
              <code className="text-success">start_time</code> should be in
              23-hour format (from 00:00:00 to 23:59:59), specifically:{" "}
              <code className="text-primary">HH:mm:ss</code> (
              <b>hour:minute:second</b>)
            </span>
          </div>
          {showWarningMsg == true && (
            <div role="alert" className="alert alert-warning">
              <WarningIconSVG />
              <span>Warning: {warningMsg}</span>
            </div>
          )}
        </div>

        <div className="modal-action">
          <div>
            <label htmlFor="import-csv" className="btn btn-secondary">
              <div>
                <i className="fa-solid fa-file-import"></i>
                <span className="ms-2">Select file</span>
              </div>
            </label>
            <input
              id="import-csv"
              type="file"
              hidden
              onChange={(event) => {
                handleImportCSV(
                  event,
                  fetchListOrders,
                  setWarningMsg,
                  setShowWarningMsg,
                  handleClose,
                );
              }}
            />
          </div>
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button
              className="btn btn-circle btn-sm absolute right-2 top-2"
              onClick={handleClose}
            >
              ✕
            </button>
            <button className="btn" onClick={handleClose}>
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

ModalCsvGuide.propTypes = {
  fetchListOrders: PropTypes.func.isRequired,
};
