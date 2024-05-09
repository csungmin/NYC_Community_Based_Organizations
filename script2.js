const urlParams = new URLSearchParams(window.location.search);

function goBack() {
    window.history.back();
}

const organizationName = urlParams.get('organization_name');
const borough = urlParams.get('borough');
const mission = urlParams.get('mission');
const description = urlParams.get('volunteer_program_description');
const streetAddress = urlParams.get('street_address');
const postcode = urlParams.get('postcode');
const website = urlParams.get('website');



const organizationNameDiv = document.getElementById('organization_name');
organizationNameDiv.textContent = organizationName;

const organizationDetailsDiv = document.getElementById('organization-details');
organizationDetailsDiv.innerHTML = `
    <p><strong>Organization Name:</strong></p> 
    <p>${organizationName}</p>
    <p><strong>Borough:</strong></p> 
    <p>${borough}</p>
    <p><strong>Mission:</strong></p> 
    <p>${mission}</p>
    <p><strong>Description:</strong></p> 
    <p>${description}</p>
    <p><strong>Street Address:</strong></p> 
    <p>${streetAddress}</p>
    <p><strong>Postcode:</strong></p>
    <p>${postcode}</p>
    <p><strong>Website:</strong></p> 
    <p><a href="${website}">${website}</a></p>
`;