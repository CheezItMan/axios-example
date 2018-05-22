/* Code goes here */

const URL = 'https://petdibs.herokuapp.com/pets';

const reportStatus = (message) => {
  $('#status-message').html(message);
}

const loadPets = () => {
  const petList = $('#pet-list');
  petList.empty();

  reportStatus('Loading Pets!  Please Wait...');

  // get the thing
  axios.get(URL)
    .then((response) => {
      console.log('inside the .then');
      response.data.forEach((animal) => {
        console.log(animal);
        petList.append(`<li>${animal.name}</li>`);
      });
      reportStatus('Pets Loaded!');
    })
    .catch((error) => {
      console.log(error);
      reportStatus(`Error: ${error.message }`);
    });

    console.log('This is after .get');
}

$(document).ready(() => {
  $('#load').click(loadPets);
})



//
