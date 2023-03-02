// Fetch all data
const fetchAllData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url).then(response => response.json()).then(data => displayData(data.data.tools))

}

// Display the fetch data
const displayData = (values) => {
    // console.log(values);
    const cardContainer = document.getElementById('card-container');
    values.forEach(value => {
        console.log(value); 
        const { description, features, id, image, name, published_in } = value;
        const card = document.createElement('div');
        card.classList.add('col');
        card.innerHTML = `
                <div class="card h-100 p-1">
                    <img src="${image ? image :"No image found"}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Feature</h5>
                        <p class="card-text">${features}</p>
                    </div>
                    <div class="card-footer">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex flex-column">
                                <h3>${name ? name :"Name not found"}</h3>
                                <div class="d-flex justify-content-start align-items-center g-2">
                                    <i class="fa-solid fa-calendar-days"></i>
                                    <span class="ms-2 p-0 m-0">${published_in ? published_in :"Date not available"}</span>
                                </div>
                            </div>
                            <div>
                                <i class="fa-sharp fa-solid fa-arrow-right"></i>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        cardContainer.appendChild(card);
    });
}

fetchAllData();