module.exports = {
    validate: function(email, password)  {
    if(email == result.email && bcrypt.compareSync(password, result.password))    {
        return true
    }
    }
}