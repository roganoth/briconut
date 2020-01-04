$(document).ready(function () {
    $.ajax("/employees", {
        type: "GET"
    }).then(function (data) {
        var emps = data.employees;
        var len = data.employees.length;

        var emps_elem = $("#employeeResult");
        for (i = 0; i < len; i++) {
            emps_elem.append(
                "<li><p>" +
                emps[i].first_name + " " +
                emps[i].last_name + " | " +
                emps[i].position + " | " +
                moment(emps[i].hire_date).format('LL') + " | " +
                "<a href='' target='_blank'id ='email'>" +emps[i].email + " </a>" +" | " +
                "</p></li><hr>"
            );
        };
    });

    ////
    $(document).on("click","#email",function (event) {
        var email = $("#email")[0].innerHTML
    
        console.log(email)
    
        $.ajax("/message",{
            type: "POST"
        }).then(function (data){  
            console.log("test")
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
            var emps = data.employees;
            var len = data.employees.length;

            var emps_elem = $("#employeeResult");
            for (i = 0; i < len; i++) {
                emps_elem.append(
                    "<li><p>" +
                    emps[i].first_name + " " +
                    emps[i].last_name + " | " +
                    emps[i].position + " | " +
                    moment(emps[i].hire_date).format('LL') + " | " +
                    emps[i].email + " | " +
                    "</p></li><hr>"
                );
            };

        })
    })
}) 