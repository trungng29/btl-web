// Khai báo các thư viện cần thiết
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import sql from 'mssql'; // Thư viện SQL Server
import cookieParser from 'cookie-parser'; // Middleware để phân tích cookie
// ECMAScript Modules (ESM) được sử dụng để import các module trong Node.js

// Khai báo các route
import { router as mainRoutes } from "./routes/mainRoute.js"; // Route chính
import { router as authRoutes } from "./routes/authRoute.js"; // Route xác thực
import { connect } from "./config/db.js"; // Kết nối đến cơ sở dữ liệu

// Khai báo các biến môi trường
const app = express();
const port = 3000;

app.use(cookieParser()); // Middleware để phân tích cookie

// Middleware kiểm tra người dùng đã đăng nhập hay chưa MỖI KHI CÓ YÊU CẦU ĐẾN SERVER, từ đó render ra các template khác nhau
app.use((req, res, next) => {
    // Kiểm tra xem req.cookies có tồn tại không
    if (req.cookies && req.cookies.email) {
        // Nếu cookie tồn tại, người dùng đã đăng nhập
        req.isLoggedIn = true; // Thiết lập biến để sử dụng trong các route
    } else {
        // Nếu không có cookie, người dùng chưa đăng nhập
        req.isLoggedIn = false;
    }
    next();
});

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

