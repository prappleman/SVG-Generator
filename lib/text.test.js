const { generateSvg } = require('../index');

describe('Text Input Validation', () => {
    test('Input Validation - Text', () => {
        const userInput = {
            text: 'ABC',
            textcolor: 'red',
            shape: 'circle',
            shapecolor: 'blue'
        };
        // Test input validation for text
        expect(() => generateSvg({...userInput, text: 'ABC@'})).toThrow();
    });
});
