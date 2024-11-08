# Lefties Room Allocation System

This project is a dynamic room allocation system that efficiently manages the team assignments within various constraints,The project uses React.js, Express.js, MongoDB.


## Requirements

- npm
-   **Frontend**: React, and Javascript
-   **Backend**: Node.js, JavaScript, Express, and MongoDB.
-   **Deployment**: Vercel

## Usage

### Web Interface

-   Frontend application is deployed  at [lefties-rms.vercel.app](https://lefties-rms.vercel.app/)

### API

- Backend is deployed at [lefties-rms.onrender.com](https://lefties-rms.onrender.com/api)


## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/7maylord/lefties-rms
   cd lefties-rms

2. Install dependencies:
    ```sh
    cd frontend && npm install
    cd ../backend && npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the server-app directory and add the following:
    ```env
    # Server configuration
    PORT=4000

    # Database configuration
    MONGODB_URI=mongodb://localhost:27017/urlchop
    ```
    
    Create a `.env` file in the client-app directory and add the following:
    ```env
    VITE_APP_ENV=development

    #this is your backend server
    VITE_API_URL=http://localhost:4000/api 

    #this is your frontend server
    VITE_APP_URL=http://localhost:5174  
    ```

4. Build the Project:
    ```sh
    # Backend Server
    npm run build
    # Frontend Server
    npm run build
    ```
5. Development Mode: To run the server in development mode with hot-reloading.
    ```sh
    # Backend Server
    npm run start
    # Frontend Server
    npm run dev
    ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.