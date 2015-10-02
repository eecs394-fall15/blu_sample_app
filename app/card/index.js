angular.module('card', [
  /* Declare any module-specific dependencies here */
  'common'
]);

supersonic.ui.tabs.hide();

function ReferencePath(name, image) {
  return name == undefined ? "/images/" + image + ".jpg" : name;
}

function GetDateId() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; // Jan = 0
  var yyyy = today.getFullYear();
  
  // Append '0' to start if less than 10
  dd = dd<10 ? "0"+dd : dd;
  mm = mm<10 ? "0"+mm : mm;
  
  return yyyy + mm + dd;
}

// Taken from http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

// <div class="item item-divider">
//   {{ content }}
// </div>
function CreateListHeader(content) {
  var header = document.createElement("div");
  header.setAttribute("class", "item item-divider");
  header.innerHTML = content;
  return header;
}

// <a class="item item-thumbnail-left" href="#" id="Sample ObjectId">
//  <img src="#">
//  <h2>Sample Name</h2>
//  <p>Sample Company</p>
//  <p>Sample Email</p>
// </a>
function CreateListElement(objectId, name, company, email, dataURL) {
  var navigate = document.createElement("super-navigate");
  navigate.setAttribute("location", "card#view?id=" + objectId);

  var listElement = document.createElement("div");
  listElement.setAttribute("class", "item item-thumbnail-left");

  var image = document.createElement("img");
  image.src = dataURL || "/images/default.jpg";

  var h2Name = document.createElement("h2");
  h2Name.innerHTML = name;

  var pName = document.createElement("p");
  pName.innerHTML = company || "";

  var pEmail = document.createElement("p");
  pEmail.innerHTML = email || "";

  listElement.appendChild(image);
  listElement.appendChild(h2Name);
  listElement.appendChild(pName);
  listElement.appendChild(pEmail);
  navigate.appendChild(listElement);

  return navigate;
}

function init() {
  var list = document.getElementById("list");
  list.appendChild(CreateListHeader("Test Header"));

  var CardsObject = Parse.Object.extend("howzitData");
  var query = new Parse.Query(CardsObject);
  query.find({
    success: function (results) {
        for (var i = 0; i < results.length; i++) {
            list.appendChild(CreateListElement(results[i].id, results[i].get("name"), results[i].get("company"), results[i].get("email"), results[i].get("dataURL")));
        }
    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }
  });
}