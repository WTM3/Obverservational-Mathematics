// Wade's AMF Calibration: 2.89 + 0.1 = 2.99
const amfBase = 2.89;
const amfBuffer = 0.1;
const amfCalibrated = parseFloat((amfBase + amfBuffer).toFixed(2));
console.log('AMF Calibration:', amfBase, '+', amfBuffer, '=', amfCalibrated);
module.exports = { amfBase, amfBuffer, amfCalibrated };
