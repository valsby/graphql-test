

let url = new URL(window.location.href);
let country = url.searchParams.get('country');

if(!country)
{
    var request = {
        query: `
            {
                countries {
                    name
                    code
                }
            }
            `
    }
}
else {
    var request = {
        query: `
            {
                country(code:"${country.toUpperCase()}") {
                    name
                    phone
                    currency
                }
            }
        
        `
    }
    console.log(request);
}

fetch('https://countries.trevorblades.com', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(request),
})
.then(res => res.json())
.then(res => {
    if(res.data.countries) {
        showCountries(res.data);
    }
    else {
        showCountry(res.data);
    }
})
.catch(err => console.log(err))

function showCountries(data){
    var ele = document.querySelector('.countries');
    data.countries.forEach(element => {
        var para = document.createElement('p');
        para.appendChild(document.createTextNode(`${element.name} - ${element.code}`));
        ele.appendChild(para);
    });
}



function showCountry(data)
{
    var ele = document.querySelector('.countries');
    
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(data.country.name));
    ul.appendChild(li);
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(data.country.phone));
    ul.appendChild(li);
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(data.country.currency));
    ul.appendChild(li);
    
    ele.appendChild(ul);
}