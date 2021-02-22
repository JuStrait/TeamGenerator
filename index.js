const Employee = require('./lib/Employee.js');
const Manager = require('./lib/Manager.js');
const Intern = require('./lib/Intern.js');
const Engineer = require('./lib/Engineer.js');

const Inquirer = require('inquirer');
const Jest = require('jest');
const fs = require('fs');
const inquirer = require('inquirer');

/* const employeeQuestions = [
    "What is your name?",
    "What is your employee ID?",
    "What is your email address?",
]; */

const managerQuestions = [
    "What is your name?",
    "What is your employee ID?",
    "What is your email address?",
    "What is your phone number?",
];

const engineerQuestions = [
    "What is your name?",
    "What is your employee ID?",
    "What is your email address?",
    "What is their github URL?",
];

const internQuestions = [
    "What is your name?",
    "What is your employee ID?",
    "What is your email address?",
    "What school do they attend?",
];

/* const checkboxSelections = [
    "Would you like to add an Engineer?",
    "Would you like to add an Intern?",
    "Are you finished?",
]; */
// let employeeAnswers = [];
let managerAnswers = [];
let engineerAnswers = [];
let internAnswers = [];

function manager() {
    inquirer.prompt([
    {
        type: "input",
        name: "name",
        message: managerQuestions[0]
    },
    {
        type: "input",
        name: "id",
        message: managerQuestions[1]
    },
    {
        type: "input",
        name: "email",
        message: managerQuestions[2]
    },
    {
        type: "input",
        name: "phone",
        message: managerQuestions[3]
    },
    
    ]).then( (answers) => {
        managerAnswers.push(answers);
        engineer();
    });
};



function engineer() {
    inquirer.prompt([
        { 
            type: "confirm",
            name: "engineerResponse",
            message: "Would you like to add an Engineer?",
        }, 
    ])
   
    .then ( (response) => {
        if (response = true) {
            inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: engineerQuestions[0]
                },
                {
                    type: "input",
                    name: "id",
                    message: engineerQuestions[1]
                },
                {
                    type: "input",
                    name: "email",
                    message: engineerQuestions[2]
                },
                {
                    type: "input",
                    name: "phone",
                    message: engineerQuestions[3]
                },                
            ])
            .then( (answers) => {
                engineerAnswers.push(answers);
                    intern();
            });
        } else {
            intern();
        }
    });
};
    
function intern() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "internResponse",
            message: "Would you like to add an Intern?"
        },
    ]).then( (response) => {
        if (response = true) {
            inquirer.prompt([
               {
                    type: "input",
                    name: "name",
                    message: internQuestions[0]
                },
                {
                    type: "input",
                    name: "id",
                    message: internQuestions[1]
                },
                {
                    type: "input",
                    name: "email",
                    message: internQuestions[2]
                },
                {
                    type: "input",
                    name: "phone",
                    message: internQuestions[3]
                },     
                ])
            .then( (answers) => {
                internAnswers.push(answers);
            });     
        }
    });   
};
    
manager();
