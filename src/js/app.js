(function() {
    /**
     * Month and day names in english,
     *
     * @since 0.0.1
     */

    var monthNames = [
        "Jan", "Feb", "Mar",
        "Apr", "May", "Jun",
        "Jul", "Aug", "Sep",
        "Oct", "Nov", "Dec"
    ];

    var dayNames = [
        "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
    ];



    /**
     * DOM elements
     *
     * @since 0.0.1
     */
    var html = document.querySelector("html");
    var clockDom = document.getElementById('digits');
    var dateDom = document.getElementById('date');



    /**
     * Checktime
     * Changes DOM clock time and determines if background needs to be changed in
     * order to represent the day light, sunset/sunrize or night
     *
     * @since 0.0.1
     */
    function checkTime() {

        var date = new Date();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var sup = hour < 12 ? '<sup>AM</sup>' : '';

        /**
         * Draw DOM clock
         */
        clockDom.innerHTML = date.getHours() + '<i>:</i>' + (minutes < 10 ? '0' + minutes : minutes);


        /**
         * Draw DOM date
         */
        dateDom.innerHTML = dayNames[date.getDay()] + ' ' + date.getDate() + ', ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
    }



    /**
     * All done let's init
     *
     * @since 0.0.1
     */
    checkTime();
    setInterval(checkTime, 1000);
})();
