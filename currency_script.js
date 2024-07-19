const PRIMARY_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromcurr = document.querySelector(".from select")
const Tocurr = document.querySelector(".To select")

const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
    UpdateExchangeRate();
})

// curency code==code,countryList[code]==country code
// for (currCode in countryList) {
//     console.log(currCode, countryList[currCode]);
// }
for (let select of dropdowns) {
    for (currCode in countryList) {
        // console.log(currCode, countryList[currCode]);
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "To" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
        // console.log(evt);
        // console.log(evt.type);
    });

}
const updateFlag = (element) => {
    // console.log(element);
    // console.log(element.value);
    let currCode = element.value;//change value is targeting value in curancy code
    let countrycode = countryList[currCode];//find tha country code with help of curency code
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;//change the img when change option 
    let img2 = element.parentElement.querySelector("img");//accesing element of image where we want chnage
    img2.src = newSrc;//provide new update flag link



}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    UpdateExchangeRate();
});

const UpdateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    console.log(amtValue);
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }
    // console.log(fromcurr.value, Tocurr.value);
    const URL = `${PRIMARY_URL}/${fromcurr.value.toLowerCase()}/${Tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[Tocurr.value.toLowerCase()];
    let FinalAmount = amtValue * rate;

    msg.innerText = `${amtValue}${fromcurr.value}=${FinalAmount} ${Tocurr.value}`;
    // console.log(response);
}