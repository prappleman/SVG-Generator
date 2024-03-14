const { generateSvg } = require('../index');

describe('Shape Color Input Validation', () => {
    test('Input Validation - Shape Color', () => {
        const userInput = {
            text: 'ABC',
            textcolor: 'red',
            shape: 'circle',
            shapecolor: 'blue'
        };
        // Test input validation for shape color
        expect(() => generateSvg({...userInput, shapecolor: 'invalid'})).not.toThrow();
    });
});
