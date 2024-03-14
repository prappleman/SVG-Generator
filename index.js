const inquirer = require('inquirer');
const fs = require('fs');

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
    if (answers.text.length > 3) {
        throw new Error('Text must be up to three characters.');
    }

    if (!answers.textcolor.match(/^#[0-9a-fA-F]{6}$/) && !['red', 'green', 'blue'].includes(answers.textcolor.toLowerCase())) {
        throw new Error('Invalid text color.');
    }

    const shapes = ['circle', 'triangle', 'square'];
    if (!shapes.includes(answers.shape.toLowerCase())) {
        throw new Error('Invalid shape choice.');
    }

    if (!answers.shapecolor.match(/^#[0-9a-fA-F]{6}$/) && !['red', 'green', 'blue'].includes(answers.shapecolor.toLowerCase())) {
        throw new Error('Invalid shape color.');
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

    //adds outline and info to file
    fs.writeFileSync('logo.svg', svgContent);

    console.log('SVG file created successfully!');
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
