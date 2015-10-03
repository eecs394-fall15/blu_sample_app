angular
	.module('card')
	.controller('IndexController', function($scope, supersonic) {

		var init = function() {
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
		};

		// <div class="item item-divider">
		//	 {{ content }}
		// </div>
		function CreateListHeader(content) {
			var header = document.createElement("div");
			header.setAttribute("class", "item item-divider");
			header.innerHTML = content;
			return header;
		}

		// <a class="item item-thumbnail-left" href="#" id="Sample ObjectId">
		//	<img src="#">
		//	<h2>Sample Name</h2>
		//	<p>Sample Company</p>
		//	<p>Sample Email</p>
		// </a>
		var CreateListElement = function(objectId, name, company, email, dataURL) {
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

		init(); // Calls the above functions upon starting.	

	});
