const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// creating a list of contacts
var contactList = [
	{
		name: 'sam',
		phone: '123'
	},
	{
		name: 'bam',
		phone: '321'
	},
	{
		name: 'has',
		phone: '555'
	}
];

// requesting urls + finding contacts
app.get('/', function(req, res) {
	Contact.find({}, function(err, contacts) {
		if (err) {
			console.log('Error in Finding Contacts');
			return;
		}
		return res.render('home', {
			title: 'SaMs-Contacts',
			contact_list: contacts
		});
	});
});

// app.get('/practice', function(req, res) {
// 	return res.render('practice', { title: 'Plaer' });
// });

app.post('/create-contact', function(req, res) {
	//  contactList.push(
	//      req.body)
	// return res.redirect('back')
	Contact.create(
		{
			name: req.body.name,
			phone: req.body.phone
		},
		function(err, newContact) {
			if (err) {
				console.log('Error in creating Contact');
				return;
			}

			console.log('######', newContact);
			return res.redirect('back');
		}
	);
});

// Deleting Contact
app.get('/delete-contact/', function(req, res) {
	console.log('Number deleted', req.query);
	let id = req.query.id;

	Contact.findByIdAndDelete(id, function(err) {
		if (err) {
			console.log('Error in Deleting an Object in DB');
			return;
		}
		return res.redirect('back');
	});
});

//  Getting Errors condition statement
app.listen(port, function(err) {
	if (err) {
		console.log('Ops there is an Error', err);
	}
	console.log('It is running on port', port);
});
