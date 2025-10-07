# API Integration Documentation

## Total Transactions API

This document describes the integration with the external MockAPI service for fetching transaction data.

### Environment Variables

Make sure to set the following environment variable in your `.env` file:

```
SECRET=your_mockapi_secret_key
```

### API Endpoint

- **Internal Route**: `/api/total-transactions`
- **External URL**: `https://{SECRET}.mockapi.io/api/v1/total-transactions`
- **Method**: GET
- **Response Format**: Array of transaction objects

### Data Structure

```typescript
interface TransactionData {
  createdAt: string; // ISO date string
  date: string; // ISO date string
  value: string; // Transaction amount as string
  id: string; // Unique identifier
}
```

### Features Implemented

1. **NextJS API Route**: Conceals the secret key from client-side code
2. **Error Handling**: Comprehensive error states with retry logic
3. **Loading States**: Proper loading indicators using BPBentoCard props
4. **Data Processing**: Converts raw transaction data into meaningful statistics
5. **Caching**: Implements React Query with stale-time and refetch intervals
6. **Type Safety**: Full TypeScript support with proper interfaces

### Usage in Components

The `TotalTransactions` component automatically:

- Fetches data from the API
- Calculates total count and value
- Generates monthly trend data for charts
- Handles loading and error states
- Updates the UI with real-time information

### Query Configuration

- **Retry**: 3 attempts with exponential backoff
- **Stale Time**: 5 minutes
- **Refetch Interval**: 10 minutes
- **Cache Key**: `["totalTransactions"]`

### Error Handling

The implementation includes:

- Network error handling
- HTTP status error handling
- Graceful fallbacks for UI components
- User-friendly error messages
