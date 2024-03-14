const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

//questions
const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'What is the name of your project?'
    },
    {
        type: 'input',
        name: 'textcolor',
        message: 'What text color do you want for your logo?'
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape for your logo:',
        choices: ['circle', 'triangle', 'square']
    },
    {
        type: 'input',
        name: 'shapecolor',
        message: 'What shape color do you want for your logo?'
    }
];

//shapes
function generateSvg(answers) {
    // Input validation
    if (!answers.text) {
        throw new Error('Text is required.');
    }

    // Validate text input to accept any letter and number
    if (!answers.text.match(/^[a-zA-Z0-9]+$/)) {
        throw new Error('Invalid text. Text must contain only letters and numbers.');
    }

    // Validate text color input to ensure it's a string
    if (typeof answers.textcolor !== 'string') {
        throw new Error('Invalid text color. Please provide a valid color input.');
    }

    // Valiates shape input to ensure its one of these three options
    const shapes = ['circle', 'triangle', 'square'];
    if (!shapes.includes(answers.shape.toLowerCase())) {
        throw new Error('Invalid shape choice.');
    }

    // Validate shape color input to ensure it's a string
    if (typeof answers.shapecolor !== 'string') {
        throw new Error('Invalid text color. Please provide a valid color input.');
    }

    let shapeElement;
    switch (answers.shape.toLowerCase()) {
        case 'circle':
            shapeElement = `<circle cx="150" cy="100" r="80" fill="${answers.shapecolor}" />\n`;
            break;
        case 'triangle':
            shapeElement = `<polygon points="50,175 150,10 250,175" fill="${answers.shapecolor}" />\n`;
            break;
        case 'square':
            shapeElement = `<rect x="100" y="50" width="100" height="100" fill="${answers.shapecolor}" />\n`;
            break;
        default:
            throw new Error('Invalid shape choice.');
    }

    const fontSize = Math.min(300, 250 / answers.text.length);

    //svg outline
    const svgContent = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">\n${shapeElement}\n<text x="50%" y="50%"  font-size="${fontSize}" dominant-baseline="middle" text-anchor="middle" fill="${answers.textcolor}">${answers.text}</text>\n</svg>`;

    // Construct the output folder and file name
    const outputFolder = 'output'; // Specify the output folder
    const outputFileName = `${answers.text}.svg`; // Use the project name as the file name

    // Ensure the output folder exists, create it if it doesn't
    if (!fs.existsSync(outputFolder)) {
        fs.mkdirSync(outputFolder);
    }

    // Construct the full output path
    const outputPath = path.join(outputFolder, outputFileName);

    // Write the SVG content to the output file
    fs.writeFileSync(outputPath, svgContent);

    console.log(`SVG file '${outputFileName}' created successfully in the '${outputFolder}' folder!`);
    return svgContent;
}

module.exports = {
    generateSvg: generateSvg
};

//starts app
function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            generateSvg(answers);
        })
        .catch((error) => console.error(error));
}

init();
