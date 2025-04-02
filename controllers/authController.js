import { executeQuery } from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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

        console.log("Created token payload:", user);

        res.cookie("user", accessToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        // const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        
        res
          .status(200)
          .json({
            success: true,
            message: "Đăng nhập thành công!",
            user: result.recordset[0],
          });

        // res.cookie("username", result.recordset[0].username, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // Set cookie với thời hạn 1 ngày: 24 * 60 * 60 * 1000
        // res.cookie("email", email, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        // res.cookie("role", result.recordset[0].role, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        // req.username = req.cookies.username;
        // req.role = req.cookies.role;
        // res.status(200).json({ success: true, message: "Đăng nhập thành công!", user: result.recordset[0] });
        // Xử lý logic để xem là admin, nhaBao hay docGia
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
    // res.clearCookie("username");
    // res.clearCookie("email");
    // res.clearCookie("role");
    res.clearCookie("user");
    res.status(200).json({ success: true, message: "Đăng xuất thành công!" });
  },

  authenticateToken: (req, res, next) => {
    const token = req.cookies.user;
    // console.log("Received token:", token);

    if (!token) {
      console.log("No token found");
      req.isLoggedIn = false;
      req.user = null;
      return next();
    }

    try {
      if (!process.env.ACCESS_TOKEN_SECRET) {
        console.error("ACCESS_TOKEN_SECRET is not defined");
        throw new Error("ACCESS_TOKEN_SECRET is missing");
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //   console.log("Decoded token:", decoded);

      // Kiểm tra các trường bắt buộc
      if (!decoded.username || !decoded.email || !decoded.role) {
        console.error("Missing required fields in token payload");
        throw new Error("Invalid token payload");
      }

      req.user = decoded;
      req.username = decoded.username;
      req.email = decoded.email;
      req.role = decoded.role;
      req.isLoggedIn = true;
      next();

    } catch (error) {
      console.error("Token verification error:", error);
      req.isLoggedIn = false;
      req.user = null;
      res.clearCookie("userToken");
      next();
    }
  },
};