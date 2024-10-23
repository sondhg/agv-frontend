import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

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

  const tableSchedulesRef = useRef(null);
  const [colSpan, setColSpan] = useState(1);

  useEffect(() => {
    if (tableSchedulesRef.current) {
      const columnCount = tableSchedulesRef.current.rows[0].cells.length;
      setColSpan(columnCount);
    }
  }, []);

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

  return (
    <div className="relative min-h-96">
      <Table ref={tableSchedulesRef}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Schedule ID</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Order date</TableHead>
            <TableHead>Est. Start time</TableHead>
            <TableHead>Est. End time</TableHead>
            <TableHead>Start point</TableHead>
            <TableHead>End point</TableHead>
            <TableHead>Load name</TableHead>
            <TableHead>Load amount</TableHead>
            <TableHead className="text-right">Load weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(currentRows) && currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {item.schedule_id}
                </TableCell>
                <TableCell>{item.order_id}</TableCell>
                <TableCell>{item.order_date}</TableCell>
                <TableCell>{item.est_start_time}</TableCell>
                <TableCell>{item.est_end_time}</TableCell>
                <TableCell>{item.start_point}</TableCell>
                <TableCell>{item.end_point}</TableCell>
                <TableCell>{item.load_name}</TableCell>
                <TableCell>{`${item.load_amount} units`}</TableCell>
                <TableCell className="text-right">{`${item.load_weight} kg`}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={colSpan}>No schedules available.</TableCell>
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
