const Employee = require('./Employee');

class Manager extends Employee {

    constructor(id, name, email, officePhone) {
        super(id,name, email, officePhone);

        this.officePhone = officePhone;
    }

    getRole() {
        return "Manager";
    }

    getPhone() {
        return this.officePhone;
    }
}

module.exports = Manager;