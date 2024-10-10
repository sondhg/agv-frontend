import PropTypes from "prop-types";
import { useState } from "react";
import csvExample from "../../../../../assets/images/testing/csvExample.png";
import csvExample2 from "../../../../../assets/images/testing/csvExample2.png";
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
    <dialog data-theme="light" id="modal-csv-guide" className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <h1 data-theme="light" className="text-xl font-bold">
          Correct CSV file format
        </h1>
        <div className="space-y-5">
          <div role="alert" className="alert shadow-lg">
            <InfoIconSVG />
            <span>
              Imported .csv file must have a <b>header row</b> containing the{" "}
              <b>exact variable names</b>, in the <b>exact order</b> from left
              to right, as shown in the{" "}
              <span className="text-danger">example</span> below:
            </span>
          </div>
          <div className="grid place-content-center shadow-xl">
            <img src={csvExample} />
          </div>
          <div className="grid place-content-center shadow-xl">
            <img src={csvExample2} />
          </div>
          <div role="alert" className="alert shadow-lg">
            <InfoIconSVG />
            <span>
              <code>order_date</code> should be in format:{" "}
              <code>date/month/year</code> (<b>dd/MM/yyyy</b>)
            </span>
          </div>
          <div role="alert" className="alert shadow-lg">
            <InfoIconSVG />
            <span>
              <code>start_time</code> should be in 24-hour format, specifically:{" "}
              <code>hour:minute:second</code> (<b>HH:mm:ss</b>)
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
              data-theme="light"
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
