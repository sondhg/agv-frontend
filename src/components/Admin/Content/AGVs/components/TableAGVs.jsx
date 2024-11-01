import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PropTypes from "prop-types";
import { useState } from "react";
import { deleteAGV } from "../../../../../services/apiServices";

export default function TableAGVs(props) {
  const { listAGVs, fetchListAGVs } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 4;

  // Sort listAGVs by agv_id in ascending order
  const sortedListAGVs = [...listAGVs].sort((a, b) => a.agv_id - b.agv_id);

  const indexOfLastRow = currentPage * ROWS_PER_PAGE;
  const indexOfFirstRow = indexOfLastRow - ROWS_PER_PAGE;
  const currentRows = sortedListAGVs.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(sortedListAGVs.length / ROWS_PER_PAGE);

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

  const handleDelete = async (agvId) => {
    try {
      await deleteAGV(agvId);
      await fetchListAGVs();
    } catch (error) {
      console.error("Failed to delete AGV:", error);
    }
  };

  const tableHeaders = [
    { label: "AGV ID", key: "agv_id" },
    { label: "Guidance type", key: "guidance_type" },
    { label: "Max battery", key: "max_battery" },
    { label: "Max load", key: "max_load" },
    { label: "Max speed", key: "max_speed" },
    { label: "Is connected?", key: "is_connected" },
    { label: "Is busy?", key: "is_busy" },
    { label: "Is active?", key: "is_active" },
    { label: "Action", key: null },
  ];

  return (
    <div className="relative min-h-96">
      <div className="rounded-md border-2">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHead
                  key={index}
                  className={header.label === "AGV ID" ? "w-[120px]" : ""}
                >
                  {header.label}
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
                      {header.key === "is_connected" ||
                      header.key === "is_busy" ||
                      header.key === "is_active" ? (
                        item[header.key] ? (
                          "Yes"
                        ) : (
                          "No"
                        )
                      ) : header.label === "Action" ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(item.agv_id)}
                              >
                                Delete
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove this AGV from team</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        item[header.key]
                      )}
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
      </div>

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
  fetchListAGVs: PropTypes.func.isRequired,
};
