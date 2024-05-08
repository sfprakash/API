
let CardNumberAutoIncrement = 1000;
let TravelIdAutoIncrement = 2000;
let TicketIDAutoIncrement = 3000;

let currentLoggedInUser:UserDetails;
let currentTicketID:number;

interface UserDetails 
{

    cardNumber: number;
    userName: string;
    phoneNumber: string;
    password: string;
    balance: number;

    // WalletRecharge(amount:number) {
    //     this.Balance += amount;
    // }

    // DeductBalance(amount: number) {
    //     this.Balance -= amount;
    // }
}

interface TravelDetails{

    travelID: number;
    cardNumber: number;
    fromLocation: string;
    toLocation: string;
    date: Date;
    travelCost: number;
}

interface TicketFairDetails{

    ticketID: number;
    fromLocation: string;
    toLocation: string;
    ticketPrice: number;
}

//declaration of pages div element
let homePage = document.getElementById("homepage") as HTMLDivElement;
let newUserPage = document.getElementById("newuserpage") as HTMLDivElement;
let loginUserPage = document.getElementById("loginuserpage") as HTMLDivElement;
let greetingPage = document.getElementById("greetingpage") as HTMLDivElement;
let travelPage = document.getElementById("travelpage") as HTMLDivElement;
let historyPage = document.getElementById("historypage") as HTMLDivElement;
let rechargePage = document.getElementById("rechargepage") as HTMLDivElement;
let showBalancePage = document.getElementById("balancecheckpage") as HTMLDivElement;

//function to display none of the pages
function DisplayNone()
{
    homePage.style.display="none";
    newUserPage.style.display="none";
    loginUserPage.style.display="none";
    greetingPage.style.display="none";
    travelPage.style.display="none";
    historyPage.style.display="none";
    rechargePage.style.display="none";
    showBalancePage.style.display="none";
}

//function to display home page
function HomePage()
{
    DisplayNone();
    homePage.style.display="block";
}

//function to display new user page
function NewUser()
{
    DisplayNone();
    newUserPage.style.display="block";
}

//function to display login user page
function LoginUser()
{
    DisplayNone();
    loginUserPage.style.display="block";
}

//
async function addUser(user:UserDetails): Promise<void> {
    const response = await fetch("http://localhost:5221/api/UserDetails",{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error("Failed to add user");
    }
}

//
async function addTravel(travel:TravelDetails): Promise<void> {
    const response = await fetch("http://localhost:5221/api/TravelDetails",{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(travel)
    });
    if(!response.ok)
    {
        throw new Error("Failed to add user");
    }
}

//
async function addTicket(ticket:TicketFairDetails): Promise<void> {
    const response = await fetch("http://localhost:5221/api/TicketFairDetails",{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(ticket)
    });
    if(!response.ok)
    {
        throw new Error("Failed to add user");
    }
}

//fetch functions
async function fetchUser():Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5221/api/UserDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Failed to fetch user");
    }
    return await response.json();
}

async function fetchTravel():Promise<TravelDetails[]> {
    const apiUrl = 'http://localhost:5221/api/TravelDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Failed to fetch travel details");
    }
    return await response.json();
}

async function fetchTicket(): Promise<TicketFairDetails[]> {
    const apiUrl = 'http://localhost:5221/api/TicketFairDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Failed to fetch ticket fair details");
    }
    return await response.json();
}

//update functions
async function updateUser(id:number, user:UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5221/api/UserDetails/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error('Failed to update user');
    }
}

//function to create new account
async function CreateAccount()
{
    let username = (document.getElementById("username") as HTMLInputElement).value;
    let phone = (document.getElementById("phone") as HTMLInputElement).value;
    let password = (document.getElementById("cpassword") as HTMLInputElement).value;

    let newUser: UserDetails = {
        cardNumber : 0,
        userName: username,
        phoneNumber: phone,
        password : password,
        balance: 0
    };
    await addUser(newUser);
    alert("Account Created. Your Card Number - " + newUser.cardNumber);
    LoginUser();
}

//function to login
async function AccountLogin()
{
    let cardNumberChecker:boolean = true;
    let cardnumber:number = parseInt((document.getElementById("cardnumber") as HTMLInputElement).value);
    let loginpassword = (document.getElementById("loginpassword") as HTMLInputElement).value;

    let userList = await fetchUser();
    for(let i=0; i<userList.length; i++)
    {
        if(userList[i].cardNumber == cardnumber && userList[i].password == loginpassword)
        {
            cardNumberChecker = false;
            currentLoggedInUser = userList[i];
            alert("logged-In");
            GreetingPage();
            break;
        }
    }
    if(cardNumberChecker)
    {
        alert("Invalid Card Number");
        HomePage();
    }
}

//function to display greeting page
function GreetingPage()
{
    DisplayNone();
    greetingPage.style.display="block";
}

//function to display travel page
async function TravelPage()
{
    DisplayNone();
    greetingPage.style.display="block";
    travelPage.style.display="block";

    let table = document.getElementById("tickettable") as HTMLTableElement;
    table.innerHTML="";
    let heading = document.createElement("tr");
    heading.innerHTML=`<th>${"TicketID"}</th><th>${"FromLocation"}</th><th>${"ToLocation"}</th><th>${"Fair"}</th><th>${""}</th>`;
    table.appendChild(heading);

    let ticketFairList = await fetchTicket();
    for(let i=0; i<ticketFairList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${ticketFairList[i].ticketID}</td>
        <td>${ticketFairList[i].fromLocation}</td>
        <td>${ticketFairList[i].toLocation}</td>
        <td>${ticketFairList[i].ticketPrice}</td>
        <td><button onclick="BookTicket('${ticketFairList[i].ticketID}');">book</button></td>`;

        table.appendChild(row);
    }
}

//function to set global ticket id
function SetGlobalTicketID(ticketID:number)
{
    currentTicketID = ticketID;
}

//function to book ticket
async function BookTicket(ticketID:number)
{
    let ticketFairList = await fetchTicket();
    for(let i=0; i<ticketFairList.length; i++)
    {
        if(ticketFairList[i].ticketID == ticketID)
        {
            if(currentLoggedInUser.balance >= ticketFairList[i].ticketPrice)
            {
                currentLoggedInUser.balance -= ticketFairList[i].ticketPrice;
                updateUser(currentLoggedInUser.cardNumber,currentLoggedInUser);
                let newTravel:TravelDetails = {
                    travelID:0,
                    cardNumber: currentLoggedInUser.cardNumber,
                    fromLocation: ticketFairList[i].fromLocation,
                    toLocation: ticketFairList[i].toLocation,
                    date: new Date(),
                    travelCost: ticketFairList[i].ticketPrice
                }
                addTravel(newTravel);
                // let newTravel:TravelDetails = new TravelDetails(currentLoggedInUser.CardNumber,TicketFairList[i].FromLocation,TicketFairList[i].ToLocation,new Date(),TicketFairList[i].TicketPrice);
                // travelHistoryList.push(newTravel);
                alert("Ticket Booked Successfully\nYour Travel ID - " + newTravel.travelID);

            }
            else
            {
                alert("Insufficient Balance");
                TravelPage();
            }
        }
    }
}


//function to display travel history
async function ShowHistory()
{
    DisplayNone();
    greetingPage.style.display="block";
    historyPage.style.display="block";

    let table = document.getElementById("historytable") as HTMLTableElement;
    table.innerHTML="";
    let heading = document.createElement("tr");
    heading.innerHTML=`<th>${"TravelID"}</th><th>${"Card Number"}</th><th>${"FromLocation"}</th><th>${"ToLocation"}</th><th>${"Date"}</th><th>${"Travel Cost"}</th>`;
    table.appendChild(heading);

    let travelHistoryList = await fetchTravel();
    for(let i=0; i<travelHistoryList.length; i++)
    {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${travelHistoryList[i].travelID}</td>
        <td>${travelHistoryList[i].cardNumber}</td>
        <td>${travelHistoryList[i].fromLocation}</td>
        <td>${travelHistoryList[i].toLocation}</td>
        <td>${travelHistoryList[i].date.toString().substring(0,10)}</td>
        <td>${travelHistoryList[i].travelCost}</td>`;

        table.appendChild(row);
    }
}

//function to display recharge page
function RechargePage()
{
    DisplayNone();
    greetingPage.style.display="block";
    rechargePage.style.display="block";
}

//function to get amount
async function GetAmount()
{
    let amount:number =parseInt((document.getElementById("rechargeamount") as HTMLInputElement).value);
    let userList = await fetchUser();
    for(let i=0; i<userList.length; i++)
    {
        if(userList[i].cardNumber == currentLoggedInUser.cardNumber)
        {
            userList[i].balance += amount;
            updateUser(userList[i].cardNumber,userList[i]);
            alert(`Recharge Successful - Balance : ${userList[i].balance}` );
            break;
        }
    }
}

//function to check balance
async function ShowBalance()
{
    DisplayNone();
    greetingPage.style.display="block";
    showBalancePage.style.display="block";
    showBalancePage.innerHTML="";

    let line = document.createElement("p");
    let balance:number = 0;
    
    let userList = await fetchUser();
    for(let i=0; i<userList.length; i++)
    {
        if(userList[i].cardNumber == currentLoggedInUser.cardNumber)
        {
            balance = userList[i].balance;
            break;
        }
    }
    line.innerHTML=`Current Balance - ${balance}`;
    showBalancePage.appendChild(line);
}

