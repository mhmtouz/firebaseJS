
const calisanlar=document.querySelector("#calisanlar")
const form=document.querySelector("#calisan-form")
//GÖSTERME: Verileri sayfada listeleme
function calisanlarList(doc){
    let li=document.createElement("li");
    let name=document.createElement("span");
    let phoneNumber=document.createElement("span");
    let eMail=document.createElement("span");
    let department=document.createElement("span");

    li.setAttribute("data-id",doc.id);
    name.textContent = doc.data().name;
    phoneNumber.textContent = doc.data().phoneNumber;
    eMail.textContent = doc.data().eMail;
    department.textContent = doc.data().department;

    li.appendChild(name);
    li.appendChild(phoneNumber);
    li.appendChild(eMail);
    li.appendChild(department);
    calisanlar.appendChild(li);
}
// // GÖSTERME: verileri cloud üzerinden çekme
// db.collection("calisanlar").get().then((snapshot)=>{
//     //console.log(snapshot.docs)
//     snapshot.docs.forEach(doc=>{
//         calisanlarList(doc);
//     })
// })

// GÖSTERME: Verileri sürekli çekme (change ile autorefresh) 
db.collection("calisanlar").orderBy("name").onSnapshot(snapshot=>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=='added'){
            calisanlarList(change.doc)
        }
    });
})

// EKLEME: submit olduysa formdaki değerleri add ile dbye yükle.
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    db.collection("calisanlar").add({
        name:form.isim.value,
        phoneNumber:form.numara.value,
        eMail:form.mail.value,
        department:form.dep.value
    });
    form.isim.value=""
    form.numara.value=""
    form.mail.value=""
    form.dep.value=""
})