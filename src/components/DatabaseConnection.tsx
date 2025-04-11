
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Database, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface DatabaseConnectionProps {
  title: string;
  colorClass: string;
  onConnect: (connectionString: string) => Promise<void>;
  isConnected: boolean;
  isLoading: boolean;
}

const DatabaseConnection = ({
  title,
  colorClass,
  onConnect,
  isConnected,
  isLoading
}: DatabaseConnectionProps) => {
  const [connectionString, setConnectionString] = useState('');
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!connectionString.trim()) {
      toast({
        title: "Connection Error",
        description: "Please enter your database connection string",
        variant: "destructive",
      });
      return;
    }
    
    if (!connectionString.startsWith('postgres')) {
      toast({
        title: "Connection Error",
        description: "Connection string must start with postgres:// or postgresql://",
        variant: "destructive",
      });
      return;
    }
    
    await onConnect(connectionString);
  };

  return (
    <Card className="w-full">
      <CardHeader className={cn("bg-gradient-to-r", colorClass)}>
        <CardTitle className="flex items-center text-white">
          <Database className="mr-2 h-5 w-5" /> {title}
          {isConnected && <Check className="ml-2 h-5 w-5" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor={`${title.toLowerCase()}-connection`} className="text-sm font-medium">
              Connection String
            </label>
            <Input
              id={`${title.toLowerCase()}-connection`}
              type="text"
              placeholder="postgres://username:password@hostname:port/database"
              value={connectionString}
              onChange={(e) => setConnectionString(e.target.value)}
              disabled={isConnected}
            />
          </div>
          <Button 
            onClick={handleConnect} 
            className={cn("w-full", colorClass)}
            disabled={isLoading || isConnected}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isConnected ? 'Connected' : 'Connect'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseConnection;
