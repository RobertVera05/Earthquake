var request = require('request');
var _ = require('underscore');
var moment = require('moment');

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


request({
    url: url,
    json: true
},function(error, response, body){
    if(!error && response.statusCode === 200){
        
var json=JSON.stringify(body);
var data =JSON.parse(json);


    var features = data.features;
    var s = new Date(); s.setDate(s.getDate() - 7);
    var e = new Date();

    var cali = [];
    _.each(features, function(i) {
        var found = /Cali/i.test(i.properties.place);
        var time = new Date(i.properties.time);
        var inweek = s.getTime()<=time.getTime() && time.getTime() <= e.getTime();
        if (found && inweek) cali.push(i.properties);
    });

    
    _.each(_.sortBy(cali, 'time'), function(i) {
        //2017-07-13T20:43:37+00:00
        var t = new moment(i.time).format();
        console.log(t + ' | ' + i.place + ' | Magnitude: ' + i.mag);
    });

        
    }
});

