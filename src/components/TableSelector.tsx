
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  const handleTableSelect = (tableName: string) => {
    toast({
      title: "Table Selected",
      description: `Loading data from ${tableName}...`,
    });
    onTableSelect(tableName);
  };
  
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium flex items-center">
        <Database className={`h-4 w-4 mr-1 ${colorClass}`} />
        Select Table
      </label>
      <Select
        value={selectedTable || ''}
        onValueChange={handleTableSelect}
        disabled={isLoading || tables.length === 0}
      >
        <SelectTrigger className={cn("w-full", tables.length === 0 ? "opacity-50" : "")}>
          <SelectValue placeholder="Select a table" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-md">
          {tables.map((table) => (
            <SelectItem key={table} value={table} className="hover:bg-gray-100">
              {table}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {tables.length === 0 && !isLoading && (
        <p className="text-xs text-muted-foreground">No tables available</p>
      )}
    </div>
  );
};

export default TableSelector;
