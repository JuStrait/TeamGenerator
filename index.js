// Application specific imports for each employee type
const Employee = require('./lib/Employee.js');
const Manager = require('./lib/Manager.js');
const Intern = require('./lib/Intern.js');
const Engineer = require('./lib/Engineer.js');

// External NPM dependencies use: npm install
const Inquirer = require('inquirer');
const Jest = require('jest');
const fs = require('fs');
const axios = require('axios');

// Starting prompt
const initiateScript = [{
    type: 'list',
    message: 'Would you like to add an employee?',
    name: 'start',
    choices: [
        'Add an employee?',
        'Generate team HTML?'
    ]
}];

// Common questins for each employee type
const sharedQuestions = [
    {
        type: 'input',
        message: 'Enter name',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Enter ID',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Enter email',
        name: 'email'
    },
    {
        type: "confirm",
        message: "Are you a manager?",
        name: "position",
        choices: [
            'Yes',
            'No'
        ]
    }
];

const questions = [
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employee's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee's email?",
        name: "email"
    },
    {
        type: "list",
        message: "What is the employee's title?",
        name: "title",
        choices: [
            'engineer',
            'intern'
        ]
    }
];

// Contains all team members by type
let employees = [];
let managers = [];
let engineers = [];
let interns = [];

// Main entry point to application
const start = async function begin() {
    await Inquirer.prompt(sharedQuestions)
        .then(async function (data) {
            let user = {
                'name': data.name,
                'id': data.id,
                'email': data.email,
                'role': 'employee',
                'title': data.title,
                'phone': '',
                'gitname': '',
                'school': ''
            };

            if (data.position) {
                employees.push(user);
                addNewEmployee();    
            }
        });
};

// All employees answer these questions inside the sharedQuestions array
// name, id, email...
const input = async function answerEmployeeQuestions() {
    await Inquirer
        .prompt(questions)
        .then(async function (data) {
            let user = {
                'name': data.name,
                'id': data.id,
                'email': data.email,
                'role': 'employee',
                'title': data.title,
                'phone': '',
                'gitname': '',
                'school': ''
            };
            employees.push(user);
            addNewEmployee();
        });
};

// This allows us to loop back into flow so we can add as many employees we want
const next = async function nextEmployee() {
    await Inquirer
        .prompt(initiateScript)
        .then(async function (data) {
            if (data.start === 'Add an employee?') {
                employees.length = 0;
                input();
            }
            if (data.start === 'Generate team HTML?') {
                generatePage();
            }
        });
};

// Create a base employee type for supported team member types
const addNewEmployee = async function profile() {
    const name = employees[0].name;
    const id = employees[0].id;
    const email = employees[0].email;
    const role = employees[0].role;

    const employee = new Employee(name, id, email, role);

    generateByTitle();
};

// Determine which employee type to create based on title
const generateByTitle = async function getByTitle() {
    switch (employees[0].title) {
        case 'engineer':
            addEngineer();
            break;
        case 'intern':
            addIntern();
            break;
        default:
            addManager();
            break;
    };
};

// Manager specific question
const managerQuestion = [
    {
        type: 'input',
        message: 'Enter manager phone number',
        name: 'phone'
    }
];

// Create manager user
async function addManager() {
    await Inquirer
        .prompt(managerQuestion)
        .then(async function (data) {
            let answer = {
                'phone': data.phone
            };

            employees[0].phone = answer.phone;

            const name = employees[0].name;
            const id = employees[0].id;
            const email = employees[0].email;
            const phone = employees[0].phone;

            const manager = new Manager(name, id, email, phone);
            managers.push(manager);
        })

    next();
};

// Engineer specific question
const engineerQuestion = [
    {
        type: 'input',
        message: 'Enter engineer gitname name',
        name: 'gitname'
    }
];

// Create engineer user
async function addEngineer() {
    await Inquirer
        .prompt(engineerQuestion)
        .then(async function (data) {
            let answer = {
                'gitname': data.gitname
            };
            employees[0].gitname = answer.gitname;
        })
        .then(async function () {
            const gitname = employees[0].gitname;

            // Note this is looking for the usersname, not the full GitHub URL
            let queryURL = 'https://api.gitname.com/users/' + gitname;
            axios
                .get(queryURL)
                .then(async function (response) {
                    const repository = {
                        "gitname": response.data.login,
                    };

                    employees[0].gitname = repository.gitname;
                });
        });
    
    // We need a timeout here as we are making an AJAX request using Axios
    // This will tick for 2 milliseconds
    setTimeout(function () {
        const name = employees[0].name;
        const id = employees[0].id;
        const email = employees[0].email;
        const gitname = employees[0].gitname;

        const engineer = new Engineer(name, id, email, gitname);

        engineers.push(engineer);
    }, 2000);

    next();
};

// Intern specific question
const internQuestion = [
    {
        type: 'input',
        message: 'Enter intern school attended',
        name: 'school'
    }
];


// Create intern user
async function addIntern() {
    await Inquirer
        .prompt(internQuestion)
        .then(async function (data) {
            let answer = {
                'school': data.school
            };
            employees[0].school = answer.school;
        });

    const name = employees[0].name;
    const id = employees[0].id;
    const email = employees[0].email;
    const school = employees[0].school;

    const intern = new Intern(name, id, email, school);
    interns.push(intern);
    next();
};

function generatePage() {
    let teamPage = '';
    let payload = '';

    // Main template
    const template = fs.readFileSync('./templates/team.html', {encoding: 'utf8'});

    // Manager card
    const managerCard = fs.readFileSync('./templates/manager.html', {encoding: 'utf8'});

    // Engineer card
    const engineerCard = fs.readFileSync('./templates/engineer.html', {encoding: 'utf8'});

    // Intern card
    const internCard = fs.readFileSync('./templates/intern.html', {encoding: 'utf8'});

    // Loop thru each manager element and create a card from the templates folder
    let managerCards = [];
    for (i = 0; i < managers.length; i++) {
        let card = managerCard.replace('{{name}}', managers[i].name);
        card = card.replace('{{id}}', managers[i].id);
        card = card.replace('{{email}}', managers[i].email);
        card = card.replace('{{phone}}', managers[i].phone);

        managerCards.push(card);
    }
    payload += managerCards.join();

    // Loop thru each engineer element and create a card from the templates folder
    let engineerCards = [];
    for (i = 0; i < engineers.length; i++) {
        let card = engineerCard.replace('{{name}}', engineers[i].name);
        card = card.replace('{{id}}', engineers[i].id);
        card = card.replace('{{email}}', engineers[i].email);
        card = card.replace('{{gitname}}', engineers[i].gitname);

        engineerCards.push(card);
    }
    payload += engineerCards.join();

    // Loop thru each intern element and create a card from the templates folder
    let internCards = [];
    for (i = 0; i < interns.length; i++) {
        let card = internCard.replace('{{name}}', interns[i].name);
        card = card.replace('{{id}}', interns[i].id);
        card = card.replace('{{email}}', interns[i].email);
        card = card.replace('{{school}}', interns[i].school);

        internCards.push(card);
    }
    payload += internCards.join();

    // Let's wrap it up!
    teamPage = template.replace('{{teammembers}}', payload);

    // Write the final result
    fs.writeFile('./output/teampage.html', teamPage);

    console.log('Teampage Generated.');
}

// Kick off our application
start();
