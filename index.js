// Khai báo các thư viện cần thiết
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';

// Khai báo các biến môi trường
const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json()); // Middleware để phân tích dữ liệu JSON trong yêu cầu
app.use(bodyParser.urlencoded({ extended: true })); // Middleware để phân tích dữ liệu URL-encoded
app.use(express.static('public')); // Middleware để phục vụ các tệp tĩnh từ thư mục 'public'


// Route lấy trang chủ
app.get('/', (req, res) => {    
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

