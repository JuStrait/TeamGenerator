const Intern = require('../lib/Intern.js');

//Setups
const name = "test";
const email = "test@email.com";
const school = "school";
const intern = new Intern(1, 'test', 'test@mail.com', 'school');

describe('Intern class', () => {
    test('class created', () =>{
        expect(intern).toBeTruthy();
    });
    test("verify role", () => {
        expect(intern.getRole()).toEqual('Intern');
    });
    test("verify school", () => {
        expect(intern.getSchool()).toEqual('school');
    });
});