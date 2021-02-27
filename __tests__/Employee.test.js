const Employee = require('../lib/Employee.js');

//Setups
const name = "test";
const email = "test@email.com";
const id = "id";
const employee = new Employee(1, 'test', 'test@mail.com', 'id',);

describe('Employee class', () => {
    test('class created', () =>{
        expect(employee).toBeTruthy();
    });
    test("verify role", () => {
        expect(employee.getRole()).toEqual('Employee');
    });
    test("verify id", () => {
        expect(employee.getId()).toEqual('id');
    });
    test("verify email", () => {
        expect(employee.getEmail()).toEqual('test@mail.com');
    });
});