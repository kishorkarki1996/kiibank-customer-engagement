import {
    columnFilteringFeature,
    createFilteredRowModel,
    createPaginatedRowModel,
    filterFn_includesString,
    globalFilteringFeature,
    rowPaginationFeature,
    tableFeatures,
  } from "@tanstack/react-table";
  
  export const dataTableFeatures = tableFeatures({
    columnFilteringFeature,
    globalFilteringFeature,
    rowPaginationFeature,
  
    filteredRowModel: createFilteredRowModel(),
    paginatedRowModel: createPaginatedRowModel(),
  
    filterFns: {
      includesString: filterFn_includesString,
    },
  });