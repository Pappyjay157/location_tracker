# 🏃‍♂️ Edge GPS Tracker - Take Home Challenge

This is a React Native app built with Expo for Edge's mobile GPS tracking challenge. It allows users to start a workout session, track their movement in real-time, view their route on a map, and see basic workout metrics like distance and duration.

---

## 🚀 Features

- 🔐 Requests foreground location permissions
- 📍 Tracks the user's location in real-time
- 🗺 Displays a live route on a map using a polyline
- ⏱ Shows elapsed time and total distance
- ✅ Navigates to a summary screen on workout completion
- 📌 Handles permission errors gracefully
- 🔁 Option to start a new workout after completing one

---

## 🧠 Key Technologies

- **React Native**
- **Expo**
- **TypeScript**
- **react-native-maps**
- **expo-location**
- **react-navigation**

---

## 🧪 How to Run Locally

Make sure you have Expo CLI installed globally:

```bash
npm install -g expo-cli
```

1. **Clone and install dependencies**
    ```bash
    git clone https://github.com/YOUR_USERNAME/location-tracker.git
    cd location-tracker
    npm install
    ```

2. **Start the development server**
    ```bash
    npx expo start --tunnel
    ```
    Then scan the QR code using Expo Go on your Android or iOS device.

---

## 📱 Screens

| Map Screen | Workout Summary |
|------------|----------------|
| Shows user position, time, distance, and a "Start/Stop Workout" button | Displays distance, duration, and number of points tracked |

---

## ✅ Optional Bonuses Implemented

- ✔ Haversine formula for accurate distance
- ✔ Route visualization using polylines
- ✔ Error handling for denied permissions
- ✔ Route point count and restart option

---

## 📁 Project Structure

```
src/
├── screens/
│   ├── MapScreen.tsx
│   └── WorkoutComplete.tsx
├── navigation/
│   └── types.ts
App.tsx
```

---

## 🙌 Author

Ayooluwa Ogundeko  
GitHub: [https://github.com/Pappyjay157](https://github.com/Pappyjay157)

---

## 📄 License

This project is for demonstration purposes only.