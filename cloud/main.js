var config = require('cloud/config.js').config;

var openGraph = {

    object_name: null,

    setObjectName: function (object_name) {
        this.object_name = object_name;
    },

    update: function (request, response) {
        Parse.Cloud.httpRequest({
            method: 'POST',
            url: 'https://graph.facebook.com/' + openGraph.getObjectPath(request.object),
            body: {
                access_token: config.access_token,
                object: openGraph.getObjectAsString(request.object)
            },
            success: function (httpResponse) {
                request.object.set("og_object_id", httpResponse.data.id);
                response.success();
            },
            error: function (httpResponse) {
                response.error("Couldn't create or update OG object");
            }
        });
    },

    getObjectAsString: function (object) {
        return JSON.stringify({
            title: object.get('name'),
            image: object.get('image'),
            url: object.get('url'),
            description: object.get('description')
        });
    },

    getObjectPath: function (object) {
        //  if there is not og_object_id, add new OG object
        if (!object.get('og_object_id') || object.get('og_object_id') == 'undefined') {
            return '/app/objects/' + config.namespace + ':' + openGraph.object_name;
        }
        // else update existing object
        else {
            return request.object.get('og_object_id');
        }
    }

}

Parse.Cloud.beforeSave("city", function (request, response) {
    openGraph.setObjectName("city");
    openGraph.update(request, response);
});