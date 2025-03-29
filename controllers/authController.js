import { executeQuery } from "../config/db.js";

async function getLastRecordId() {
    const query = `SELECT TOP 1 id_User 
                   FROM [dbo].[User] 
                   ORDER BY id_User DESC`;
    
    try {
        // Gọi executeQuery với các tham số phù hợp:
        // - query: câu truy vấn SQL
        // - values: mảng rỗng vì không có tham số
        // - paramNames: mảng rỗng vì không có tham số
        // - isStoredProcedure: false vì đây là câu query thường
        const result = await executeQuery(query, [], [], false);
        
        // Kiểm tra kết quả trả về
        // Đây là kiểm tra 3 điều kiện:
        // result: kiểm tra xem có kết quả trả về không
        // result.recordset: kiểm tra có thuộc tính recordset không
        // result.recordset.length > 0: kiểm tra có bản ghi nào không
        // Nếu cả 3 điều kiện đều đúng thì tiếp tục xử lý
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
        // console.log("Username:", username); 
        // console.log("Email:", email);     
        
        // Định nghĩa id_User và role
        const id_User = await getLastRecordId();  // Hàm logic để sinh id tự động
        const role = "DocGia"; // Role mặc định là DocGia

        const query = `INSERT INTO [dbo].[User] (id_User, username, password, email, role) 
                        VALUES (@id_User, @username, @password, @email, @role)`;
        const values = [id_User, username, password, email, role];
        const paramNames = ["id_User", "username", "password", "email", "role"];  // Sửa thành tên các tham số
        const isStoredProcedure = false;

        try {
            await executeQuery(query, values, paramNames, isStoredProcedure);
            res.status(200).json({ 
                success: true, 
                message: "Đăng ký thành công!" 
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
            const result = await executeQuery(query, values, paramNames, isStoredProcedure);
            if (result && result.recordset.length > 0) {
                // Đăng nhập thành công
                // res.status(200).json({ success: true, message: "Đăng nhập thành công!" });
                
                res.cookie("email", email, { httpOnly: true, maxAge: 10 * 1000 }); // Set cookie với thời hạn 1 ngày: 24 * 60 * 60 * 1000
                res.cookie("password", password, { httpOnly: true, maxAge: 10 * 1000 });
                res.render("index.ejs" , { isLoggedIn: true });

                // Xử lý logic để xem là admin, nhaBao hay docGia
            } else {
                // Đăng nhập thất bại
                res.status(401).json({ success: false, message: "Tên đăng nhập hoặc mật khẩu không đúng!" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Có lỗi xảy ra, vui lòng thử lại!" });
        }
    }
};