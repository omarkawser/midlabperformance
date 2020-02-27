var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/user-model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});



router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('home/index', {user: result});
	});
});

// router.post('/:id', function(req, res){
// 	var user = {
// 		id: req.body.id,
// 		name: req.body.name,
// 		companyName: req.body.companyName,
// 		contact: req.body.contact,
// 		username: req.body.username,
// 		password: req.body.password,
// 		type: req.body.type
// 	};

// 	userModel.getById(req.body.search, function(result){
// 		res.render('home/search', {user: result});
// 	});

// });

router.get('/view_users', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/view_users', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});
});















router.get('/add_class', function(req, res){
	
		userModel.getAll(function(results){
			if(results.length > 0){
				res.render('home/add_class', {userlist: results});
			}else{
				res.redirect('/home');
			}
		});
});


























router.get('/edit/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
});

router.post('/edit/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			name: req.body.name,
			companyName: req.body.companyName,
			contact: req.body.contact,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.update(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/edit/'+req.params.id);
			}
		});
});

router.get('/delete/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/delete', {user: result});
	});
});

router.post('/delete/:id', function(req, res){
	
		var user = {
			id: req.params.id,
			name: req.body.name,
			companyName: req.body.companyName,
			contact: req.body.contact,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};

		userModel.delete(user, function(status){
			if(status){
				res.redirect('/home/view_users');
			}else{
				res.redirect('/home/delete/'+req.params.id);
			}
		});
});



router.get('/addUser', function(req, res){
	res.render('home/addUser');
});

router.post('/addUser', function(req, res){
	
		// req.check('username', 'Invalid Username').isLength({min:4});
		// req.check('password', 'Invalid password').isLength({min:4});

		// var errors = req.validationErrors();
		// if(errors){
		// 	res.send('Error');
		// }
		// else{
		var user = {
			//id: req.params.id,
			name: req.body.name,
			companyName: req.body.companyName,
			contact: req.body.contact,
			username: req.body.username,
			password: req.body.password,
			type: req.body.type
		};
	//}

		userModel.insert(user, function(status){
			if(status){
				console.log('Registered');
				res.redirect('/home/view_users');
			}else{
				console.log('Not Registered');
				res.redirect('/home/addUser/');
			}
		});
});


//Searching
router.get('/search', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/edit', {user: result});
	});
});

router.post('/view_users/:id', function(req, res){
	userModel.getById(req.params.id, function(result){
		res.render('home/search', {user: result});
	});
});


module.exports = router;