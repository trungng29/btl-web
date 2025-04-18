import { v2 as cloudinary } from "cloudinary";
import { executeQuery } from "../config/db.js";
import bodyParser from "body-parser";

async function getLastRecordId() {
    const query = `SELECT TOP 1 id_comment
                   FROM [dbo].[Comment] 
                   ORDER BY id_comment DESC`;
    
    try {
        const result = await executeQuery(query, [], [], false);
        
        if (result && result.recordset && result.recordset.length > 0) {
            const lastId = result.recordset[0].id_User;
            const lastNumber = parseInt(lastId.substring(1));
            return `C${String(lastNumber + 1).padStart(3, '0')}`;
        }
        return 'C001'; // Trả về ID đầu tiên nếu chưa có bản ghi nào
    } catch (error) {
        console.error("Lỗi khi lấy ID cuối cùng:", error);
        throw error;
    }
}

export const commentController = {
  commentParent: async (req, res) => {
    const query = ` WITH UserCTE AS (
                        SELECT id_user
                        FROM [dbo].[User]
                        WHERE email = @email
                    ),
                    ArticleCTE AS (
                        SELECT id_article
                        FROM [dbo].[Article]
                        WHERE name_alias = @name_alias
                    )
                    INSERT INTO [dbo].[Comment]
                    SELECT
                        @id_comment,
                        u.id_user,
                        a.id_article,
                        NULL,
                        SYSDATETIMEOFFSET(),
                        @comment_content,
                        0
                    FROM UserCTE u
                    CROSS JOIN ArticleCTE a; `
    const newId = await getLastRecordId();
    const values = [res.locals.email, req.params.id, newId, req.body.comment]
    const paramNames = ['email', 'name_alias', 'id_comment', 'comment_content'];
    console.log(res.locals.email)
    try {
        await executeQuery(query, values, paramNames, false)
        res.json( {status: 'success'})
    } catch (error) {
        res.json( {status: 'false'})
    }
  }

};
