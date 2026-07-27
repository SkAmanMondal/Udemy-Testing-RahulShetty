let message2 : string = "Hello";
message2 = "Hi";
console.log(message2);

let age2 : number = 21;
console.log(age2);


let isActive : boolean = true;

let numbers1 : number[] = [1,2,3,4,5];

let data : any = "This could be anything";
data = 2;

console.log(data);


function add( a:number , b:number ) : number{
    return a+b;
}

console.log(add(2,3));

let user: {name: string, age: number, location: string} = {name: "Bob", age: 22, location: ""};
user.location = "Hyderabad";



import {type Locator, type Page} from '@playwright/test';
class LoginPage{

    page: Page;
    email: Locator;
    password: Locator;
    singInButton: Locator;
    toast: Locator;

    constructor(page){
        this.page = page;
        this.email = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
        this.singInButton = page.locator("#login");
        this.toast = page.locator(".toast-container");
    }
}