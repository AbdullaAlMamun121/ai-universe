// Fetch all data

const fetchAllData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url).then(response => response.json()).then(data => { 
        displayData(data.data.tools.slice(0, 6));      
    }
    )
}

// Display the fetch all data
const displayData = (values) => {
    
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    const showAll = document.getElementById('show-all');
    cardContainer.innerHTML = '';
    if (values.length === 6) {
        showAll.classList.remove('d-none');
    }else{
        showAll.classList.add('d-none');
    }

    values.forEach(item => {
        
        const { features, id, image, name, published_in } = item;
        const card = document.createElement('div');

        card.classList.add('col');
        card.innerHTML = `
                <div class="card">
                    <img src="${image ? image : "No image found"}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Features</h5>
                        
                        <p>${features ? features.map((feature, index) =>
            `<br><span>${index + 1}.${feature}</span>`
        ) : "Feature not available"}</p>
                        
                    </div>
                    <div class="card-footer">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex flex-column">
                                <h3>${name ? name : "Name not found"}</h3>
                                <div class="d-flex justify-content-start align-items-center g-2">
                                    <i class="fa-solid fa-calendar-days"></i>
                                    <span class="ms-2 p-0 m-0">${published_in ? published_in : "Date not available"}</span>
                                </div>
                            </div>
                            <div>
                                <i class="fa-sharp fa-solid fa-arrow-right"
                                data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="singleDataDetails('${id}')"
                                ></i>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        cardContainer.appendChild(card);
    });
    // spinner
    toggleSpinner(false);
}

// Fetching modal data by api 
const singleDataDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url).then(response => response.json()).then(data => {
        singleDataDisplay(data.data);
        toggleAccuracy(data.data.accuracy);
    });
}
// modal single data show
const singleDataDisplay = (values) => {
    console.log(values);
    const modalContainer = document.getElementById('modal-container');
   
    const { accuracy, description, features, id, image_link, pricing, integrations, input_output_examples } = values;
    const { 1: stringOne, 2: stringTwo, 3: stringThree } = features;

    modalContainer.innerHTML = `
    <div class="col">
            <div class="card">
                <div class="card-body m-0 p-2">
                    <h5 class="card-title">${accuracy.description}</h5>
                    <div class="d-md-flex d-lg-flex gap-3 justify-content-center align-items-center ">

                    <div class="bg-white border border-warning rounded p-1 mr-3"><span class="text-warning">${pricing[0].price ? pricing[0].price : "Free"}<br>${pricing[0].plan ? pricing[0].plan : 'No charge'}</span>
                    </div>
                    <div class="bg-white border border-warning rounded p-1 mr-3"><span class="text-warning">${pricing[1].price ? pricing[1].price : "Free"}<br>${pricing[1].plan ? pricing[1].plan : "No charge"}</span>
                    </div>
                    <div class="bg-white border border-warning rounded p-1 mr-3"><span class="text-warning">${pricing[2].price ? pricing[2].price : "Free"}<br>${pricing[2].plan ? pricing[2].plan : "No charge"}</span>
                    </div>
                  </div>

                  <div class="d-md-flex d-lg-flex justify-content-center align-items-center gap-3">
        <div class="p-0 m-0">
            <h3 class="w-bold">Feature</h3>
            <li>${stringOne.feature_name ? stringOne.feature_name : "Feature not available"}</li>
            <li>${stringTwo.feature_name ? stringTwo.feature_name : "Feature not available"}</li>
            <li>${stringThree.feature_name ? stringThree.feature_name : "Feature not available"}</li>
        </div>
        <div class="p-0 m-0">
            <h3 class="w-bold mt-5 mb-0">Integrations</h3>
            <p>${integrations ? integrations.map((integration) =>

        `<br><span>&#x2022;${integration}</span>`
    ) : "Integration not available"}</p>
        </div>
    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
            <div id="accuracy-btn" class="custom-parent-position d-none">
            <div class="custom-child-position border-3 text-white">${accuracy.score ? 'Accuracy ' + (accuracy.score) * 100 + '%' : false }</div>
        </div>
                <img src="${image_link[0] ? image_link[0] : "image can't found"}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${input_output_examples[0].input ? input_output_examples[0].input : "Title not found"}</h5>
                
                    <p class="card-text">${input_output_examples[0].output ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
                </div>
            </div>
        </div>
    `;


}
// sort by date
const formatingData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url).then(response => response.json()).then(data => {
        const sortData = data.data.tools;
        const formateDate = sortData.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
        displayData(formateDate);
    }
    )
}

// spinner section
const toggleSpinner = isLoading => {
    const loadSection = document.getElementById('loader');
    if (isLoading) {
        loadSection.classList.remove('d-none');
    } else {
        loadSection.classList.add('d-none');
    }
}
// accuracy button
const toggleAccuracy = isLoading => {
    const accuracyBtn = document.getElementById('accuracy-btn');
    
    if (isLoading.score) {
        accuracyBtn.classList.remove('d-none');
    } else {
        accuracyBtn.classList.add('d-none');
    }

}
// see all data section
const showAllDataTogether = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url).then(response => response.json()).then(data => {
        displayData(data.data.tools);
    }
    )
}

toggleSpinner(true);
fetchAllData();