# Lefties Room Allocation System

This project is a dynamic room allocation system that efficiently manages the team assignments within these constraints:
. The project uses Express.js, MongoDB, and EJS templating to serve views and provides REST API endpoints for interacting with the like feature.


## Requirements

- npm
-   **Frontend**: React, and TypeScript
-   **Backend**: Node.js, TypeScript, Express, MongoDB, and Redis.
-   **Deployment**: Vercel

## Usage

### Web Interface

-   Frontend application is deployed  at [lefties-rms.vercel.app](https://lefties-rms.vercel.app/)

### API

- Backend is deployed at [lefties-rms.onrender.com](https://lefties-rms.onrender.com/api)


## Setup and Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/7maylord/urlchop.git
   cd urlchop

2. Install dependencies:
    ```sh
    cd client-app && npm install
    cd ../server-app && npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the server-app directory and add the following:
    ```env
    # Server configuration
    PORT=3030

    # Database configuration
    REDIS_URL=redis://localhost:6379
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_PASSWORD=your_redis_password
    MONGODB_URI=mongodb://localhost:27017/urlchop

    # Rate limiter configuration
    RATE_LIMIT_WINDOW=15
    RATE_LIMIT_MAX=100
        
    JWT_SECRET=your_jwt_secret
    QR_API_URL=https://api.qrserver.com/v1/create-qr-code/
      ```
    
    Create a `.env` file in the client-app directory and add the following:
    ```env
    VITE_APP_ENV=development

    #this is your backend server
    VITE_API_URL=http://localhost:3030/api 

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

## Usage
### Endpoints
- Create an Article
    - POST `/api/articles`
    - Body: `{ "title": "Article Title", "content": "Article Content" }`
    - Response: `{ "message": "Article created successfully", "article": {...} }`

- Get Like Count
    - GET `/api/articles/:id/likes`
    - Response: `{ "likes": <like count> }`

- Increment Like Count
    - POST `/api/articles/:id/likes`
    - Response: `{ "likes": <updated like count> }`

- Render Article Page
    - GET `/api/articles/:id`
    - Renders an article page showing the title, content, like count, and a "Like" button.


### Example Requests with cURL
- Create an Article:
```bash
curl -X POST http://localhost:3030/api/articles -H "Content-Type: application/json" -d '{"title": "My New Article", "content": "Some interesting content"}'
```

- Get Like Count:
```bash
curl http://localhost:3030/api/articles/<ARTICLE_ID>/likes
```

- Increment Like Count:
```bash
curl -X POST http://localhost:3030/api/articles/<ARTICLE_ID>/likes
```
Replace <ARTICLE_ID> with the actual ID of the article.


## EJS Template Rendering
To view the article page with the "Like" button, go to:

```bash
http://localhost:3000/articles/{articleId}
```
Replace {articleId} with an existing article ID in the database.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.