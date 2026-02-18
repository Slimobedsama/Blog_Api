const Admin = require('../models/adminModel');

class AdminDao {
    constructor() {
        this.Admin = require('../models/adminModel');
    }

    static async findByEmail(email) {
        return Admin.findOne({ email });
    }

    static async getAllAdmin() {
        return Admin.find()
            .select('lastName firstName');
    }
}

module.exports = AdminDao;