var person_detail;
var people;
var current_index;

$(function() {

        $.ajax({
                url:'../NewFolder/person_list.php', //php file contains code to get data from database and echo it to this url
                dataType: 'json',
                success: function(data) {
                         people = data;
                         show_list();
                }
        });
});


        function show_list() {

                $('#result').empty();  //Empty the element in html that has the ID result


                people.forEach(function(person){ //for every entry in the array contacts...

                        var firstname = "'" + person.fname + "'";
                        var lastname = "'" + person.lname + "'";
                        var pic = "'" + person.picture + "'";

                        $('#result').append('<li data-theme="c">' +
                        '<a href="#detail_view" data-transition="slidefade" onclick="show_detail(' + person.id + ', '
                        + firstname + ', ' + lastname + ')">'
                        + person.fname
                        +'<br />'
                        + person.lname
                        + '<img src="img/' + person.picture + '" width="50px"/>' //TO DO: make pretty with css!
                        + '</a>' +
                        '</li>').listview('refresh');
                });
        }

        function show_detail(id, fname, lname) {
                //make a nice breadcrumb in the header
                $("#detail_view_header").html("<a href='#my_list'>my list</a> -> detail view: " + fname + " " + lname);
        }

        function get_detail(id) {
                var detail_url = 'person_by_id.php?id='+id;
                $.ajax({
                        url: detail_url, //php file contains code to get data from database and echo it to this url
                        dataType: 'json',
                        success: function(data) {
                                person_detail = data;
                                console.log(person_detail);
                        }
                });

        }

        function show_person(person_detail) {


        }


