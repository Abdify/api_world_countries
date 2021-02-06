fetch('https://restcountries.eu/rest/v2/all')//?fields=flag;name;capital;currencies;region;language;alpha3Code;
.then( response => response.json())
.then(data => {
    
    displayData(data);

    document.getElementById('sortBtns').addEventListener('click', (event) => {
        sort(data, event.target.value);
    })


})
.catch(error => {
    alert('Something went wrong!');    
    console.log(error)
});


function sort(data, sortBy){
    console.log(sortBy, 'clicked')
    data.sort((a, b) => {
        if(a[sortBy] < b[sortBy]) return -1;
        if(a[sortBy] > b[sortBy]) return 1;
        return 0;
    });
    removeData();
    displayData(data);
}


function removeData(){
    document.querySelector('#countriesList').innerText = '';
}


function displayData(data){
    const countriesList = document.getElementById('countriesList');
    //th
    const tr = document.createElement('tr');
    const ths = ['Flag', 'Country', 'Capital', 'Language', 'Continent'];
    ths.forEach(element => {
        const th = document.createElement('th');
        th.innerText = element;
        tr.appendChild(th);
    });
    countriesList.appendChild(tr);

    //td
    for (let i = 0; i < data.length; i++) {
        const country = data[i];
        const tr = document.createElement('tr');

        const [flag, name] = createName(country);
        const language = document.createElement('td');
        const capital = document.createElement('td');
        const continent = document.createElement('td');

        language.innerHTML = createLanguage(country);
        capital.innerText = country.capital;
        continent.innerText = country.region;

        tr.appendChild(flag);
        tr.appendChild(name);
        tr.appendChild(capital);
        tr.appendChild(language);
        tr.appendChild(continent);

        countriesList.appendChild(tr);        
    }
}


function createName(country){

    const flag = document.createElement('td');
    const img = document.createElement('img');
    img.src = country.flag;

    const name = document.createElement('td');
    const details = document.createElement('a');
    details.innerText = country.name;
    details.href = 'http://countries.petethompson.net/#/country/' + country.alpha3Code;

    flag.appendChild(img);
    name.appendChild(details);
    return [flag, name];
}


function createLanguage(country){
    let language = '';
    for (let i = 0; i < country.languages.length; i++) {
        language += country.languages[i].name + '<br>';
        
    }
    return language;
}



