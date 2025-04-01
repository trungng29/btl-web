// Khai báo các thư viện cần thiết
// ECMAScript Modules (ESM) được sử dụng để import các module trong Node.js
import express from 'express'; // Thư viện Express để tạo ứng dụng web
import axios from 'axios'; // Thư viện để thực hiện các yêu cầu HTTP
import bodyParser from 'body-parser'; // Thư viện để phân tích dữ liệu trong yêu cầu HTTP
import cors from 'cors'; // Thư viện để xử lý CORS (Cross-Origin Resource Sharing)
import sql from 'mssql'; // Thư viện để kết nối đến SQL Server
import cookieParser from 'cookie-parser'; // Middleware để phân tích cookie
import dotenv from 'dotenv'; // Thư viện để quản lý biến môi trường
// Khai báo các route
import { router as mainRoutes } from "./routes/mainRoute.js"; // Route chính
import { router as authRoutes } from "./routes/authRoute.js"; // Route xác thực
import { router as itemRoutes } from "./routes/articleItems.js"; // Route cho tất cả item bao gồm article, category, user
import { connect } from "./config/db.js"; // Kết nối đến cơ sở dữ liệu

// Khai báo các biến môi trường
const app = express();
app.use(express.json());
const port = 3000;

app.use(cookieParser()); // Middleware để phân tích cookie 
// (Middleware này sẽ phân tích cookie trong yêu cầu và thêm chúng vào req.cookies.)

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





