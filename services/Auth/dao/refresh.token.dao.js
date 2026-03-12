class RefreshTokenDao {
    constructor() {
        this.RefreshToken = require('../models/refreshToken.model');
    }

    async createRefreshToken(data) {
        return await this.RefreshToken.create(data);
    }

    async getRefreshToken(token) {
        return await this.RefreshToken.findOneAndUpdate(
            { token, isBlacklisted: false },
            { $set: { isBlacklisted: true } }
        );
    }
}

module.exports = new RefreshTokenDao