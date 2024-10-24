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

// ! remove this line when /api/AGVs is ready
import { listAGVs } from "./dummyData";

export default function TableAGVs(props) {
  // ! when /api/AGVs is ready, uncomment this line and delete the dummy data import
  // const { listAGVs } = props;

  const tableAGVsRef = useRef(null);
  const [colSpan, setColSpan] = useState(1);

  useEffect(() => {
    if (tableAGVsRef.current) {
      const columnCount = tableAGVsRef.current.rows[0].cells.length;
      setColSpan(columnCount);
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 5; // number of rows per page

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentRows = listAGVs.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(listAGVs.length / ROWS_PER_PAGE);

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
      <Table ref={tableAGVsRef}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Schedule ID</TableHead>
            <TableHead>Max speed</TableHead>
            <TableHead>Max battery</TableHead>
            <TableHead>Max load</TableHead>
            <TableHead>Guidance type</TableHead>
            <TableHead>Is connected?</TableHead>
            <TableHead>Is busy?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(currentRows) && currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.agv_id}</TableCell>
                <TableCell>{item.max_speed}</TableCell>
                <TableCell>{item.max_battery}</TableCell>
                <TableCell>{item.max_load}</TableCell>
                <TableCell>{item.guidance_type}</TableCell>
                <TableCell>{item.is_connected}</TableCell>
                <TableCell>{item.is_busy}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={colSpan}>No AGV registered.</TableCell>
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

TableAGVs.propTypes = {
  listAGVs: PropTypes.array,
};
