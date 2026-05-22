import { useCallback, useMemo, useState } from 'react';

export interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  paginatedData: T[];
  canGoNext: boolean;
  canGoPrevious: boolean;
  nextPage: () => void;
  previousPage: () => void;
  resetPage: () => void;
}

export function usePagination<T>(
  data: T[],
  pageSize: number,
): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(data.length / pageSize)),
    [data.length, pageSize],
  );

  const paginatedData = useMemo<T[]>(() => {
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * pageSize;

    return data.slice(startIndex, startIndex + pageSize);
  }, [currentPage, data, pageSize, totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  }, [totalPages]);

  const previousPage = useCallback(() => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  }, []);

  const resetPage = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return {
    currentPage: Math.min(currentPage, totalPages),
    totalPages,
    pageSize,
    paginatedData,
    canGoNext: currentPage < totalPages,
    canGoPrevious: currentPage > 1,
    nextPage,
    previousPage,
    resetPage,
  };
}
