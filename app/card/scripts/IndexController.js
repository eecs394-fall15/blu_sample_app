angular
	.module('card')
	.controller('IndexController', function($scope, supersonic) {

		$scope.allCards = undefined; // This variable will store ALL the cards, so we can now search with Angular.

		var init = function() {
			var CardsObject = Parse.Object.extend("howzitData");
			var query = new Parse.Query(CardsObject);
			query.descending("createdAt").find( {
				success: function (results) { // Find all values in database and stuff into results. Results will be in descending order by creation date.
					document.getElementById("searchText").value = "";
					$scope.allCards = results; // Stuff the results in our global, for future searching.
					GenerateList(results);
				},
				error: function (error) {
						alert("Error in IndexController: " + error.code + " " + error.message);
				}
			});
		};

		supersonic.ui.views.current.whenVisible( function() {
    		init();
		});

		function GenerateList(results) {
			var list = document.createElement("ul");

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
				list.appendChild(CreateListElement(results[i].id, results[i].get("name"), results[i].get("company"), results[i].get("email"), results[i].get("dataURLFront"),
													[results[i].get("sentEmail"), results[i].get("applied"), results[i].get("referred"), results[i].get("meeting")]));
			}
			// Once it's done, overwrite the page's contents.
			// Note how this is done at the end, to avoid getting a blank screen while the data loads.
			document.getElementById("list").innerHTML = list.innerHTML;
		}

		// <div class="item item-divider">
		//	 {{ content }}
		// </div>
		function CreateListHeader(content) {
			var header = document.createElement("div");
			header.setAttribute("class", "item item-divider");
			header.innerHTML = content;
			return header;
		}

		// <super-navigate location="card#view?id=ID">
		//  <div class="item item-thumbnail-left">
		//    <img src="/images/DATAURLFRONT">
		//    <span class="item-note">
		//      <i class="super-email" id="sentEmail"></i>
		//      <br />
		//      <i class="super-upload" id="applied"></i>
		//      <br />
		//      <i class="super-happy" id="referred"></i>
		//      <br />
		//      <i class="super-android-contacts" id="meeting"></i>
		//    </span>
		//    <h2>NAME</h2>
		//    <p>COMPANY</p>
		//    <p>EMAIL</p>
		//  </div>
		// </super-navigate>
		var CreateListElement = function(objectId, name, company, email, dataURLFront, badges) { // badges is an array of 4 bools
			var navigate = document.createElement("super-navigate");
			navigate.setAttribute("location", "card#view?id=" + objectId);

			var listElement = document.createElement("div");
			listElement.setAttribute("class", "item item-thumbnail-left");

			var image = document.createElement("img");
			image.src = dataURLFront || "/images/default.jpg";

			var iconSpan = document.createElement("span");
			iconSpan.setAttribute("class", "item-note");
			var emailIcon = document.createElement("i");
			var appliedIcon = document.createElement("i");
			var referredIcon = document.createElement("i");
			var meetingIcon = document.createElement("i");
			emailIcon.setAttribute("class", "super-email");
			appliedIcon.setAttribute("class", "super-upload");
			referredIcon.setAttribute("class", "super-happy");
			meetingIcon.setAttribute("class", "super-android-contacts");
			emailIcon.id = "sentEmail";
			appliedIcon.id = "applied";
			referredIcon.id = "referred";
			meetingIcon.id = "meeting";
			emailIcon.style.color = badges[0] ? "#4987EE" : "#EEEEEE"; // blue or gray
			appliedIcon.style.color = badges[1] ? "#66CC33" : "#EEEEEE"; // green or gray
			referredIcon.style.color = badges[2] ? "#FFB800" : "#EEEEEE"; // yellow or gray
			meetingIcon.style.color = badges[3] ? "#8A6DE9" : "#EEEEEE"; // purple or gray
			iconSpan.appendChild(emailIcon);
			iconSpan.appendChild(document.createElement("br"));
			iconSpan.appendChild(appliedIcon);
			iconSpan.appendChild(document.createElement("br"));
			iconSpan.appendChild(referredIcon);
			iconSpan.appendChild(document.createElement("br"));
			iconSpan.appendChild(meetingIcon);

			var h2Name = document.createElement("h2");
			h2Name.innerHTML = name;

			var pName = document.createElement("p");
			pName.innerHTML = company || "";

			var pEmail = document.createElement("p");
			pEmail.innerHTML = email || "";

			listElement.appendChild(image);
			listElement.appendChild(iconSpan);
			listElement.appendChild(h2Name);
			listElement.appendChild(pName);
			listElement.appendChild(pEmail);
			navigate.appendChild(listElement);

			return navigate;
		}

		var searchBoxIsHidden = true;
		$scope.OnSearchClick = function() { // User clicks on the magnifying glass icon
			// Toggle visibility
			if(searchBoxIsHidden) {
				$( "#searchBox" ).slideDown("medium");
			}
			else {
				$( "#searchBox" ).slideUp("medium");
			}
			searchBoxIsHidden = !searchBoxIsHidden;

			// Clear inputted text and refresh list of cards
			$scope.Clear();
		}

		$scope.Search = function() {
			// Get the text from the search box
			var text = document.getElementById("searchText").value.toLowerCase();

			var results = [];
			for(var i = 0; i < $scope.allCards.length; i++) {
				if(SearchMatch($scope.allCards[i], text)) {
					results.push($scope.allCards[i]);
				}
			}

			GenerateList(results);
		}

		function SearchMatch(card, text) {
			// Make an array of the words typed in the search box (remove extra and trailing spaces)
			var searchBoxWords = text.replace(/  +/, " ").replace(/ +$/, "").split(" ");
			// Make an array of the words saved in the searchData column (remove extra and trailing spaces)
			var databaseWords = card.get("searchData").replace(/ +$/, "").replace(/  +/, " ").split(" ");

			for(var searchBoxWordNo = 0; searchBoxWordNo < searchBoxWords.length; searchBoxWordNo++) {
				for(var databaseWordNo = 0; databaseWordNo < databaseWords.length; databaseWordNo++) {
					if(databaseWords[databaseWordNo].contains(searchBoxWords[searchBoxWordNo])) {
						return true;
					}
				}
			}
			return false;
		}

		$scope.Clear = function() {
			document.getElementById("searchText").value = "";
			GenerateList($scope.allCards);
		}

	});
