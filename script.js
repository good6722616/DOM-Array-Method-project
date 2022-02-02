const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
//fetch random user and add money


getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random() * 10000000)
    }

    addData(newUser);
}


//double everyones money
function doubleMoney() {
    data = data.map((user) => {
        return {...user, money:user.money*2};
    });
    updateDOM();

}


//sort users by richest
function sortbyRichest(){
    data.sort((a,b)=> b.money-a.money);
    updateDOM();
}



//filter only millionaires
function showMillionaires(){
    data = data.filter(user => user.money>5000000);
    updateDOM();
}



//calculate the total wealth
function calculateWealth(){
    const wealth = data.reduce((accu,user ) => (accu+=user.money), 0);
    // console.log(formatMoney(wealth));

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Money: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}


//add new obj to data arr
function addData(obj) {
    data.push(obj);
    updateDOM();
}

// Update Dom
function updateDOM(providedData=data){
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item =>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);


    });

}


//fornat number as money
function formatMoney(number) {
    return '$'+ number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortbyRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click',calculateWealth);


