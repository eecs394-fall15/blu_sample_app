angular
	.module('card')
	.controller('IndexController', function($scope, supersonic) {

		var init = function() {
			var list = document.getElementById("list");

			var CardsObject = Parse.Object.extend("howzitData");
			var query = new Parse.Query(CardsObject);
			query.descending("createdAt").find( {
				success: function (results) { // Find all values in database and stuff into results. Results will be in descending order by creation date.
					var today = new Date();
					var yesterday = addDays(new Date(), -1);
					var lastDate = [0, 0, 0];
					for (var i = 0; i < results.length; i++) { // Go through all rows in database.
						var date = getDateInfo(new Date(results[i].createdAt)); // Get creation date of current row and store as [yyyy, monthName, d?d].
						if(!areDatesEqual(date, lastDate)) { // Compare with previously stored date. If different...
							var dateString =
											areDatesEqual(date, getDateInfo(today)) ?
												"Today" :
											areDatesEqual(date, getDateInfo(yesterday)) ?
												"Yesterday" :
												date[1] + " " + date[2] + ", " + date[0];
							list.appendChild(CreateListHeader(dateString)); // ...create a list header with either the date, or "today"/"yesterday" strings.
							lastDate = date; // ...and update the previously stored date variable
						}
						// Append row as list element
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
