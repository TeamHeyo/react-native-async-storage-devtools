# react-native-async-storage-devtools

A lightweight dev tool UI for React Native that allows you to view, edit, and delete items from `AsyncStorage` during development.

![Demo Video](https://cdn.heyo.is/react-native-async-storage-devtools/demo.mp4)

## ✨ Features

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
import { Slot } from 'expo-router'; // if using Expo Router
import AsyncStorageDevTool from 'react-native-async-storage-devtools';

export default function RootLayout() {
  return (
    <>
      <Slot />
      <AsyncStorageDevTool />
    </>
  );
}
```
