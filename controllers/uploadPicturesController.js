import { v2 as cloudinary } from 'cloudinary';
import { executeQuery } from "../config/db.js";
import bodyParser from 'body-parser';
import dayjs from 'dayjs';
import 'dayjs/locale/vi.js'; // Import tiếng Việt

dayjs.locale('vi'); // Đặt ngôn ngữ tiếng Việt

// Configuration
cloudinary.config({ 
    cloud_name: 'drh4upxz5', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

export const articleController = {
    uploadPicture: async (req, res) => {
        
    }
};
