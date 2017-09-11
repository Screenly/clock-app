/**
 * Dependencies
 */
//= require vendor/moment-with-locales.min
//= require vendor/moment-timezone-with-data
//= require vendor/moment-with-locales.min



/**
 * App utils
 */
//= require app.getQueryVar
//= require app.getLocalData



/**
 * This file should hold global script.
 *
 * @since    0.0.1
 */
;(function() {
    /**
     * Moment is the library used to edit time
     *
     * @since 0.0.1
     */

    // var mmt = moment();

    var local;
    var lat = window.srly.getQueryVar('lat');
    var lng = window.srly.getQueryVar('lng');
    var ip = window.srly.getQueryVar('ip');



    /**
     * DOM elements
     *
     * @since 0.0.1
     */
    var html = document.querySelector("html");
    var clockDom = document.querySelector('#digits');
    var dateDom = document.querySelector('#date');
    var creditsYearDom = document.querySelector('#credits-year');






    /**
     * After all functions and vars are declared we run init.
     *
     * @since 0.0.1
     */
    function init() {

        

        /**
         * Run time process for first time
         *
         * @since 0.0.1
         */
        checkTime();


        /**
         * Start the loop that will be updating everytime
         *
         * @since 0.0.1
         */
        setInterval(checkTime, 1000);
    }






    /**
     * Checktime
     * Changes DOM clock time and determines if background needs to be changed in
     * order to represent the day light, sunset/sunrize or night
     *
     * @since 0.0.1
     */
    function checkTime() {

        var mmt = moment ();

        if (local.properties.language) {
            if (local.properties.language.length > 0){
                mmt.locale(local.properties.language[0].iso639_1);
            }
        }

        if (local.properties.timezone) {
            mmt.tz(local.properties.timezone);
        }


        /**
         * Draw DOM clock
         */
        clockDom.innerHTML = mmt.format('HH[<i>:</i>]mm');


        /**
         * Draw DOM date
         */
        dateDom.innerHTML = mmt.format('D MMMM, YYYY');


        /**
         * Credits year
         */
        creditsYearDom.innerHTML = mmt.format('YYYY');
    }





    /**
     * We start the app getting local information like city name based on an IP 
     * input, lat and long or simply IP autodetection on server side.
     *
     * @since 0.0.1
     */
    var getLocalData = function() {

        var param = {};

        if (lat && lng) {
            param.lat = lat;
            param.lng = lng;
        } else if (ip) {
            param.ip = ip;
        }

        var oReq = window.srly.getLocalData(param);
        if (oReq) {
            oReq.addEventListener("load", function(e) {
                // register local
                if (e.target.status === 200) {
                    local = JSON.parse(e.target.response);

                    // INIT APP
                    init ();
                }
            });
        }
    }();
})();
