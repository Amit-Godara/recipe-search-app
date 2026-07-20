// TheMealDB free public API (no signup / API key required for the test key "1")
const API_BASE = "https://www.themealdb.com/api/json/v1/1";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const results = document.getElementById("results");
const statusMessage = document.getElementById("status-message");
const modalOverlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;
  await searchRecipes(query);
});

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

async function searchRecipes(query) {
  results.innerHTML = "";
  setStatus(`Searching for "${query}"...`);

  try {
    // Search by recipe name
    const nameRes = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(query)}`);
    const nameData = await nameRes.json();
    let meals = nameData.meals;

    // If no name match, fall back to searching by main ingredient
    if (!meals) {
      const ingRes = await fetch(`${API_BASE}/filter.php?i=${encodeURIComponent(query)}`);
      const ingData = await ingRes.json();
      meals = ingData.meals;
    }

    if (!meals) {
      setStatus(`No recipes found for "${query}". Try another search.`, true);
      return;
    }

    setStatus(`Found ${meals.length} recipe${meals.length === 1 ? "" : "s"} for "${query}"`);
    renderResults(meals);
  } catch (err) {
    setStatus("Something went wrong while fetching recipes. Please try again.", true);
    console.error(err);
  }
}

function renderResults(meals) {
  results.innerHTML = "";
  meals.forEach((meal) => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy" />
      <div class="recipe-card-body">
        <h3>${meal.strMeal}</h3>
        ${meal.strCategory ? `<span>${meal.strCategory}</span>` : ""}
      </div>
    `;
    card.addEventListener("click", () => openRecipe(meal.idMeal));
    results.appendChild(card);
  });
}

async function openRecipe(id) {
  try {
    const res = await fetch(`${API_BASE}/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];
    renderModal(meal);
  } catch (err) {
    console.error(err);
  }
}

function renderModal(meal) {
  const ingredients = getIngredientsList(meal);

  modalContent.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <h2>${meal.strMeal}</h2>
    <div class="meta">
      ${meal.strCategory ? `<span>${meal.strCategory}</span>` : ""}
      ${meal.strArea ? `<span>${meal.strArea}</span>` : ""}
    </div>
    <h3>Ingredients</h3>
    <ul>
      ${ingredients.map((i) => `<li>${i}</li>`).join("")}
    </ul>
    <h3>Instructions</h3>
    <p>${meal.strInstructions}</p>
  `;

  modalOverlay.classList.remove("hidden");
}

function getIngredientsList(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push(`${measure ? measure.trim() : ""} ${ingredient.trim()}`.trim());
    }
  }
  return list;
}

function closeModal() {
  modalOverlay.classList.add("hidden");
  modalContent.innerHTML = "";
}

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("error", isError);
}
