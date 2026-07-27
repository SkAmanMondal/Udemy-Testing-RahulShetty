const base = require("@playwright/test");

exports.customTest = base.test.extend(
    {
        testDataForOrder: {
            email: "aman1221@gmail.com",
            password: "Aman@2005",
            productName: "ADIDAS ORIGINAL",
            couponCode: "rahulshettyacademy"
        }
    }
)