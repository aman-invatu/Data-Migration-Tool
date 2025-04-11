
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Database, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DatabaseConnectionProps {
  title: string;
  colorClass: string;
  onConnect: (connectionString: string) => Promise<boolean>; // Updated return type to boolean
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
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = async () => {
    setError(null);
    
    if (!connectionString.trim()) {
      setError("Please enter your database connection string");
      toast({
        title: "Connection Error",
        description: "Please enter your database connection string",
        variant: "destructive",
      });
      return;
    }
    
    // Basic validation for postgres connection string
    if (!connectionString.toLowerCase().includes('postgres')) {
      setError("Connection string must include 'postgres' somewhere in the string");
      toast({
        title: "Connection Error",
        description: "Connection string must include 'postgres' somewhere in the string",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const connected = await onConnect(connectionString);
      
      if (!connected) {
        setError("Failed to connect to the database. Please check your connection string.");
        toast({
          title: "Connection Error",
          description: "Failed to connect to the database. Please check your connection string.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connection Successful",
          description: `Successfully connected to ${title}`,
        });
      }
    } catch (error: any) {
      setError(error.message || "Failed to connect to the database");
      toast({
        title: "Connection Error",
        description: error.message || "Failed to connect to the database",
        variant: "destructive",
      });
    }
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
              onChange={(e) => {
                setConnectionString(e.target.value);
                setError(null); // Clear error when user changes the input
              }}
              disabled={isConnected}
            />
            {error && (
              <Alert variant="destructive" className="mt-2 py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="ml-2">{error}</AlertDescription>
              </Alert>
            )}
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
