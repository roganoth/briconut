$(document).ready(function () {

    function populateResults(data) {
        var emps = data.employees;
        var len = data.employees.length;

        var emps_elem = $("#employeeResult");
        for (i = 0; i < len; i++) {
            //adding data attr to button for modal
            var infoButton = $("<button>");
            infoButton.addClass("empInfo");
            infoButton.addClass("btn btn-info btn-sm");
            infoButton.attr("data-id", emps[i].id);
            infoButton.attr("data-first_name", emps[i].first_name);
            infoButton.attr("data-last_name", emps[i].last_name);
            infoButton.attr("data-phone", emps[i].phone);
            infoButton.attr("data-dob", moment(emps[i].dob).format('LL'));
            infoButton.attr("data-marital", emps[i].marital);
            infoButton.attr("data-gender", emps[i].gender);
            infoButton.attr("data-gov_docs", emps[i].gov_docs);
            infoButton.attr("data-dl", emps[i].drivers_license);
            infoButton.attr("data-ssn", emps[i].ssn);
            infoButton.text("Get More Info");

            //creates edit button attaches all data
            var editButton = $("<button>");
            editButton.addClass("editInfo");
            editButton.addClass("btn btn-info btn-sm");
            editButton.attr("data-id", emps[i].id);
            editButton.attr("data-first_name", emps[i].first_name);
            editButton.attr("data-last_name", emps[i].last_name);
            editButton.attr("data-phone", emps[i].phone);
            editButton.attr("data-dob", emps[i].dob);
            editButton.attr("data-marital", emps[i].marital);
            editButton.attr("data-gender", emps[i].gender);
            editButton.attr("data-gov_docs", emps[i].gov_docs);
            editButton.attr("data-dl", emps[i].drivers_license);
            editButton.attr("data-ssn", emps[i].ssn);
            editButton.attr("data-hire_date", emps[i].hire_date);
            editButton.attr("data-email", emps[i].email);
            editButton.attr("data-position", emps[i].position);
            editButton.attr("data-time", emps[i].full_time);
            editButton.text("Edit");

            //create delete button attach id
            var delButton = $("<button>");
            delButton.addClass(".del");
            delButton.addClass("btn btn-info btn-sm");
            delButton.attr("data-id", emps[i].id);
            delButton.attr("data-first_name", emps[i].first_name);
            delButton.attr("data-last_name", emps[i].last_name);
            delButton.attr("id", "delete");
            delButton.text("Delete Employee");


            var nameString = $(`<li> ${emps[i].first_name} ${emps[i].last_name} | ${emps[i].position} | ${moment(emps[i].hire_date).format('LL')} | <a href = ' ' target="_blank" id = 'email'>${emps[i].email} </a> </li><hr>`);

            nameString.append(infoButton);
            nameString.append(editButton);
            nameString.append(delButton);
            emps_elem.append(nameString);
        };
    };

    $.ajax("/employees", {
        type: "GET"
    }).then(function (data) {
        populateResults(data);
    });

    //del button ajax call
    $(document).on("click", "#delete", function (event) {
        event.preventDefault();
        var id = $(this).attr("data-id");
        var name = $(this).attr("data-first_name") + " " + $(this).attr("data-last_name");
        $("#delWarning").modal("toggle");
        $("#warningBody").empty();
        $("#warningBody").append("You will be permanently deleting user: " + name);
        $("#delConfirm").click(function () {
            $.ajax("/employees/" + id, {
                type: "DELETE"
            }).then(function (data) {
                location.reload();
            });
        });
    });

    $(document).on("click", "#search", function (event) {
        event.preventDefault();
        var column = $("#col").val().trim();
        var colVal = $("#search-bar").val().trim();
        $("#employeeResult").empty();
        $.ajax("/employees/" + column + "/" + colVal, {
            type: "GET"
        }).then(function (data) {
            populateResults(data);
        });
    });

    $("#search-bar").keyup(function (event) {
        if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode >= 48 && event.keyCode <= 57) {
            var column = $("#col").val().trim();
            var colVal = $("#search-bar").val().trim();
            $("#employeeResult").empty();
            $.ajax("/employees/" + column + "/" + colVal, {
                type: "GET"
            }).then(function (data) {
                populateResults(data);
            });
        };
    });

    $(document).on("click", ".empInfo", function () {
        $("#infoModal").modal("toggle");
        $("#modal").empty();
        var marital;
        var docs;
        var dl;
        if ($(this).attr("data-marital") == 0) {
            marital = "Single";
        }
        else {
            marital = "Married"
        };
        if ($(this).attr("data-gov_docs") == 0) {
            docs = "No";
        }
        else {
            docs = "Yes";
        };
        if ($(this).attr("data-dl") == 0) {
            dl = "No";
        }
        else {
            dl = "Yes";
        };
        $("#modalTitle").text($(this).attr("data-first_name") + " " + $(this).attr("data-last_name"));
        $("#modal").append("<b>Phone:</b> " + $(this).attr("data-phone"));
        $("#modal").append("<br>");
        $("#modal").append("<b>DoB:</b> " + $(this).attr("data-dob"));
        $("#modal").append("<br>");
        $("#modal").append("<b>Marital Status:</b> " + marital);
        $("#modal").append("<br>");
        $("#modal").append("<b>Gender:</b> " + $(this).attr("data-gender"));
        $("#modal").append("<br>");
        $("#modal").append("<b>Government Docs Submitted:</b> " + docs);
        $("#modal").append("<br>");
        $("#modal").append("<b>Driver's License Submitted:</b> " + dl);
        $("#modal").append("<br>");
        $("#modal").append("<b>SSN:</b> " + $(this).attr("data-ssn"));
    });

    $(document).on("click", ".editInfo", function () {
        $("#editModal").modal("toggle");
        var name = $(this).attr("data-first_name") + " " + $(this).attr("data-last_name");
        var genderEdit = $(this).attr("data-gender");
        var maritalEdit = $(this).attr("data-marital");
        var timeEdit = $(this).attr("data-time");
        var dlEdit = $(this).attr("data-dl");
        var docsEdit = $(this).attr("data-gov_docs");
        var id = $(this).attr("data-id");
        var hire_date = $(this).attr("data-hire_date");
        var dob = $(this).attr("data-dob");
        $("#editTitle").empty();
        $("#editTitle").append("You are editing employee: " + name);
        $("#inputFirstName").attr("value", $(this).attr("data-first_name"));
        $("#inputLastName").attr("value", $(this).attr("data-last_name"));
        $("#inputEmail").attr("value", $(this).attr("data-email"));
        $("#inputPhone").attr("value", $(this).attr("data-phone"));
        $("#hire_date").attr("value", hire_date.slice(0,10));
        $("#inputposition").attr("value", $(this).attr("data-position"));
        $("#inputssn").attr("value", $(this).attr("data-ssn"));
        $("#inputdob").attr("value", dob.slice(0,10));
        let genderVal = document.getElementById("inputGender");
        genderVal.value = genderEdit;

        let maritalVal = document.getElementById("inputMarital");
        maritalVal.value = maritalEdit;

        let timeVal = document.getElementById("inputTime");
        timeVal.value = timeEdit;

        let dlVal = document.getElementById("inputDL");
        dlVal.value = dlEdit;

        let docsVal = document.getElementById("inputDocs");
        docsVal.value = docsEdit;

        $("#edit").click(function () {
            var updateEmployee = {
                first_name: $("#inputFirstName").val().trim(),
                last_name: $("#inputLastName").val().trim(),
                email: $("#inputEmail").val().trim(),
                phone: $("#inputPhone").val().trim(),
                hire_date: $("#hire_date").val().trim(),
                position: $("#inputposition").val().trim(),
                ssn: $("#inputssn").val().trim(),
                dob: $("#inputdob").val().trim(),
                marital: $("#inputMarital").val(),
                gender: $("[name=gender]").val(),
                full_time: $("#inputTime").val(),
                drivers_license: $("#inputDL").val(),
                gov_docs: $("#inputDocs").val()
            }
            $.ajax("/employees/" + id, {
                type: "PUT",
                data: JSON.stringify(updateEmployee),
                dataType: "json",
                contentType: "application/json"
            }).then(function () {
                location.reload();
            });
        });
    });

    $(document).on("click", "#email", function (event) {
        var email = $("#email")[0].innerHTML
        $("#emailModal").modal("toggle");
        $("#modal").empty();
        var text;
        var subject;

        $("#modalTitle").text("Create the email you would like to send:");
        $("#modal").append("<b>Subject:</b> " + $(this).attr("data-phone"));
        $("#modal").append("<br>");
        $("#modal").append("<b>Text:</b> " + $(this).attr("data-phone"));

        console.log(email)

        $.ajax("/message", {
            type: "POST"
        }).then(function (data) {
            console.log("test")
        });


    });
})