Feature: Ecommerce Validations

    @regression
    Scenario Outline: Placing Order
        Given a login to Ecommerce application with "<username>" and "<password>"
        When Add "ADIDAS ORIGINAL" to Cart
        Then Verify "ADIDAS ORIGINAL" is displayed in the Cart
        When Enter valid details, apply coupon "rahulshettyacademy" and placed the order
        Then Verify order is present in the order history
    
    Examples:
    | username             | password  |
    | aman1221@gmail.com   | Aman@2005 |
    | aman12221@gmail.com  | Aman@1234 |
