const { generateSvg } = require('../index');

describe('Text Color Input Validation', () => {
    test('Input Validation - Text Color', () => {
        const userInput = {
            text: 'ABC',
            textcolor: 'red',
            shape: 'circle',
            shapecolor: 'blue'
        };
        // Test input validation for text color
        expect(() => generateSvg({...userInput, textcolor: 'invalid'})).not.toThrow();
    });
});
