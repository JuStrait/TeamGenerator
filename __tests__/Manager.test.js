const Manager = require('../lib/Manager.js');

//Setups
const name = "test";
const email = "test@email.com";
const phone = "phone";
const manager = new Manager(1, 'test', 'test@mail.com', 'phone');

describe('Manager class', () => {
    test('class created', () =>{
        expect(manager).toBeTruthy();
    });
    test("verify role", () => {
        expect(manager.getRole()).toEqual('Manager');
    });
    test("verify git", () => {
        expect(manager.getPhone()).toEqual('phone');
    });
});