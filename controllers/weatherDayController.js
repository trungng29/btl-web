// utils/weatherService.js
import axios from 'axios';
import NodeCache from 'node-cache';

// Tạo cache với thời gian 15 phút
const weatherCache = new NodeCache({ stdTTL: 900 });

class WeatherService {
    static async getWeatherData() {
        try {
            // Kiểm tra cache trước
            const cachedData = weatherCache.get('weatherData');
            if (cachedData) return cachedData;

            // Lấy thông tin vị trí
            const place = await axios.get("http://ip-api.com/json/?fields=61439");
            const lat = place.data.lat;
            const lon = place.data.lon;
            const cityName = place.data.regionName;

            // Lấy thông tin thời tiết
            const weather = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=92c60dd8c1ce453b92d165042250204&q=${lat},${lon}`
            );

            const weatherData = {
                temp: weather.data.current.temp_c.toString() + '°C',
                iconUrl: "https:" + weather.data.current.condition.icon,
                cityName: cityName || 'Unknown City'
            };

            // Lưu vào cache
            weatherCache.set('weatherData', weatherData);
            return weatherData;
        } catch (error) {
            console.error('Error fetching weather:', error);
            return {
                temp: 'N/A',
                iconUrl: '',
                cityName: 'Unknown City'
            };
        }
    }
}

export default WeatherService;