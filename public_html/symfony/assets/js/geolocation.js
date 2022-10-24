export let gps = {
    defaults : {
        //Current environment - dev provides log information
        env : 'prod',
        //If we want to autostart the plugin
        //If disabled we have to init the plugin with start:true option
        start : true,
        //If we want to ask for permission on init
        prompt : true,
        //The api.ipdata.co api key
        apikey: "f4ca6ff7e5152e9208fef21603d61a47140ec4dc8e11018b333d4bc1"
    },
    settings: {},
    //Navigator Service Status
    serviceIsActive:false,
    //Permission Service Status
    permissionsIsActive:false,
    //Location Permission State
    permissionsStatus:'inactive',
    //Plugin execution status
    isFinished:false,
    //Default Found position lat,lng
    position:{lat: 0,lng: 0},
    //Bounds for lat,lng if any
    //To disable bounds enter null
    // bounds = null,
    bounds:{north: 17.70,south: 17.05,west: 78.05,east: 78.90},
    // bounds = {north: 22.70,south: 17.05,west: 22.05,east: 78.90},
    //Default position for bounds checking
    isInBounds:false,
    //Default position for bounds checking
    positionDefault:{lat: 17.40010939119478,lng: 78.48258630887469},
    //IP or Navigator fetch type
    isAccurate:false,
    //If the invoke permission function is triggered
    invoke:false,
    checkEnv:function() {

        if (this.settings.env === 'dev'){
            console.log('aptoGeoLocation: INFO - Development environment is enabled.');
            console.log('aptoGeoLocation: INFO - Debug information about queries will appear.');
            console.log('aptoGeoLocation: INFO - Please change the env option to "prod" when finished.');
        }

        if (navigator.geolocation) {

            this.serviceIsActive = true;
        }

        if (navigator.permissions) {

            this.permissionsIsActive = true;
        }
    },
    start:function() {

        if (this.permissionsIsActive){

            this.makePermissionsQuery();
        }else{

            this.makePositionQuery();
        }
    },
    handleGeoError:function() {

        // fetch('https://api.ipdata.co/?api-key='+this.settings.apikey)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         if (settings.env === 'dev'){
        //
        //             console.log('aptoGeoLocation: DEBUG - handleGeoError');
        //             console.log(data);
        //         }
        //
        //         this.isAccurate = false;
        //         this.position = {
        //             lat: parseFloat(data.latitude),
        //             lng: parseFloat(data.longitude)
        //         }
        //
        //         this.checkPositionBounds();
        //
        //         this.isFinished = true;
        //     })
        this.isAccurate = false;
        this.position = {
            lat: 17.40010939119478,
            lng: 78.48258630887469
        }

        this.checkPositionBounds();

        this.isFinished = true;
    },
    checkPositionBounds:function () {

        if (this.position.lat < this.bounds.south || this.position.lat > this.bounds.north || this.position.lng > this.bounds.east || this.position.lng < this.bounds.west){

            this.position = this.positionDefault;
        }else{

            this.isInBounds = true;
        }

        if (this.settings.env === 'dev'){

            console.log('aptoGeoLocation: DEBUG - checkPositionBounds');
            if (this.isInBounds === false){

                console.log('Out of bounds');
            }else {

                console.log('In bounds');
            }
        }
    },
    makePermissionsQuery:function() {

        let _this = this
        navigator.permissions.query({name: 'geolocation'}).then(function (result) {

            if (_this.settings.env === 'dev'){

                console.log('aptoGeoLocation: DEBUG - makePermissionsQuery');
                console.log(result);
            }

            _this.permissionsStatus = result.state;

            switch (result.state) {

                case "granted":

                    _this.makePositionQuery();
                    break;
                case "prompt":

                    //If prompt on init is active
                    //ask for permission directly to pop
                    //allow location window
                    if (_this.settings.prompt === true){

                        _this.makePositionQuery();
                    }else{

                        _this.handleGeoError();
                    }
                    break;
                case "denied":

                    _this.handleGeoError();
                    break;
            }
        });
    },
    makePositionQuery:function () {

        let _this = this
        navigator.geolocation.getCurrentPosition(function (devicePos) {

            if (_this.settings.env === 'dev'){
                console.log('aptoGeoLocation: DEBUG - makePositionQuery');
                console.log(devicePos);
            }

            _this.isAccurate = true;
            _this.position = {
                lat: parseFloat(devicePos?.coords.latitude),
                lng: parseFloat(devicePos?.coords.longitude)
            }

            _this.checkPositionBounds();

            //inject granted status as this is an if dependent variable
            //,so we make sure it's in place for the prompt statement
            _this.permissionsStatus = 'granted';

            if (_this.invoke === true){

                let url = new URL(window.location.href);
                let params = url.searchParams;

                params.set('invoke','1');
                params.set('p',this.position.lat+','+this.position.lng);

                url.search = params.toString();

                url = window.location.href;
                if (url.indexOf('?') !== -1){
                    url = url+'&invoke=1';
                }else{
                    url = url+'?invoke=1';
                }
                window.location = decodeURIComponent(url.toString());

            }

            _this.isFinished = true;
        },function () {

            _this.handleGeoError();
        });
    },
    initialize:function(options) {

        this.settings = {...this.defaults,...options}


        //Check the environment variables
        this.checkEnv();

        //If navigator go normally
        //Else trigger error
        if (this.serviceIsActive){

            this.start();
        }else{

            this.handleGeoError();
        }

        if (this.settings.env === 'dev'){
            console.log('aptoGeoLocation: DEBUG - Init Finished');
            console.log(this);
        }

        if (this.position.lat === 0 && this.position.lng === 0){
            this.position = this.positionDefault;
        }

        return this;
    }
}


// export { gps }


// A = {}
//
// function aptoGeoLocation(options) {
//
//     /**
//      * Private Variable initialization
//      */
//     let defaults = {
//             //Current environment - dev provides log information
//             env : 'prod',
//             //If we want to autostart the plugin
//             //If disabled we have to init the plugin with start:true option
//             start : true,
//             //If we want to ask for permission on init
//             prompt : true,
//             //The api.ipdata.co api key
//             apikey: "f4ca6ff7e5152e9208fef21603d61a47140ec4dc8e11018b333d4bc1"
//         },
//         // Plugin settings variable that merges with the default config
//         settings = {...defaults,...options},
//         //Navigator Service Status
//         serviceIsActive = false,
//         //Permission Service Status
//         permissionsIsActive = false,
//         //Location Permission State
//         permissionsStatus = 'inactive',
//         //Plugin execution status
//         isFinished = false,
//         //Default Found position lat,lng
//         position = {lat: 0,lng: 0},
//         //Bounds for lat,lng if any
//         //To disable bounds enter null
//         // bounds = null,
//         bounds = {north: 17.70,south: 17.05,west: 78.05,east: 78.90},
//         // bounds = {north: 22.70,south: 17.05,west: 22.05,east: 78.90},
//         //Default position for bounds checking
//         isInBounds = false,
//         //Default position for bounds checking
//         positionDefault = {lat: 17.40010939119478,lng: 78.48258630887469},
//         //IP or Navigator fetch type
//         isAccurate = false,
//         //If the invoke permission function is triggered
//         invoke = false;
//     /**
//      * Disallow multiple instances of the plugin to run
//      * in order to avoid duplicate instances and requests
//      */
//     if (this.length > 1) {
//
//         return null;
//     }
//
//     /**
//      * Navigator Service Status
//      * @returns {boolean}
//      */
//     this.serviceIsActive = function() {
//
//         return serviceIsActive;
//     }
//
//     // /**
//     //  * Permission Service Status
//     //  * @returns {boolean}
//     //  */
//     // this.permissionsIsActive = function() {
//     //
//     //     return permissionsIsActive;
//     // }
//
//     /**
//      * The current permissions status
//      *
//      * granted: we allow location
//      * prompt: we never asked for location permission
//      * denied: we disallow location
//      * inactive: browser does not support permissions
//      */
//     this.getPermissionsStatus = function() {
//
//         return permissionsStatus;
//     }
//
//     /**
//      * Plugin execution status
//      * @returns {boolean}
//      */
//     this.isFinished = function() {
//
//         return isFinished;
//     }
//
//     /**
//      * Found position lat,lng
//      * @returns {{lng: number, lat: number}}
//      */
//     this.getPosition = function() {
//
//         return position;
//     }
//
//     /**
//      * IP or Navigator fetch type
//      * @returns {boolean}
//      */
//     this.isAccurate = function() {
//
//         return isAccurate;
//     }
//
//     /**
//      * If the current position is in
//      * default bounds if any
//      * @returns {boolean}
//      */
//     this.isInBounds = function() {
//
//         return isInBounds;
//     }
//
//     /**
//      * Plugin settings variable that merges with the default config
//      *
//      * @returns {*}
//      */
//     this.getSettings = function() {
//
//         return settings;
//     }
//
//     /**
//      * Check if navigator services are present
//      * @returns {jQuery}
//      */
//     let checkEnv = function() {
//
//         if (settings.env === 'dev'){
//             console.log('aptoGeoLocation: INFO - Development environment is enabled.');
//             console.log('aptoGeoLocation: INFO - Debug information about queries will appear.');
//             console.log('aptoGeoLocation: INFO - Please change the env option to "prod" when finished.');
//         }
//
//         if (navigator.geolocation) {
//
//             serviceIsActive = true;
//         }
//
//         if (navigator.permissions) {
//
//             permissionsIsActive = true;
//         }
//     }
//
//     /**
//      * Start Geolocation with the found active
//      * services and check if permissions API is enabled
//      *
//      * It is not supported in Safari,etc browsers
//      *
//      * On unsupported we go directly for position query
//      */
//     let start = function() {
//
//         if (permissionsIsActive){
//
//             makePermissionsQuery();
//         }else{
//
//             makePositionQuery();
//         }
//     }
//
//     /**
//      * Fallback GPS based on IP
//      * https://api.ipdata.co
//      */
//     let handleGeoError = function() {
//
//         fetch('https://api.ipdata.co/?api-key='+settings.apikey)
//             .then(res => res.json())
//             .then(data => {
//                 console.log(data)
//                 if (settings.env === 'dev'){
//
//                     console.log('aptoGeoLocation: DEBUG - handleGeoError');
//                     console.log(data);
//                 }
//
//                 isAccurate = false;
//                 position = {
//                     lat: parseFloat(data.latitude),
//                     lng: parseFloat(data.longitude)
//                 }
//
//                 checkPositionBounds();
//
//                 isFinished = true;
//             })
//             //  isAccurate = false;
//             // position = {
//             //     lat: 17.40010939119478,
//             //     lng: 78.48258630887469
//             // }
//             //
//             // checkPositionBounds();
//             //
//             // isFinished = true;
//     }
//
//     let checkPositionBounds = function () {
//
//         if (position.lat < bounds.south || position.lat > bounds.north || position.lng > bounds.east || position.lng < bounds.west){
//
//             position = positionDefault;
//         }else{
//
//             isInBounds = true;
//         }
//
//         if (settings.env === 'dev'){
//
//             console.log('aptoGeoLocation: DEBUG - checkPositionBounds');
//             if (isInBounds === false){
//
//                 console.log('Out of bounds');
//             }else {
//
//                 console.log('In bounds');
//             }
//         }
//     }
//
//     /**
//      * Make a permissions query to see if we have GPS
//      * permission granted
//      *
//      * granted: we allow location
//      * prompt: we never asked for location permission
//      * denied: we disallow location
//      */
//     let makePermissionsQuery = function() {
//
//         navigator.permissions.query({name: 'geolocation'}).then(function (result) {
//
//             if (settings.env === 'dev'){
//
//                 console.log('aptoGeoLocation: DEBUG - makePermissionsQuery');
//                 console.log(result);
//             }
//
//             permissionsStatus = result.state;
//
//             switch (result.state) {
//
//                 case "granted":
//
//                     makePositionQuery();
//                     break;
//                 case "prompt":
//
//                     //If prompt on init is active
//                     //ask for permission directly to pop
//                     //allow location window
//                     if (settings.prompt === true){
//
//                         makePositionQuery();
//                     }else{
//
//                         handleGeoError();
//                     }
//                     break;
//                 case "denied":
//
//                     handleGeoError();
//                     break;
//             }
//         });
//     }
//
//     /**
//      * Make a direct navigator geolocation position query
//      * and get the device position
//      */
//     let makePositionQuery = function () {
//
//         navigator.geolocation.getCurrentPosition(function (devicePos) {
//
//             if (settings.env === 'dev'){
//                 console.log('aptoGeoLocation: DEBUG - makePositionQuery');
//                 console.log(devicePos);
//             }
//
//             isAccurate = true;
//             position = {
//                 lat: parseFloat(devicePos?.coords.latitude),
//                 lng: parseFloat(devicePos?.coords.longitude)
//             }
//
//             checkPositionBounds();
//
//             //inject granted status as this is an if dependent variable
//             //,so we make sure it's in place for the prompt statement
//             permissionsStatus = 'granted';
//
//             if (invoke === true){
//
//                 let url = new URL(window.location.href);
//                 let params = url.searchParams;
//
//                 params.set('invoke','1');
//                 params.set('p',position.lat+','+position.lng);
//
//                 url.search = params.toString();
//
//                 url = window.location.href;
//                 if (url.indexOf('?') !== -1){
//                     url = url+'&invoke=1';
//                 }else{
//                     url = url+'?invoke=1';
//                 }
//                 window.location = decodeURIComponent(url.toString());
//
//             }
//
//             isFinished = true;
//         },function () {
//
//             handleGeoError();
//         });
//     }
//
//     /**
//      * Make a direct navigator geolocation position query
//      * and get the device position
//      *
//      * This will make a makePositionQuery with a global scope
//      * used for click events etc
//      */
//     this.allowPermission = function () {
//
//         invoke = true;
//         makePositionQuery();
//     }
//
//     /**
//      * Initialize Geolocation based on preferences
//      * @returns {jQuery}
//      */
//     this.initialize = function() {
//
//         //Check the environment variables
//         checkEnv();
//
//         //If navigator go normally
//         //Else trigger error
//         if (serviceIsActive){
//
//             start();
//         }else{
//
//             handleGeoError();
//         }
//
//         if (settings.env === 'dev'){
//             console.log('aptoGeoLocation: DEBUG - Init Finished');
//             console.log(this);
//         }
//
//         if (position.lat === 0 && position.lng === 0){
//             position = positionDefault;
//         }
//
//         return this;
//     };
//
//     if (settings.start === true){
//
//         return this.initialize();
//     }else{
//         return null;
//     }
// }
//
// A.aptoGPS = aptoGeoLocation({
//     env : 'prod',
//     prompt : false
// });

