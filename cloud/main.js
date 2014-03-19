
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});


Parse.Cloud.afterSave("city", function(request) {
	console.log(request);

	var data = {
    	title: 'New York City',
    	image: 'http://upload.wikimedia.org/wikipedia/en/d/db/Flower-taxi.jpg',
    	url: 'http://www1.nyc.gov/',
    	description: 'Best City in the world'
    };

	// var data = '{\"title\":\"The Hunt for Red October\",\"image\":\"http://ecx.images-amazon.com/images/I/314leP6WviL._SL500_AA300_.jpg\",\"url\":\"https://link.you.want.displayed/example/hunt-for-red-october-link\",\"description\":\"Classic cold war technothriller\",}';

    console.log(JSON.stringify(data));

	var _request = {
	  method: 'POST',
	  url: 'https://graph.facebook.com/app/objects/city',
	  body: {
	    access_token: '',
	    object: JSON.stringify(data)
	  },
	  success: function(httpResponse) {
	  	console.log(httpResponse);
	    console.log(httpResponse.text);
	  },
	  error: function(httpResponse) {
	  	console.log(httpResponse);
	    console.error('Request failed with response code ' + httpResponse.status);
	  }
	};

	console.log(_request);
	
	Parse.Cloud.httpRequest(_request);

});