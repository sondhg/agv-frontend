import PropTypes from "prop-types";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// ! remove this line when /api/schedules is ready
import { listSchedules } from "./dummyData";

export default function TableSchedules(props) {
  // ! when /api/schedules is ready, uncomment this line and delete the dummy data import
  // const { listSchedules } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 5; // number of rows per page

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentRows = listSchedules.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(listSchedules.length / ROWS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //edit tableHeaders if you want more columns
  const tableHeaders = [
    { name: "Schedule ID", key: "schedule_id" },
    { name: "Order ID", key: "order_id" },
    { name: "Order date", key: "order_date" },
    { name: "Est. Start time", key: "est_start_time" },
    { name: "Est. End time", key: "est_end_time" },
    { name: "Start point", key: "start_point" },
    { name: "End point", key: "end_point" },
    { name: "Load name", key: "load_name" },
    { name: "Load amount", key: "load_amount" },
    { name: "Load weight", key: "load_weight" },
  ];

  return (
    <div className="relative min-h-96">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeaders.map((header, index) => (
              <TableHead
                key={index}
                className={header.name === "Schedule ID" ? "w-[120px]" : ""}
              >
                {header.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(currentRows) && currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <TableRow key={index}>
                {tableHeaders.map((header, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className={
                      header.key === "schedule_id" ? "font-medium" : ""
                    }
                  >
                    {header.key === "load_amount"
                      ? `${item[header.key]} units`
                      : header.key === "load_weight"
                        ? `${item[header.key]} kg`
                        : item[header.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={tableHeaders.length}>
                No schedules available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination className="absolute bottom-0 w-full">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="cursor-pointer"
            />
          </PaginationItem>
          <PaginationItem>
            Page {currentPage} of {totalPages}
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

TableSchedules.propTypes = {
  listSchedules: PropTypes.array,
};
