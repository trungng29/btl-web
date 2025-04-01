import express from 'express'; 
import axios from 'axios'; 
import bodyParser from 'body-parser';
import cors from 'cors'; 
import sql from 'mssql'; 
import cookieParser from 'cookie-parser'; 
import dotenv from 'dotenv'; 
import jwt from "jsonwebtoken";

// Khai báo các route
import { router as mainRoutes } from "./routes/mainRoute.js"; // Route chính
import { router as authRoutes } from "./routes/authRoute.js"; // Route xác thực
import { router as itemRoutes } from "./routes/articleItems.js"; // Route cho tất cả item bao gồm article, category, user
import { connect } from "./config/db.js"; 

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser()); // Middleware này sẽ phân tích cookie trong yêu cầu và thêm chúng vào req.cookies.

// Middleware kiểm tra người dùng đã đăng nhập hay chưa MỖI KHI CÓ YÊU CẦU ĐẾN SERVER, từ đó render ra các template khác nhau
app.use((req, res, next) => {
  if (req.cookies && req.cookies.email) {
    req.isLoggedIn = true; 
    req.username = req.cookies.username; 
    req.role = req.cookies.role;
  } else {
    req.isLoggedIn = false;
  }
  next();
});

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('public')); 

app.use("/", mainRoutes); 
app.use("/auth", authRoutes);
app.use("/api", itemRoutes);

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





