export default function TableSchedules() {
  return (
    <table className="table table-xs">
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
          <th scope="col">Load weight</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}
