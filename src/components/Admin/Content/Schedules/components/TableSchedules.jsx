import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

export default function TableSchedules(props) {
  const { listSchedules } = props;

  const tableRef = useRef(null);
  const [colSpan, setColSpan] = useState(1);

  useEffect(() => {
    if (tableRef.current) {
      const columnCount = tableRef.current.rows[0].cells.length;
      setColSpan(columnCount);
    }
  }, []);
  return (
    <table className="table table-zebra table-xs" ref={tableRef}>
      <thead>
        <tr>
          <th scope="col">Schedule ID</th>
          <th scope="col">Order ID</th>
          <th scope="col">Order date</th>
          <th scope="col">Est. Start time</th>
          <th scope="col">Est. End time</th>
          <th scope="col">Start point</th>
          <th scope="col">End point</th>
          <th scope="col">Load name</th>
          <th scope="col">Load amount</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(listSchedules) && listSchedules.length > 0 ? (
          listSchedules.map((item, index) => (
            <tr key={index}>
              <td>{item.schedule_id}</td>
              <td>{item.order_id}</td>
              <td>{item.order_date}</td>
              <td>{item.est_start_time}</td>
              <td>{item.est_end_time}</td>
              <td>{item.start_point}</td>
              <td>{item.end_point}</td>
              <td>{item.load_name}</td>
              <td>{item.load_amount}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={colSpan}>Data not found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

TableSchedules.propTypes = {
  listSchedules: PropTypes.array,
};
