const { generateSvg } = require('../index');

describe('Shape Selection', () => {
    test('Shape Selection', () => {
        const userInput = {
            text: 'ABC',
            textcolor: 'red',
            shape: 'circle',
            shapecolor: 'blue'
        };
        // Test shape selection
        const shapes = ['circle', 'triangle', 'square'];
        const userInputWithShape = {...userInput, shape: shapes[0]}; // Assuming the first shape is selected
        const svgContent = generateSvg(userInputWithShape);

        // Expect the function to return SVG content with the selected shape
        expect(svgContent).toContain(`<${shapes[0]}`);
    });
});
