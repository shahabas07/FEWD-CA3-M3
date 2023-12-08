// Calling fetch functions
fetchRandomMeal();

// Fetch API for Random Meal
function fetchRandomMeal() {
  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then((response) => response.json())
    .then((data) => displayMeal(data.meals[0]));
}

// Displaying Random Dish to User
function displayMeal(meal) {
  const random = document.getElementById("random");
  random.innerHTML = `
    <div>
      <img src="${meal.strMealThumb}" onclick="displayIngredients('(${meal.idMeal})')">
      <h3 onclick="displayIngredients('(${meal.idMeal})')" >${meal.strMeal}</h3>
    </div>`;
}

// Fetching Ingredients of dish
function displayIngredients(mealId) {
  changingVisibility();
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const ingredients = getIngredientsList(data.meals[0]);
      showModal(ingredients);
    });
}

// Getting Ingredients
function getIngredientsList(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && measure) {
      ingredients.push(`${measure} ${ingredient}`);
    } else {
      break;
    }
  }
  return ingredients;
}

// Show modal
function showModal(ingredients) {
  const modal = document.getElementById("modal");
  const ingredientList = document.getElementById("modal");
  ingredientList.innerHTML = ingredients
    .map((ingredient) => `<p>${ingredient}<p>`)
    .join("");
  modal.style.display = "block";
}

// Show/Hide elements for modal
function changingVisibility() {
  const button = document.getElementById('on');
  const button2 = document.getElementById("closebutton");
  const container21 = document.getElementById("container21");
  
  button.style.display = 'block';
  button2.style.display = "block";
  container21.style.display = "block";
}

// Close Modal
function closeModal() {
  const modal = document.getElementById("modal");
  const h2ingredient = document.getElementById("on");
  const closebutton = document.getElementById("closebutton");
  const container21 = document.getElementById("container21");

  closebutton.style.display = 'none';
  modal.style.display = 'none';
  h2ingredient.style.display = 'none';
  container21.style.display = "none";
}

// ----------------------------------------

// Taking value from the text-box to search
function getValue() {
  var category = document.getElementById("search").value || "beef";
  fetchCategory();

  // Fetching Searched Category
  function fetchCategory() {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => displayCategory(data.meals));
  }

// Displaying Fetched Category
function displayCategory(meals) {
  const categories = document.getElementById("categoriesdisplay");

  // Check if meals is not null
  if (meals) {
    const mealList = meals
      .map(
        (meal) => `<div class="griditem" onclick="changingVisibility()" >
          <img onclick="displayIngredients('(${meal.idMeal})')" src="${meal.strMealThumb}">
          <p onclick="displayIngredients('(${meal.idMeal})')">${meal.strMeal}</p>
        </div>`
      )
      .join("");

    categories.innerHTML = `<h2>${category} </h2>
      <div>${mealList}</div>`;
  } else {
    // Handle the case where meals is null (no data retrieved)
    categories.innerHTML = `<h2>No data available for ${category}</h2>`;
  }
}
}

// Open Credits
function openCredits() {
  var credits = document.getElementById("credits");
  credits.style.display = "block";
}

// Close All
function closeall() {
  var credit = document.getElementById("credits");
  credit.style.display = "none";
  var contact = document.getElementById("contact");
  contact.style.display = "none";
}
  
function opencontact(){
  var contact = document.getElementById("contact");
  contact.style.display = "block";
}