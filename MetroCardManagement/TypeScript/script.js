"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let CardNumberAutoIncrement = 1000;
let TravelIdAutoIncrement = 2000;
let TicketIDAutoIncrement = 3000;
let currentLoggedInUser;
let currentTicketID;
//declaration of pages div element
let homePage = document.getElementById("homepage");
let newUserPage = document.getElementById("newuserpage");
let loginUserPage = document.getElementById("loginuserpage");
let greetingPage = document.getElementById("greetingpage");
let travelPage = document.getElementById("travelpage");
let historyPage = document.getElementById("historypage");
let rechargePage = document.getElementById("rechargepage");
let showBalancePage = document.getElementById("balancecheckpage");
//function to display none of the pages
function DisplayNone() {
    homePage.style.display = "none";
    newUserPage.style.display = "none";
    loginUserPage.style.display = "none";
    greetingPage.style.display = "none";
    travelPage.style.display = "none";
    historyPage.style.display = "none";
    rechargePage.style.display = "none";
    showBalancePage.style.display = "none";
}
//function to display home page
function HomePage() {
    DisplayNone();
    homePage.style.display = "block";
}
//function to display new user page
function NewUser() {
    DisplayNone();
    newUserPage.style.display = "block";
}
//function to display login user page
function LoginUser() {
    DisplayNone();
    loginUserPage.style.display = "block";
}
//
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5221/api/UserDetails", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("Failed to add user");
        }
    });
}
//
function addTravel(travel) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5221/api/TravelDetails", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(travel)
        });
        if (!response.ok) {
            throw new Error("Failed to add user");
        }
    });
}
//
function addTicket(ticket) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5221/api/TicketFairDetails", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        });
        if (!response.ok) {
            throw new Error("Failed to add user");
        }
    });
}
//fetch functions
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5221/api/UserDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch user");
        }
        return yield response.json();
    });
}
function fetchTravel() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5221/api/TravelDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch travel details");
        }
        return yield response.json();
    });
}
function fetchTicket() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5221/api/TicketFairDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch ticket fair details");
        }
        return yield response.json();
    });
}
//update functions
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5221/api/UserDetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
    });
}
//function to create new account
function CreateAccount() {
    return __awaiter(this, void 0, void 0, function* () {
        let username = document.getElementById("username").value;
        let phone = document.getElementById("phone").value;
        let password = document.getElementById("cpassword").value;
        let newUser = {
            cardNumber: 0,
            userName: username,
            phoneNumber: phone,
            password: password,
            balance: 0
        };
        yield addUser(newUser);
        alert("Account Created. Your Card Number - " + newUser.cardNumber);
        LoginUser();
    });
}
//function to login
function AccountLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        let cardNumberChecker = true;
        let cardnumber = parseInt(document.getElementById("cardnumber").value);
        let loginpassword = document.getElementById("loginpassword").value;
        let userList = yield fetchUser();
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].cardNumber == cardnumber && userList[i].password == loginpassword) {
                cardNumberChecker = false;
                currentLoggedInUser = userList[i];
                alert("logged-In");
                GreetingPage();
                break;
            }
        }
        if (cardNumberChecker) {
            alert("Invalid Card Number");
            HomePage();
        }
    });
}
//function to display greeting page
function GreetingPage() {
    DisplayNone();
    greetingPage.style.display = "block";
}
//function to display travel page
function TravelPage() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        greetingPage.style.display = "block";
        travelPage.style.display = "block";
        let table = document.getElementById("tickettable");
        table.innerHTML = "";
        let heading = document.createElement("tr");
        heading.innerHTML = `<th>${"TicketID"}</th><th>${"FromLocation"}</th><th>${"ToLocation"}</th><th>${"Fair"}</th><th>${""}</th>`;
        table.appendChild(heading);
        let ticketFairList = yield fetchTicket();
        for (let i = 0; i < ticketFairList.length; i++) {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${ticketFairList[i].ticketID}</td>
        <td>${ticketFairList[i].fromLocation}</td>
        <td>${ticketFairList[i].toLocation}</td>
        <td>${ticketFairList[i].ticketPrice}</td>
        <td><button onclick="BookTicket('${ticketFairList[i].ticketID}');">book</button></td>`;
            table.appendChild(row);
        }
    });
}
//function to set global ticket id
function SetGlobalTicketID(ticketID) {
    currentTicketID = ticketID;
}
//function to book ticket
function BookTicket(ticketID) {
    return __awaiter(this, void 0, void 0, function* () {
        let ticketFairList = yield fetchTicket();
        for (let i = 0; i < ticketFairList.length; i++) {
            if (ticketFairList[i].ticketID == ticketID) {
                if (currentLoggedInUser.balance >= ticketFairList[i].ticketPrice) {
                    currentLoggedInUser.balance -= ticketFairList[i].ticketPrice;
                    updateUser(currentLoggedInUser.cardNumber, currentLoggedInUser);
                    let newTravel = {
                        travelID: 0,
                        cardNumber: currentLoggedInUser.cardNumber,
                        fromLocation: ticketFairList[i].fromLocation,
                        toLocation: ticketFairList[i].toLocation,
                        date: new Date(),
                        travelCost: ticketFairList[i].ticketPrice
                    };
                    addTravel(newTravel);
                    // let newTravel:TravelDetails = new TravelDetails(currentLoggedInUser.CardNumber,TicketFairList[i].FromLocation,TicketFairList[i].ToLocation,new Date(),TicketFairList[i].TicketPrice);
                    // travelHistoryList.push(newTravel);
                    alert("Ticket Booked Successfully\nYour Travel ID - " + newTravel.travelID);
                }
                else {
                    alert("Insufficient Balance");
                    TravelPage();
                }
            }
        }
    });
}
//function to display travel history
function ShowHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        greetingPage.style.display = "block";
        historyPage.style.display = "block";
        let table = document.getElementById("historytable");
        table.innerHTML = "";
        let heading = document.createElement("tr");
        heading.innerHTML = `<th>${"TravelID"}</th><th>${"Card Number"}</th><th>${"FromLocation"}</th><th>${"ToLocation"}</th><th>${"Date"}</th><th>${"Travel Cost"}</th>`;
        table.appendChild(heading);
        let travelHistoryList = yield fetchTravel();
        for (let i = 0; i < travelHistoryList.length; i++) {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${travelHistoryList[i].travelID}</td>
        <td>${travelHistoryList[i].cardNumber}</td>
        <td>${travelHistoryList[i].fromLocation}</td>
        <td>${travelHistoryList[i].toLocation}</td>
        <td>${travelHistoryList[i].date.toString().substring(0, 10)}</td>
        <td>${travelHistoryList[i].travelCost}</td>`;
            table.appendChild(row);
        }
    });
}
//function to display recharge page
function RechargePage() {
    DisplayNone();
    greetingPage.style.display = "block";
    rechargePage.style.display = "block";
}
//function to get amount
function GetAmount() {
    return __awaiter(this, void 0, void 0, function* () {
        let amount = parseInt(document.getElementById("rechargeamount").value);
        let userList = yield fetchUser();
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].cardNumber == currentLoggedInUser.cardNumber) {
                userList[i].balance += amount;
                updateUser(userList[i].cardNumber, userList[i]);
                alert(`Recharge Successful - Balance : ${userList[i].balance}`);
                break;
            }
        }
    });
}
//function to check balance
function ShowBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        greetingPage.style.display = "block";
        showBalancePage.style.display = "block";
        showBalancePage.innerHTML = "";
        let line = document.createElement("p");
        let balance = 0;
        let userList = yield fetchUser();
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].cardNumber == currentLoggedInUser.cardNumber) {
                balance = userList[i].balance;
                break;
            }
        }
        line.innerHTML = `Current Balance - ${balance}`;
        showBalancePage.appendChild(line);
    });
}
