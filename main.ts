// main.ts


// Define la interfaz para los objetos de chistes
interface JokeObject {
  joke: string;   // La propiedad 'joke' almacena el chiste en forma de cadena de texto.
  score: number;  // La propiedad 'score' almacena la puntuación como un número (1, 2 o 3).
  date: string;   // La propiedad 'date' almacena la fecha en formato ISO como una cadena de texto.
}


// Define el array para almacenar los chistes. Se utiliza la interfaz JokeObject.
const reportJokes: JokeObject[] = [];
console.log('Contenido del array:', reportJokes);


// Función para votar un chiste
function vote(score: number): void {
    // Obtiene el último chiste mostrado
    const jokeContainer = document.getElementById('joke-container');
    const jokeText = jokeContainer?.innerText || "";
  
    // Busca el índice del chiste en el array reportJokes
    const existingIndex = reportJokes.findIndex((joke) => joke.joke === jokeText);
  
    // Guarda la fecha actual en formato ISO
    const currentDate = new Date().toISOString();
  
    // Crea un objeto con la información del chiste y la puntuación
    const jokeObject: JokeObject = {
      joke: jokeText,
      score: score,
      date: currentDate,
    };
  
    if (existingIndex !== -1) {
      // Si el chiste ya existe en el array, reemplaza el voto
      reportJokes[existingIndex] = jokeObject;
    } else {
      // Si el chiste no existe, agrégalo al array
      reportJokes.push(jokeObject);
    }
  
    // Muestra los datos en la consola para verificar
    console.log('Chiste votado:', jokeObject);
};






// Función para obtener un nuevo chiste de la API
async function fetchJoke(): Promise<void> {
  try {
      // Realiza una solicitud GET a la API de chistes
      const response = await fetch('https://icanhazdadjoke.com/', {
          headers: {
              'Accept': 'application/json'
          }
      });

      // Verifica si la respuesta es exitosa (código de estado HTTP 200-299)
      if (!response.ok) {
          throw new Error('Error en la solicitud a la API');
      }

      // Parsea la respuesta JSON
      const data = await response.json();

      // Obtén el elemento HTML donde mostrar el chiste
      const jokeContainer = document.getElementById('joke-container');

      // Muestra el chiste en el elemento HTML
      if (jokeContainer) {
          jokeContainer.innerText = data.joke; // Establece el texto del chiste en el elemento 'joke-container'.
      }

      // Muestra los datos en la consola para verificar
      console.log(data); // Imprime los datos del chiste obtenidos de la API en la consola.

  } catch (error) {
      console.error('Error:', error); // Maneja y muestra cualquier error que ocurra en la consola.
  }
}

// Llama a la función para obtener y mostrar un chiste cuando se carga la página
window.addEventListener('load', fetchJoke); // Cuando se carga la página, se llama a la función fetchJoke para obtener el primer chiste.
