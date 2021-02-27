const Employee = require('../lib/Employee.js');

//Setups
const name = "test";
const email = "test@email.com";
const id = "id";
const employee = new Employee(name, id, email);

describe('Employee class', () => {
    test('class created', () =>{
        expect(employee).toBeTruthy();
    });
    test("verify role", () => {
        expect(employee.getRole()).toEqual('Employee');
    });
    test("verify id", () => {
        expect(employee.getId()).toEqual(id);
    });
    test("verify email", () => {
        expect(employee.getEmail()).toEqual('test@email.com');
    });
});