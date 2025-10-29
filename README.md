# Vidareutveckling av Klassföräldrar till 2 B

## Översikt
I det här projektet har webbappen vidareutvecklats genom att funktioner för middagstips lagts till. 
Datan (rätterna/middagstipsen) hämtas lokalt och via öppen API på TheMealD. Interaktionen utgörs av att användaren kan slumpa fram rätter utifrån kategorier och visa listor över rätter i olika kategorier från API-databasen.

---

## Filstruktur
-  UPPDATERAD: "index.html" = huvudsidan (och den enda html-sidan) med strukturen och plats för dynamiskt innehåll. Här kan du slumpa rätt från mock up-lista.
- "style.css" = all styling för layout, kort och knappar.
- "app.js" = JavaScript-filen som skapar funktionaliteten och interaktiviteten för  klocka, hälsning, slumparen av namn + slump-historiken.
- "readme.md" = denna fil, som förklarar vad sidan gör, codeflow,  hur den är uppbyggd
- NYTT: "meals.js" = JavaScript-fil som skapar interaktivitet och funktion kopplad till slumpningen av middagstips/rätter, dock inte via API utan via lokala listor, en slags mock up.
- NYTT: "meals2.js" = JavaScript-fil som listar alla rätter ur valda kategorier - hämtar och bearbetar data via TheMealDB:s API.
- NYTT: "meals.html" = html-fil för struktur och plats för innehåll som hämtas och bearbetas av meals2.js Här kan du visa listor på rätters namn utifrån vilken kategori de tillhör, hämtas från öppen databas via API 

+i de olika filerna finns även utförliga kommentarer

-----------------------------------------------------------------------------------------------------

## Beskrivning av vad JavaScript koden gör
**GAMMAL: app.js**  
Innehåller all dom-manipulerande logik:
  - Uppdaterar klockan varje sekund och väljer lämplig hälsning.
  - Slumpar namn från arrayen "names".
  - Skapar <li>/list-element för historiken och lägger in en Ta bort-knapp för varje post.
  - Rensar hela historiken vid knapptryck.
  - Stoppar intervallet vid unloading.

**NY: meals.js**
- Definierar ett objekt (meals) där varje nyckel är en kategori (t.ex. chicken, beef) och värdet är en array med rätternas namn.
- Hämtar knappar med class .category-btn och elementet #meal-result.
- Sätter en click-eventlistener på varje kategori-knapp. När en knapp trycks läses det som agnes för knappens "data-attribut data-cat" för att avgöra vilken kategori som valts.
- En slumpmässig rätt från motsvarande Array/kategori-lista plockas sen ut och #meal-result uppdateras och visar den slumpade rätten,
+ om kategorin inte finns/är tom visas ett meddelande.

**NY: meals2.js**
- Skapar en lista med alla bokstäver a–z i variabeln "letters". Listan används för att söka i TheMealDB:s API efter alla rätter som börjar på varje bokstav och skapa endpoints.
- Definierar en lista allowedCategories med tillåtna kategorier (t.ex. "Chicken", "Beef", "Vegetarian", "Pork"). Dessa används för att filtrera bort rätter som inte tillhör de kategorier som ska visas.
- Funktionen fetchRatterPerKategori(): Loopar en bokstav i taget i "letters" (26..).
- För varje bokstav anropas TheMealDB:s endpoint
https://www.themealdb.com/api/json/v1/1/search.php?f=<bokstav>.
- Om då svaret innehåller rätter (data.meals), filtreras dom så att bara rätterna vars strCategory finns i allowedCategories inkluderas.
- Rätterna grupperas i ett objekt mealsByCategory, där nyckeln är kategorinamnet i gemener (exempslvis "chicken") och värdet är en lista med rättens namn (strMeal).
- Funktionen skickar tillbka ett färdigt objekt med alla hämtade och kategoriserade rätter.
- När sidan är färdigladdad och DOM-trädet byggt (DOMContentLoadedså hämtar ckriptet referenser till kategori-knapparna och elementet #meal-result.
- UI visar först texten ”Laddar rätter…” medan datan hämtas.
- fetchRatterPerKategori() anropas och resultatet sparas i variabeln meals.
- När hämtningen är klar så:
visas felmddelande m inga rätter hittas i mealResultO.
Annars visas texten ”Välj en kategori för att se rätterna.”
-För varje kategori-knapp läggs en click-eventlistener till.
- när knapparna klickas hämtas rätt lista av rätter ur meals baserat på knappens data-cat.
- En HTML-lista (<ul>) med alla rätter i den kategorin byggs dynamiskt med innerHTML.
- Till sist loggas hela det hämtade objektet med rätter till webbkonsolen.



----------------------------------------------------------------------------------------------------------------

## Förslag för utveckling av meals2.js 
- optimera/snabba på genom att cacha rätterna i localStorage i stället för att hämta alla rätter varje gång sidan laddas
- skapa DOM-element med createElement och textContent istället för att använda innerHTML (när listorna byggs framförallt) (GJORT)
- effektivare inhämtning istället för att await fetch för varje bokstav. något med Promiseall? (GJORT)


-----------------------------------------------------------------------------------------------------------------

## Vad händer när användaren laddar sidan/kodflöde:
- se aktuell fil
----------------------------------------------------------------------------------------------------------------


## Så kör du appen:
1. Öppna filen "index.html" eller i en webbläsare eller gå till demon på https://very-rimlig.github.io/end-project/index.html
2 eller 3. Slumpa maträtt utifrån kategori på "index.html"
3 eller 2. Gå till "meals.html" och visa alla rätter per kategori


