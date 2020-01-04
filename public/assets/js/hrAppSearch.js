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
            infoButton.addClass("btn btn-info btn-sm");
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


            var nameString = $(`<li> ${emps[i].first_name} ${emps[i].last_name} | ${emps[i].position} | ${moment(emps[i].hire_date).format('LL')} | <a href = ' ' target="_blank" id = 'email'>${emps[i].email} </a> </li><hr>`);

            nameString.append(infoButton);
            emps_elem.append(nameString);
        };
    });
    $(document).on("click", "#search", function (event) {
        event.preventDefault();
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
                infoButton.addClass("empInfo");
                infoButton.addClass("btn btn-info btn-sm");
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

                var nameString = $(`<li> ${emps[i].first_name} ${emps[i].last_name} | ${emps[i].position} | ${moment(emps[i].hire_date).format('LL')} | <a href = ' ' target="_blank" id = 'email'>${emps[i].email} </a> </li><hr>`);
                nameString.append(infoButton);
                emps_elem.append(nameString);
            };
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
                var emps = data.employees;
                var len = data.employees.length;

                var emps_elem = $("#employeeResult");
                for (i = 0; i < len; i++) {
                    //adding data attr to button for modal
                    var infoButton = $("<button>");
                    infoButton.addClass("empInfo");
                    infoButton.addClass("btn btn-info btn-sm");
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

                    var nameString = $(`<li> ${emps[i].first_name} ${emps[i].last_name} | ${emps[i].position} | ${moment(emps[i].hire_date).format('LL')} | <a href = ' ' target="_blank" id = 'email'>${emps[i].email} </a>  </li><hr>`);
                    nameString.append(infoButton);
                    emps_elem.append(nameString);

                };

            });
        }
    });
    $(document).on("click", ".empInfo", function () {
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
        if ($(this).attr("data-gov_docs") === 0) {
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
    
    $(document).on("click","#email",function (event) {
        var email = $("#email")[0].innerHTML
    
        console.log(email)
    
        $.ajax("/message",{
            type: "POST"
        }).then(function (data){  
            console.log("test")
        });
    
    
    }); 
})