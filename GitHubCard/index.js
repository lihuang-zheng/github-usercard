/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const cards = document.querySelector(".cards")

const username = "lihuang-zheng"
axios.get("https://api.github.com/users/" + username)
     .then(response => {
       cards.append(createCard(response.data))
     })
     .catch(() => {
       console.log("Not data found for " + username)
     })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];
axios.get("https://api.github.com/users/" + username + "/followers")
     .then(response => {
        for (followerData of response.data) {
            axios.get("https://api.github.com/users/" + followerData.login)
                 .then(response => { cards.append(createCard(response.data)); } )
                 .catch(() => { console.log("No data found for " + followerData.login); });
            followersArray.push(followerData.login);
        }
      })
      .catch(() => { console.log("No data found for " + username); });

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function createCard(data) {
  const divCard = document.createElement("div");
  divCard.classList.add("card");

  const img = createAndAppend("img", divCard, {src: data["avatar_url"]});

  const cardInfo = createAndAppend("div", divCard);

    const h3 = createAndAppend("h3", cardInfo, {textContent: data.name});
    const pUsername = createAndAppend("p", cardInfo, {class: "username", textContent: data.login});
    const pLocation = createAndAppend("p", cardInfo, {textContent: "Location: " + data.location});
    const pProfile = createAndAppend("p", cardInfo, {textContent: "Profile: "});
    const profileLink = createAndAppend("a", pProfile, {href: "https://github.com/" + data.login, textContent: "https://github.com/" + data.login});
    const pfollowers = createAndAppend("p", cardInfo, {textContent: "Followers: " + data.followers});
    const pfollowing = createAndAppend("p", cardInfo, {textContent: "Following: " + data.following});
    const pBio = createAndAppend("p", cardInfo, {textContent: "Bio: " + data.bio});
  
  return divCard;
}

function createAndAppend(element, parent, data) {
  const newElement = document.createElement(element);
  
  for (key in data) {
      if (key === "textContent") { 
        newElement.textContent = data[key]; 
      }
      else {
        newElement.setAttribute(key, data[key]); 
      }
  }

  parent.append(newElement);
  
  return newElement;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
