const APP_TOKEN = 'I6P0LofetlBLmwW5IbfTd2iye'; // <- Replace this with your app token
const DATASET_IDENTIFIER = 'i4kb-6ab6'; // <- Replace this with the ID for the data resource that you want to look up
const LIMIT = 1; // <- Replace this with the number of records you want to pull

// Construct the URL that we need to make requests
const url = `https://data.cityofnewyork.us/resource/${DATASET_IDENTIFIER}.json?$limit=${LIMIT}&$$app_token=${APP_TOKEN}`;

console.log(`Fetching url - ${url}`);



const organizationNameDiv = document.querySelector('.organization-name');
const organizationBoroughDiv = document.querySelector('.organization-borough');
const boroughButtons = document.querySelectorAll('.borough-filters button');



fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const organizationNameDiv = document.querySelector('.organization-name');
    const organizationBoroughDiv = document.querySelector('.organization-borough');

    data.forEach((item) => {
      const organizationNameCell = document.createElement('div');
      organizationNameCell.textContent = item.organization_name;
      organizationNameDiv.appendChild(organizationNameCell);

      const organizationBoroughCell = document.createElement('div');
      organizationBoroughCell.textContent = item.borough || 'NA';
      organizationBoroughDiv.appendChild(organizationBoroughCell);
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

