const { TestScheduler } = require('jest');
const Engineer = require('../lib/Engineer.js');

//Setups
const name = "test";
const email = "test@email.com";
const git = "mygithub.com";
const engineer = new Engineer(1, 'test', 'test@mail.com', 'mygithub');

describe('Engineer class', () => {
    test('class created', () =>{
        expect(engineer).toBeTruthy();
    });
    test("verify role", () => {
        expect(engineer.getRole()).toEqual('Engineer');
    });
    test("verify git", () => {
        expect(engineer.getGit()).toEqual('mygithub');
    });
});