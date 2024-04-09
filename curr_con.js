const baseUrl="https://v6.exchangerate-api.com/v6/13e56042812cfc41e8510273/latest"  
const dropdowns=document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const msg = document.querySelector("#msg")
let amount = document.querySelector(".amount input")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".To select")


for(let select of dropdowns)
{
    for(code in countryList)
    {
       let newOption=document.createElement("option")
       newOption.innerText = code;
       newOption.value=code;
       if(select.name === "from" && code === "USD")
       {
         newOption.selected="selected"
       }
       else if(select.name === "To" && code === "INR")
       {
         newOption.selected="selected"
       }
       select.append(newOption)
    }
    select.addEventListener("change",(event)=>{
        updateFlag(event.target);
    })
}

const updateFlag = (ele)=>{
    let currCode= ele.value;
    let counCode = countryList[currCode];
    let flagSrc = `https://flagsapi.com/${counCode}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = flagSrc;
}

btn.addEventListener("click" , (event) =>{
    event.preventDefault();  
    let amtVal=amount.value;
   
    if(amtVal === "" || amtVal < 1)
    {
         amtVal = 1;
         amount.value = "1";
    }
    getExchangeRate();
})


//to get exchange 
const getExchangeRate = async () =>{
    let response = await fetch(`${baseUrl}/${fromCurr.value}`);
    let data = await response.json();
    let rate = data.conversion_rates[toCurr.value];
    let amtVal=amount.value;
    let finalAmt = amtVal*rate;
    msg.innerText = `${amtVal}${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
}

