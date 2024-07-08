var userIDField = document.getElementById("customerID");

if (localStorage.getItem("customerID")) {
  userIDField.innerHTML = "ID: " + localStorage.getItem("customerID");
  console.log("ID Set");
} else {
  userIDField.innerHTML = "ID: N/A";
  console.log("N/A");
}

if (localStorage.getItem("clientData")) {
  var clientData = JSON.parse(localStorage.getItem("clientData"));
  formatDateFields(clientData);
  populateUserName(clientData);
  populatePastAppTable(clientData);
  addCustomerStatementLink();
}
//https://stackoverflow.com/questions/41358255/get-max-key-in-key-value-pair-in-javascript/41358399
function getMax(obj) {
  return Math.max.apply(null, Object.keys(obj));
}
function populatePastAppTable(array) {
  var tableRow = "";
  for (let i = getMax(array); i > 0; i--) {
    var owing;
    var receipt;
    //If amount is owing, add a Pay now button
    if (array[i]["DocOSAmount"] != 0) {
      owing = `<a class="btn btn-danger">Pay $${array[i]["DocOSAmount"]}</a>`;
    } else {
      owing = array[i]["DocOSAmount"];
    }
    //Determine if a Payment or a Invoice and change the receipt link.
    if (array[i]["DocNumber"].substring(0, 3) == "INV") {
      receipt = `<a class="btn invoiceButton" onClick="MyWindow=window.open('http://ccc-azure-sql/ReportServer/Pages/ReportViewer.aspx?/Custom%20Reports/Sales/Demo/Invoice%20-%20Individual&selectedInvoice=${array[i]["DocNumber"]}&rc:Parameters=Collapsed','MyWindow','width=1000,height=1000'); return false;">Invoice Receipt</a>`;
    } else {
      receipt = `<a class="btn paymentButton" onClick="MyWindow=window.open('http://ccc-azure-sql/ReportServer/Pages/ReportViewer.aspx?/Custom%20Reports/Sales/Demo/Receipt%20-%20Individual&PaymentNumber=${array[i]["DocNumber"]}&rc:Parameters=Collapsed','MyWindow','width=1000,height=1000'); return false;">Payment Receipt</a>`;
    }
    tableRow =
      `<tr>
  <th scope="row">${array[i]["DocDate"]}</th>
  <td>${array[i]["LastPmtDate"]}</td>
  <td>${array[i]["CounsellorName"]}</td>
  <td>$${array[i]["DocAmount"]}</td>
  <td>${owing}</td>
  <td>${array[i]["DocNumber"]}</td>
  <td>${receipt}</td>
</tr>` + tableRow;
  }
  document.getElementById("pastAppTable").innerHTML = tableRow;
}

function populateUserName(array) {
  let userName = array[0]["CustomerName"];
  document.getElementById("navUserTag").innerHTML = userName;
}

function addCustomerStatementLink() {
  let clientID = localStorage.getItem("customerID");
  let buttonString = `<button
  class="btn btn-success mt-2 customerStatementBtn"
  onClick="MyWindow=window.open('http://ccc-azure-sql/ReportServer/Pages/ReportViewer.aspx?/Custom%20Reports/Sales/Demo/Customer%20Statement&CustNum=${clientID}&rc:Parameters=Collapsed','MyWindow','width=1000,height=1000'); return false;"
>
  View Customer Statement
</button>`;
  document.getElementById("statementButton").innerHTML = buttonString;
}

function formatDateFields(array) {
  for (var trx in clientData) {
    //console.log(clientData[trx]["DocDate"]);
    clientData[trx]["DocDate"] = new Date(
      clientData[trx]["DocDate"].split("T")[0]
    ).toLocaleDateString("en-US");
    clientData[trx]["LastPmtDate"] = new Date(
      clientData[trx]["LastPmtDate"].split("T")[0]
    ).toLocaleDateString("en-US");
    //console.log(clientData[trx]["DocDate"]);
  }
  clientData.sort(function (a, b) {
    return new Date(b.DocDate) - new Date(a.DocDate);
  });
  console.log(clientData);
}
