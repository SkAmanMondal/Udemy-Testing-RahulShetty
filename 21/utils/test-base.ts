import { test as baseTest } from "@playwright/test";

interface TestDataForOrder {
    email: string;
    password: string;
    productName: string;
    couponCode: string;
};

export const customTest = baseTest.extend<{testDataForOrder: TestDataForOrder}>(
    {
        testDataForOrder: {
            email: "aman1221@gmail.com",
            password: "Aman@2005",
            productName: "ADIDAS ORIGINAL",
            couponCode: "rahulshettyacademy"
        }
    }
)