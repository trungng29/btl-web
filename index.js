// Khai báo các thư viện cần thiết
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import sql from 'mssql'; // Thư viện SQL Server

// Khai báo các route
import { router as mainRoutes } from "./routes/mainRoute.js"; // Route chính
import { connect } from "./config/db.js"; // Kết nối đến cơ sở dữ liệu

// Khai báo các biến môi trường
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json()); // Middleware để phân tích dữ liệu JSON trong yêu cầu
app.use(bodyParser.urlencoded({ extended: true })); // Middleware để phân tích dữ liệu URL-encoded
app.use(express.static('public')); // Middleware để phục vụ các tệp tĩnh từ thư mục 'public'

app.use("/", mainRoutes); // Sử dụng route chính

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

