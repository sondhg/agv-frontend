import Papa from "papaparse";
import { toast } from "react-toastify";
import { postCreateOrder } from "./apiServices";

const handleImportCSV = (
  event,
  fetchListOrders,
  setWarningMsg,
  setShowWarningMsg,
  handleClose,
) => {
  if (event.target && event.target.files && event.target.files[0]) {
    let file = event.target.files[0];
    if (file.type !== "text/csv") {
      setShowWarningMsg(true);
      setWarningMsg("Wrong file format, only accept CSV!");
      // toast.error("Wrong file format, only accept CSV!");
      event.target.value = null; // Reset the file input value
      return;
    }
    console.log(">>> check file imported: ", file);
    Papa.parse(file, {
      complete: async function (results) {
        let rawCSV = results.data;

        if (rawCSV.length > 0) {
          if (rawCSV[0] && rawCSV[0].length === 6) {
            if (
              rawCSV[0][0] !== "order_date" ||
              rawCSV[0][1] !== "start_time" ||
              rawCSV[0][2] !== "start_point" ||
              rawCSV[0][3] !== "end_point" ||
              rawCSV[0][4] !== "load_name" ||
              rawCSV[0][5] !== "load_weight"
            ) {
              // toast.error("Wrong Header format in CSV file!");
              setShowWarningMsg(true);
              setWarningMsg("Wrong Header format in CSV file!");
            } else {
              let result = [];

              rawCSV.map((item, index) => {
                if (index > 0 && item.length === 6) {
                  let obj = {};
                  obj.order_date = item[0];
                  obj.start_time = item[1];
                  obj.start_point = item[2];
                  obj.end_point = item[3];
                  obj.load_name = item[4];
                  obj.load_weight = item[5];
                  result.push(obj);
                }
              });
              console.log(">>> result: ", result);

              const handleSubmitFileToAPI = async () => {
                try {
                  result.forEach(async (item) => {
                    let res = await postCreateOrder(item);
                    if (res) {
                      await fetchListOrders();
                    }
                  });
                } catch (error) {
                  setShowWarningMsg(true);
                  setWarningMsg("Failed to import data!");
                }
              };

              await handleSubmitFileToAPI();
              toast.success("Imported!");
              handleClose();
              event.target.value = null; // Reset the file input value
            }
          } else {
            setShowWarningMsg(true);
            setWarningMsg("Wrong format in CSV file!");
            toast.error("Wrong format in CSV file!");
          }
        } else {
          setShowWarningMsg(true);
          setWarningMsg("No data found in CSV file!");
          toast.error("No data found in CSV file!");
        }
      },
    });
  }
};

export default handleImportCSV;
