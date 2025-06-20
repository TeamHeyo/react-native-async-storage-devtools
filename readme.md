# react-native-async-storage-devtools

A lightweight dev tool UI for React Native that allows you to view, edit, and delete items from `AsyncStorage` during development.

## 📸 Preview

https://cdn.heyo.is/react-native-async-storage-devtools/demo.mp4

![AsyncStorage DevTools Interface](https://media.cleanshot.cloud/media/103927/FlDoOBko4SXNk6MQyHedPV2Et8G0TQvvvJfaLmjk.jpeg?Expires=1750315135&Signature=WoXDd-KeVM4vHevBoD~KAz3nUmP-yLAFIjHPntPb02RbznoMtLfmEMBJXPsALZoy95-3YyjjEYfrriGhHjX~aUV5qJGHCPwh6ZYwqEVPXxVMA9HoXsgIM1mg5YnQpc7J54hGhUcy-oPIjzbvJ5QjzRzU0LwjqCEB7NlcVMUOEcoIPoZpQ7nC-3~HU7zNSosVAUt1kZMkQokFOfyyXeszqhFLe2MHLgUKR8e20KTk3qpmSDu5CcdddscKdb7SNtoRE3Z70iYEFu7wiTIighk1yUfHnNa4bA6gppzwuY8W1MK1iXt-2XSGw6QuaiVDm-qLB2Lp9jBxl3o1qUZZdODmmA__&Key-Pair-Id=K269JMAT9ZF4GZ)

## ✨ Features

- ⚡️ Create new AsyncStorage Values
- 📦 Read all current AsyncStorage keys and values
- ✏️ Edit existing entries directly in the UI
- 🗑️ Delete individual keys or clear all storage
- 🧩 Drop-in component – easy to add to your `_layout.tsx` or root component

---

## 📦 Installation

```bash
npm install react-native-async-storage-devtools

or

yarn add react-native-async-storage-devtools

```

```
// _layout.tsx or App.tsx
import { Slot } from 'expo-router';
import AsyncStorageDevTools from 'react-native-async-storage-devtools';

export default function RootLayout() {
  return (
    <>
      <Slot />
      <AsyncStorageDevTools />
    </>
  );
}
```
