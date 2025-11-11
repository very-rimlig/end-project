
/* app.js
   Den här javascript-koden gör följande saker:
   -uppdaterar klockan per sekund och väljer hälsning beroende vad klockan är
   -genererar och visar slumpmässigt valda namn från en lista/array
   -lägger till och visar slumpade namn i DOM genom att skapa nya HTML-element
   -funktioner för att rensa slumpade namnen (de skapade elementen) via knappar
*/

/*---------------------------------------------------
DOM-selektion: här hämtas HTML-element senare ändras. Här används metoden "getElementById"
som hämtar för att få tag på HTML-element, för att senare förändra innehåll eller lägga till och hämta element i dokumentet.
----------------------------------------------------*/

/*
Här skapas en variabel timeEl som refererar till elementet i HTML med id="time".
document.getElementById('time') letar upp detta element. Senare kan innehållet i
elementet ändras genom metoden .textContent.
*/
const timeEl = document.getElementById('time');

/*
Här skapas variabeln greetingEl som refererar till elementet med id="greeting".
Texten/hälsningen som syns på sidan ändras senare med metoden .textContent.
*/
const greetingEl = document.getElementById('greeting');
/*
Fungerar på samma sätt som ovanstående, här skapas en variabel för det
senaste slumpade namnet och det kommer ändras med currentNameEl.textContent = namn;
*/
const currentNameEl = document.getElementById('current-name');

/*
Här skapas variabeln newNameBtn som refererar till "Slumpa en förälder"-knappen (id="new-name").
Denna referens  används för att senare kunna lägga till en event listener tillåter
att vi senare bestämmer vad som händer när man trycker på knappen.
*/
const newNameBtn = document.getElementById('new-name');

/*
Här skapas variabeln clearHistoryBtn som kopplas till rensa-knappen (id="clear-history").
Med denna variabel ska vi kunna ta bort alla namn (element som skapats) i historiklistan
genom att man klickar på knappen.
*/
const clearHistoryBtn = document.getElementById('clear-history');

/*
Här skapas variabeln nameHistoryList som refererar till listan/ul-elementet
med id="name-history". Listan består av alla tidigare slumpade namn
som skapats.
*/
const nameHistoryList = document.getElementById('name-history');

/* ------------------------------
Data: Här är listan på namn (ett array) där det ska slumpas ifrån
---------------------------------- */
const names = [
  "Olle B K",
  "Alice K M" ,
  "Katja R",
  "Lowe W",
  "Hannibal S",
  "Stefan K",
  "Bo R L",
  "Mirjam J H",
  "Juli S",
  "David Z W",
  "Jordi D",
  "Dylan S",
  "Sydney L",
  "Lucy Bao B L",
  "Alicja Ol H",
  "Hjalmar N",
  "Irma R L",
  "Amadeus S",
  "Theo S",
  "Edwin E W",
  "Harriet G",
  "Alexander A M",
  "Ziggy W",
  "Ruben Ö",
  "Marlon M",
  "Maryam M",
];

/* ------------------------------
Klockfunktion som uppdaterar klocka och visa en hälsning beroende på tid.
Klockfunktionen:
- Hämtar nuvarande tid med new Date()
- Formaterar timmar, minuter och sekunder som tvåsiffriga strängar
- Uppdaterar DOM-elementet timeEl med aktuell tid
- Bestämmer vilken hälsning som ska visas utifrån tidsspann
- Uppdaterar DOM-elementet greetingEl med hälsningen

   ------------------------------ */

function updateClockAndGreeting() {
  const now = new Date();  // Skapar ett datum-objekt med nuvarande tid

  // Hämtar timmar, minuter och sekunder från Date-objektet
  // padStart(2, '0') gör att det alltid blir två siffror (t.ex. "09" istället för "9")
  const hh = String(now.getHours()).padStart(2,'0');
  const mm = String(now.getMinutes()).padStart(2,'0');
  const ss = String(now.getSeconds()).padStart(2,'0');

  // Uppdaterar DOM-elementet timeEl med aktuell tid och gör att webbläsaren läser in igen
  timeEl.textContent = `${hh}:${mm}:${ss}`;

  // Hämtar timma som ett nummer mellan 0-23
  const hour = now.getHours();
  // Standard hälsning
  let greet = 'Hej!';
  // if-sats som bestämmer vilken hälsning/text-sträng som visas beroende på vad klockan är
  if (hour >= 5 && hour < 10) {
    greet = 'God morgon';
  } else if (hour >= 10 && hour < 17) {
    greet = 'God dag!';
  } else if (hour >= 17 && hour < 23) {
    greet = 'God kväll!';
  } else {
    greet = 'God natt!';
  }
  // Uppdaterar DOM-elementet "greetingEl" med innehållet för rätt hälsning
  greetingEl.textContent = greet;
}


// Kör klockan direkt en gång när sidan laddas (annars hade det dröjt 1 sek)
updateClockAndGreeting();

// Skapar och startar ett intervall som kör "funktionen"/uppdaterar varje sekund (1000 ms)
const clockInterval = setInterval(updateClockAndGreeting, 1000);

/* ------------------------------
 Funktionerna för namnslumparen som slumpmässigt  väljer ett namn ur
 tidigare lista och visar det genom att skapa en lista med redan
 slumpade namn (historik) och senaste
--------------------------------- */

/*
Här skapas en funktion som slumpmässigt väljer ett namn
från listan/arrayen. Metoden Math.random() ger ett tal mellan 0 och 1.
multiplicerat med names.length (antalet namn i listan) så ger
det ett tal mellan 0 och antalet namn - 1.
Math.floor rundar ner till heltal
*/
function getRandomName() {
  const i = Math.floor(Math.random() * names.length);
  return names[i];
}

/*
Här skapas en funktion för att visa det senast slumpade namnet på sidan
och lägger till det i historiken
*/
function showNewName() {
  const name = getRandomName();
  currentNameEl.textContent = name; // Uppdaterar elementet currentNameEl som visar aktuellt namn som senaste slumpats
  const li = document.createElement('li'); // Skapar ett nytt li-element i DOM för historiken
  li.textContent = name; // sätter texten i listan/listbojekt till namnet
  const removeBtn = document.createElement('button');  // skapar en knapp för att ta bort just detta namn
  removeBtn.textContent = 'Ta bort'; // bestämmer text på knappen
  removeBtn.classList.add('remove-name'); // lägger till CSS-klassen "remove-name"
  removeBtn.setAttribute('aria-label', 'Ta bort detta namn från historiken'); //för tillgänglighet, alttext/attribut till knappen
  removeBtn.addEventListener('click', () => { // här läggs en "Event listener" till Ta bort-knappen så att aktuellt listobjekt tas bort när knappen trycks
    if (li.parentNode) { // kollar att li fortfarande finns i DOM
      li.parentNode.removeChild(li); // om sant så tas li-elementet (namnet) bort från DOM
    }
  });

  li.appendChild(removeBtn); // Gör så att Ta bort-knappen läggs inne i li, alltså efter varje listelement


  // Lägger nya li-elementet längst upp i historiklistan genom metoden insertBefore
  const firstChild = nameHistoryList.firstChild; // första "barnet"/elemtet i listan
  if (firstChild) {
    nameHistoryList.insertBefore(li, firstChild); // lägg före första elementet
  } else {
    nameHistoryList.appendChild(li); // men om listan är tom, lägg som första
  }
}

/* ------------------------------------
Här skapas Event listeners för knapparna
------------------------------------- */

/* Event-listener för knappen "slumpa en förälder" */
newNameBtn.addEventListener('click', () => {
  showNewName();
});

/* event-listener för att rensa hela historiken (tar bort alla barn i nameHistoryList) */
clearHistoryBtn.addEventListener('click', () => {
  while (nameHistoryList.firstChild) {
    nameHistoryList.removeChild(nameHistoryList.firstChild); // ta bort alla child nodes/li-element i historiken
  }
});

/*
event-listener kopplat till inläsningen av webbläsaren, rensar timern och processer när sidan stängs ned.
*/
window.addEventListener('beforeunload', () => {
  clearInterval(clockInterval); // Rensa intervallet när användaren lämnar sidan (bra praxis)
});

