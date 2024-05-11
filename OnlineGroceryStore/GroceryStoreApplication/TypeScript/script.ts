let currentLoggedInUser:UserDetails;
let currentOrder: OrderDetails;
let itemIDAutoIncrement:number = 0;

interface UserDetails
{
    userID:any;
    userName:string;
    userPassword:string;
    userEmail:string;
    userPhone:string;
    userImage:string[];
    balance:number;
}
interface ProductDetails
{
    productID:any;
    productName:string;
    productQuantity:number;
    unitPrice:number;
    purchaseDate:Date;
    expiryDate:Date;
    productImage:string[];
}

interface CartDetails
{
    itemID:number;
    productID:number;
    productName:string;
    itemCount:number;
    itemPrice:number;

}
interface OrderDetails
{
    orderID:any;
    userID:number;
    totalPrice:number;
    orderDate:Date;
    itemID:number[];
    productID:number[];
    productName:string[];
    itemCount:number[];
    itemPrice:number[];
    
}

let cartLocalList:Array<CartDetails> = new Array<CartDetails>();

let homePage = document.getElementById("homepage") as HTMLDivElement;
let newUserPage = document.getElementById("newuserpage") as HTMLDivElement;
let loginUserPage = document.getElementById("loginuserpage") as HTMLDivElement;
let navbar = document.getElementById("navbardiv") as HTMLDivElement;
let greetingPage = document.getElementById("greetingpage") as HTMLDivElement;
let productPage = document.getElementById("productpage") as HTMLDivElement;
let productFormDiv = document.getElementById("productformdiv") as HTMLDivElement;
let purchasePage = document.getElementById("purchasepage") as HTMLDivElement;
let showCardDiv = document.getElementById("showcarddiv") as HTMLDivElement;
let cartPage = document.getElementById("cartpage") as HTMLDivElement;
let orderHistoryPage = document.getElementById("orderhistorypage") as HTMLDivElement;
let rechargePage = document.getElementById("rechargepage") as HTMLDivElement;
let balanceCheckPage = document.getElementById("balancecheckpage") as HTMLDivElement;

function DisplayNone()
{
    homePage.style.display="none";
    newUserPage.style.display="none";
    loginUserPage.style.display="none";
    navbar.style.display="none";
    greetingPage.style.display="none";
    productPage.style.display="none";
    productFormDiv.style.display="none";
    purchasePage.style.display="none";
    showCardDiv.style.display="none";
    cartPage.style.display="none";
    orderHistoryPage.style.display="none";
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
    homePage.style.display="block";
    newUserPage.style.display="block";
}

function LoginUserPage()
{
    DisplayNone();
    homePage.style.display="block";
    loginUserPage.style.display="block";
}

function DisplayNavbar()
{
    DisplayNone();
    navbar.style.display="block";
}

function GreetingPage()
{
    DisplayNavbar();
    greetingPage.style.display="block";

    let contentDiv = document.getElementById("homecontent") as HTMLDivElement;
    contentDiv.innerHTML="";
    let content = document.createElement("h1");
    content.innerHTML=`Welcome ${currentLoggedInUser.userName}`;
    contentDiv.appendChild(content);
    let image = document.createElement("img");
    image.src=`${currentLoggedInUser.userImage}`;
    image.id="userprofileimage";
    contentDiv.appendChild(image);
}

async function ProductPage()
{
    DisplayNavbar();
    productPage.style.display="block";

    let productTable = document.getElementById("producttable") as HTMLTableElement;
    productTable.innerHTML = "";
    let heading = document.createElement("tr");
    heading.innerHTML=`<td>${"ProductName"}</td>
    <td>${"Product Quantity"}</td>
    <td>${"Unit Price"}</td>
    <td>${"Purchase Date"}</td>
    <td>${"Expiry Date"}</td>
    <td>${"Product Image"}</td>
    <td>${"Actions"}</td>`;
    productTable.appendChild(heading);
    let productList = await fetchProduct();

    productList.forEach(product => {
        let row = document.createElement("tr");
        row.innerHTML=`<td>${product.productName}</td>
        <td>${product.productQuantity}</td>
        <td>${product.unitPrice}</td>
        <td>${product.purchaseDate}</td>
        <td>${product.expiryDate}</td>
        <td><img src="${product.productImage}" /></td>
        <td><button onclick="EditProduct('${product.productID}');" >EDIT</button><button onclick="DeleteProduct('${product.productID}');" >DELETE</button></td>`;

        productTable.appendChild(row);
    });
}

function DisplayProductForm()
{
    productFormDiv.style.display="block";
}

async function PurchasePage()
{
    DisplayNavbar();
    purchasePage.style.display="block";
    showCardDiv.style.display="flex";
    showCardDiv.innerHTML="";

    let productList = await fetchProduct();

    productList.forEach(product => {
        let card = document.createElement("div");
        card.className="carddiv";
        card.innerHTML=`<div class="imagediv" ><img src="${product.productImage}" class="productimage" /></div>
        <div class="descriptiondiv" >
        <div class="productnamediv" ><h2>${product.productName}</h2></div>
        <div class="productpricediv" ><h4>${"PRICE - RS."}${product.unitPrice}</h4></div>
        <div class="addcartbtndiv" ><button class="addcartbtn" onclick="AddToCart('${product.productID}');" >Add to Cart</button></div>
        </div>`;
        showCardDiv.appendChild(card);
    });

}

async function AddToCart(productID:number)
{
        let productList = await fetchProduct();
        itemIDAutoIncrement++;
        productList.forEach(product => {
            if(product.productID == productID)
            {
                let newCart:CartDetails = {
                    itemID: itemIDAutoIncrement,
                    productID: product.productID,
                    productName: product.productName,
                    itemCount: 1,
                    itemPrice: product.unitPrice
                }
                cartLocalList.push(newCart);
                alert("Cart Item Added");
                return;
            }
        });   
}

function CartPage()
{
    DisplayNavbar();
    cartPage.style.display="block";

    let cartTable = document.getElementById("carttable") as HTMLTableElement;
    cartTable.innerHTML="";

    let heading = document.createElement("tr");
    heading.innerHTML=`<th>${"Product ID"}</th><th>${"Product Name"}</th>
    <th>${"Item Count"}</th><th>${"Item Price"}</th><th>${"Actions"}</th>`;

    cartTable.appendChild(heading);

    cartLocalList.forEach(cart => {

        let row = document.createElement("tr");
        row.innerHTML=`<td>${cart.productID}</td>
        <td>${cart.productName}</td><td>${cart.itemCount}</td><td>${cart.itemPrice}</td>
        <td><button onclick="EditCart('');" >Edit</button><button onclick="DeleteCart('');" >Delete</button></td>`;
        cartTable.appendChild(row);
    });

    let buyBtn = document.createElement("div");
    buyBtn.id="buybtn";
    buyBtn.innerHTML=`<button onclick="Buy();">Buy</button>`;
    cartTable.appendChild(buyBtn);
}

async function Buy()
{
    let productList = await fetchProduct();
    let orderList = await fetchOrder();
    let totalOrderPrice:number = 0;
    cartLocalList.forEach(cart => {
        productList.forEach(product => {
            if(cart.productID == product.productID)
            {
                totalOrderPrice += cart.itemPrice;
            }
        });
    });
    if(currentLoggedInUser.balance >= totalOrderPrice)
    {
        cartLocalList.forEach(cart => {
            productList.forEach(product => {
                if(cart.productID == product.productID)
                {
                    currentLoggedInUser.balance -= cart.itemPrice;
                    product.productQuantity -= cart.itemCount;
                    updateProduct(product.productID,product);  
                }
            });
        });
        // currentLoggedInUser.balance -= totalOrderPrice;
        updateUser(currentLoggedInUser.userID,currentLoggedInUser);

        let itemIDArray:number[]= [];
        let productIDArray:number[] = [];
        let productNameArray:string[] = [];
        let itemCountArray: number[] = [];
        let itemPriceArray: number[] = [];
        for(let i=0; i<cartLocalList.length; i++)
        {
            itemIDArray[i] = cartLocalList[i].itemID;
            productIDArray[i] = cartLocalList[i].productID;
            productNameArray[i] = cartLocalList[i].productName;
            itemCountArray[i] = cartLocalList[i].itemCount;
            itemPriceArray[i] = cartLocalList[i].itemPrice;
        }
        let newOrder:OrderDetails = {

            orderID:0,
            userID: currentLoggedInUser.userID,
            totalPrice: totalOrderPrice,
            orderDate: new Date(),
            itemID: itemIDArray,
            productID: productIDArray,
            productName: productNameArray,
            itemCount: itemCountArray,
            itemPrice: itemPriceArray
        }
        addOrder(newOrder);
        cartLocalList = [];
        itemIDAutoIncrement = 0;
        alert("Cart Ordered Sucessfully");
    }
    else
    {
        let amount:number = totalOrderPrice - currentLoggedInUser.balance;
        alert("Insufficient Balance. To Proceed Recharge of Amount Rs." + amount);
        // RechargePage();
    }

}

async function OrderHistoryPage()
{
    DisplayNavbar();
    orderHistoryPage.style.display="block";

    orderHistoryPage.innerHTML="";
    let orderList = await fetchOrder();
   
    orderList.forEach(order => {

        if(order.userID == currentLoggedInUser.userID)
        {
            let orderouterdiv = document.createElement("div");
            orderouterdiv.id = "orderhistoryouterdiv";

            let header = document.createElement("div");
            header.id="orderhistoryheader";
            header.innerHTML=`
            <div id="orderhistorycontent" >
            <div id="ohorderid"><h3>OrderID - ${order.orderID}</h3></div>
            <div id="ohuserid" ><h3>UserID - ${order.userID}</h3></div>
            <div id="ohusername" ><h3>Name - ${currentLoggedInUser.userName}</h3></div>
            <div id="exportbtn" ><button onclick="ExportToCSV('#orderhistorytable${order.orderID} tr','${order.orderID}');" >Export to CSV</button></div>
            </div>`;

            orderouterdiv.appendChild(header);
            
            let tableDiv = document.createElement("div");
            tableDiv.id="orderhistorytablediv";

            let table = document.createElement("table");
            table.id="orderhistorytable"+order.orderID;

            let tablehead = document.createElement("tr");
            tablehead.innerHTML=`<th>${"Item ID"}</th><th>${"Product Name"}</th><th>${"ItemCount"}</th><th>${"Item Price"}</th>`;
            table.appendChild(tablehead);

            for(let i=0; i<order.itemID.length; i++){

                let row = document.createElement("tr");
                row.innerHTML=`<td>${order.itemID[i]}</td><td>${order.productName[i]}</td><td>${order.itemCount[i]}</td><td>${order.itemPrice[i]}</td>`;
                table.appendChild(row);
    
            }

            tableDiv.appendChild(table);
            orderouterdiv.appendChild(tableDiv);

            let footer = document.createElement("div");
            footer.id="orderhistoryfooter";

            footer.innerHTML=`<div id="ohfootercontent" ><h3>Total Amount - Rs.${order.totalPrice}</h3></div>`;
            orderouterdiv.appendChild(footer);
            orderHistoryPage.appendChild(orderouterdiv);

        }
    
    });

}

function DownloadCSV(csvdata:any,id:number)
{   
    // let CSVData:any = TableToCSV();
    let CSVFile = new Blob([csvdata],{type: "text/csv"});
    let temp_link = document.createElement("a");
    temp_link.download = "order_"+id+".csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display="none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
}

function ExportToCSV(id:string,orderid:number)
{
    // let str = id.split(" ");
    // let idno = parseInt(str[0][length-1]);
    let csvdata : any= [];
    let rows = document.querySelectorAll(id);
    for(let i=0; i<rows.length; i++)
    {

        let cols = rows[i].querySelectorAll("td,th");
        let csvrow :any = [];
        for(let j=0; j<cols.length; j++)
        {
            csvrow.push(cols[j].innerHTML);
        }
        csvdata += csvrow.join(",")+"\n";
    }
    // return csvdata;
    DownloadCSV(csvdata,orderid);
}


let signUpForm = document.getElementById("signupform") as HTMLFormElement;
let userNameInput = document.getElementById("username") as HTMLInputElement;
let passwordInput = document.getElementById("password") as HTMLInputElement;
let cpasswordInput = document.getElementById("cpassword") as HTMLInputElement;
let userEmailInput = document.getElementById("mailID") as HTMLInputElement;
let userPhoneInput = document.getElementById("phonenumber") as HTMLInputElement;
let userImageInput = document.getElementById("profileimage") as HTMLInputElement;

signUpForm.addEventListener("submit", (event) => {
    
    event.preventDefault();
    const userName = userNameInput.value;
    const userPassword = passwordInput.value;
    const userConfirmPassword = cpasswordInput.value;
    const userEmail = userEmailInput.value;
    const userPhone = userPhoneInput.value;
    const file = userImageInput.files?.[0];
    const reader = new FileReader();

    if(file)
    {
        reader.readAsDataURL(file);
        reader.onload = function(event)
        {
            const base64String = event.target?.result as string;

            if(userPassword == userConfirmPassword)
            {
                let newUser:UserDetails = {
                    userID:0,
                    userName:userName,
                    userPassword:userConfirmPassword,
                    userEmail:userEmail,
                    userPhone:userPhone,
                    userImage:[base64String],
                    balance:0
                };
                addUser(newUser);
                alert("User Added Successfully");
                LoginUserPage();
            }
        }
    }
});

async function Login()
{
    let noExistingUserIDChecker:boolean = true;
    let loginUserName = (document.getElementById("loginusername") as HTMLInputElement).value;
    let loginPassword = (document.getElementById("loginpassword") as HTMLInputElement).value;

    let userList = await fetchUser();
    userList.forEach(user => {
        if(user.userName == loginUserName && user.userPassword == loginPassword)
        {
            noExistingUserIDChecker = false;
            currentLoggedInUser = user;
            alert("Logged-In");
            GreetingPage();
        }
    });
    if(noExistingUserIDChecker)
    {
        alert("Invalid User");
        HomePage();
    }
}

let productForm = document.getElementById("productform") as HTMLFormElement;
const productNameInput = document.getElementById("productname") as HTMLInputElement;
const productQuantityInput = document.getElementById("productquantity") as HTMLInputElement;
const unitPriceInput = document.getElementById("unitprice") as HTMLInputElement;
const purchaseDateInput = document.getElementById("purchasedate") as HTMLInputElement;
const expiryDateInput = document.getElementById("expirydate") as HTMLInputElement;
const productImageInput = document.getElementById("productphoto") as HTMLInputElement;

productForm.addEventListener("submit", (event) => {

    event.preventDefault();
    const productName = productNameInput.value;
    const productQuantity = parseInt(productQuantityInput.value);
    const unitPrice = parseInt(unitPriceInput.value);
    const purchaseDate = new Date(purchaseDateInput.value);
    const expiryDate = new Date(expiryDateInput.value);
    const productImage = productImageInput.files?.[0];
    const reader = new FileReader();

    if(productImage)
    {
        reader.readAsDataURL(productImage);
        reader.onload = function(event){

            const productBase64String = event.target?.result as string;

            let newProduct:ProductDetails = {
                productID:0,
                productName:productName,
                productQuantity:productQuantity,
                unitPrice: unitPrice,
                purchaseDate: purchaseDate,
                expiryDate: expiryDate,
                productImage: [productBase64String]
            }
            addProduct(newProduct);
            alert("Product Added Successfully");
            ProductPage();
        }
    }


});

async function addUser(user:UserDetails):Promise<void> {
    const response = await fetch("http://localhost:5193/api/UserDetails",{
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

async function addProduct(product:ProductDetails):Promise<void> {
    const response = await fetch("http://localhost:5193/api/ProductDetails",{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(product)
    });
    if(!response.ok)
    {
        throw new Error("Failed to add product");
    }
}

async function addOrder(order:OrderDetails):Promise<void> {
    const response = await fetch("http://localhost:5193/api/OrderDetails",{
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(order)
    });
    if(!response.ok)
    {
        throw new Error("Failed to add product");
    }
}

async function fetchUser():Promise<UserDetails[]> {
    const apiUrl = 'http://localhost:5193/api/UserDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("failed to fetch user details");
    }
    return await response.json();
}

async function fetchProduct():Promise<ProductDetails[]> {
    const apiUrl = 'http://localhost:5193/api/ProductDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("failed to fetch product details");
    }
    return await response.json();
}

async function fetchOrder():Promise<OrderDetails[]> {
    const apiUrl = 'http://localhost:5193/api/OrderDetails';
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("failed to fetch product details");
    }
    return await response.json();
}

async function updateUser(id:any, user:UserDetails): Promise<void> {
    const response = await fetch(`http://localhost:5193/api/UserDetails/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error("failed to update product details");
    }
}

async function updateProduct(id:any, product:ProductDetails): Promise<void> {
    const response = await fetch(`http://localhost:5193/api/ProductDetails/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(product)
    });
    if(!response.ok)
    {
        throw new Error("failed to update product details");
    }
}

//function to display recharge page
function RechargePage()
{
    DisplayNavbar();
    rechargePage.style.display="block";
}

//function to get amount
async function GetAmount()
{
    let amount:number =parseInt((document.getElementById("rechargeamount") as HTMLInputElement).value);
    let userList = await fetchUser();
    for(let i=0; i<userList.length; i++)
    {
        if(userList[i].userID == currentLoggedInUser.userID)
        {
            userList[i].balance += amount;
            updateUser(userList[i].userID,userList[i]);
            alert(`Recharge Successful - Balance : ${userList[i].balance}` );
            break;
        }
    }
}

//function to check balance
async function ShowBalance()
{
    DisplayNavbar();
    balanceCheckPage.style.display="block";
    balanceCheckPage.innerHTML="";

    let line = document.createElement("p");
    let balance:number = 0;
    
    let userList = await fetchUser();
    for(let i=0; i<userList.length; i++)
    {
        if(userList[i].userID == currentLoggedInUser.userID)
        {
            balance = userList[i].balance;
            break;
        }
    }
    line.innerHTML=`Current Balance - ${balance}`;
    balanceCheckPage.appendChild(line);
}