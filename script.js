const APP_TOKEN = 'I6P0LofetlBLmwW5IbfTd2iye';
const DATASET_IDENTIFIER = 'i4kb-6ab6';
const LIMIT = 156;
const url = `https://data.cityofnewyork.us/resource/${DATASET_IDENTIFIER}.json?$limit=${LIMIT}&$$app_token=${APP_TOKEN}`;

console.log(`Fetching url - ${url}`);

async function fetchOrganizations() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching organizations:', error);
        return [];
    }
}



async function createOrganizationLinks() {
    try {
        const data = await fetchOrganizations();
        const organizationList = document.querySelector('.organization-list');
        const organizationBoroughDiv = document.querySelector('.organization-borough');
        const allOrganizations = [];

        organizationList.innerHTML = '';
        organizationBoroughDiv.innerHTML = '';

        data.forEach(org => {
            const link = document.createElement('a');
            const websiteUrl = org.website && org.website.url ? org.website.url : 'No website available';
            link.href = `page2.html?organization_name=${org.organization_name}&borough=${org.borough}&mission=${org.mission}&volunteer_program_description=${org.volunteer_program_description}&street_address=${org.street_address}&postcode=${org.postcode}&website=${websiteUrl}`;
            link.textContent = org.organization_name;
            link.classList.add('organization-item');
            const orgBorough = org.borough ? org.borough.toUpperCase() : 'OTHERS';
            link.setAttribute('data-borough', orgBorough);
            allOrganizations.push(link);

            const boroughSpan = document.createElement('span');
            boroughSpan.textContent = orgBorough;
            organizationBoroughDiv.appendChild(boroughSpan);
        });

        allOrganizations.forEach(org => {
            organizationList.appendChild(org);
        });
    } catch (error) {
        console.error('Error creating organization links:', error);
    }
}

function sortOrganizationsByBorough(borough) {
    const organizations = document.querySelectorAll('.organization-item');
    organizations.forEach(org => {
        const orgBorough = org.dataset.borough.toUpperCase() || 'OTHERS';
        org.style.display = orgBorough === borough || (borough === 'OTHERS' && !org.dataset.borough) ? 'block' : 'none';
    });

    const spans = document.querySelectorAll('.organization-borough > span');
    spans.forEach(span => {
        const spanBorough = span.textContent.toUpperCase();
        span.style.display = spanBorough === borough || (borough === 'OTHERS' && spanBorough === 'NA') ? 'block' : 'none';
        const br = span.nextElementSibling;
        if (br && br.tagName === 'BR') {
            br.style.display = span.style.display;
        }
    });
}



function resetOrganizationList() {
    console.log('Resetting organization list...');
    const organizationList = document.querySelector('.organization-list');
    organizationList.innerHTML = '';
    const organizations = document.querySelectorAll('.organization-item');
    organizations.forEach(org => {
        org.style.display = 'block';
    });
    const brs = document.querySelectorAll('.organization-item + br');
    brs.forEach(br => {
        br.style.display = 'block';
    });
    const organizationBoroughDiv = document.querySelector('.organization-borough');
    organizationBoroughDiv.innerHTML = '';
    createOrganizationLinks();
}

document.querySelectorAll('.borough-filters-button').forEach(button => {
    button.addEventListener('click', () => {
        const selectedBorough = button.dataset.borough.toUpperCase();
        if (selectedBorough === 'ALL') {
            resetOrganizationList();
        } else {
            sortOrganizationsByBorough(selectedBorough);
        }
    });
});

createOrganizationLinks();
