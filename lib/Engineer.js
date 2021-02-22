const Employee = require('./Employee');

class Engineer extends Employee {

    constructor(id, name, email, git) {
        super(id,name, email, git);

        this.git = git;
    }

    getRole() {
        return "Engineer";
    }

    getGit() {
        return this.git;
    }
}

module.exports = Engineer;