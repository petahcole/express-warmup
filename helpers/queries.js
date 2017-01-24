var knex = require('../db-connection')

module.exports = {
    getEmail: function(email, password)   {
        return knex('users')
        .where('email', email).first()
    },
    addUser: function(userInfo) {
        if (userInfo.email.length < 3) {
          return Promise.reject({
            constraint: 'email not long enough'
          });
        } else {
          return knex('users').returning('id').insert(userInfo)
        }

    }
    
}