import { executeQuery } from "../config/db.js";
import { categoryController } from './categoryController.js';  
import WeatherService from '../controllers/weatherDayController.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '8h' });

}

async function getLastRecordId() {
    const query = `SELECT TOP 1 id_User 
                   FROM [dbo].[User] 
                   ORDER BY id_User DESC`;
    
    try {
        const result = await executeQuery(query, [], [], false);
        // Nếu câu truy vấn SQL mà bạn thực hiện thông qua hàm executeQuery là một câu truy vấn SELECT, 
        // thì kết quả trả về sẽ là một đối tượng JSON.
        
        if (result && result.recordset && result.recordset.length > 0) {
            const lastId = result.recordset[0].id_User;
            const lastNumber = parseInt(lastId.substring(1));
            return `U${String(lastNumber + 1).padStart(3, '0')}`;
        }
        return 'U001'; // Trả về ID đầu tiên nếu chưa có bản ghi nào
    } catch (error) {
        console.error("Lỗi khi lấy ID cuối cùng:", error);
        throw error;
    }
}

export const authController = {
  register: async (req, res) => {
    console.log("Registering user...");

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // Định nghĩa id_User và role
    const id_User = await getLastRecordId(); // Hàm logic để sinh id tự động
    const role = "DocGia";

    const query = `INSERT INTO [dbo].[User] (id_User, username, password, email, role) 
                        VALUES (@id_User, @username, @password, @email, @role)`;
    const values = [id_User, username, password, email, role];
    const paramNames = ["id_User", "username", "password", "email", "role"]; // Sửa thành tên các tham số
    const isStoredProcedure = false;

    try {
      await executeQuery(query, values, paramNames, isStoredProcedure);
      res.status(200).json({
        success: true,
        message: "Đăng ký thành công!",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },

  login: async (req, res) => {
    console.log("Logging in user...");

    const { email, password } = req.body;

    const query = `SELECT * FROM [dbo].[User] WHERE email = @email AND password = @password`;
    const values = [email, password];
    const paramNames = ["email", "password"];
    const isStoredProcedure = false;

    try {
      const result = await executeQuery(
        query,
        values,
        paramNames,
        isStoredProcedure
      );
      if (result && result.recordset.length > 0) {
        // Đăng nhập thành công

        const user = {
          username: result.recordset[0].username,
          email: result.recordset[0].email,
          role: result.recordset[0].role,
        };

        const accessToken = generateAccessToken(user);
        console.log(accessToken)
        console.log("Created token payload:", user);

        res.cookie("user", accessToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        
        res
          .status(200)
          .json({
            success: true,
            message: "Đăng nhập thành công!",
            user: result.recordset[0],
            accessToken: accessToken
          });

      } else {
        res
          .status(401)
          .json({
            success: false,
            message: "Tên đăng nhập hoặc mật khẩu không đúng!",
          });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Có lỗi xảy ra, vui lòng thử lại!" });
    }
  },

  logout: (req, res) => {
    console.log("Logging out user...");
    res.clearCookie("user");
    res.status(200).json({ success: true, message: "Đăng xuất thành công!" });
  },

  authenticateToken: async (req, res, next) => {  
    try {
        const categories = await categoryController.getCategoriesTitle();
        const weatherData = await WeatherService.getWeatherData();
        
        // Tạo đối tượng Date và format theo tiếng Việt
        const currentDate = new Date();
        const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        const formattedDate = `${days[currentDate.getDay()]} - ${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
        
        // Set tất cả vào res.locals
        res.locals = {
            ...res.locals,
            categoryTree: categories,
            weather: weatherData.temp,
            iconUrl: weatherData.iconUrl,
            cityName: weatherData.cityName,
            currentDate: formattedDate  // Thêm ngày tháng đã format
        };

        const token = req.cookies.user;

        if (!token) {
            // Set giá trị mặc định vào cả req và res.locals
            req.isLoggedIn = false;
            req.user = null;
            res.locals.isLoggedIn = false;
            res.locals.username = '';
            res.locals.role = '';
            return next();
        }

        try {
            if (!process.env.ACCESS_TOKEN_SECRET) {
                console.error("ACCESS_TOKEN_SECRET is not defined");
                throw new Error("ACCESS_TOKEN_SECRET is missing");
            }

            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

            if (!decoded.username || !decoded.email || !decoded.role) {
                console.error("Missing required fields in token payload");
                throw new Error("Invalid token payload");
            }

            // Set vào cả req và res.locals
            req.user = decoded;
            req.username = decoded.username;
            req.email = decoded.email;
            req.role = decoded.role;
            req.isLoggedIn = true;

            // Thêm vào res.locals để EJS có thể truy cập
            res.locals.isLoggedIn = true;
            res.locals.username = decoded.username;
            res.locals.email = decoded.email;
            res.locals.role = decoded.role;

            
            next();

        } catch (error) {
            // Set giá trị mặc định khi có lỗi
            req.isLoggedIn = false;
            req.user = null;
            res.locals.isLoggedIn = false;
            res.locals.username = '';
            res.locals.role = '';
            res.clearCookie("userToken");
            next();
        }
    } catch (error) {
        console.error("Error loading categories:", error);
        res.locals.categoryTree = []; // Set mảng rỗng nếu có lỗi
        next();
    }
},
};