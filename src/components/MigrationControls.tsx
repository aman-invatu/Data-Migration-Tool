
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface MigrationControlsProps {
  onMigrate: () => void;
  isMigrating: boolean;
  sourceTable: string | null;
  targetTable: string | null;
  progress: number | null;
}

const MigrationControls = ({
  onMigrate,
  isMigrating,
  sourceTable,
  targetTable,
  progress
}: MigrationControlsProps) => {
  const canMigrate = sourceTable && targetTable;

  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {sourceTable || 'Select Source'}
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm text-muted-foreground">
            {targetTable || 'Select Target'}
          </div>
        </div>

        {isMigrating && progress !== null && (
          <div className="space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-center text-sm text-muted-foreground">
              {progress}% Complete
            </p>
          </div>
        )}

        <Button 
          onClick={onMigrate}
          disabled={!canMigrate || isMigrating} 
          className="w-full bg-gradient-to-r from-retool to-supabase text-white"
        >
          {isMigrating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Migrating...
            </>
          ) : (
            'Migrate Data'
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MigrationControls;
