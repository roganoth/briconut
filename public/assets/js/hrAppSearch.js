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
                emps[i].email + " | " +
                "</p></li><hr>"
            );
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