import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js" 
//import the initialize function from the Firebase mother website
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
//import many more important function from mother website


const appSettings = {
    databaseURL: "https://playground-b2eae-default-rtdb.firebaseio.com/"
} // the Database of your app

const app = initializeApp(appSettings) // initialize our app with initialize function that has the argument contain the link of our firebase project
const database = getDatabase(app) // get database from our app
const shoppingListDB = ref(database, "shoppingList")// what kinda database are we referencing, in this case we name it ShoppingList, thats what appears of firebase

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingList= document.getElementById("shopping-list") // connects js to html 


addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
   
    push(shoppingListDB,inputValue)  // when button clicked, we push whatever from the input field into the firebase database
    
    clearField()
    
})

onValue(shoppingListDB, function(snapshot) { // this functions run whenever there are changes to the database
    
    if(snapshot.exists()){ // make it so this function only runs when snapshot exists, otherwise it causes errors

   
        let shoppingItems = Object.entries(snapshot.val()) // this array contains both keys and values

        clearShoppingList() // clears the list, without this line, the for loop will run and duplicate all things in the database
        
        for (let i = 0; i <shoppingItems.length; i++){
            let shoppingIDandVal = shoppingItems[i]
            pushValuetoPage(shoppingIDandVal)
        }

    } else{
        shoppingList.innerHTML ="Cart is empty!"
    }
    
})

const clearShoppingList = () => {shoppingList.innerHTML = ""} 
const clearField = () =>  inputFieldEl.value = ""

const pushValuetoPage = (input) => { // append the list to the ul
    let itemkey = input[0]
    let itemValue = input[1]

    let listItem = document.createElement("li")
    listItem.textContent = itemValue
    shoppingList.append(listItem)

    listItem.addEventListener("click", function(){
        // find the exact location of that item by its key, inside of shoppingList
        let exactLocationOfShopIteminDB = ref(database, `shoppingList/${itemkey}`) 
            
        remove(exactLocationOfShopIteminDB)

    })

}


