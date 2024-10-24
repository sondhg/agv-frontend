import { useEffect, useState } from "react";
import { getAllAGVs } from "../../../../services/apiServices";
import TableAGVs from "./components/TableAGVs";

export default function AGVs() {
  const [listAGVs, setListAGVs] = useState([]);

  const fetchListAGVs = async () => {
    let res = await getAllAGVs();
    console.log(">>> res: ", res);
    setListAGVs(res);
  };

  useEffect(() => {
    fetchListAGVs();
  }, []);

  return (
    <div>
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">AGVs</h2>
        <TableAGVs listAGVs={listAGVs} />
      </div>
    </div>
  );
}
