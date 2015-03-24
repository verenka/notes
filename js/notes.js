var people;
var notes_text;
var person_detail;

$(function() {

        get_data();

// ADD NEW PERSON & SAVE TO DATABASE

        $('#save_person').click(function() {
                if ($('#add_lname').val()=='' || $('#add_fname').val()=='') {
                        alert('Please enter first and last name!')
                }
                else {
                        // write contact into database
                        //format picture name (weird chrome, ie thing)
                        var filename = $('#fileinput1').val().replace("C:\\fakepath\\", "");

                        $.ajax({
                                url:'../NewFolder/add_person.php?fname='
                                        + $('#add_fname').val()
                                        + '&lname=' + $('#add_lname').val()
                                        + '&picture=' + filename,
                                        //php file contains code to get save data into database
                                type: 'GET',
                                success: function() {
                                        console.log("contact added!");
                                        get_data();
                                },
                                error: function (errorThrown) {
                                        alert('Post failed.');
                                        console.log(errorThrown);
                                }
                        });
                        //empty form fields

                        $('input').val('');

                }

                if ($('#fileinput1').val('')) {
                        //to do
                }
                else {
                        var file_data = $('#fileinput1').prop('files')[0];
                        var form_data = new FormData();
                        form_data.append('file', file_data);
                        $.ajax({
                                url: '../NewFolder/upload.php', // point to server-side PHP script
                                dataType: 'text',  // what to expect back from the PHP script, if anything
                                cache: false,
                                contentType: false,
                                processData: false,
                                data: form_data,
                                type: 'post',
                                success: function(php_script_response){
                                        alert(php_script_response); // display response from the PHP script, if any
                                }
                        });
                }

        });

        //click save after edit. WHY OH WHY YOU NO WORK?! trying js now instead of jquery

        document.getElementById("save_edit").onclick = function(){ edit_person() };


        //click save after adding note
        document.getElementById("save_note").onclick = function(){ add_note() };


        //click save after editing note
        document.getElementById("edited").onclick = function(){ save_edit_note() };

        //Z to A Sorting
        document.getElementById("zToA").onclick = function(){ sortDescending() };

        //Z to A Sorting
        document.getElementById("aToZ").onclick = function(){ get_data() };

});

function sortDescending() {
        $.ajax({
                url:'../NewFolder/person_list_descending.php', //php file contains code to get data from database and echo it to this url
                dataType: 'json',
                success: function(data) {
                        people = data;
                        show_list();
                }
        });
}

function save_edit_note() {
        edited_text = $("#edit_text").val();
        edited_tag = $("#edit_tag").val();
        note_id = $("#note_id").val();
        person_id = $("#edit_id").val();

        query_url = '../NewFolder/edit_note.php?id=' + note_id
                + '&note_text=' + edited_text
                + '&tag=' + edited_tag;

        $.ajax({
                url:query_url,
                type: 'GET',
                success: function(php_script_response){
                        console.log(php_script_response);
                        get_detail(person_id);
                },
                error: function (errorThrown) {
                        alert('Post failed.');
                        console.log(errorThrown);
                }
        });

}

function add_note() {
        note_text = $("#addnote").val();
        tag = $("#tag").val();
        person_id = $("#edit_id").val();

        $.ajax({
                url:'../NewFolder/add_note.php?note_text=' +
                note_text + '&tag='
                + tag
                + '&person_id=' + person_id
                // + '&picture=' + edit_pic
                ,
                type: 'GET',
                success: function(php_script_response){
                        console.log(php_script_response);
                        get_detail(person_id);
                },
                error: function (errorThrown) {
                        alert('Post failed.');
                        console.log(errorThrown);
                }
        });

        //empty form fields

        $("#addnote").val('');
        $("#tag").val('');


}

function get_data() {
        $.ajax({
                url:'../NewFolder/person_list.php', //php file contains code to get data from database and echo it to this url
                dataType: 'json',
                success: function(data) {
                        people = data;
                        show_list();
                }
        });
}

function show_list() {

        $('#result').empty();  //Empty the element in html that has the ID result

                people.forEach(function(person){ //for every entry in the array contacts...
                        $('#result').append('<li data-theme="c">' +
                        '<a href="#detail_view" data-transition="slidefade" onclick="get_detail('+ person.id +')" class="get_detail_link">'
                        + person.fname
                        +'<br />'
                        + person.lname
                        + '<img src="img/' + person.picture + '" width="50px"/>' //TO DO: make pretty with css!
                        + '</a>' +
                        '</li>').listview('refresh');

                });
}


function get_detail(id) {
        var person_by_id_url = '../NewFolder/person_by_id.php?id=' + id;

        $.ajax({
                url: person_by_id_url, //php file contains code to get data from database and echo it to this url
                dataType: 'json',
                success: function(data) {
                        person_detail = data;
                        show_detail(person_detail);
                        get_notes(person_detail.id);

                },
                error: function (errorThrown) {
                        alert('failed');
                        console.log(errorThrown);
                }
        });

}

function show_detail(person_detail) {
        //make a nice breadcrumb in the header
        $("#detail_view_header").html("<a href='#my_list'>my list</a> -> " + person_detail.fname + " " + person_detail.lname);

        //display image
        $(".detailpicture").prop("src", "img/" + person_detail.picture);

        //display name
        $(".detail_name").html(person_detail.fname + ' ' + person_detail.lname);

        //delete button
        $("#delete_person_button").attr("onclick", "delete_person(" + person_detail.id + ")");

        //display edit fields
        $("#edit_id").val(person_detail.id);
        $("#edit_fname").val(person_detail.fname);
        $("#edit_lname").val(person_detail.lname);
        $("#display_pic").prop("src", "img/" + person_detail.picture);
        // $("#edit_pic").val(person_detail.picture);

        $("#edit_view_header").html("<a href='#my_list' class='refresh'>my list</a> -> " + person_detail.fname + " " + person_detail.lname);

        //display add note header
        $("#add_note_header").html("<a href='#my_list' class='refresh'>my list</a> -> " + person_detail.fname + " " + person_detail.lname);

        //display name on add note page
        $("#add_note_name").empty();
        $("#add_note_name").append("Add note for " + person_detail.fname + " " + person_detail.lname);

        //display add note header
        $("#edit_note_header").html("<a href='#my_list' class='refresh'>my list</a> -> " + person_detail.fname + " " + person_detail.lname);

        //display name on edit note page
        $("#edit_note_name").empty();
        $("#edit_note_name").append("Edit note for " + person_detail.fname + " " + person_detail.lname);

}

function edit_person() {
        edit_id = $("#edit_id").val();
        edit_fname = $("#edit_fname").val();
        edit_lname = $("#edit_lname").val();
        // edit_pic = $('#edit_pic').val().replace("C:\\fakepath\\", "");

        $.ajax({
                url:'../NewFolder/edit_person.php?id=' +
                    edit_id + '&fname='
                + edit_fname
                + '&lname=' + edit_lname
                // + '&picture=' + edit_pic
                ,
                type: 'GET',
                success: function(php_script_response){
                        console.log(php_script_response);
                        get_data();
                },
                error: function (errorThrown) {
                        alert('Post failed.');
                        console.log(errorThrown);
                }
        });
}


function get_notes(id) {
        var notes_by_person_id_url = '../NewFolder/notes_by_person_id.php?id=' + id;

        $.ajax({
                url: notes_by_person_id_url, //php file contains code to get notes from database and echo it to this url
                dataType: 'json',
                success: function(data) {
                        notes_text = data;
                        display_notes(notes_text);
                },
                error: function (errorThrown) {
                        alert('failed');
                        console.log(errorThrown);
                }
        });

}

function display_notes(notes_text) {
        $(".note_view").empty();

        if (notes_text.msg == "No notes added yet") {  // if there are no notes in the database
                $(".note_view").append(notes_text.msg);

        } else {        // if there is 1 or more results

                notes_text.forEach(function(notes_text){
                  $(".note_view").append("<h5>" + notes_text.date + "</h5>" +                   //the note's date
                      "<p>" + notes_text.note_text +                                                 // the full text of the note
                        ' <a data-role="button" data-inline="true" href="#edit_note" onclick="edit_note('
                        + notes_text.id + ')" data-icon="edit" title="edit note" data-iconpos="notext">edit</a>' + ' | ' +
                        '<a data-role="button" data-inline="true" href="#detail_view" onclick="delete_note('
                        + notes_text.id + ')" data-icon="delete" title="delete note" data-iconpos="notext">delete</a>' +
                        '</p>' +
                        '<p>Tags: <a href="" data-transition="fade">' +
                        notes_text.tag +                                                      // the tag TO DO: implement link to retrieve all notes with this tag
                        '</a></p>' +
                        '<hr class="notes_hr" style="height:2px; background-color:#ccc; border:0; margin-top:10px; margin-bottom:10px;">'
                  );
                })
        }
}

function delete_person(id) {

        var delete_url = '../NewFolder/delete_person.php?id=' + id;
        $.ajax({
                url: delete_url ,
                type: 'GET',
                success: function(data) {
                        alert("person deleted");
                        get_data();
                },
                error: function (errorThrown) {
                        alert('failed');
                        console.log(errorThrown);
                }
        });
}

function delete_note(id) {
        person_id = $("#edit_id").val();
        var delete_note_url = '../NewFolder/delete_note.php?id=' + id;
        $.ajax({
                url: delete_note_url ,
                type: 'GET',
                success: function(data) {
                        get_detail(person_id);
                },
                error: function (errorThrown) {
                        alert('failed');
                        console.log(errorThrown);
                }
        });

}

function edit_note(id) {
        var notes_by_person_id_url = '../NewFolder/get_note_by_note_id.php?id=' + id;

        $.ajax({
                url: notes_by_person_id_url, //php file contains code to get notes from database and echo it to this url
                dataType: 'json',
                success: function(data) {
                        mynote = data;
                        display_edit_note(mynote);
                },
                error: function (errorThrown) {
                        alert('failed');
                        console.log(errorThrown);
                }
        });

}

function display_edit_note(mynote) {

        $("#edit_text").val(mynote.note_text);
        $("#edit_tag").val(mynote.tag);
        $("#note_id").val(mynote.id);

}