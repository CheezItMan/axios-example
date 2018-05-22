/* Code goes here */

const URL = 'https://petdibs.herokuapp.com/pets';

const reportStatus = (message) => {
  $('#status-message').html(message);
};

const reportError = (message, errors) => {
  let content = `<p>${message}</p>`;
  content += '<ul>';

  for (const field in errors ){
    for (const problem of errors[field]) {
      content += `<li>${field}: ${problem}</li>`;
    }
  }
  content += '</ul>';
  reportStatus(content);

};

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
    if (error.response.data && error.response.data.errors) {
      // User our new helper method
      reportError(
        `Encountered an error: ${error.message}`,
        error.response.data.errors
      );
    } else {
      reportStatus(`Error: ${error.message }`);
    }
  });

  console.log('This is after .get');
}

const createPet = (event) => {

  console.log('EVENT!!!');
  console.log(event);
  event.preventDefault();

  const petData = {
    name: $('input[name="name"]').val(),
    age: parseInt( $('input[name="age"]').val()),
  };
  reportStatus(`Attempting to Add ${petData.name}`);

  axios.post(URL, petData)
    .then((response) => {
      $('input[name="name"]').val('');
      $('input[name="age"]').val('');

      console.log(response);
      reportStatus(`Successfully added ${petData.name}
        with ID:  ${response.data.id}`);
    })
    .catch((error) => {
      console.log('Whoops!');
      if (error.response.data && error.response.data.errors ) {
        console.log(error.response);
        reportError(error.message, error.response.data.errors);
      } else {
        reportStatus(`Encountered an Error: ${error.message}`)
      }
      // reportStatus(`Encountered an error ${error.message}`);
    });


};

$(document).ready(() => {
  $('#pet-form').submit(createPet)
  $('#load').click(loadPets);
})











//
