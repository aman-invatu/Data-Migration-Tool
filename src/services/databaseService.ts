
// This is a mock service for simulating database operations
// In a real application, you would use actual database connections

// Mock tables and data
const MOCK_RETOOL_TABLES = ['dummy_table', 'users', 'products', 'orders'];
const MOCK_SUPABASE_TABLES = ['dummy_table', 'profiles', 'auth', 'settings'];

// Mock data for Retool's dummy_table
const MOCK_RETOOL_DATA = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alex Johnson', email: 'alex@example.com' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com' },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com' },
];

// Mock empty data for Supabase's dummy_table (will be populated after migration)
let MOCK_SUPABASE_DATA: any[] = [];

// Simulate connection delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const databaseService = {
  // Connect to database
  connectToDatabase: async (type: 'retool' | 'supabase', connectionString: string) => {
    // Basic validation for connection string
    if (!connectionString.trim()) {
      throw new Error('Connection string cannot be empty');
    }
    
    // Check if it's at least a postgres connection string - accept all formats starting with postgresql://
    if (!connectionString.startsWith('postgres')) {
      throw new Error('Connection string must start with postgres:// or postgresql://');
    }
    
    // Simulate connection delay
    await delay(1500);
    
    // Return mock tables
    return type === 'retool' ? MOCK_RETOOL_TABLES : MOCK_SUPABASE_TABLES;
  },

  // Get table data
  getTableData: async (type: 'retool' | 'supabase', tableName: string) => {
    // Simulate database query delay
    await delay(1000);
    
    // Return mock data based on database and table
    if (type === 'retool') {
      if (tableName === 'dummy_table') {
        return MOCK_RETOOL_DATA;
      }
      // For other tables, return empty data
      return [];
    } else {
      if (tableName === 'dummy_table') {
        return MOCK_SUPABASE_DATA;
      }
      // For other tables, return empty data
      return [];
    }
  },

  // Migrate data
  migrateData: async (
    sourceTable: string, 
    targetTable: string, 
    onProgressUpdate: (progress: number) => void
  ) => {
    // Only support dummy_table for this demo
    if (sourceTable !== 'dummy_table' || targetTable !== 'dummy_table') {
      throw new Error('Only dummy_table is supported for migration in this demo');
    }

    // Get source data
    const sourceData = MOCK_RETOOL_DATA;
    
    // Simulate migration with progress updates
    const totalRecords = sourceData.length;
    
    for (let i = 0; i < totalRecords; i++) {
      // Simulate record processing
      await delay(500);
      
      // Update progress
      const progress = Math.round(((i + 1) / totalRecords) * 100);
      onProgressUpdate(progress);
    }

    // Simulate successful migration
    MOCK_SUPABASE_DATA = [...MOCK_RETOOL_DATA];
    
    return {
      success: true,
      recordsCount: totalRecords
    };
  }
};
