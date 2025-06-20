# react-native-async-storage-devtools

A lightweight dev tool UI for React Native that allows you to view, edit, and delete items from `AsyncStorage` during development.

## ✨ Features

- ⚡️ Create new AsyncStorage Values
- 📦 Read all current AsyncStorage keys and values
- ✏️ Update existing entries directly in the UI
- 🗑️ Delete individual keys or clear all storage
- 🧩 Drop-in component – easy to add to your `_layout.tsx` or root component

---

## 📸 Preview

![AsyncStorage DevTools Interface](https://cdn.heyo.is/react-native-async-storage-devtools/async-storage.gif)

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
