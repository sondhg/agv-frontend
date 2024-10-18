//from 1 to 4
export const agvIDs = Array.from({ length: 4 }, (_, index) =>
  (index + 1).toString(),
);

//from 1 to 15
export const startPoints = Array.from({ length: 15 }, (_, index) =>
  (index + 1).toString(),
);

//from 1 to 15
export const endPoints = Array.from({ length: 15 }, (_, index) =>
  (index + 1).toString(),
);

export const loadNames = ["Stone", "Cement", "Steel", "Iron"];

export const inputFields = [
  "agv_id",
  "order_date",
  "start_time",
  "start_point",
  "end_point",
  "load_weight",
  "load_name",
];
