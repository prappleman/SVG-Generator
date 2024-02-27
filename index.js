const inquirer = require('inquirer');
const fs = require('fs');

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

function generateSvg(answers) {
    // Determine shape based on user input
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
            console.log('Invalid shape choice');
            return;
    }

    // Calculate the font size to fit within the shape
    const fontSize = Math.min(250, 200 / answers.text.length);

    // Create the SVG content
    const svgContent = `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">\n${shapeElement}\n<text x="50%" y="50%"  font-size="${fontSize}" dominant-baseline="middle" text-anchor="middle" fill="${answers.textcolor}">${answers.text}</text>\n</svg>`;

    // Save the SVG content to a file
    fs.writeFileSync('output.svg', svgContent);

    console.log('SVG file created successfully!');
}


function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            generateSvg(answers);
        })
        .catch((error) => console.error(error));
}

init();
