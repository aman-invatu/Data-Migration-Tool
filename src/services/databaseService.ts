
// This is a mock service for simulating database operations
// In a real application, you would use actual database connections

// Mock tables and data
const MOCK_RETOOL_TABLES = ['dummy_table', 'users', 'products', 'orders', 'customers', 'transactions'];
const MOCK_SUPABASE_TABLES = ['dummy_table', 'profiles', 'auth', 'settings'];

// Mock data for Retool's dummy_table
const MOCK_RETOOL_DATA = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  { id: 3, name: 'Alex Johnson', email: 'alex@example.com' },
  { id: 4, name: 'Sarah Williams', email: 'sarah@example.com' },
  { id: 5, name: 'Michael Brown', email: 'michael@example.com' },
];

// Mock data for other Retool tables
const MOCK_RETOOL_USERS_DATA = [
  { id: 1, username: 'admin', role: 'administrator', created_at: '2023-01-15' },
  { id: 2, username: 'user1', role: 'editor', created_at: '2023-02-20' },
  { id: 3, username: 'user2', role: 'viewer', created_at: '2023-03-05' },
];

const MOCK_RETOOL_PRODUCTS_DATA = [
  { id: 101, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 102, name: 'Desk Chair', price: 199, category: 'Furniture' },
  { id: 103, name: 'Coffee Mug', price: 15, category: 'Kitchen' },
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
    
    // Check if it's at least a postgres connection string - accept all formats starting with postgresql:// or postgres://
    if (!connectionString.toLowerCase().includes('postgres')) {
      throw new Error('Connection string must include postgres or postgresql');
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
      switch (tableName) {
        case 'dummy_table':
          return MOCK_RETOOL_DATA;
        case 'users':
          return MOCK_RETOOL_USERS_DATA;
        case 'products':
          return MOCK_RETOOL_PRODUCTS_DATA;
        default:
          // For other tables, return empty data
          return [];
      }
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
    // Only support migration between any tables for this demo
    // Simulate migration with progress updates
    let sourceData: any[] = [];
    
    // Get the appropriate source data based on the table name
    switch (sourceTable) {
      case 'dummy_table':
        sourceData = MOCK_RETOOL_DATA;
        break;
      case 'users':
        sourceData = MOCK_RETOOL_USERS_DATA;
        break;
      case 'products':
        sourceData = MOCK_RETOOL_PRODUCTS_DATA;
        break;
      default:
        sourceData = [];
    }
    
    const totalRecords = sourceData.length;
    
    if (totalRecords === 0) {
      throw new Error('No data found in the source table');
    }
    
    for (let i = 0; i < totalRecords; i++) {
      // Simulate record processing
      await delay(500);
      
      // Update progress
      const progress = Math.round(((i + 1) / totalRecords) * 100);
      onProgressUpdate(progress);
    }

    // Simulate successful migration - store the migrated data in the target
    if (targetTable === 'dummy_table') {
      MOCK_SUPABASE_DATA = [...sourceData];
    }
    
    return {
      success: true,
      recordsCount: totalRecords
    };
  }
};
