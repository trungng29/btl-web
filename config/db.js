import sql from "mssql";

// Config cấu hình kết nối theo sql server của mình
const config = {
  server: "localhost",          // Địa chỉ máy chủ SQL Server
  database: "NewsWebsite",      // Tên database
  user: "admin",               // Tên đăng nhập
  password: "123",             // Mật khẩu
  options: {
    trustedConnection: true,    // Cho phép kết nối tin cậy
    enableArithAbort: true,     // Bật tính năng xử lý lỗi số học
    trustServerCertificate: true, // Tin tưởng chứng chỉ SSL của server
  },
};

// Normal queries to db handled here
// Hàm này tạo kết nối tới db, thiết lập tham số đầu vào, thực thi câu truy vấn hoặc procedure và xử lý kết quả trả về
async function executeQuery(
  query,                    // Câu truy vấn hoặc tên stored procedure
  values = [],             // Mảng giá trị tham số
  paramNames = [],         // Mảng tên tham số
  isStoredProcedure = true, // Xác định có phải là stored procedure không
  outputParamName = null    // Tên tham số đầu ra (nếu có)
) {
  try {
    const pool = await sql.connect(config);  // Tạo kết nối
    const request = pool.request();          // Tạo request mới

    // Thêm các tham số đầu vào
    if (values && paramNames) {
      for (let i = 0; i < values.length; i++) {
        request.input(paramNames[i], values[i]);
      }
    }

    // Handle output parameter
    // Nếu có tham số đầu ra, thêm tham số đầu ra vào request
    if (outputParamName) {
      request.output(outputParamName, sql.Int);
    }

    // console.log("VALUES ", values);
    // console.log("PARAM ", paramNames);
    // console.log("QUERY " , query);
    // console.log("REQUEST ", request.parameters);

    // Kiểm tra giá trị undefined
    values.forEach((val, index) => {
      if (typeof val === "undefined") {
        console.error(`Undefined value found for ${paramNames[index]}`);
      }
    });

    // Thực thi truy vấn
    // Nếu là store procedure thì thực thi execute, nếu không thì thực thi truy vấn
    let result;
    if (isStoredProcedure) {
      result = await request.execute(query);
    } else {
      result = await request.batch(query);
    }

    // Nếu có tham số đầu ra, thêm tham số đầu ra vào kết quả 
    if (outputParamName) {
      result = {
        ...result, //spread operator (toán tử spread) trong JavaScript. Lấy hết kết quả của result và thêm vào object mới
        [outputParamName]: request.parameters[outputParamName].value, //thêm tham số đầu ra vào kết quả 
      };
    }

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Bulk queries handled here
async function executeTableValuedQuery(
  query,
  table,
  paramNames = [],
  isStoredProcedure = true,
  outputParamName = null
) {
  try {
    const pool = await sql.connect(config);
    const request = pool.request();

    // Setting the table-valued parameter
    if (table instanceof sql.Table) {
      request.input(paramNames, table);
    }

    // Handle output parameter
    if (outputParamName) {
      request.output(outputParamName, sql.Int);
    }

    let result;
    if (isStoredProcedure) {
      result = await request.execute(query);
    } else {
      result = await request.batch(query);
    }

    if (outputParamName) {
      result = {
        ...result,
        [outputParamName]: request.parameters[outputParamName].value,
      };
    }

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const connect = () => sql.connect(config);
export { sql, executeQuery, executeTableValuedQuery };
