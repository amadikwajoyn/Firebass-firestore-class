const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form'); 

// create element and render cafe 

function renderCafe(doc){
    let li = document.createElement('li');
    let name =  document.createElement('span');
    let city =  document.createElement('span');

    // creating edit Button 
    let edit = document.createElement('div.edit');
    // creating the delete div 
    let cross = document.createElement('div');

    // setting the attribute here 
    li.setAttribute('data-id', doc.id); 

    // setting the text content of the span tags

    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    edit.textContent = 'Edit' //adding the editing text
    cross.textContent = 'x' //adding the delete 'x' symbol

    // aooending the content to Li 
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(edit);
    li.appendChild(cross);
   
    // appending the Li to the cafeList 
    cafeList.appendChild(li);

    //editing data
    edit.addEventListener('click', (e) => {
        e.document.createElement('input');
        let id2 = e.target.parentElement.getAttribute('data-id');
        db.collection('cafe').doc(id2).update(); 



        // db.collection('cafe').doc(data-id).update({
//     name: 'Joy Amadikwa'
// })
    })

    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafe').doc(id).delete(); 
    })
}


// to get the data from the firestore 
// getting data  


// for  unreal time event 
// db.collection('cafe').get().then((snapshot) => {             // working without the query clause

// db.collection('cafe').where('city', '>', 'I').get().then((snapshot) => {       //using the where query claus
   
// db.collection('cafe').orderBy('name').get().then((snapshot) => {  //using the order bby clause



   /* db.collection('cafe').where('city', '==', 'Owerri').orderBy('name').get().then((snapshot) => {  //using both the where and the order bby clause

    // console.log(snapshot.docs);

    // to view or retrieve the data in the firebase firestore
    snapshot.docs.forEach(doc => {
        // console.log(doc.data());
        renderCafe(doc);
    });
}) */

//for real-time snapshot listener get 
db.collection('cafe').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
   

    changes.forEach(change => {
        // console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        }else if(change.type == 'removed'){
            let li = cafeList.querySelector('[data-id =' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    })
})



// to update the collection 

// db.collection('cafe').doc(data-id).update({
//     name: 'Joy Amadikwa'
// })



// saving data here 
form.addEventListener('submit', (e) => {
    // prevent the page from reloading  after clicking the add cafe button 
    e.preventDefault();
    // get a reference to the cafe collection 
    db.collection('cafe').add({
        // getting the values of the input box
        name: form.name.value,
        city: form.city.value
    });

    form.name.value = '';
    form.city.value = '';

})






