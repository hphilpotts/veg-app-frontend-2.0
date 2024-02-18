# README

## learns for next time     
- proxy config is different with **Vite** when compared to using **Create React App**: see `vite.config.js` changes (rather than `package.json`).       
- remember React.Strict mode renders components twice - _so if you come back to React after a while, don't stress trying to work out why (for example) `useEffect` seems to be firing twice_...   

## bug list
- `originalDayData` updates with just-added Food Items in LogFood when switching between input modes - work out how to prevent this

## snagging list
- `addFoodItemButton` in `LogFoodInputs` moves from bottom to middle of parent div based on input mode: adjust so that it remains consistent(presumably in its own parent element)