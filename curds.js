let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads'); 
let disacount = document.getElementById('disacount');
let category = document.getElementById('category');
let count = document.getElementById('count');
let submit = document.getElementById('submit');
let Total = document.getElementById('Total');
let mood  = 'creat';
let tmp;
let moodBtn = document.getElementById('mood-but');
let mood1 = document.getElementById('mood1');
let lightMode = true;
function toggleMode(){
  if (lightMode){
    mood1.href = "curds.css";
    moodBtn.innerHTML = "Light Mode";
    lightMode = false;
  } else {
    mood1.href = "curds2.css";
    moodBtn.innerHTML = "Dark Mode";
    lightMode = true;
  }
}

//get Tolal
function getTotal(){
  if(price.value != '' && price.value!= 0){
    let result = (Number(price.value) + +taxes.value+ +ads.value )- +disacount.value;
    Total.innerHTML = result;
    Total.style.background = 'green';
  }
  else{
      Total.innerHTML = '';
      Total.style.background = 'rgb(210, 34, 34)';
  }
 }


 //creat product
 let dataPro;

 if(localStorage.prodect != null){
  dataPro = JSON.parse(localStorage.prodect)
 }

 else{ 
  dataPro= [] ;
}


 submit.onclick = function(){
   let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    disacount: disacount.value,
    category: category.value.toLowerCase(),
    count : count.value,
    total: Total.innerHTML,
   }
   if( mood === 'creat'){
     if(title.value!='' && count.value<101){
     if(newPro.count > 1){
      for( let i=0 ; i<newPro.count ; i++){
      dataPro.push(newPro);
        } 
      }else{ dataPro.push(newPro);}
     clearData(); } 
   }   

   
   else{
    if(title.value!=''){
    dataPro[tmp] = newPro;
    mood = 'creat';
    count.style.display = 'block'; 
    submit.innerHTML = 'Creat';}
    clearData();
   }

   //save localStorage
   localStorage.setItem('prodect', JSON.stringify(dataPro));
   //clear data
   //read data
   showData();
   submit.innerHTML='Creat';
 }
 showData();

function clearData(){
  Total.innerHTML = '';
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  disacount.value = '';
  category.value = '';
  count.value = '';
}

//read data
function showData(){
  getTotal();
  let table = '';
    for(let i=0 ; i<dataPro.length ; i++){
    table+= `<tr>
          <td>${i+1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].disacount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`;
  }
  document.getElementById('tbody').innerHTML = table;

  let btnDelete = document.getElementById('deleteAll');
  if(dataPro.length>0){
    btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All(${dataPro.length}) </button>`
  } else{  btnDelete.innerHTML = '';}
  }


  //delete

  function deleteData(i){
   dataPro.splice(i,1);
   localStorage.prodect = JSON.stringify(dataPro);
   showData();
  }

  function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
  }

//update
 function updateData(i){
  title.value = dataPro[i].title; 
  price.value = dataPro[i].price; 
  taxes.value = dataPro[i].taxes; 
  ads.value = dataPro[i].ads;  
  getTotal();  // or Total.innerHTML= dataPro[i].total; 
  disacount.value = dataPro[i].disacount;  
  category.value = dataPro[i].category; 
  count.value=dataPro[i].count;
  submit.innerHTML = 'update';
  mood  = 'update';
  tmp = i;
  count.style.display = 'none';
  scroll({
    top: 0,
    behavior:'smooth',
  })
 }

 //search
let search = document.getElementById('search');
let searchMood = 'title';
let cat = document.getElementById('cat');

function getSearch(id){
  if(id == 'SearchTitle'){
    searchMood = 'title';
  }
  else{
       searchMood = 'category';
  }
    search.placeholder = 'Search by '+ searchMood;
    search.focus();
    search.value = '' ;
    showData();
}

function searchData(value){
  let table='';

  for (let i=0; i<dataPro.length ; i++){
    if(searchMood=='title'){
      
        if(dataPro[i].title.includes(value.toLowerCase())){
          table+= `<tr>
          <td>${i+1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].disacount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`

        } 
    } 
    else{ 
        if(dataPro[i].category.includes(value.toLowerCase())){
          table+= `<tr>
          <td>${i+1}</td>
          <td>${dataPro[i].title}</td>
          <td>${dataPro[i].price}</td>
          <td>${dataPro[i].taxes}</td>
          <td>${dataPro[i].ads}</td>
          <td>${dataPro[i].disacount}</td>
          <td>${dataPro[i].total}</td>
          <td>${dataPro[i].category}</td>
          <td><button onclick="updateData(${i})" id="update">update</button></td>
          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>`
      }
        
      
    }   
  
  }     
         document.getElementById('tbody').innerHTML = table;

  }

   
  

