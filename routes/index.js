var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt')
var V = require('../helpers/validate');
var Q = require('../helpers/queries')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/auth/login', (req, res, next)  =>  {
  let email = req.body.email;
  let password = req.body.password

  Q.getEmail(email)
    .then((result)  =>  {
      if(email == result.email && bcrypt.compareSync(password, result.password)) {
        res.json(result)
      } else {
        res.redirect('error')
      }        
    })
})

router.post('/auth/signup', (req, res, next)  =>  {
  let userInfo = {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 7) 
      } 

  Q.getEmail(userInfo.email)
    .then((result)  =>  {
      if(!result) {
          Q.addUser(userInfo)
          .then((result)  =>  {
            res.json(result)
        })

      } else  {
        res.redirect('error')
        }
    })

})


module.exports = router;
