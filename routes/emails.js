/**
 * This file defines the email tests for your project.
 * 
 * Each email test should provide the locals used to render the
 * email template for preview.
 * 
 * Values can either be an object (for simple tests), or a
 * function that calls a callback(err, locals).
 * 
 * Sample generated emails, based on the keys and methods below,
 * can be previewed at /keystone/test-email/{key}
 */

var keystone = require('keystone');

module.exports = {
	
	/** New Enquiry Notifications */
	
	'enquiry-notification': function(req, res, callback) {
		
		// To test enquiry notifications we create a dummy enquiry that
		// is not saved to the database, but passed to the template.
		
		var Enquiry = keystone.list('Enquiry');
		
		var newEnquiry = new Enquiry.model({
			name: { first: 'Test', last: 'User' },
			email: 'contact@espn-creativeworks-showcase.com',
			phone: '+61 2 1234 5678',
			enquiryType: 'message',
			message: { md: 'Nice enquiry notification.' }
		});

		newEnquiry.save(function (err, enquiry){
			callback(err, {
				admin: 'Admin User',
				enquiry: enquiry,
				enquiry_url: '/keystone/enquiries/' // jshint ignore:line
			});
		});
		
	}
	
};
