// Alla bokstäver vi söker på (a -> z)
//Skapar en lista med alla bokstäver a–z i variabeln "letters".
// Listan används för att söka i TheMealDB:s API efter alla rätter
// som börjar på varje bokstav och skapa endpoints
const letters = "abcdefghijklmnopqrstuvwxyz".split("");

// Tillåtna kategorier från API (chicken, beef, vegetarian och pork): vi normaliserar jämförelsen
// Vi sparar i allowedCategoriesNormalized för snabb lookup
const allowedCategories = ["Chicken", "Beef", "Vegetarian", "Pork"];
const allowedCategoriesNormalized = new Set(allowedCategories.map(c => c.toLowerCase()));

/*
 fetchRatterPerKategori
 Hhämtar rätter per bokstav från TheMealDB, filtrerar på allowedCategories,
 och returnerar ett objekt där nyckeln är kategorin i lowercase.
 */
async function fetchRatterPerKategori() {
  const mealsByCategory = {};

  // skapar en array med alla fetch-promises (parallell hämtning)
  const fetchPromises = letters.map(letter =>
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .catch(err => {
        // För fel per-anrop: logga men låt resten fortsätta
        console.warn(`Misslyckades att hämta för bokstav ${letter}:`, err);
        return null;
      })
  );

  // väntar på att alla förfrågningar är klara (lyckade eller misslyckade)
  const results = await Promise.allSettled(fetchPromises);

  // går igenom svaren/resultaten och samlar ihop rätterna
  for (const settled of results) {
    if (settled.status !== "fulfilled" || !settled.value) continue;
    const data = settled.value;

    if (!data.meals) continue;

    for (const meal of data.meals) {
      // läser kategorin från API-responsen, exempelvis "Chicken"
      const category = meal.strCategory;
      if (!category) continue;

      // normaliserar till lowercase för jämförelse av nyckeln
      const categoryNormalized = category.toLowerCase();

      // filtrerar bort kategorier som inte finns i allowedCategoriesNormalized
      if (!allowedCategoriesNormalized.has(categoryNormalized)) continue;

      // startar listan/arrayen för kategorin
      if (!mealsByCategory[categoryNormalized]) {
        mealsByCategory[categoryNormalized] = [];
      }

      // spara endast rättenamn (strMeal)
      if (meal.strMeal) {
        mealsByCategory[categoryNormalized].push(meal.strMeal);
      }
    }
  }

  return mealsByCategory;
}

// init - körs när DOM är klar
// Hämtar rätter, uppdaterar UI och lägger på klick-event på knappar.
document.addEventListener("DOMContentLoaded", async () => {
  const categoryButtons = document.querySelectorAll('.category-btn');
  const mealResult = document.getElementById('meal-result');

  if (!mealResult) {
    console.warn("#meal-result saknas i DOM");
    return;
  }

  //visar ett laddningsmeddelande till användaren när hen väntar
  mealResult.textContent = "Laddar rätter…";

  //hämtar rätter parallellt
  let meals;
  try {
    meals = await fetchRatterPerKategori();
  } catch (err) {
    console.error("Fel vid hämtning av rätter:", err);
    mealResult.textContent = "Kunde inte hämta rätter. Försök igen senare.";
    return;
  }

  // och om inga rätter hittades så...
  if (!meals || Object.keys(meals).length === 0) {
    mealResult.textContent = "Inga rätter hittades för de valda kategorierna.";
  } else {
    mealResult.textContent = "Välj en kategori för att se rätterna.";
  }

  //funktion för att skapa lista med rätter (förutanvändes innerHTML)
  function renderMealList(title, items) {
    // rensa tidigare innehåll
    mealResult.innerHTML = ""; // kort och ok här eftersom vi kontrollerar innehållet vi skapar

    // rubrik som skapas
    const h3 = document.createElement('h3');
    h3.textContent = `${title} — ${items.length} rätter`;
    mealResult.appendChild(h3);

    // loista som skapas
    const ul = document.createElement('ul');
    for (const m of items) {
      const li = document.createElement('li');
      li.textContent = m; // textContent = säkert mot injection
      ul.appendChild(li);
    }
    mealResult.appendChild(ul);
  }

  // sätter eventlisteners på knapparna
  categoryButtons.forEach(button => {
    // Säkerställ att knappen beter sig endast som en knapp
    if (!button.hasAttribute('type')) button.setAttribute('type', 'button');

    button.addEventListener('click', () => {
      const category = (button.dataset.cat || "").toLowerCase();
      const categoryMeals = meals[category];

      // hantera aktiv utseende för knappen
      categoryButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      if (categoryMeals && categoryMeals.length > 0) {
        renderMealList(button.textContent.trim(), categoryMeals);
      } else {
        mealResult.textContent = "Ingen rätt tillgänglig för denna kategori.";
      }
    });
  });

  // Debug: skriv ut vad som hämtades
  console.log("Rätter per kategori (hämtade):", meals);
});

