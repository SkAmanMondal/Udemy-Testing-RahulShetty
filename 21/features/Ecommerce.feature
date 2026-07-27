Feature: Ecommerce Validations

    Scenario: Placing Order
        Given a login to Ecommerce application with "aman1221@gmail.com" and "Aman@2005"
        When Add "ADIDAS ORIGINAL" to Cart
        Then Verify "ADIDAS ORIGINAL" is displayed in the Cart
        When Enter valid details, apply coupon "rahulshettyacademy" and placed the order
        Then Verify order is present in the order history