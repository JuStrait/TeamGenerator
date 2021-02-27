const Employee = require('./Employee');

class Engineer extends Employee {

    constructor(id, name, email, gitname) {
        super(id,name, email, gitname);

        this.gitname = gitname;
    }

    getRole() {
        return "Engineer";
    }

    getGit() {
        return this.gitname;
    }
}

module.exports = Engineer;