
$("#submiter").click(function(){

    // Create a request variable and assign a new XMLHttpRequest object to it.
    // using the GET request to get location
    //var url = '//api.songkick.com/api/3.0/artists/4186126/calendar.json?apikey=XFK6hX8iZ4LjPg6l&jsoncallback=?';
    $('.events').empty();
    var city = $("#inputCity").val();
    try
    {
        var id = 'https://api.songkick.com/api/3.0/search/locations.json?query='+city+'&apikey=XFK6hX8iZ4LjPg6l';
        var flag = true;
        console.log(id.metadata);
        $.getJSON(id, function (data) {
            //console.log(data.resultsPage.status);
            if(data.resultsPage.status == "error") {
                $('.events').append('<h1>Error finding location</h1>');
            }
            else if (data.resultsPage.totalEntries == 0)
            {
                $('.events').append('<h1>Error finding location</h1>');
            }
            else {
                var location = data.resultsPage.results.location[0].metroArea.id;
                console.log(location);
                var url = 'https://api.songkick.com/api/3.0/events.json?apikey=XFK6hX8iZ4LjPg6l&location=sk:'+location;
                $.getJSON(url, function(data) {
                    var events = data.resultsPage.results.event;
                    //console.log(events);
                    $('.events').append('<h1>Upcoming Events</h1>');
                    events.forEach(function(item, index, array) {
                        // var event_month = (array[index].start.date);
                        // var event_day = array[index].start.datetime;
                        // var event_date = '<span class="month">'+ event_month +'</span><span class="day">'+ event_day +'</span>';
                        console.log(array[index]);
                        var event_performer = array[index].performance[0].artist.displayName;
                        var event_venue = array[index].venue.displayName;
                        var event_city = array[index].location.city;
                        var event_link = array[index].uri;
                        var event_date = array[index].start.date;
                        var event_details =  '<p>' + event_performer + ' @ ' + event_venue + '</p><p>' + event_city + '</p><p><a href="' + event_link + '">More details</a></p>';
                        var musics = $("#inputMusic").val();
                        if(musics[0] != null)
                        {
//                           flag = false;
                        var radio_url = 'http://ws.audioscrobbler.com/2.0/?method=artist.gettoptags&artist=' + event_performer +
                        '&api_key=4c9d0c1330e3918a1ed633547bd183a5&format=json';

                      $.getJSON(radio_url, function(data2) {
                          if (data2.toptags != null)
                          {
//                                flag = false;
                                var tags = data2.toptags.tag;
                                tags.every(function(tag){

                                 musics.every(function(music)
                                 {
                                 console.log(tag.name + " "+music + " " +tag.name.search(music));
                                if (tag.name.search(music) != -1)
                                    {
                                $('.events').append('<li><div class="date">'+ event_date + '</div><div class="music_tag">#'+music+'</div>' + event_details+'</li>');
                                    return false;
                                }
                                else{
                                return true;}
                                });
                                });
                            }
                            else{
                             $('.events').append('<li><div class="date">' + array[index].start.date + '</div>' + event_details + '</li>');
                             }
                        });

//                        if (flag){
//                             $('.events').append('<li><div class="date">' + array[index].start.date + '</div>' + event_details + '</li>');
//                         }

                        }

                        else{
                        $('.events').append('<li><div class="date">' + array[index].start.date + '</div>' + event_details + '</li>');
                         }
                    });
                });
            }

        });

    }
    catch(err)
    {

    }

    // $.post("/requests",
    //     {
    //         gnere: $("#inputMusic").val()
    //         //city: $("#inputCity").val()
    //     },
    //     function(data, status){
    //         console.log("Data: " + data + "\nStatus: " + status);
    //     });
});