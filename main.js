let title = document.getElementById("title"),
  price = document.getElementById("price"),
  taxes = document.getElementById("taxes"),
  ads = document.getElementById("ads"),
  discount = document.getElementById("discount"),
  total = document.getElementById("total"),
  count = document.getElementById("count"),
  category = document.getElementById("category"),
  submit = document.getElementById("submit"),
  allProducts,
  mood='create',
  tempVar,
  searchMood='Title';

getTotal = () => {
  if (price.value != "" ) {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "#174917";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "#d05050b2";
  }
};


if (localStorage.products != null) {
  allProducts = JSON.parse(localStorage.products);
} else {
  allProducts = [];
}

submit.addEventListener("click", () => {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if(title.value!='' && price.value!='' && category.value!='' && product.count<=50){
    if(mood === 'create'){
      if(product.count>1){
          for(let i=0; i<product.count; i++){
              allProducts.push(product);
          }
          
        }
        else{
          allProducts.push(product);
        }
    }
    else{
      allProducts[tempVar]=product;
      mood='create';
      submit.innerHTML='Create';
      count.style.display='block';
     
    }
    clearData()
  }

  
  localStorage.setItem("products", JSON.stringify(allProducts));
  console.log(product);
  displayData()
  
});

clearData = () => {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
};

displayData=()=>{
    getTotal();
    let table='';
    for(let i=0; i<allProducts.length; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${allProducts[i].title}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].taxes}</td>
        <td>${allProducts[i].ads}</td>
        <td>${allProducts[i].discount}</td>
        <td>${allProducts[i].total}</td>
        <td>${allProducts[i].category}</td>
        <td><button onClick="updateData(${i})" class="tBtn" id="updateBtn">update</button></td>
        <td><button onClick="deleteData(${i})" class="tBtn" id="deleteBtn">delete</button></td>
    </tr>
        
        
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let delAllBtn = document.getElementById('deleteAll');
    if(allProducts.length>0){
        delAllBtn.innerHTML=
       `<button onClick="deleteAll()" class="tBtn">Delete All (${allProducts.length})</button>`
    }
    else{
        delAllBtn.innerHTML='';
    }

    
}
displayData()


deleteData=(i)=>{
    allProducts.splice(i,1);
    localStorage.products=JSON.stringify(allProducts);
    displayData()
}

deleteAll=()=>{
    localStorage.clear();
    allProducts.splice(0);
    displayData()

}

updateData=(i)=>{

    title.value = allProducts[i].title;
    price.value = allProducts[i].price;
    taxes.value = allProducts[i].taxes;
    ads.value = allProducts[i].ads;
    discount.value = allProducts[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = allProducts[i].category;
    submit.innerHTML='Update';
    mood='update';
    tempVar=i;
    scroll({
        top:0,
        behavior:"smooth",
    })

}

getSearchMood=(id)=>{
    let search= document.getElementById('search');
    if(id==='searchByTitle'){
        searchMood='Title';
        

    }
    else{
        searchMood='Category';
        
    }
    search.placeholder='Search By ' + searchMood
    search.focus();
    search.value='';
    displayData();

}



searchData=(value)=>{
  let table='';
if(searchMood==='title'){
  
   for(let i=0; i<allProducts.length; i++){
      if(allProducts[i].title.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${allProducts[i].title}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].taxes}</td>
        <td>${allProducts[i].ads}</td>
        <td>${allProducts[i].discount}</td>
        <td>${allProducts[i].total}</td>
        <td>${allProducts[i].category}</td>
        <td><button onClick="updateData(${i})" class="tBtn" id="updateBtn">update</button></td>
        <td><button onClick="deleteData(${i})" class="tBtn" id="deleteBtn">delete</button></td>
    </tr>
        
        
        `
      }
   }
}


else{

  for(let i=0; i<allProducts.length; i++){
    if(allProducts[i].category.includes(value.toLowerCase())){
      table += `
      <tr>
      <td>${i+1}</td>
      <td>${allProducts[i].title}</td>
      <td>${allProducts[i].price}</td>
      <td>${allProducts[i].taxes}</td>
      <td>${allProducts[i].ads}</td>
      <td>${allProducts[i].discount}</td>
      <td>${allProducts[i].total}</td>
      <td>${allProducts[i].category}</td>
      <td><button onClick="updateData(${i})" class="tBtn" id="updateBtn">update</button></td>
      <td><button onClick="deleteData(${i})" class="tBtn" id="deleteBtn">delete</button></td>
  </tr>
      
      
      `
    }
 }
  
}
document.getElementById('tbody').innerHTML=table;
}