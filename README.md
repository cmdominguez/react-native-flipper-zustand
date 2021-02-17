
# React Native Zustand Flipper

This plugin allow see actions of zustand on react native.

## Installation

First install **zustandstore** on Flipper Plugin Manager.

Next, install **react-native-flipper-zustand** package on your React Native project.

```bash
yarn add react-native-flipper-zustand -D
```
Or npm

```bash
npm i react-native-flipper-zustand --save-dev
```

## Usage

```javascript
import create from  'zustand';
import zustandFlipper from 'react-native-flipper-zustand';

const useStore = create(
	zustandFlipper(set => ({
	  bears: 0,
	  // "set" now receives as the third parameter, the name of an action that will be shown in Flipper
	  increasePopulation: () => set(state => ({ bears: state.bears + 1 }), false, 'increasePopulation'),
	  removeAllBears: () => set({ bears: 0 }, false, 'removeAllBears')
	}))
);
```