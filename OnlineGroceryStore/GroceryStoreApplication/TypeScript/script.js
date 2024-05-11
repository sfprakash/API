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
let currentOrder;
let itemIDAutoIncrement = 0;
let cartLocalList = new Array();
let homePage = document.getElementById("homepage");
let newUserPage = document.getElementById("newuserpage");
let loginUserPage = document.getElementById("loginuserpage");
let navbar = document.getElementById("navbardiv");
let greetingPage = document.getElementById("greetingpage");
let productPage = document.getElementById("productpage");
let productFormDiv = document.getElementById("productformdiv");
let purchasePage = document.getElementById("purchasepage");
let showCardDiv = document.getElementById("showcarddiv");
let cartPage = document.getElementById("cartpage");
let orderHistoryPage = document.getElementById("orderhistorypage");
let rechargePage = document.getElementById("rechargepage");
let balanceCheckPage = document.getElementById("balancecheckpage");
function DisplayNone() {
    homePage.style.display = "none";
    newUserPage.style.display = "none";
    loginUserPage.style.display = "none";
    navbar.style.display = "none";
    greetingPage.style.display = "none";
    productPage.style.display = "none";
    productFormDiv.style.display = "none";
    purchasePage.style.display = "none";
    showCardDiv.style.display = "none";
    cartPage.style.display = "none";
    orderHistoryPage.style.display = "none";
    rechargePage.style.display = "none";
    balanceCheckPage.style.display = "none";
}
function HomePage() {
    DisplayNone();
    homePage.style.display = "block";
}
function NewUserPage() {
    DisplayNone();
    homePage.style.display = "block";
    newUserPage.style.display = "block";
}
function LoginUserPage() {
    DisplayNone();
    homePage.style.display = "block";
    loginUserPage.style.display = "block";
}
function DisplayNavbar() {
    DisplayNone();
    navbar.style.display = "block";
}
function GreetingPage() {
    DisplayNavbar();
    greetingPage.style.display = "block";
    let contentDiv = document.getElementById("homecontent");
    contentDiv.innerHTML = "";
    let content = document.createElement("h1");
    content.innerHTML = `Welcome ${currentLoggedInUser.userName}`;
    contentDiv.appendChild(content);
    let image = document.createElement("img");
    image.src = `${currentLoggedInUser.userImage}`;
    image.id = "userprofileimage";
    contentDiv.appendChild(image);
}
function ProductPage() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNavbar();
        productPage.style.display = "block";
        let productTable = document.getElementById("producttable");
        productTable.innerHTML = "";
        let heading = document.createElement("tr");
        heading.innerHTML = `<td>${"ProductName"}</td>
    <td>${"Product Quantity"}</td>
    <td>${"Unit Price"}</td>
    <td>${"Purchase Date"}</td>
    <td>${"Expiry Date"}</td>
    <td>${"Product Image"}</td>
    <td>${"Actions"}</td>`;
        productTable.appendChild(heading);
        let productList = yield fetchProduct();
        productList.forEach(product => {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${product.productName}</td>
        <td>${product.productQuantity}</td>
        <td>${product.unitPrice}</td>
        <td>${product.purchaseDate}</td>
        <td>${product.expiryDate}</td>
        <td><img src="${product.productImage}" /></td>
        <td><button onclick="EditProduct('${product.productID}');" >EDIT</button><button onclick="DeleteProduct('${product.productID}');" >DELETE</button></td>`;
            productTable.appendChild(row);
        });
    });
}
function DisplayProductForm() {
    productFormDiv.style.display = "block";
}
function PurchasePage() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNavbar();
        purchasePage.style.display = "block";
        showCardDiv.style.display = "flex";
        showCardDiv.innerHTML = "";
        let productList = yield fetchProduct();
        productList.forEach(product => {
            let card = document.createElement("div");
            card.className = "carddiv";
            card.innerHTML = `<div class="imagediv" ><img src="${product.productImage}" class="productimage" /></div>
        <div class="descriptiondiv" >
        <div class="productnamediv" ><h2>${product.productName}</h2></div>
        <div class="productpricediv" ><h4>${"PRICE - RS."}${product.unitPrice}</h4></div>
        <div class="addcartbtndiv" ><button class="addcartbtn" onclick="AddToCart('${product.productID}');" >Add to Cart</button></div>
        </div>`;
            showCardDiv.appendChild(card);
        });
    });
}
function AddToCart(productID) {
    return __awaiter(this, void 0, void 0, function* () {
        let productList = yield fetchProduct();
        itemIDAutoIncrement++;
        productList.forEach(product => {
            if (product.productID == productID) {
                let newCart = {
                    itemID: itemIDAutoIncrement,
                    productID: product.productID,
                    productName: product.productName,
                    itemCount: 1,
                    itemPrice: product.unitPrice
                };
                cartLocalList.push(newCart);
                alert("Cart Item Added");
                return;
            }
        });
    });
}
function CartPage() {
    DisplayNavbar();
    cartPage.style.display = "block";
    let cartTable = document.getElementById("carttable");
    cartTable.innerHTML = "";
    let heading = document.createElement("tr");
    heading.innerHTML = `<th>${"Product ID"}</th><th>${"Product Name"}</th>
    <th>${"Item Count"}</th><th>${"Item Price"}</th><th>${"Actions"}</th>`;
    cartTable.appendChild(heading);
    cartLocalList.forEach(cart => {
        let row = document.createElement("tr");
        row.innerHTML = `<td>${cart.productID}</td>
        <td>${cart.productName}</td><td>${cart.itemCount}</td><td>${cart.itemPrice}</td>
        <td><button onclick="EditCart('');" >Edit</button><button onclick="DeleteCart('');" >Delete</button></td>`;
        cartTable.appendChild(row);
    });
    let buyBtn = document.createElement("div");
    buyBtn.id = "buybtn";
    buyBtn.innerHTML = `<button onclick="Buy();">Buy</button>`;
    cartTable.appendChild(buyBtn);
}
function Buy() {
    return __awaiter(this, void 0, void 0, function* () {
        let productList = yield fetchProduct();
        let orderList = yield fetchOrder();
        let totalOrderPrice = 0;
        cartLocalList.forEach(cart => {
            productList.forEach(product => {
                if (cart.productID == product.productID) {
                    totalOrderPrice += cart.itemPrice;
                }
            });
        });
        if (currentLoggedInUser.balance >= totalOrderPrice) {
            cartLocalList.forEach(cart => {
                productList.forEach(product => {
                    if (cart.productID == product.productID) {
                        currentLoggedInUser.balance -= cart.itemPrice;
                        product.productQuantity -= cart.itemCount;
                        updateProduct(product.productID, product);
                    }
                });
            });
            // currentLoggedInUser.balance -= totalOrderPrice;
            updateUser(currentLoggedInUser.userID, currentLoggedInUser);
            let itemIDArray = [];
            let productIDArray = [];
            let productNameArray = [];
            let itemCountArray = [];
            let itemPriceArray = [];
            for (let i = 0; i < cartLocalList.length; i++) {
                itemIDArray[i] = cartLocalList[i].itemID;
                productIDArray[i] = cartLocalList[i].productID;
                productNameArray[i] = cartLocalList[i].productName;
                itemCountArray[i] = cartLocalList[i].itemCount;
                itemPriceArray[i] = cartLocalList[i].itemPrice;
            }
            let newOrder = {
                orderID: 0,
                userID: currentLoggedInUser.userID,
                totalPrice: totalOrderPrice,
                orderDate: new Date(),
                itemID: itemIDArray,
                productID: productIDArray,
                productName: productNameArray,
                itemCount: itemCountArray,
                itemPrice: itemPriceArray
            };
            addOrder(newOrder);
            cartLocalList = [];
            itemIDAutoIncrement = 0;
            alert("Cart Ordered Sucessfully");
        }
        else {
            let amount = totalOrderPrice - currentLoggedInUser.balance;
            alert("Insufficient Balance. To Proceed Recharge of Amount Rs." + amount);
            // RechargePage();
        }
    });
}
function OrderHistoryPage() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNavbar();
        orderHistoryPage.style.display = "block";
        orderHistoryPage.innerHTML = "";
        let orderList = yield fetchOrder();
        orderList.forEach(order => {
            if (order.userID == currentLoggedInUser.userID) {
                let orderouterdiv = document.createElement("div");
                orderouterdiv.id = "orderhistoryouterdiv";
                let header = document.createElement("div");
                header.id = "orderhistoryheader";
                header.innerHTML = `
            <div id="orderhistorycontent" >
            <div id="ohorderid"><h3>OrderID - ${order.orderID}</h3></div>
            <div id="ohuserid" ><h3>UserID - ${order.userID}</h3></div>
            <div id="ohusername" ><h3>Name - ${currentLoggedInUser.userName}</h3></div>
            <div id="exportbtn" ><button onclick="ExportToCSV('#orderhistorytable${order.orderID} tr','${order.orderID}');" >Export to CSV</button></div>
            </div>`;
                orderouterdiv.appendChild(header);
                let tableDiv = document.createElement("div");
                tableDiv.id = "orderhistorytablediv";
                let table = document.createElement("table");
                table.id = "orderhistorytable" + order.orderID;
                let tablehead = document.createElement("tr");
                tablehead.innerHTML = `<th>${"Item ID"}</th><th>${"Product Name"}</th><th>${"ItemCount"}</th><th>${"Item Price"}</th>`;
                table.appendChild(tablehead);
                for (let i = 0; i < order.itemID.length; i++) {
                    let row = document.createElement("tr");
                    row.innerHTML = `<td>${order.itemID[i]}</td><td>${order.productName[i]}</td><td>${order.itemCount[i]}</td><td>${order.itemPrice[i]}</td>`;
                    table.appendChild(row);
                }
                tableDiv.appendChild(table);
                orderouterdiv.appendChild(tableDiv);
                let footer = document.createElement("div");
                footer.id = "orderhistoryfooter";
                footer.innerHTML = `<div id="ohfootercontent" ><h3>Total Amount - Rs.${order.totalPrice}</h3></div>`;
                orderouterdiv.appendChild(footer);
                orderHistoryPage.appendChild(orderouterdiv);
            }
        });
    });
}
function DownloadCSV(csvdata, id) {
    // let CSVData:any = TableToCSV();
    let CSVFile = new Blob([csvdata], { type: "text/csv" });
    let temp_link = document.createElement("a");
    temp_link.download = "order_" + id + ".csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
}
function ExportToCSV(id, orderid) {
    // let str = id.split(" ");
    // let idno = parseInt(str[0][length-1]);
    let csvdata = [];
    let rows = document.querySelectorAll(id);
    for (let i = 0; i < rows.length; i++) {
        let cols = rows[i].querySelectorAll("td,th");
        let csvrow = [];
        for (let j = 0; j < cols.length; j++) {
            csvrow.push(cols[j].innerHTML);
        }
        csvdata += csvrow.join(",") + "\n";
    }
    // return csvdata;
    DownloadCSV(csvdata, orderid);
}
let signUpForm = document.getElementById("signupform");
let userNameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let cpasswordInput = document.getElementById("cpassword");
let userEmailInput = document.getElementById("mailID");
let userPhoneInput = document.getElementById("phonenumber");
let userImageInput = document.getElementById("profileimage");
signUpForm.addEventListener("submit", (event) => {
    var _a;
    event.preventDefault();
    const userName = userNameInput.value;
    const userPassword = passwordInput.value;
    const userConfirmPassword = cpasswordInput.value;
    const userEmail = userEmailInput.value;
    const userPhone = userPhoneInput.value;
    const file = (_a = userImageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    const reader = new FileReader();
    if (file) {
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            var _a;
            const base64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            if (userPassword == userConfirmPassword) {
                let newUser = {
                    userID: 0,
                    userName: userName,
                    userPassword: userConfirmPassword,
                    userEmail: userEmail,
                    userPhone: userPhone,
                    userImage: [base64String],
                    balance: 0
                };
                addUser(newUser);
                alert("User Added Successfully");
                LoginUserPage();
            }
        };
    }
});
function Login() {
    return __awaiter(this, void 0, void 0, function* () {
        let noExistingUserIDChecker = true;
        let loginUserName = document.getElementById("loginusername").value;
        let loginPassword = document.getElementById("loginpassword").value;
        let userList = yield fetchUser();
        userList.forEach(user => {
            if (user.userName == loginUserName && user.userPassword == loginPassword) {
                noExistingUserIDChecker = false;
                currentLoggedInUser = user;
                alert("Logged-In");
                GreetingPage();
            }
        });
        if (noExistingUserIDChecker) {
            alert("Invalid User");
            HomePage();
        }
    });
}
let productForm = document.getElementById("productform");
const productNameInput = document.getElementById("productname");
const productQuantityInput = document.getElementById("productquantity");
const unitPriceInput = document.getElementById("unitprice");
const purchaseDateInput = document.getElementById("purchasedate");
const expiryDateInput = document.getElementById("expirydate");
const productImageInput = document.getElementById("productphoto");
productForm.addEventListener("submit", (event) => {
    var _a;
    event.preventDefault();
    const productName = productNameInput.value;
    const productQuantity = parseInt(productQuantityInput.value);
    const unitPrice = parseInt(unitPriceInput.value);
    const purchaseDate = new Date(purchaseDateInput.value);
    const expiryDate = new Date(expiryDateInput.value);
    const productImage = (_a = productImageInput.files) === null || _a === void 0 ? void 0 : _a[0];
    const reader = new FileReader();
    if (productImage) {
        reader.readAsDataURL(productImage);
        reader.onload = function (event) {
            var _a;
            const productBase64String = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
            let newProduct = {
                productID: 0,
                productName: productName,
                productQuantity: productQuantity,
                unitPrice: unitPrice,
                purchaseDate: purchaseDate,
                expiryDate: expiryDate,
                productImage: [productBase64String]
            };
            addProduct(newProduct);
            alert("Product Added Successfully");
            ProductPage();
        };
    }
});
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5193/api/UserDetails", {
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
function addProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5193/api/ProductDetails", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error("Failed to add product");
        }
    });
}
function addOrder(order) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5193/api/OrderDetails", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) {
            throw new Error("Failed to add product");
        }
    });
}
function fetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5193/api/UserDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("failed to fetch user details");
        }
        return yield response.json();
    });
}
function fetchProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5193/api/ProductDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("failed to fetch product details");
        }
        return yield response.json();
    });
}
function fetchOrder() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = 'http://localhost:5193/api/OrderDetails';
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("failed to fetch product details");
        }
        return yield response.json();
    });
}
function updateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5193/api/UserDetails/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("failed to update product details");
        }
    });
}
function updateProduct(id, product) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5193/api/ProductDetails/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            throw new Error("failed to update product details");
        }
    });
}
//function to display recharge page
function RechargePage() {
    DisplayNavbar();
    rechargePage.style.display = "block";
}
//function to get amount
function GetAmount() {
    return __awaiter(this, void 0, void 0, function* () {
        let amount = parseInt(document.getElementById("rechargeamount").value);
        let userList = yield fetchUser();
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].userID == currentLoggedInUser.userID) {
                userList[i].balance += amount;
                updateUser(userList[i].userID, userList[i]);
                alert(`Recharge Successful - Balance : ${userList[i].balance}`);
                break;
            }
        }
    });
}
//function to check balance
function ShowBalance() {
    return __awaiter(this, void 0, void 0, function* () {
        DisplayNavbar();
        balanceCheckPage.style.display = "block";
        balanceCheckPage.innerHTML = "";
        let line = document.createElement("p");
        let balance = 0;
        let userList = yield fetchUser();
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].userID == currentLoggedInUser.userID) {
                balance = userList[i].balance;
                break;
            }
        }
        line.innerHTML = `Current Balance - ${balance}`;
        balanceCheckPage.appendChild(line);
    });
}
