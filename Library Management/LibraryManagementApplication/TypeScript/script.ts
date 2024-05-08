let currentLoggedInUser:UserDetails;
let currentBookID:any;
let selectedBook:BookDetails;
let returningBook:BookDetails;

interface UserDetails
{
    userID:any;
    userName:string;
    password:string;
    gender:string;
    department:string;
    mobileNumber:string;
    mailID:string;
    walletBalance:number;
}

interface BookDetails
{
    bookID:any;
    bookName:string;
    authorName:string;
    bookCount:number;
}

interface BorrowDetails
{
    borrowID:any;
    bookID:number;
    userID:number;
    borrowedDate:Date;
    borrowCount:number;
    borrowStatus:string;
    paidFineAmount:number;
}

let homePage = document.getElementById("homepage") as HTMLDivElement;
let newUserPage = document.getElementById("newuserpage") as HTMLDivElement;
let loginUserPage = document.getElementById("loginuserpage") as HTMLDivElement;
let greetingPage = document.getElementById("greetingpage") as HTMLDivElement;
let borrowPage = document.getElementById("borrowpage") as HTMLDivElement;
let bookCountPage = document.getElementById("bookCountPage") as HTMLDivElement;
let showHistoryPage = document.getElementById("showhistorypage") as HTMLDivElement;
let returnBookPage = document.getElementById("returnbookpage") as HTMLDivElement;
let rechargePage = document.getElementById("rechargepage") as HTMLDivElement;
let balanceCheckPage = document.getElementById("balancecheckpage") as HTMLDivElement;

function DisplayNone()
{
    homePage.style.display="none";
    newUserPage.style.display="none";
    loginUserPage.style.display="none";
    greetingPage.style.display="none";
    borrowPage.style.display="none";
    bookCountPage.style.display="none";
    showHistoryPage.style.display="none";
    returnBookPage.style.display="none";
    rechargePage.style.display="none";
    balanceCheckPage.style.display="none";
}

function HomePage()
{
    DisplayNone();
    homePage.style.display="block";
}

function NewUserPage()
{
    DisplayNone();
    newUserPage.style.display="flex";
}

const form = document.getElementById("signupform") as HTMLFormElement;

form.addEventListener("submit", async (event) =>{
    try{
        event.preventDefault();
        const userName = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
        const gender = (document.getElementById("gender") as HTMLInputElement).value;
        const department = (document.getElementById("department") as HTMLInputElement).value;
        const mobileNumber = (document.getElementById("mobilenumber") as HTMLInputElement).value;
        const mailID = (document.getElementById("mailID") as HTMLInputElement).value;

        const user:UserDetails = {
            userID:0,
            userName:userName,
            password:password,
            gender:gender,
            department:department,
            mobileNumber:mobileNumber,
            mailID:mailID,
            walletBalance:0
        };
        await addUser(user);
        alert("Account Created Successfully\nUser ID - " + user.userID) ;
    }catch(error){
        console.log(error);
    }
    LoginUserPage();
});

async function addUser(user:UserDetails): Promise<void> {
    const response = await fetch("http://localhost:5257/api/UserDetails",{
        method: "POST",
        headers: {
            "Content-Type" :  "application/json"
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error("failed to add user");
    }
}

async function addBook(book:BookDetails):Promise<void> {
    const response = await fetch("http://localhost:5257/api/BookDetails",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(book)
    });
    if(!response.ok)
    {
        throw new Error("failed to add book details");
    }
}

async function addBorrow(borrow:BorrowDetails):Promise<void> {
    const response = await fetch("http://localhost:5257/api/BorrowDetails",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(borrow)
    });
    if(!response.ok)
    {
        throw new Error("failed to add borrow details")
    }
}

//fetch functions
async function fetchUser():Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5257/api/UserDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("failed to fetch user details");
    }
    return await response.json();
}

async function fetchBook():Promise<BookDetails[]> {
    const apiUrl = 'http://localhost:5257/api/BookDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("failed to fetch book details");
    }
    return await response.json();
}

async function fetchBorrow():Promise<BorrowDetails[]> {
    const apiUrl = 'http://localhost:5257/api/BorrowDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("failed to fetch borrow details");
    }
    return await response.json();
}

//update functions
async function updateUser(id:any, user:UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5257/api/UserDetails/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error("failed to update user details");
    }
}

async function updateBook(id:any, book:BookDetails): Promise<void> {
    const response = await fetch(`http://localhost:5257/api/BookDetails/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(book)
    });
    if(!response.ok)
    {
        throw new Error("failed to update book details");
    }
}

async function updateBorrow(id:any, borrow:BorrowDetails): Promise<void> {
    const response = await fetch(`http://localhost:5257/api/BorrowDetails/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(borrow)
    });
    if(!response.ok)
    {
        throw new Error("failed to update borrow details");
    }
}

function LoginUserPage()
{
    DisplayNone();
    loginUserPage.style.display="block";
}

async function Login()
{
    let noExistingUserIDChecker:boolean = true;
    let loginEmail = (document.getElementById("loginuseremail") as HTMLInputElement).value;
    let loginPassword = (document.getElementById("loginpassword") as HTMLInputElement).value;

    let userList = await fetchUser();
    for(let i=0; i<userList.length; i++)
    {
        if(userList[i].mailID == loginEmail && userList[i].password == loginPassword)
        {
            noExistingUserIDChecker = false;
            currentLoggedInUser = userList[i];
            alert("Logged-In");
            GreetingPage();
        }
    }
    if(noExistingUserIDChecker)
    {
        alert("Invalid User");
    }
}

function GreetingPage()
{
    DisplayNone();
    greetingPage.style.display="block";
}

async function BorrowBookPage()
{
    DisplayNone();
    greetingPage.style.display="block";
    borrowPage.style.display="block";

    let table = document.getElementById("booktable") as HTMLTableElement;
    table.innerHTML="";
    let heading = document.createElement("tr");
    heading.innerHTML=`<th>${"BookID"}</th><th>${"Book Name"}</th><th>${"Author Name"}</th><th>${"Book Count"}</th><th>${"Action"}</th>`;
    table.appendChild(heading);

    let bookList = await fetchBook();
    for(let i=0; i<bookList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${bookList[i].bookID}</td><td>${bookList[i].bookName}</td><td>${bookList[i].authorName}</td><td>${bookList[i].bookCount}</td>
        <td><button onclick="SetSelectedBook('${bookList[i].bookID}');">Borrow Book</button></td>`;
        table.appendChild(row);
    }
}

async function SetSelectedBook(bookID:any)
{
    currentBookID = bookID;
    DisplayNone();
    greetingPage.style.display="block";
    bookCountPage.style.display="block";
    const bookList = await fetchBook();
    bookList.forEach(book =>
        {
            if(book.bookID == bookID)
            {
                selectedBook = book;
            }
        });

}

function GetBookCount()
{
    let requestedCount:number = parseInt((document.getElementById("count") as HTMLInputElement).value);
    BorrowBook(requestedCount);
}

async function BorrowBook(requestedCount:number)
{
    let bookList = await fetchBook();
    let borrowList = await fetchBorrow();

    if(selectedBook.bookCount >= requestedCount)
    {
        let userBookCount = 0;
        borrowList.forEach(borrow =>
            {
                if(borrow.userID == currentLoggedInUser.userID)
                {
                    userBookCount = borrow.borrowCount;
                }
            });

        if(userBookCount >= 3)
        {
            alert("You have already borrowed 3 books");
        }
        else
        {
            selectedBook.bookCount -= requestedCount;
            updateBook(selectedBook.bookID,selectedBook);
            let newBorrow:BorrowDetails = {
                borrowID: 0,
                bookID: selectedBook.bookID,
                userID: currentLoggedInUser.userID,
                borrowedDate: new Date(),
                borrowCount: requestedCount,
                borrowStatus: "Borrowed",
                paidFineAmount: 0
            }
            addBorrow(newBorrow);
            alert("Book Borrowed Successfully");

        }
    }
    else
    {
        let nextAvailableDate = new Date("2099-12-31");
        borrowList.forEach(borrow =>
            {
                if(borrow.bookID == selectedBook.bookID)
                {
                    let availableDate = new Date(borrow.borrowedDate);
                    availableDate.setDate(availableDate.getDate()+15);
                    if(nextAvailableDate > availableDate)
                    {
                        nextAvailableDate = availableDate;
                    }
                }
            });
        alert("book will be available on " + nextAvailableDate.toISOString().substring(0,10));
    }
    BorrowBookPage();
}

async function ShowHistoryPage()
{
    DisplayNone();
    greetingPage.style.display="block";
    showHistoryPage.style.display="block";

    let table = document.getElementById("historytable") as HTMLTableElement;
    table.innerHTML="";
    let heading = document.createElement("tr");
    heading.innerHTML=`<th>${"Borrow ID"}</th><th>${"Book ID"}</th><th>${"User ID"}</th><th>${"Borrowed Date"}</th>
    <th>${"Borrow Count"}</th><th>${"BorrowStatus"}</th><th>${"Paid Fine Amount"}</th>`;
    table.appendChild(heading);

    let borrowList = await fetchBorrow()
    for(let i=0; i<borrowList.length; i++)
    {
        if(borrowList[i].userID == currentLoggedInUser.userID)
        {
            let row = document.createElement("tr");
            row.innerHTML=`<td>${borrowList[i].borrowID}</td>
            <td>${borrowList[i].bookID}</td>
            <td>${borrowList[i].userID}</td>
            <td>${borrowList[i].borrowedDate.toString().substring(0,10)}</td>
            <td>${borrowList[i].borrowCount}</td>
            <td>${borrowList[i].borrowStatus}</td>
            <td>${borrowList[i].paidFineAmount}</td>`;

            table.appendChild(row);
        }
        
    }
}

async function ReturnBookPage()
{
    DisplayNone();
    greetingPage.style.display="block";
    returnBookPage.style.display="block";

    let table = document.getElementById("borrowedtable") as HTMLTableElement;
    table.innerHTML="";
    let heading = document.createElement("tr");
    heading.innerHTML=`<th>${"Borrow ID"}</th><th>${"Book ID"}</th><th>${"User ID"}</th><th>${"Borrowed Date"}</th>
    <th>${"Borrow Count"}</th><th>${"BorrowStatus"}</th><th>${"Paid Fine Amount"}</th><th>${"Action"}</th>`;
    table.appendChild(heading);

    let borrowList = await fetchBorrow()
    for(let i=0; i<borrowList.length; i++)
    {
        if(borrowList[i].userID == currentLoggedInUser.userID && borrowList[i].borrowStatus == "Borrowed")
        {
            let row = document.createElement("tr");
            row.innerHTML=`<td>${borrowList[i].borrowID}</td>
            <td>${borrowList[i].bookID}</td>
            <td>${borrowList[i].userID}</td>
            <td>${borrowList[i].borrowedDate.toString().substring(0,10)}</td>
            <td>${borrowList[i].borrowCount}</td>
            <td>${borrowList[i].borrowStatus}</td>
            <td>${borrowList[i].paidFineAmount}</td>
            <td><button onclick="ReturnBook('${borrowList[i].borrowID}')">Return Book</button></td>`;

            table.appendChild(row);
        }
    }
}

async function ReturnBook(borrowID:any)
{
    let bookList = await fetchBook();
    let borrowList = await fetchBorrow();

    borrowList.forEach(borrow =>
        {
            if(borrow.borrowID == borrowID)
            {
                let borrowDate = new Date(borrow.borrowedDate);
                let currentDate = new Date();
                let timeDifference = Math.abs(borrowDate.getTime() - currentDate.getTime())
                let dayCount = Math.round(timeDifference/(1000*3600*24));
                let fineAmount = 0;
                if(dayCount > 15)
                {
                    fineAmount = dayCount - 15;
                    
                }
                if(currentLoggedInUser.walletBalance >= fineAmount)
                {
                    bookList.forEach(book =>
                        {
                            if(book.bookID == borrow.bookID)
                            {
                                currentLoggedInUser.walletBalance -= fineAmount;
                                updateUser(currentLoggedInUser.userID,currentLoggedInUser);
                                book.bookCount += borrow.borrowCount;
                                updateBook(book.bookID,book);
                                borrow.borrowStatus = "Returned";
                                borrow.paidFineAmount += fineAmount;
                                updateBorrow(borrow.borrowID,borrow);
                                alert("Book Returned Successfully");
                                ReturnBookPage();
                            }
                        });
                }
                else
                {
                    alert("Insufficient Balance\nProceed Recharge");
                    RechargePage();
                }
                
            }
        });
}

function RechargePage()
{
    DisplayNone();
    greetingPage.style.display="block";
    rechargePage.style.display="block";
}

async function GetAmount()
{
    let amount = parseInt((document.getElementById("amount") as HTMLInputElement).value);
    let userList = await fetchUser();
    userList.forEach(user =>
        {
            if(user.userID == currentLoggedInUser.userID)
            {
                user.walletBalance += amount;
                updateUser(currentLoggedInUser.userID,user);
                alert("Recharge Successful\nCurrent Balance - " + user.walletBalance);
                GreetingPage();
            }
        });
}

async function BalanceCheckPage()
{
    DisplayNone();
    greetingPage.style.display="block";
    balanceCheckPage.style.display="block";
    
    balanceCheckPage.innerHTML="";
    let userList = await fetchUser();
    let content = document.createElement("h3");
    let balance:number = 0;
    userList.forEach(user =>
        {
            if(user.userID == currentLoggedInUser.userID)
            {
                balance = user.walletBalance;
            }
        });
    content.innerHTML=`CURRENT BALANCE - ${balance}`;
    balanceCheckPage.appendChild(content);

}

