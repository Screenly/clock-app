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
//= require app.utils


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
    var clock_format_24h = window.srly.getQueryVar('24h');



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

        window.srly.scaleElementFontSize(clockDom);
        window.addEventListener('resize', function (e) {
            window.srly.scaleElementFontSize(clockDom);
        });


        /**
         * Start the loop that will be updating everytime
         *
         * @since 0.0.1
         */
        setInterval(checkTime, 1000);

        showScreenlyBanner();
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

        if (local.properties.lang) {
            mmt.locale(local.properties.lang);
        }

        if (local.properties.timezone) {
            mmt.tz(local.properties.timezone);
        }


        /**
         * Draw DOM clock
         */
        switch (clock_format_24h) {
            case '0':
                clockDom.innerHTML = mmt.format(
                    '[<span>]h[&nbsp;<i>:</i>&nbsp;]mm[&nbsp;<span style="font-size:0.5em;">]A[</span>][</span>]'
                );
                break;
            default:
                clockDom.innerHTML = mmt.format('[<span>]HH[&nbsp;<i>:</i>&nbsp;]mm[</span>]');
                break;
        }

        window.srly.scaleElementFontSize(clockDom);


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
     * Display a Screenly banner if not a Screenly-Pro player
     */
    var showScreenlyBanner = function () {
        var partOfScreenlyUserAgent = 'screenly-viewer';
        var playerUserAgent = navigator.userAgent;
        if (playerUserAgent.indexOf(partOfScreenlyUserAgent) === -1) {
            document.querySelector("#banner").style.visibility = 'visible';
        }
    };





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
