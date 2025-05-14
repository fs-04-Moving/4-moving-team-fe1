'use client';

import { createContext, useContext, useState } from 'react';

type FilterContextType = {
  movingSelected: Record<number, boolean>;
  setMovingSelected: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  filterSelected: Record<number, boolean>;
  setFilterSelected: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  selectedServiceTypes: string[];
  setSelectedServiceTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [movingSelected, setMovingSelected] = useState<Record<number, boolean>>({});
  const [filterSelected, setFilterSelected] = useState<Record<number, boolean>>({});
  const [selectedServiceTypes, setSelectedServiceTypes] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  return (
    <FilterContext.Provider
      value={{
        movingSelected,
        setMovingSelected,
        filterSelected,
        setFilterSelected,
        selectedServiceTypes,
        setSelectedServiceTypes,
        selectedFilters,
        setSelectedFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilter must be used within a FilterProvider');
  return context;
};
