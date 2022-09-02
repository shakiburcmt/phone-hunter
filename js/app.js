const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const response = await fetch(url);
    const data = await response.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phone, dataLimit) => {
    // console.log(phone);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    // display limitation
    const showAll = document.getElementById('show-all');
    if (dataLimit && phone.length > dataLimit) {
        phone = phone.slice(0, dataLimit);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display no phone or brand found
    const noPhoneFound = document.getElementById('no-message-found');
    if (phone.length === 0) {
        noPhoneFound.classList.remove('d-none');
    }
    else {
        noPhoneFound.classList.add('d-none');
    }
    phone.forEach(iPhone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-3 h-100">
            <img src="${iPhone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${iPhone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${iPhone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleSpinner(false);
}
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // searchField.value = '';
    loadPhone(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(9);
})

// search input field enter key handled
document.getElementById('search-field').addEventListener('keypress', function (e) {
    // console.log(e.key)
    if (e.key === 'Enter') {
        processSearch(9);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

// not the best way to show all after clicking show all button
const showAll = document.getElementById('btn-showAll').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.slug);
}

loadPhone('phone')