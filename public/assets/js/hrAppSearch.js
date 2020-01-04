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


            emps_elem.append(
            "<li><p>" +
                emps[i].first_name + " " +
                emps[i].last_name + " | " +
                emps[i].position + " | " +
                moment(emps[i].hire_date).format('LL') + " | " +
                emps[i].email + " | " +
                // "<button id='info'>Get More Info</button>" +
                infoButton +
                "</p></li><hr>"
            );
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

                emps_elem.append(
                    "<li><p>" +
                    emps[i].first_name + " " +
                    emps[i].last_name + " | " +
                    emps[i].position + " | " +
                    moment(emps[i].hire_date).format('LL') + " | " +
                    emps[i].email + " | " +
                    // "<button id='info'>Get More Info</button>" +
                    infoButton +
                    "</p></li><hr>"
                );
            };

        });
    }
});
$(document).on("click", ".empInfo", function () {
    console.log("woot");
    $("#infoModal").modal("toggle");
    $("#modalTitle").text($(this).attr("data-first_name") + $(this).attr("data-last_name"));
    console.log($(this).attr("data-last_name"));
    // $("#modalTitle").append($(this).attr("data-last_name"));
});
})