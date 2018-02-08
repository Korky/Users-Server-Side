var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
    
    app.get('/users',(req,res) => {
        db.collection('users').find({}).toArray(function(err, item){
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    
    app.get('/users/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('users').findOne(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });
    
 
    app.delete('/users/:id', (req, res) => {
        const id = req.params.id
        const details = { '_id': new ObjectID(id) };
        db.collection('users').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                res.send('User '+id+' deleted');
            }
        });
    });
    
    app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const user = { 
            user_name:req.body.user_name,
            phone: req.body.phone,
            email: req.body.email,
            auth_roles: req.body.auth_roles,
            last_actions: req.body.last_actions,
            last_login: req.body.last_login
        }
    db.collection('users').update(details, user, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(user);
      } 
    });
  });
    
    app.post('/users', (req, res) => {
        console.log(req.body.user);
        const user = { 
            user_name:req.body.user_name,
            phone: req.body.phone,
            email: req.body.email,
            auth_roles: req.body.auth_roles,
            last_actions: req.body.last_actions,
            last_login: req.body.last_login
        }
        db.collection('users').insert(user,(err, result)=>{
           if(err){
               res.send({'error' : 'An error has occurred' });
           } else{
               res.send(result.ops[0]);
           }
        });
    });
};