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

    },
    getAll: function()  {
      return knex('shoes')
    },
    postNew: function(body) {
      return knex('shoes').returning('id').insert(body)
    },
    getOne: function(id)  {
      return knex('shoes').where('id', id).first()
    },
    updateOne: function(body, id) {
      return knex('shoes').where('id', id).update({
        shoe_brand: body.shoe_brand,
        is_new: body.is_new,
        user_id: body.user_id
      })
    },
    deleteOne: function(id) {
      return knex('shoes').where('id', id).returning('id').del()
    }
}