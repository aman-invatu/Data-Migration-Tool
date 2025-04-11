
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface TableSelectorProps {
  tables: string[];
  selectedTable: string | null;
  onTableSelect: (tableName: string) => void;
  isLoading: boolean;
  colorClass: string;
}

const TableSelector = ({
  tables,
  selectedTable,
  onTableSelect,
  isLoading,
  colorClass
}: TableSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Select Table</label>
      <Select
        value={selectedTable || ''}
        onValueChange={onTableSelect}
        disabled={isLoading || tables.length === 0}
      >
        <SelectTrigger className={cn("w-full", tables.length === 0 ? "opacity-50" : "")}>
          <SelectValue placeholder="Select a table" />
        </SelectTrigger>
        <SelectContent>
          {tables.map((table) => (
            <SelectItem key={table} value={table}>
              {table}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TableSelector;
