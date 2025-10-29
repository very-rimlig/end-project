// meals.js - lokal mock-version för middagstips
//med lokala listor med exempelrätter per kategoro
// Objektet/variabeln "meals" fungerar som en "mock-databas"
//här sker alltså ingen inhämtning via API



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

// hämtar alla kategoriknappar (element med klass 'category-btn')/ NodeList med alla kategori-knappar.
const categoryButtons = document.querySelectorAll('.category-btn');
// hämtar elementet där resultatet ska visas.
const mealResult = document.getElementById('meal-result');

// för varje kategori-knapp , adderas en eventlistener (vid clikc).
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    // läser av data-attribut 'data-cat' från den klickade knappen.
    const category = button.dataset.cat;
    // hämtar motsvarande array med rätter från objektet 'meals' utifrån data-attribut
    const categoryMeals = meals[category];
    // kontrollerar att det finns rätter i aktuell kategori
    if (categoryMeals && categoryMeals.length > 0) {
      // här väljs ett slumpmässigt nummer (index) mellan 0 och categoryMeals.length - 1
      const randomIndex = Math.floor(Math.random() * categoryMeals.length);
      const randomMeal = categoryMeals[randomIndex];
      // uppdaterar DOM-trädet med den slumpade rätten.
      mealResult.innerHTML = `<p>${randomMeal}</p>`;
    } else {
      // felmeddelande om ingen rätt finns i kategorin
      mealResult.innerHTML = `<p>Ingen rätt tillgänglig för denna kategori.</p>`;
    }
  });
});
