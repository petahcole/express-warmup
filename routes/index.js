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
  if(V.validUser(userInfo)) {

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
  }  else  {
    res.redirect('error')
  }

})

router.get('/shoes', (req, res, next)  =>  {
  Q.getAll()
    .then((result)  =>  {
      res.json(result)
    })
    .catch((err)  =>  {
      res.json(err)
    })
})
router.post('/shoes', (req, res, next) =>  {
  Q.postNew(req.body)
    .then((result)  =>  {
      res.json(result)
    })
    .catch((err)  =>  {
      res.json(err)
    })
})   

router.get('/shoes/:id', (req, res, next) =>  {
  Q.getOne(req.params.id)
    .then((result)  =>  {
      res.json(result)
    })
    .catch((err)  =>  {
      res.json(err)
    })
}) 

router.put('/shoes/:id', (req, res, next) =>  {
  Q.updateOne(req.body, req.params.id)
    .then((result)  =>  {
      res.json(result)
    })
    .catch((err)  =>  {
      res.json(err)
    })
})

router.delete('/shoes/:id', (req, res, next)  =>  {
  Q.deleteOne(req.params.id)
    .then((result)  =>  {
      res.json(result)
    })
    .catch((err)  =>  {
      res.json(err)
    })
})


module.exports = router;
