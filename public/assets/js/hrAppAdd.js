$(document).ready(function () {
    $(document).on("submit", function () {
        event.preventDefault();
        var newEmployee = {
            first_name: $("#inputFirstName").val().trim(), last_name: $("#inputLastName").val().trim(), email: $("#inputEmail").val().trim(), phone: $("#inputPhone").val().trim(), hire_date: $("#hire_date").val().trim(), position: $("#inputposition").val().trim(), ssn: $("#inputssn").val().trim(), dob: $("#inputdob").val().trim(), marital: $("#inputMarital").val(), gender: $("#inputGender").val(), full_time: $("#inputTime").val(), drivers_liscense: $("#inputDL").val(), gov_docs: $("#inputDocs").val()
        }
        $.ajax("/employees", {
            type: "POST",
            data: JSON.stringify(newEmployee),
            dataType: "json",
            contentType: "application/json"
        }).then(function(){
            console.log("employee added");
            location.reload();
        })
    })
})