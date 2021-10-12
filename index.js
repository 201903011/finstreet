const express = require('express')
const app = express()
const port = 3000
var con1 = require("./src/db/conn");
const User =  require("./src/db/user");

const multer  = require('multer')
const upload = multer({ dest: './uploads/' })

const { uuid } = require('uuidv4');


app.use(express.static(__dirname))
app.use(express.static(__dirname+ "/html"))
app.use(express.json() )
app.use(express.urlencoded({extended:false}))

app.set("views engine","hbs")
app.get('/', async (req, res) => {
	
	res.render("login.hbs") ;
} )
app.get('/signup',async (req, res) => {
	
	res.render("signup.hbs") ;
} )
app.get('/login', async (req, res) => {
	
	res.render("login.hbs") ;
} )

app.get('/list',async (req, res) => {
	
	var alluser = await User.find() ;
	
	//console.log("alluser is ",alluser)

	res.render("list.hbs",     {alluser}  ) ;
} )
app.get('/add', (req, res) => {
	
	res.render("add.hbs") ;
} )
app.get('/update/:id' ,async ( req, res) => {
	console.log(req.params.id, req.body.user_name)
	var finduser = await User.findOne({user_id : req.params.id })
	console.log(finduser)
	res.render("ed.hbs",finduser) ;
} )

app.post('/edit/:id',	upload.single('user_image'),async ( req, res) => {
	
	try {
	
	console.log('body is ',        req.body, req.params.id, req.file)
	const filter = { user_id : req.params.id }
	const update = { user_name : req.body.user_name ,
					 user_password: req.body.user_password ,
					 user_image : req.file
					}
	
	console.log(filter)
		
	var mark = await User.findOneAndUpdate(filter,update)
	
	res.redirect('/list') ;
		
	} catch (error) {
		
	}
	
} )

app.post('/delete/:id',async (req, res) => {
	
	try {
		console.log("delete ",req.params.id)
		await User.findOneAndDelete({user_id: req.params.id })
	
		res.redirect('/list')
	
	} catch (error) {
		
	}

	
} )
app.post('/insert',	upload.single('user_image'), async (req, res) => {
	
	try {
		var newuser = new User() ;
	newuser.user_id 		=  uuid();
	newuser.user_name 		=  req.body.user_name ;
	newuser.user_email 		=  req.body.user_email ;
	newuser.user_password 	=  req.body.user_password ;
	newuser.user_image 		=  req.file ;
	newuser.total_orders	= 0 ;
	newuser.created_at		=  Date.now() ;
	newuser.last_logged_in	=  'ss' ;

	 console.log(newuser, req.body) ;
	const xc = await newuser.save() ;

	res.redirect("/list") ;
		
	} catch (error) {
		
	}
	
} )

app.get('/details/:id', async (req, res) => {
	
	try {
		console.log(req.params.id, req.body)
		var finduser = await User.findOne({user_id : req.params.id })
		console.log(finduser)
		res.render("details.hbs", {finduser : finduser}) ;
	
		
	} catch (error) {
		
	}
	
} )
app.listen(port, () => console.log(`Example app listening on port port!`))