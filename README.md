# productEcom

Follow these steps to set up the application:

1. **Create a Folder**
   - Create a folder on your desktop.
     
2. **Open in Visual Studio Code**
   - Open the folder in Visual Studio Code.
        
3. **Clone the Repository**
   - Clone the repository into this folder.
     
4. **Ensure Node.js is Installed**
   - Make sure Node.js is installed on your computer. You can download it from [here](https://nodejs.org/).
     
5. **Setup Backend**
   - Navigate to the backend folder: ```sh cd backend ```
   - Create a `.env` file with the following content: ``` DBUrl="mongodb+srv://<password>@<database>.mongodb.net/" ```
     
6. **Install Backend Dependencies**
   - Run the following command to install the backend dependencies: ```sh npm install ```
     
7. **Setup Frontend**
   - Navigate to the frontend folder: ```sh cd ../frontend ```
   - Install the frontend dependencies: ```sh npm install ```
  
8. **Start the Application**
   - After installing the dependencies, start the backend and frontend servers: ```sh # Start backend server cd ../backend npm start ``` ```sh # Start frontend server cd ../frontend npm run dev ```
  
   **Important Notes:**
    - Ensure your MongoDB connection URL in the `.env` file has the correct password and the database you want to use.
    - Make sure your MongoDB connection is set to the current IP. You can configure this in MongoDB's online interface under network access.
  
   That's it! Your application should now be up and running.
