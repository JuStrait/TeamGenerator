const Employee = require('./Employee');

class Manager extends Employee {

    constructor(id, name, email, phone) {
        super(id,name, email, phone);

        this.phone = phone;
    }

    getRole() {
        return "Manager";
    }

    getPhone() {
        return this.phone;
    }
}

module.exports = Manager;