# ic-proxy-server

Infinite Craft proxy server that protects Neal's server as much as possible.

## Features

- Proxy server for Infinite Craft API.
- Caches results in a PostgreSQL database to reduce API usage.
- Environment variables for secure configuration.
- Modular endpoint structure for better maintainability.

## Setup

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- `npm` package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ic-proxy-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the PostgreSQL database:
   - Create a database and user.
   - Run the SQL script to set up the schema:
     ```bash
     psql -U <your_db_user> -d <your_db_name> -f db/schema.sql
     ```

4. Create a `.env` file in the root directory with the following content:
   ```properties
   DB_USER=your_db_user
   DB_HOST=localhost
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   ```

5. Start the server:
   ```bash
   npm start
   ```

### Endpoints

#### `/pair`

- **Method**: `GET`
- **Description**: Pairs two inputs and caches the result in the database.
- **Query Parameters**:
  - `first` (string): The first input.
  - `second` (string): The second input.
- **Response**:
  - Returns the pairing result as JSON.
- **Example**:
  ```bash
  curl "http://localhost:3000/pair?first=value1&second=value2"
  ```

#### `/check`

- **Method**: `GET`
- **Description**: Checks the validity of a result and caches the validation in the database.
- **Query Parameters**:
  - `first` (string): The first input.
  - `second` (string): The second input.
  - `result` (string): The result to validate.
- **Response**:
  - Returns a JSON object indicating whether the result is valid.
- **Example**:
  ```bash
  curl "http://localhost:3000/check?first=value1&second=value2&result=value3"
  ```

### Project Structure

```
ic-proxy-server/
├── db/
│   └── schema.sql         # Database schema
├── endpoints/
│   ├── pair.js            # /pair endpoint logic
│   └── check.js           # /check endpoint logic
├── .env                   # Environment variables (not committed to version control)
├── index.js               # Main server file
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

### Notes

- Ensure the `.env` file is added to `.gitignore` to prevent sensitive information from being committed.
- The `operations` table is used to store both `/pair` and `/check` results, with a `type` column to differentiate between them.
