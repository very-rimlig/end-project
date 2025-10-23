// meals.js - lokal mock-version för middagstips


// Lokala listor med exempelrätter per kategori
const meals = {
  chicken: ["Kycklinggryta med curry", "Grillad kyckling med sallad", "Kycklingwok med nudlar"],
  beef: ["Biff Stroganoff", "Hamburgare med pommes", "Oxfilé med potatisgratäng"],
  vegetarian: ["Grönsaksgryta", "Vegolasagne", "Halloumiburgare"],
  miscellaneous: ["Tacos", "Pizza", "Quesadillas"],
  seafood: ["Lax med citron och dill", "Räkpasta", "Fiskgratäng"],
  pork: ["Fläskfilé med svampsås", "Revbensspjäll", "Pannkakor med bacon"],
  pasta: ["Spaghetti Bolognese", "Pasta Carbonara", "Pasta med pesto"],
  vegan: ["Veganburgare", "Tofuwok med grönsaker", "Chili sin carne"]
};


// Hämta alla kategoriknappar och lägg till klick-event
const categoryButtons = document.querySelectorAll('.category-btn');
const mealResult = document.getElementById('meal-result');


categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.cat;
    const categoryMeals = meals[category];
    if (categoryMeals && categoryMeals.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoryMeals.length);
      const randomMeal = categoryMeals[randomIndex];
      mealResult.innerHTML = `<p>${randomMeal}</p>`;
    } else {
      mealResult.innerHTML = `<p>Ingen rätt tillgänglig för denna kategori.</p>`;
    }
  });
});
