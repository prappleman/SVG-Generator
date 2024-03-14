const fs = require('fs');
const { generateSvg } = require('./index');

describe('Logo Generator', () => {
    // Mock user input for testing
    const userInput = {
        text: 'ABC',
        textcolor: 'red',
        shape: 'circle',
        shapecolor: 'blue'
    };

    test('Input Validation - Text', () => {
        // Test input validation for text
        expect(() => generateSvg({...userInput, text: 'ABCD'})).toThrow();
    });

    test('Input Validation - Text Color', () => {
        // Test input validation for text color
        expect(() => generateSvg({...userInput, textcolor: 'invalid'})).toThrow();
    });

    test('Shape Selection', () => {
        // Test shape selection
        const shapes = ['circle', 'triangle', 'square'];
        const userInputWithShape = {...userInput, shape: shapes[0]}; // Assuming the first shape is selected
        const svgContent = generateSvg(userInputWithShape);

        // Expect the function to return SVG content with the selected shape
        expect(svgContent).toContain(`<${shapes[0]}`);
    });

    test('Input Validation - Shape Color', () => {
        // Test input validation for shape color
        expect(() => generateSvg({...userInput, shapecolor: 'invalid'})).toThrow();
    });

    test('File Creation', () => {
        // Test file creation
        generateSvg(userInput);

        // Check that the file is created
        expect(fs.existsSync('logo.svg')).toBe(true);

        // Check that the file content matches the user input
        const fileContent = fs.readFileSync('logo.svg', 'utf8');
        expect(fileContent).toContain(userInput.text);
        expect(fileContent).toContain(userInput.textcolor);
        expect(fileContent).toContain(userInput.shape);
        expect(fileContent).toContain(userInput.shapecolor);
    });

    test('Command Line Output', () => {
        // Test command line output
        console.log = jest.fn(); // Mock console.log function
        generateSvg(userInput);
        expect(console.log).toHaveBeenCalledWith('SVG file created successfully!');
    });

    test('Browser Rendering', () => {
        // Test browser rendering
        // No direct way to test, manual verification required
    });

    // Clean up after tests
    afterAll(() => {
        fs.unlinkSync('logo.svg');
    });
});
