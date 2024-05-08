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
let currentLoggedInUser;
let currentBookID;
let selectedBook;
let returningBook;
let homePage = document.getElementById("homepage");
let newUserPage = document.getElementById("newuserpage");
let loginUserPage = document.getElementById("loginuserpage");
let greetingPage = document.getElementById("greetingpage");
let borrowPage = document.getElementById("borrowpage");
let bookCountPage = document.getElementById("bookCountPage");
let showHistoryPage = document.getElementById("showhistorypage");
let returnBookPage = document.getElementById("returnbookpage");
let rechargePage = document.getElementById("rechargepage");
let balanceCheckPage = document.getElementById("balancecheckpage");
function DisplayNone() {
    homePage.style.display = "none";
    newUserPage.style.display = "none";
    loginUserPage.style.display = "none";
    greetingPage.style.display = "none";
    borrowPage.style.display = "none";
    bookCountPage.style.display = "none";
    showHistoryPage.style.display = "none";
    returnBookPage.style.display = "none";
    rechargePage.style.display = "none";
    balanceCheckPage.style.display = "none";
}
function HomePage() {
    DisplayNone();
    homePage.style.display = "block";
}
function NewUserPage() {
    DisplayNone();
    newUserPage.style.display = "flex";
}
const form = document.getElementById("signupform");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        event.preventDefault();
        const userName = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const gender = document.getElementById("gender").value;
        const department = document.getElementById("department").value;
        const mobileNumber = document.getElementById("mobilenumber").value;
        const mailID = document.getElementById("mailID").value;
        const user = {
            userID: 0,
            userName: userName,
            password: password,
            gender: gender,
            department: department,
            mobileNumber: mobileNumber,
            mailID: mailID,
            walletBalance: 0
        };
        yield addUser(user);
        alert("Account Created Successfully\nUser ID - " + user.userID);
    }
    catch (error) {
        console.log(error);
    }
    LoginUserPage();
}));
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5257/api/UserDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("failed to add user");
        }
    });
}
function addBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5257/api/BookDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error("failed to add book details");
        }
    });
}
function addBorrow(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5257/api/BorrowDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error("failed to add borrow details");
        }
    });
}
//fetch functions
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5257/api/UserDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("failed to fetch user details");
        }
        return yield response.json();
    });
}
function fetchBook() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5257/api/BookDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("failed to fetch book details");
        }
        return yield response.json();
    });
}
function fetchBorrow() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5257/api/BorrowDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("failed to fetch borrow details");
        }
        return yield response.json();
    });
}
//update functions
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5257/api/UserDetails/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("failed to update user details");
        }
    });
}
function updateBook(id, book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5257/api/BookDetails/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error("failed to update book details");
        }
    });
}
function updateBorrow(id, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5257/api/BorrowDetails/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error("failed to update borrow details");
        }
    });
}
function LoginUserPage() {
    DisplayNone();
    loginUserPage.style.display = "block";
}
function Login() {
    return __awaiter(this, void 0, void 0, function* () {
        let noExistingUserIDChecker = true;
        let loginEmail = document.getElementById("loginuseremail").value;
        let loginPassword = document.getElementById("loginpassword").value;
        let userList = yield fetchUser();
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].mailID == loginEmail && userList[i].password == loginPassword) {
                noExistingUserIDChecker = false;
                currentLoggedInUser = userList[i];
                alert("Logged-In");
                GreetingPage();
            }
        }
        if (noExistingUserIDChecker) {
            alert("Invalid User");
        }
    });
}
function GreetingPage() {
    DisplayNone();
    greetingPage.style.display = "block";
}
function BorrowBookPage() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        greetingPage.style.display = "block";
        borrowPage.style.display = "block";
        let table = document.getElementById("booktable");
        table.innerHTML = "";
        let heading = document.createElement("tr");
        heading.innerHTML = `<th>${"BookID"}</th><th>${"Book Name"}</th><th>${"Author Name"}</th><th>${"Book Count"}</th><th>${"Action"}</th>`;
        table.appendChild(heading);
        let bookList = yield fetchBook();
        for (let i = 0; i < bookList.length; i++) {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${bookList[i].bookID}</td><td>${bookList[i].bookName}</td><td>${bookList[i].authorName}</td><td>${bookList[i].bookCount}</td>
        <td><button onclick="SetSelectedBook('${bookList[i].bookID}');">Borrow Book</button></td>`;
            table.appendChild(row);
        }
    });
}
function SetSelectedBook(bookID) {
    return __awaiter(this, void 0, void 0, function* () {
        currentBookID = bookID;
        DisplayNone();
        greetingPage.style.display = "block";
        bookCountPage.style.display = "block";
        const bookList = yield fetchBook();
        bookList.forEach(book => {
            if (book.bookID == bookID) {
                selectedBook = book;
            }
        });
    });
}
function GetBookCount() {
    let requestedCount = parseInt(document.getElementById("count").value);
    BorrowBook(requestedCount);
}
function BorrowBook(requestedCount) {
    return __awaiter(this, void 0, void 0, function* () {
        let bookList = yield fetchBook();
        let borrowList = yield fetchBorrow();
        if (selectedBook.bookCount >= requestedCount) {
            let userBookCount = 0;
            borrowList.forEach(borrow => {
                if (borrow.userID == currentLoggedInUser.userID) {
                    userBookCount = borrow.borrowCount;
                }
            });
            if (userBookCount >= 3) {
                alert("You have already borrowed 3 books");
            }
            else {
                selectedBook.bookCount -= requestedCount;
                updateBook(selectedBook.bookID, selectedBook);
                let newBorrow = {
                    borrowID: 0,
                    bookID: selectedBook.bookID,
                    userID: currentLoggedInUser.userID,
                    borrowedDate: new Date(),
                    borrowCount: requestedCount,
                    borrowStatus: "Borrowed",
                    paidFineAmount: 0
                };
                addBorrow(newBorrow);
                alert("Book Borrowed Successfully");
            }
        }
        else {
            let nextAvailableDate = new Date("2099-12-31");
            borrowList.forEach(borrow => {
                if (borrow.bookID == selectedBook.bookID) {
                    let availableDate = new Date(borrow.borrowedDate);
                    availableDate.setDate(availableDate.getDate() + 15);
                    if (nextAvailableDate > availableDate) {
                        nextAvailableDate = availableDate;
                    }
                }
            });
            alert("book will be available on " + nextAvailableDate.toISOString().substring(0, 10));
        }
        BorrowBookPage();
    });
}
function ShowHistoryPage() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        greetingPage.style.display = "block";
        showHistoryPage.style.display = "block";
        let table = document.getElementById("historytable");
        table.innerHTML = "";
        let heading = document.createElement("tr");
        heading.innerHTML = `<th>${"Borrow ID"}</th><th>${"Book ID"}</th><th>${"User ID"}</th><th>${"Borrowed Date"}</th>
    <th>${"Borrow Count"}</th><th>${"BorrowStatus"}</th><th>${"Paid Fine Amount"}</th>`;
        table.appendChild(heading);
        let borrowList = yield fetchBorrow();
        for (let i = 0; i < borrowList.length; i++) {
            if (borrowList[i].userID == currentLoggedInUser.userID) {
                let row = document.createElement("tr");
                row.innerHTML = `<td>${borrowList[i].borrowID}</td>
            <td>${borrowList[i].bookID}</td>
            <td>${borrowList[i].userID}</td>
            <td>${borrowList[i].borrowedDate.toString().substring(0, 10)}</td>
            <td>${borrowList[i].borrowCount}</td>
            <td>${borrowList[i].borrowStatus}</td>
            <td>${borrowList[i].paidFineAmount}</td>`;
                table.appendChild(row);
            }
        }
    });
}
function ReturnBookPage() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        greetingPage.style.display = "block";
        returnBookPage.style.display = "block";
        let table = document.getElementById("borrowedtable");
        table.innerHTML = "";
        let heading = document.createElement("tr");
        heading.innerHTML = `<th>${"Borrow ID"}</th><th>${"Book ID"}</th><th>${"User ID"}</th><th>${"Borrowed Date"}</th>
    <th>${"Borrow Count"}</th><th>${"BorrowStatus"}</th><th>${"Paid Fine Amount"}</th><th>${"Action"}</th>`;
        table.appendChild(heading);
        let borrowList = yield fetchBorrow();
        for (let i = 0; i < borrowList.length; i++) {
            if (borrowList[i].userID == currentLoggedInUser.userID && borrowList[i].borrowStatus == "Borrowed") {
                let row = document.createElement("tr");
                row.innerHTML = `<td>${borrowList[i].borrowID}</td>
            <td>${borrowList[i].bookID}</td>
            <td>${borrowList[i].userID}</td>
            <td>${borrowList[i].borrowedDate.toString().substring(0, 10)}</td>
            <td>${borrowList[i].borrowCount}</td>
            <td>${borrowList[i].borrowStatus}</td>
            <td>${borrowList[i].paidFineAmount}</td>
            <td><button onclick="ReturnBook('${borrowList[i].borrowID}')">Return Book</button></td>`;
                table.appendChild(row);
            }
        }
    });
}
function ReturnBook(borrowID) {
    return __awaiter(this, void 0, void 0, function* () {
        let bookList = yield fetchBook();
        let borrowList = yield fetchBorrow();
        borrowList.forEach(borrow => {
            if (borrow.borrowID == borrowID) {
                let borrowDate = new Date(borrow.borrowedDate);
                let currentDate = new Date();
                let timeDifference = Math.abs(borrowDate.getTime() - currentDate.getTime());
                let dayCount = Math.round(timeDifference / (1000 * 3600 * 24));
                let fineAmount = 0;
                if (dayCount > 15) {
                    fineAmount = dayCount - 15;
                }
                if (currentLoggedInUser.walletBalance >= fineAmount) {
                    bookList.forEach(book => {
                        if (book.bookID == borrow.bookID) {
                            currentLoggedInUser.walletBalance -= fineAmount;
                            updateUser(currentLoggedInUser.userID, currentLoggedInUser);
                            book.bookCount += borrow.borrowCount;
                            updateBook(book.bookID, book);
                            borrow.borrowStatus = "Returned";
                            borrow.paidFineAmount += fineAmount;
                            updateBorrow(borrow.borrowID, borrow);
                            alert("Book Returned Successfully");
                            ReturnBookPage();
                        }
                    });
                }
                else {
                    alert("Insufficient Balance\nProceed Recharge");
                    RechargePage();
                }
            }
        });
    });
}
function RechargePage() {
    DisplayNone();
    greetingPage.style.display = "block";
    rechargePage.style.display = "block";
}
function GetAmount() {
    return __awaiter(this, void 0, void 0, function* () {
        let amount = parseInt(document.getElementById("amount").value);
        let userList = yield fetchUser();
        userList.forEach(user => {
            if (user.userID == currentLoggedInUser.userID) {
                user.walletBalance += amount;
                updateUser(currentLoggedInUser.userID, user);
                alert("Recharge Successful\nCurrent Balance - " + user.walletBalance);
                GreetingPage();
            }
        });
    });
}
function BalanceCheckPage() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNone();
        greetingPage.style.display = "block";
        balanceCheckPage.style.display = "block";
        balanceCheckPage.innerHTML = "";
        let userList = yield fetchUser();
        let content = document.createElement("h3");
        let balance = 0;
        userList.forEach(user => {
            if (user.userID == currentLoggedInUser.userID) {
                balance = user.walletBalance;
            }
        });
        content.innerHTML = `CURRENT BALANCE - ${balance}`;
        balanceCheckPage.appendChild(content);
    });
}
