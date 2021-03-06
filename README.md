Create Open Graph Objects using the Facebook Object API and Parse Cloud Code
==========================

This repo demonstrates how to use the Facebook Object API (https://developers.facebook.com/docs/opengraph/using-objects) together with Parse Cloud Code (https://parse.com/docs/cloud_code_guide). 

What it does:
==========================
* Before saving a Parse object the script will create a new OG entiy and use the object data to populate the OG entity with title, description, image & url. 
* The OG object ID will be saved in the column "og_object_id".
* If the OG entity already exists, it will update it.

Setup
==========================
* Install the Parse Command Line Tool via terminal: "curl -s https://www.parse.com/downloads/cloud_code/installer.sh | sudo /bin/bash"
* Create Parse app (https://parse.com/apps/)
* Go to "Settings" > Application Keys. Rename /config/global.sample.json to /config/global.json and add you Application ID and Master Key
* Go to "Web hosting" and set a Parse App Name (http://parseappname.parseapp.com)
* Go to "Data Browser" and add a new class "city" (custom fields: description, image, url, og_object_id; All as datatype "string")
* Create a Facebook App: https://developers.facebook.com/apps
* Go to "Open Graph" and add an object with the name "City"
* Set an app namespace and place the value in /cloud/config.sample.js
* Go to Graph API Explorer https://graph.facebook.com/oauth/access_token?client_id={app-id}&client_secret={app-secret}&grant_type=client_credentials
* Take the access_token value of the response and place it in /cloud/config.sample.js.
* Save /cloud/config.sample.js as /cloud/config.js
* Run "parse deploy" in the project root (via terminal) to send your code to Parse.
* Go back to the Parse Data Browser and insert an object. 

If everything is done right, the column og_object_id should be populated automatically. The created object can be reviewed via https://graph.facebook.com/{og_object_id}


Usage
==========================
```javascript
Parse.Cloud.beforeSave("city", function (request, response) {
    openGraph.setObjectName("city");
    openGraph.update(request, response);
});
```


From Facebook: Using the Object API
==========================
"The Object API lets you create and manage Open Graph objects using a simple HTTP-based API. The Object API is supported for both mobile and web apps.

The Object API is one of two ways that objects can be created. Objects can also be created by adding special markup to web pages that you host. These self-hosted objects must be hosted on your web server and all objects are public. Creating self-hosted objects is covered in our using self-hosted objects documentation. In contrast, the Object API lets you create objects through a single HTTP call without the requirement for a web server to host them. The Object API can also create objects that have custom or non-public privacy settings.

The Object API also includes an API for you to upload images to Facebook to use in objects and stories."


From Parse.com: What is Cloud Code?
==========================

Parse's vision is to let developers build any mobile app without dealing with servers. For complex apps, sometimes you just need a bit of logic that isn't running on a mobile device. Cloud Code makes this possible.

Cloud Code is easy to use because it's built on the same JavaScript SDK that powers thousands of apps. The only difference is that this code runs in the Parse Cloud rather than running on a mobile device. When you update your Cloud Code, it becomes available to all mobile environments instantly. You don't have to wait for a new release of your application. This lets you change app behavior on the fly and add new features faster.

Even if you're only familiar with mobile development, we hope you'll find Cloud Code straightforward and easy to use.



