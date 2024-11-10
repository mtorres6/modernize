document.addEventListener( "DOMContentLoaded" , function () {
    formInputValidity();
});

/**
 * Add error class to input field on Blur event
 */
function formInputValidity() {
    const inputs = document.querySelectorAll( ".custom-input" );

    if ( inputs ) {
        inputs.forEach(input => {    
            input.addEventListener( "blur" , function () {
                if (!input.checkValidity()) {
                    input.classList.add( "error");
                } else {
                    input.classList.remove( "error" );
                }
            });
        });
    }
}

/**
 * Form Submit interaction
 */
const form = document.querySelector( ".form" );
const inputs = document.querySelectorAll( ".custom-input" );
async function handleSubmit( event ) {
    event.preventDefault();

    const name = document.querySelector("#name");
    const phone = document.querySelector("#phone");
    const email = document.querySelector("#email");
    const city = document.querySelector("#city");
    const state = document.querySelector("#state");

    if (!name.checkValidity() || !phone.checkValidity() || !email.checkValidity()) {

        !name.checkValidity() ? name.classList.add( "error" ) : name.classList.remove( "error" );

        !phone.checkValidity() ? phone.classList.add( "error" ) : phone.classList.remove( "error" );

        !email.checkValidity() ? email.classList.add( "error" ) : email.classList.remove( "error" );

        return;
    } else {
        console.log("Submitting form...");
        console.log("Data sent:");

        const btnForm = document.querySelector(".btn-form");
        btnForm.disabled = true;
        btnForm.setAttribute( "value", "Submitted" );
        btnForm.classList.add("sent");

        const data = new FormData();
        data.append("name", name.value);
        data.append("phone", phone.value);        
        data.append("email", email.value);        

        !city.value ? data.append( "city", "Not specified" ) : data.append("city", city.value );

        !state.value ? data.append( "state", "Not specified" ) : data.append("state", state.value );

        data.forEach((value, key) => {
            console.log('- ' + `${key}: ${value}`);
        });

        const url = 'https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar';

        fetch( url , {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then( response => {
            if ( response.ok ) {
                console.log( response ); 
                console.log( "You are a winner!" );
                form.reset();

            } else {
                console.log( response );
            }
        }).catch( error => {
            console.log( "Error: " + error );
            form.reset();
        });
    }
}

form.addEventListener( "submit", handleSubmit);