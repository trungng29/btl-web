// Khai báo các thư viện cần thiết
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import sql from 'mssql'; // Thư viện SQL Server
// ECMAScript Modules (ESM) được sử dụng để import các module trong Node.js

// Khai báo các route
import { router as mainRoutes } from "./routes/mainRoute.js"; // Route chính
import { router as authRoutes } from "./routes/authRoute.js"; // Route xác thực
import { connect } from "./config/db.js"; // Kết nối đến cơ sở dữ liệu

// Khai báo các biến môi trường
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); // Middleware để phân tích dữ liệu JSON trong yêu cầu
app.use(bodyParser.urlencoded({ extended: true })); // Middleware để phân tích dữ liệu URL-encoded
app.use(express.static('public')); // Middleware để phục vụ các tệp tĩnh từ thư mục 'public'


// Define routes
app.use("/", mainRoutes); // Sử dụng route chính
app.use("/auth", authRoutes); // Sử dụng route xác thực

// Kết nối đến cơ sở dữ liệu SQL Server
connect()
  .then((connection) => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.log("Database connection failed!");
    console.log(error);
  });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

