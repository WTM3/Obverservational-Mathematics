// Cognitive Alignment Demo (Wade)
const { amfBase, amfBuffer, amfCalibrated } = require('../wade-implementation/amf-calibration.js');
const NJSON = require('../wade-implementation/njson-v8-engine.js');

// Demo: Aligning input to AMF
const input = 2.89;
const aligned = NJSON.mathematical.align(input, amfCalibrated);
console.log('Input aligned to AMF:', aligned);

// Demo: Direct Boolean writing
console.log('Direct Boolean:', NJSON.writing.direct('true'));
