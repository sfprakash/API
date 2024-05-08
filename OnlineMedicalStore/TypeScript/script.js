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
let userIdAutoIncrement = 1002;
let medicineIdAutoIncrement = 100;
let orderIdAutoIncrement = 2007;
let currentUserId;
let currentMedicineId;
let currentloggedInUser;
const form = document.getElementById("signupform");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        event.preventDefault();
        const userEmail = document.getElementById("userEmail").value;
        const userPassword = document.getElementById("CFPassword").value;
        const userPhone = document.getElementById("userPhone").value;
        // userIdAutoIncrement++;
        const user = {
            userID: 0,
            userEmail: userEmail,
            userPassword: userPassword,
            userPhone: userPhone,
            walletBalance: 0
        };
        yield addUser(user);
        // alert("Your User ID - " +user.userID);
        alert("Account Created Successfully");
        currentloggedInUser = user;
    }
    catch (error) {
        console.log(error);
    }
    existingUser();
}));
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5191/api/User", {
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
function addMedicine(medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5191/api/MedicineInfo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error("Failed to add medicine");
        }
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5191/api/Order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error("Failed to add order");
        }
    });
}
function SignIn() {
    return __awaiter(this, void 0, void 0, function* () {
        let noExistingUserIdChecker = true;
        let existingUserId = parseInt(document.getElementById("existingUserId").value);
        // let existingUserIDRegex = /^UI\d{4}$/;
        let userArrayList = yield fetchUser();
        for (let i = 0; i < userArrayList.length; i++) {
            if (userArrayList[i].userID == existingUserId) {
                noExistingUserIdChecker = false;
                currentUserId = existingUserId;
                currentloggedInUser = userArrayList[i];
                alert("logged-in");
                medicinePage();
                return;
            }
        }
        if (noExistingUserIdChecker) {
            alert("Invalid UserID");
        }
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5191/api/User';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch User");
        }
        return yield response.json();
    });
}
function fetchMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5191/api/MedicineInfo';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch medicine");
        }
        return yield response.json();
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5191/api/Order';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed to fetch order");
        }
        return yield response.json();
    });
}
// let editingID: number | null = null;
// async function editOrder(id:number) {
//     editingID = id;
// }
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5191/api/User/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("Failed to update user");
        }
    });
}
function updateMedicine(id, medicine) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5191/api/MedicineInfo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicine)
        });
        if (!response.ok) {
            throw new Error('Failed to update medicine');
        }
    });
}
function updateOrder(id, order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5191/api/Order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error('Failed to update order');
        }
    });
}
function homePage() {
    let homePage = document.getElementById("home-page");
    homePage.style.display = "block";
}
function newUser() {
    let home = document.getElementById("home-page");
    let newUser = document.getElementById("new-user-page");
    home.style.display = "none";
    newUser.style.display = "block";
}
// function SignUp()
// {
//     let newUserEmail = (document.getElementById("userEmail") as HTMLInputElement).value;
//     let newUserPassword = (document.getElementById("CFPassword")as HTMLInputElement).value;
//     let newUserPhone = (document.getElementById("userPhone") as HTMLInputElement).value;
//     let newUser1:User = new User(newUserEmail,newUserPassword,+newUserPhone);
//     UserArrayList.push(newUser1);
//     alert("User ID is " +newUser1.UserId);
//     medicinePage();
//     return false
//     // linkIn();
// }
function existingUser() {
    let home = document.getElementById("home-page");
    let existingUser = document.getElementById("existing-user-page");
    let newUserPage = document.getElementById("new-user-page");
    home.style.display = "none";
    newUserPage.style.display = "none";
    existingUser.style.display = "block";
}
function linkIn() {
    let newUser = document.getElementById("new-user-page");
    let existingUser = document.getElementById("existing-user-page");
    newUser.style.display = "none";
    existingUser.style.display = "block";
}
function medicinePage() {
    let homePage = document.getElementById("home-page");
    let newUserPage = document.getElementById("new-user-page");
    let existingUserPage = document.getElementById('existing-user-page');
    let medicinePage = document.getElementById('medicine-page');
    let topUpPage = document.getElementById("top-up-block");
    // let greet = document.getElementById('greet') as HTMLLabelElement;
    homePage.style.display = "none";
    newUserPage.style.display = "none";
    existingUserPage.style.display = "none";
    medicinePage.style.display = "block";
    topUpPage.style.display = "none";
    return false;
    // greet.innerHTML = `<h3>Hello ${CurrentUserName}</h3>`;
}
function showMedicine() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicinePage = document.getElementById("medicine-page");
        let medicineInfoPage = document.getElementById("medicine-info");
        let purchasePage = document.getElementById("purchase-block");
        let cancelOrderPage = document.getElementById("cancel-order-block");
        let orderHistoryPage = document.getElementById("order-history-block");
        let topUpPage = document.getElementById("top-up-block");
        let balanceCheckPage = document.getElementById("show-balance-block");
        let quantityPage = document.getElementById("quantity-block");
        medicinePage.style.display = "block";
        medicineInfoPage.style.display = "block";
        purchasePage.style.display = "none";
        cancelOrderPage.style.display = "none";
        orderHistoryPage.style.display = "none";
        topUpPage.style.display = "none";
        balanceCheckPage.style.display = "none";
        quantityPage.style.display = "none";
        let table = document.getElementById("dataTable");
        table.innerHTML = "";
        // let medicineBtn = document.getElementById("medicine-btn") as HTMLButtonElement;
        let heading = document.createElement("tr");
        heading.innerHTML = `<th>${"MedicineID"}</th><th>${"Medicine Name"}</th><th>${"Medicine Count"}</th><th>${"Medicine Price"}</th><th>${"Expiry Date"}</th>`;
        table.appendChild(heading);
        let medicineList = yield fetchMedicine();
        for (let i = 0; i < medicineList.length; i++) {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${medicineList[i].medicineID}</td>
        <td>${medicineList[i].medicineName}</td>
        <td>${medicineList[i].medicineCount}</td>
        <td>${medicineList[i].medicinePrice}</td>
        <td>${medicineList[i].medicineExpiryDate.toString().substring(0, 10)}</td>`;
            table.appendChild(row);
        }
        // medicineBtn.disabled=true;
    });
}
function Purchase() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicinePage = document.getElementById("medicine-page");
        let medicineInfoPage = document.getElementById("medicine-info");
        let purchasePage = document.getElementById("purchase-block");
        let cancelOrderPage = document.getElementById("cancel-order-block");
        let orderHistoryPage = document.getElementById("order-history-block");
        let topUpPage = document.getElementById("top-up-block");
        let balanceCheckPage = document.getElementById("show-balance-block");
        let quantityPage = document.getElementById("quantity-block");
        medicinePage.style.display = "block";
        medicineInfoPage.style.display = "none";
        purchasePage.style.display = "block";
        cancelOrderPage.style.display = "none";
        orderHistoryPage.style.display = "none";
        topUpPage.style.display = "none";
        balanceCheckPage.style.display = "none";
        quantityPage.style.display = "none";
        let table = document.getElementById("purchase-table");
        table.innerHTML = "";
        let heading = document.createElement("tr");
        heading.innerHTML = `<th>${"MedicineID"}</th><th>${"Medicine Name"}</th><th>${"Medicine Count"}</th><th>${"Medicine Price"}</th><th>${"Expiry Date"}</th><th></th>`;
        table.appendChild(heading);
        let medicineList = yield fetchMedicine();
        for (let i = 0; i < medicineList.length; i++) {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${medicineList[i].medicineID}</td>
        <td>${medicineList[i].medicineName}</td>
        <td>${medicineList[i].medicineCount}</td>
        <td>${medicineList[i].medicinePrice}</td>
        <td>${medicineList[i].medicineExpiryDate.toString().substring(0, 10)}</td>
        <td><button onclick="setGlobalMedicineId('${medicineList[i].medicineID}');">buy</button></td>`;
            table.appendChild(row);
        }
    });
}
function setGlobalMedicineId(medicineId) {
    currentMedicineId = medicineId;
    let medicinePage = document.getElementById("medicine-page");
    let medicineInfoPage = document.getElementById("medicine-info");
    let purchasePage = document.getElementById("purchase-block");
    let cancelOrderPage = document.getElementById("cancel-order-block");
    let orderHistoryPage = document.getElementById("order-history-block");
    let topUpPage = document.getElementById("top-up-block");
    let balanceCheckPage = document.getElementById("show-balance-block");
    let quantityPage = document.getElementById("quantity-block");
    medicinePage.style.display = "block";
    medicineInfoPage.style.display = "none";
    purchasePage.style.display = "none";
    cancelOrderPage.style.display = "none";
    orderHistoryPage.style.display = "none";
    topUpPage.style.display = "none";
    balanceCheckPage.style.display = "none";
    quantityPage.style.display = "block";
}
function getQuantity() {
    let quantity = parseInt(document.getElementById("quantity").value);
    buyMedicine(quantity);
}
function buyMedicine(quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        let medicineList = yield fetchMedicine();
        for (let i = 0; i < medicineList.length; i++) {
            if (medicineList[i].medicineID == currentMedicineId) {
                medicineList[i].medicineCount -= quantity;
                updateMedicine(medicineList[i].medicineID, medicineList[i]);
                let totalPrice = quantity * medicineList[i].medicinePrice;
                currentloggedInUser.walletBalance -= totalPrice;
                updateUser(currentloggedInUser.userID, currentloggedInUser);
                // orderIdAutoIncrement++;
                let newOrder = {
                    orderID: 0,
                    medicineID: medicineList[i].medicineID,
                    userID: currentloggedInUser.userID,
                    medicineName: medicineList[i].medicineName,
                    medicineCount: quantity,
                    totalPrice: totalPrice,
                    orderStatus: "Ordered"
                };
                addOrder(newOrder);
                alert("Order Successful");
            }
        }
        Purchase();
    });
}
function CancelOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicinePage = document.getElementById("medicine-page");
        let medicineInfoPage = document.getElementById("medicine-info");
        let purchasePage = document.getElementById("purchase-block");
        let cancelOrderPage = document.getElementById("cancel-order-block");
        let orderHistoryPage = document.getElementById("order-history-block");
        let topUpPage = document.getElementById("top-up-block");
        let balanceCheckPage = document.getElementById("show-balance-block");
        let quantityPage = document.getElementById("quantity-block");
        medicinePage.style.display = "block";
        medicineInfoPage.style.display = "none";
        purchasePage.style.display = "none";
        cancelOrderPage.style.display = "block";
        orderHistoryPage.style.display = "none";
        topUpPage.style.display = "none";
        balanceCheckPage.style.display = "none";
        quantityPage.style.display = "none";
        let cancelOrderTable = document.getElementById("cancel-order");
        cancelOrderTable.innerHTML = "";
        // let cancelOrderBtn = document.getElementById("cancel-order-btn") as HTMLButtonElement;
        let heading = document.createElement("tr");
        heading.innerHTML = `<th>Order ID</th>
    <th>User ID</th>
    <th>Medicine ID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>
    <th></th>`;
        cancelOrderTable.appendChild(heading);
        let orderList = yield fetchOrder();
        for (let i = 0; i < orderList.length; i++) {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${orderList[i].orderID}</td>
        <td>${orderList[i].userID}</td>
        <td>${orderList[i].medicineID}</td>
        <td>${orderList[i].medicineName}</td>
        <td>${orderList[i].medicineCount}</td>
        <td>${orderList[i].totalPrice}</td>
        <td>${orderList[i].orderStatus}</td>
        <td><button onclick="OrderCancel('${orderList[i].orderID}')";>Cancel</button></td>`;
            cancelOrderTable.appendChild(row);
        }
        // cancelOrderBtn.disabled=true;
    });
}
function OrderCancel(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        let orderList = yield fetchOrder();
        for (let i = 0; i <= orderList.length; i++) {
            if (orderList[i].orderID == orderID) {
                orderList[i].orderStatus = "Cancelled";
                updateOrder(orderID, orderList[i]);
                alert("Order Cancelled Successfully");
                break;
            }
        }
        CancelOrder();
    });
}
function OrderHistory() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicinePage = document.getElementById("medicine-page");
        let medicineInfoPage = document.getElementById("medicine-info");
        let purchasePage = document.getElementById("purchase-block");
        let cancelOrderPage = document.getElementById("cancel-order-block");
        let orderHistoryPage = document.getElementById("order-history-block");
        let topUpPage = document.getElementById("top-up-block");
        let balanceCheckPage = document.getElementById("show-balance-block");
        let quantityPage = document.getElementById("quantity-block");
        let downloadbtn = document.getElementById("downloadbtn");
        medicinePage.style.display = "block";
        medicineInfoPage.style.display = "none";
        purchasePage.style.display = "none";
        cancelOrderPage.style.display = "none";
        orderHistoryPage.style.display = "block";
        topUpPage.style.display = "none";
        balanceCheckPage.style.display = "none";
        quantityPage.style.display = "none";
        downloadbtn.style.display = "block";
        let orderHistoryTable = document.getElementById("order-history");
        orderHistoryTable.innerHTML = "";
        // let orderHistoryBtn = document.getElementById("order-history-btn") as HTMLButtonElement;
        let heading = document.createElement("tr");
        heading.innerHTML = `<th>Order ID</th>
    <th>User ID</th>
    <th>Medicine ID</th>
    <th>Medicine Name</th>
    <th>Medicine Count</th>
    <th>Total Price</th>
    <th>Order Status</th>`;
        orderHistoryTable.appendChild(heading);
        let orderList = yield fetchOrder();
        for (let i = 0; i < orderList.length; i++) {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${orderList[i].orderID}</td>
        <td>${orderList[i].userID}</td>
        <td>${orderList[i].medicineID}</td>
        <td>${orderList[i].medicineName}</td>
        <td>${orderList[i].medicineCount}</td>
        <td>${orderList[i].totalPrice}</td>
        <td>${orderList[i].orderStatus}</td>`;
            orderHistoryTable.appendChild(row);
        }
        // orderHistoryBtn.disabled=true;
    });
}
function TopUp() {
    let medicinePage = document.getElementById("medicine-page");
    let medicineInfoPage = document.getElementById("medicine-info");
    let purchasePage = document.getElementById("purchase-block");
    let cancelOrderPage = document.getElementById("cancel-order-block");
    let orderHistoryPage = document.getElementById("order-history-block");
    let topUpPage = document.getElementById("top-up-block");
    let balanceCheckPage = document.getElementById("show-balance-block");
    let quantityPage = document.getElementById("quantity-block");
    medicinePage.style.display = "block";
    medicineInfoPage.style.display = "none";
    purchasePage.style.display = "none";
    cancelOrderPage.style.display = "none";
    orderHistoryPage.style.display = "none";
    topUpPage.style.display = "block";
    balanceCheckPage.style.display = "none";
    quantityPage.style.display = "none";
}
function getAmount() {
    return __awaiter(this, void 0, void 0, function* () {
        let amount = parseInt(document.getElementById("top-up-amount").value);
        let userList = yield fetchUser();
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].userID == currentloggedInUser.userID) {
                userList[i].walletBalance += amount;
                updateUser(userList[i].userID, userList[i]);
                alert(`Recharge Successful - Balance : ${userList[i].walletBalance}`);
                medicinePage();
                return;
            }
        }
    });
}
function ShowBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        let medicinePage = document.getElementById("medicine-page");
        let medicineInfoPage = document.getElementById("medicine-info");
        let purchasePage = document.getElementById("purchase-block");
        let cancelOrderPage = document.getElementById("cancel-order-block");
        let orderHistoryPage = document.getElementById("order-history-block");
        let topUpPage = document.getElementById("top-up-block");
        let balanceCheckPage = document.getElementById("show-balance-block");
        let quantityPage = document.getElementById("quantity-block");
        medicinePage.style.display = "block";
        medicineInfoPage.style.display = "none";
        purchasePage.style.display = "none";
        cancelOrderPage.style.display = "none";
        orderHistoryPage.style.display = "none";
        topUpPage.style.display = "none";
        balanceCheckPage.style.display = "block";
        quantityPage.style.display = "none";
        balanceCheckPage.innerHTML = "";
        let line = document.createElement("p");
        let balance = 0;
        let userList = yield fetchUser();
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].userID == currentloggedInUser.userID) {
                balance = userList[i].walletBalance;
                break;
            }
        }
        line.innerHTML = `Current Balance - ${balance}`;
        balanceCheckPage.appendChild(line);
    });
}
function home() {
    let homepage = document.getElementById("home-page");
    let newuserpage = document.getElementById("new-user-page");
    let existinguserpage = document.getElementById("existing-user-page");
    let medicinePage = document.getElementById("medicine-page");
    let medicineInfoPage = document.getElementById("medicine-info");
    let purchasePage = document.getElementById("purchase-block");
    let cancelOrderPage = document.getElementById("cancel-order-block");
    let orderHistoryPage = document.getElementById("order-history-block");
    let topUpPage = document.getElementById("top-up-block");
    let balanceCheckPage = document.getElementById("show-balance-block");
    let quantityPage = document.getElementById("quantity-block");
    homepage.style.display = "block";
    newuserpage.style.display = "none";
    existinguserpage.style.display = "none";
    medicinePage.style.display = "none";
    medicineInfoPage.style.display = "none";
    purchasePage.style.display = "none";
    cancelOrderPage.style.display = "none";
    orderHistoryPage.style.display = "none";
    topUpPage.style.display = "none";
    balanceCheckPage.style.display = "none";
    quantityPage.style.display = "none";
}
function DownloadCSV(csvdata) {
    // let CSVData:any = TableToCSV();
    let CSVFile = new Blob([csvdata], { type: "text/csv" });
    let temp_link = document.createElement("a");
    temp_link.download = "orderInfo.csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
}
function TableToCSV() {
    let csvdata = [];
    let rows = document.querySelectorAll("#order-history tr");
    for (let i = 0; i < rows.length; i++) {
        let cols = rows[i].querySelectorAll("td,th");
        let csvrow = [];
        for (let j = 0; j < cols.length; j++) {
            csvrow.push(cols[j].innerHTML);
        }
        csvdata += csvrow.join(",") + "\n";
    }
    // return csvdata;
    DownloadCSV(csvdata);
}
