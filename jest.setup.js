// window.URL.createObjectURL jest fail · Issue #115 · plotly/react-plotly.js
// https://github.com/plotly/react-plotly.js/issues/115#issuecomment-569299410
window.URL.createObjectURL = jest.fn();
window.HTMLCanvasElement.prototype.getContext = jest.fn();
