// TODO:
// 1. Al click su "Aggiungi" (o premendo Invio) aggiungi un elemento alla lista
//    con il testo inserito nell'input.
// 2. Ogni elemento deve avere un bottone "Rimuovi" che lo elimina dalla lista.
// 3. Se l'input è vuoto, mostra un messaggio di errore e non aggiungere nulla.
// 4. (Bonus) Al click sul testo dell'elemento, barralo come "fatto".


const item_input   = document.getElementById("item");
const btn_aggiungi = document.getElementById("btn-aggiungi");
const lista        = document.getElementById("lista");
const errore_p     = document.getElementById("errore");

function handle_mistake(error){
    if (error === "empty-item"){
        errore_p.textContent = "Oggetto vuoto!";
        return;
    }
    if (error === "repeated-item"){
        errore_p.textContent = "Oggetto già presente!";
    }
}

function canAdd(itemToAdd){
    if (itemToAdd === "") return {success: false, error: "empty-item"};

    for (const item of lista.children){
        console.log(item.firstChild.textContent);
        if (item.firstChild.textContent.toLowerCase() === itemToAdd.toLowerCase()) {
            console.log("c'è già");
            return {success: false, error: "repeated-item"};
        }
    }

    return {success: true, error: ""};
}

function aggiungi(){    
    const item = item_input.value;

    is_aggiungibile = canAdd(item);
    if (!is_aggiungibile.success){
        handle_mistake(is_aggiungibile.error);
        return;
    }

    const nuovoItemLi = document.createElement("li");
    const nuovoItemSpan = document.createElement("span");
    nuovoItemSpan.textContent = item;

    const remove_btn   = document.createElement("button");
    remove_btn.textContent = "Rimuovi 🗑️";
    remove_btn.addEventListener("click", () => 
        {
            nuovoItemLi.remove();
        }
    );

    nuovoItemLi.appendChild(nuovoItemSpan);
    nuovoItemLi.appendChild(remove_btn);

    nuovoItemLi.addEventListener("click", () => 
        {
            nuovoItemLi.className = (nuovoItemLi.className === "done") ? "" : "done";         
        }
    )

    lista.appendChild(nuovoItemLi);

    item_input.value = ""
}

btn_aggiungi.addEventListener("click", aggiungi);