import{ db} from './config.mjs'
import { collection,addDoc, query, where, getDocs,deleteDoc ,doc,updateDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
document.getElementById("btn").addEventListener("click", async()=>{
  var text = document.getElementById("text").value
    try {
        const docRef = await addDoc(collection(db, "todo"), {
       text:text,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

  



})
async function get(){
    const querySnapshot = await getDocs(collection(db, "todo"));
    querySnapshot.forEach((doc) => {

console.log(doc.id, " => ", doc.data());
document.getElementById("ul").innerHTML+=`
 <li class="list-item">
<p class="text">${doc.data().text}</p>
<button onclick='UpTodo("${doc.id}")'>update</button>
 <button onclick='delTodo("${doc.id}")'>delete</button>
</li>`
});
}
get()
async function delTodo(id) {

    await deleteDoc(doc(db, "todo", id));
    alert("delete succes")
                // location.reload()
    

}
async function UpTodo(id) {
const data = doc(db, "todo", id)
    await updateDoc(data, {
        text: prompt("update value")
    });
  location.replace("./index.html")

    
}
window.UpTodo = UpTodo
window.delTodo = delTodo