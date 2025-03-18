# JSON Processing App

This project is designed to process and validate JSON data using JSON Schema. It reads data from two separate JSON files, validates the data against predefined schemas, and displays the results on an interactive HTML page.

## Objectives

- Read and process JSON data from multiple sources.
- Validate the data structure using JSON Schema.
- Provide an interactive user interface to display and filter results.

## Data Sources

- **file1.json**: Contains a set of records with fields such as `Data_Referencia`, `COGNOM`, `Valor`, and `ORDRE_COGNOM`.
- **file2.json**: Contains a larger dataset with more than 500 records, following the same structure as `file1.json`.

## JSON Schemas

- **schema1.json**: Defines the validation rules for the data in `file1.json`.
- **schema2.json**: Defines the validation rules for the data in `file2.json`.

## Project Structure

```
json-processing-app
├── src
│   ├── app.ts                # Main entry point of the application
│   ├── json
│   │   ├── file1.json        # JSON data file 1
│   │   └── file2.json        # JSON data file 2
│   ├── schemas
│   │   ├── schema1.json      # JSON Schema for file1.json
│   │   └── schema2.json      # JSON Schema for file2.json
│   ├── utils
│   │   └── validator.ts       # Validation utility functions
│   ├── views
│   │   └── index.html         # HTML structure for displaying results
│   └── types
│       └── index.ts           # Type definitions for data objects
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                  # Project documentation
```

## How to Run the Application

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies using npm:
   ```
   npm install
   ```
4. Compile the TypeScript files:
   ```
   npm run build
   ```
5. Start the application:
   ```
   npm start
   ```
6. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.