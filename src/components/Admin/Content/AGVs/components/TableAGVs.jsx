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

// ! remove this line when /api/AGVs is ready
import { listAGVs } from "./dummyData";

export default function TableAGVs(props) {
  // ! when /api/AGVs is ready, uncomment this line and delete the dummy data import
  // const { listAGVs } = props;

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

  //edit tableHeaders if you want more columns
  const tableHeaders = [
    { name: "Schedule ID", key: "agv_id" },
    { name: "Max speed", key: "max_speed" },
    { name: "Max battery", key: "max_battery" },
    { name: "Max load", key: "max_load" },
    { name: "Guidance type", key: "guidance_type" },
    { name: "Is connected?", key: "is_connected" },
    { name: "Is busy?", key: "is_busy" },
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
                    className={header.key === "agv_id" ? "font-medium" : ""}
                  >
                    {item[header.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={tableHeaders.length}>
                No data available
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

TableAGVs.propTypes = {
  listAGVs: PropTypes.array,
};
