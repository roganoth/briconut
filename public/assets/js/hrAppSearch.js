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
})