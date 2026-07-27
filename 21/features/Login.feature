Feature: Login Validation

    @login
    Scenario: Login with valid password
        Given login to Ecommerce application with "aman1221@gmail.com" and "Aman@2005"
        Then Verify login successfull message "Login Successfully"

    @login
    Scenario: Login with invalid password
        Given login to Ecommerce application with "aman1221@gmail.com" and "WrongPassword"
        Then Verify login error message "Incorrect email or password."