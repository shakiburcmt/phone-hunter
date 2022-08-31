const loadPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const response = await fetch(url);
    const data = await response.json();
    displayPhones(data.data);
}

const displayPhones = phone => {
    // console.log(phone);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
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
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
}

document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadPhone(searchText);
})

loadPhone('phone')