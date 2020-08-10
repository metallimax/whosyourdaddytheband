const { MongoDataSource } = require('apollo-datasource-mongodb');

class Users extends MongoDataSource {
  getUser(userId) {
    return this.findOneById(userId)
  }

  async getUsers() {
    const result = await this.collection.find().toArray();
    return result;
  }
}

module.exports.Users = Users;
