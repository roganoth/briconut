$(document).ready(function () {
    $.ajax("/employees", {
        type: "GET"
    }).then(function (data) {
        var emps = data.employees;
        var len = data.employees.length;

        var emps_elem = $("#employeeResult");
        for (i = 0; i < len; i++) {
            //adding data attr to button for modal
            var infoButton = $("<button>");
            infoButton.addClass("empInfo");
            // infoButton.attr("id","info");
            infoButton.attr("data-first_name", emps[i].first_name);
            infoButton.attr("data-last_name", emps[i].last_name);
            // infoButton.attr("data-position", emps[i].position);
            // infoButton.attr();
            // infoButton.attr();
            infoButton.attr("data-phone", emps[i].phone);
            infoButton.attr("data-dob", moment(emps[i].dob).format('LL'));
            infoButton.attr("data-marital", emps[i].marital);
            infoButton.attr("data-gender", emps[i].gender);
            infoButton.attr("data-gov_docs", emps[i].gov_docs);
            infoButton.attr("data-dl", emps[i].drivers_license);
            infoButton.attr("data-ssn", emps[i].ssn);
            infoButton.text("Get More Info");
            console.log(infoButton);

            var nameString = $(`<li> ${emps[i].first_name} | ${emps[i].last_name} | ${emps[i].position} | ${moment(emps[i].hire_date).format('LL')} | ${emps[i].email}  </li>`);
            nameString.append(infoButton);
            emps_elem.append(nameString);
        };
    });
    // $(document).on("click", "#search", function (event) {
    //     event.preventDefault();
    //     var column = $("#col").val().trim();
    //     var colVal = $("#search-bar").val().trim();
    //     $("#employeeResult").empty();
    //     $.ajax("/employees/" + column + "/" + colVal, {
    //         type: "GET"
    //     }).then(function (data) {
    //         var emps = data.employees;
    //         var len = data.employees.length;

    //         var emps_elem = $("#employeeResult");
    //         for (i = 0; i < len; i++) {
    //             emps_elem.append(
    //                 "<li><p>" +
    //                 emps[i].first_name + " " +
    //                 emps[i].last_name + " | " +
    //                 emps[i].position + " | " +
    //                 moment(emps[i].hire_date).format('LL') + " | " +
    //                 emps[i].email + " | " +
    //                 "<button id='info'>Get More Info</button>" +
    //                 "</p></li><hr>"
    //             );
    //         };

    //     });
    // });


    $("#search-bar").keyup(function (event) {
        console.log(event.keyCode);
        if (event.keyCode >= 65 && event.keyCode <= 90 || event.keyCode >= 48 && event.keyCode <= 57) {
            var column = $("#col").val().trim();
            var colVal = $("#search-bar").val().trim();
            $("#employeeResult").empty();
            $.ajax("/employees/" + column + "/" + colVal, {
                type: "GET"
            }).then(function (data) {
                var emps = data.employees;
                var len = data.employees.length;

                var emps_elem = $("#employeeResult");
                for (i = 0; i < len; i++) {
                    //adding data attr to button for modal
                    var infoButton = $("<button>");
                    // infoButton.attr("id","info");
                    // infoButton.attr("data-position", emps[i].position);
                    // infoButton.attr();
                    // infoButton.attr();
                    infoButton.addClass("empInfo");
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
                    console.log(infoButton);

                    // emps_elem.append(
                    //     "<li><p>" +
                    //     emps[i].first_name + " " +
                    //     emps[i].last_name + " | " +
                    //     emps[i].position + " | " +
                    //     moment(emps[i].hire_date).format('LL') + " | " +
                    //     emps[i].email + " | " +
                    //     // "<button id='info'>Get More Info</button>" +
                    //     infoButton +
                    //     "</p></li><hr>"
                    // );

                    var nameString = $(`<li> ${emps[i].first_name} | ${emps[i].last_name} | ${emps[i].position} | ${moment(emps[i].hire_date).format('LL')} | ${emps[i].email}  </li>`);
                    nameString.append(infoButton);
                    emps_elem.append(nameString);

                };

            });
        }
    });
    $(document).on("click", ".empInfo", function () {
        console.log("woot");
        $("#infoModal").modal("toggle");
        $("#modal").empty();
        var marital;
        var docs;
        var dl;
        if ($(this).attr("data-marital") === 0) {
            marital = "Single";
        }
        else {
            marital = "Married"
        };
        if ($(this).attr("data-gov_docs") === 0){
            docs = "No";
        }
        else {
            docs = "Yes";
        };
        if ($(this).attr("data-dl") === 0) {
            dl = "No";
        }
        else {
            dl = "Yes";
        };
        $("#modalTitle").text($(this).attr("data-first_name") + " " + $(this).attr("data-last_name"));
        $("#modal").append("Phone: " + $(this).attr("data-phone"));
        $("#modal").append("<br>");
        $("#modal").append("DoB: " + $(this).attr("data-dob"));
        $("#modal").append("<br>");
        $("#modal").append("Marital Status: " + marital);
        $("#modal").append("<br>");
        $("#modal").append("Gender: " + $(this).attr("data-gender"));
        $("#modal").append("<br>");
        $("#modal").append("Government Docs Submitted: " + docs);
        $("#modal").append("<br>");
        $("#modal").append("Driver's License Submitted: " + dl);
        $("#modal").append("<br>");
        $("#modal").append("SSN: " + $(this).attr("data-ssn"));
    });
})