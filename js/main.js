/* variables */
let contactForm = document.querySelector("#contact")
let btnContact = document.querySelector("#contactSubmit")
let requiredElements = document.querySelectorAll("#contact form [required]")


/* ----------------------sliding images from contact section--------------------------------- */
let contactImg = document.querySelector("#contact img")
let counter = 1

setInterval(() => {
    contactImg.src = `./images/img-0${counter}.jpg`
    counter++
    if (counter === 4) {
        counter = 1
    }
}, 5000);



/*////////////////////////////////////////////////////////////////////////////////////////////////  */
                                            /* Events */
/*////////////////////////////////////////////////////////////////////////////////////////////////  */

/* CLICK */
document.addEventListener("click", (e) => {
    const t = e.target

    /* ADDING ACTIVE CLASS TO LINKS IN NAV*/
    if (t.matches("nav a")) {
        
        const links = document.querySelectorAll("nav a")
        /* first I make sure of eliminating the class "active" (because just one must have it, the one on which the user click*/
        links.forEach(a => {
            a.classList.remove("activeLink")  
        })
        t.classList.add("activeLink")
    }

    /* RED HEART */
    /* if user click on span which contains class "bi-heart", heart must get red*/
    if (t.classList.contains("bi-heart") || t.classList.contains("bi-heart-fill")) {
        t.classList.toggle("bi-heart")
        t.classList.toggle("bi-heart-fill")
        t.classList.toggle("red")
    }

    /* FORM PREVENT DEFAULT */
    /* to avoid btn behaivor submit  */
    if (t.matches("#contactSubmit")) {
        e.preventDefault()
    }

    if (t.matches("#resetBtn")) {
        e.preventDefault()
        const inputs = document.querySelectorAll("#contact input")
        const textarea = document.querySelector("#contact textarea")
        console.dir(textarea.value);
        console.log(textarea.value)
        inputs.forEach(input => input.value = "")
        textarea.value = ""
    }
})


/* INPUT */
document.addEventListener("input", (e) => {
    const t = e.target

     /* VALIDATING FORM */
    if (!t.checkValidity()) {
        t.classList.add("is-invalid")
    } else {
        t.classList.remove("is-invalid")
        requiredElements.forEach(input => input.removeAttribute("disabled", "true"))
    }


     /* first it must be cheked if the input before is required. If user is writing over an input and the one before this has the attribute "required* and that one is empty, the actual input must get attribut diseabled an the precede required input must show an alert span   */
    if (t.matches("#contact form [required]")) {

        for (let i = 0; i < requiredElements.length; i++){
            const firstInput = requiredElements[0]
            const actualInput = requiredElements[i];
            const precedeInput = requiredElements[i - 1];
          
            
            if (!(t === firstInput)) {
                if (i !== 0 && t === actualInput) {
                        if (precedeInput.value=== "" ) {
                           
                            t.setAttribute("disabled", "true")
                            t.value = ""
                            removeSpan()

                            requiredElements.forEach(input => input.classList.remove("is-invalid") )
                            /* the precede required input must show an alert span */
                            const serachSpanDisabled = document.querySelectorAll(".spanDisabled")
                            if (serachSpanDisabled.length===0) {
                                const spanDisabled = document.createElement("span")
                                spanDisabled.classList.add("spanDisabled")
                                spanDisabled.classList.add("red")
                                spanDisabled.classList.add("fsize")
                                spanDisabled.innerHTML = "Debe completar este Casillero"
                                precedeInput.insertAdjacentElement("beforebegin", spanDisabled)
                            }
                        } else if (t.value.length !== 0) {
                            removeSpan(t)
                        } 
                }
            } else {
                removeSpan()
             }
        }  
    } 
})


document.addEventListener("change", (e) => {
    const t = e.target

    /* showing btn submit if all chequed inputs are validated*/
    requiredElements.forEach(input => {
        if (input.value.length === 0 || input.classList.contains("is-invalid")){
            btnContact.classList.add("d-none")
            btnContact.classList.remove("d-block")
        } else {
            btnContact.classList.remove("d-none")
            btnContact.classList.add("d-block")
        }
    })
  
})



/*////////////////////////////////////////////////////////////////////////////////////////////////  */
                                            /* functions */
/*////////////////////////////////////////////////////////////////////////////////////////////////  */


function removeSpan() {
    const elimSpanDis = document.querySelectorAll(".spanDisabled")
    
    /* if there is an span, set fielset of this as parentNode, get the span child and eliminate it */
    if (elimSpanDis) {
        elimSpanDis.forEach(span => {
            const fieldset = span.parentNode
            const removeSpan = fieldset.querySelector(".spanDisabled")
            fieldset.removeChild(removeSpan)
        });
    }
}
