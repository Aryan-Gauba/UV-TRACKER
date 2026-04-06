### ☀️ UV Shield & Tracker
A dynamic web application that provides real-time Ultraviolet (UV) radiation data based on the user's current location. By integrating weather and geolocation services, the app delivers accurate exposure risks and personalized safety recommendations to help prevent sun damage.

## 🚀 Features
Auto-Location Detection: Uses Browser/IP Geolocation to fetch local UV data instantly.

Real-time API Integration: Pulls live data from OpenWeather and dedicated UV Index APIs.

Dynamic UI: Rendered with EJS to provide a responsive and data-driven user experience.

Safety Insights: Categorizes UV levels and provides actionable health advice (e.g., "Wear SPF 30+").

Search Functionality: Check UV levels for any city globally.

## 🛠️ Tech Stack
Backend: Node.js, Express.js

Frontend: EJS (Embedded JavaScript Templates), CSS3, Vanilla JavaScript

APIs: * OpenWeather API: For general weather context.

OpenUV / Alternative UV API: For precise UVI metrics.

Geolocation API: To pinpoint user coordinates.

## 📥 Installation & Setup
Clone the Repository:

Bash
```
git clone https://github.com/yourusername/uv-shield.git
cd uv-shield
```
Install Dependencies:

Bash
```
npm install
```
Environment Variables:
Create a .env file in the root directory and add your API keys:

Code snippet
```
PORT=3000
OPENWEATHER_API_KEY=your_key_here
UV_API_KEY=your_key_here
```
Run the Application:

Bash
```
npm start
```
The app will be live at http://localhost:3000.

## 📂 Project Structure
```
Plaintext
├── public/          # Static assets (CSS, Images, Client-side JS)
├── views/           # EJS templates (index.ejs, results.ejs)
├── routes/          # Express route handlers
├── app.js           # Main server entry point
└── .env             # Sensitive API configuration
```

## 🧪 How it Works
Request: The client sends a request with coordinates or a city name.

Processing: The Node/Express server fetches data from the OpenWeather and UV Index APIs.

Rendering: The server injects the live data into EJS templates.

Response: The user receives a fully rendered page showing the current UV Index, risk level, and suggested precautions.

## 📜 License
This project is licensed under the MIT License.

## ✉️ Contact
Aryan Gauba
