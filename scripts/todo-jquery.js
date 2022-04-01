// Happy coding!
// Happy coding!

// Asociar un event 'submit' al formulario. Vamos a añadir un hijo con toda la estrctura HTML necesaria

$('form').submit((e) => {

    // sabemos que se ha disparado el evento submit y podemos recoger el valor del input
    e.preventDefault();

    // utilizamos la clase FormData y le pasamos el formulario. 
    const formData = new FormData(e.target);

    // Tenemos un objeto que nos da un método .get para obtener el valor de un campo del formulario. 
    const value = formData.get('addTodo');

    console.log("Valor del input", value);

    // RETO: Usad Jquery para añadir este HTML como hijo de id="todos"
    // JQuery : mirar 'append'

    // BONUS: Limpiadme el input donde hemos la tarea. Mirar método .val()

    const newTodo = `
    <label class="list-item">
        <div class="list-item__container">
            <span>${value}</span>
        </div>
    <span class="button button-text">Remove</span>
    </label>
`;

    $('#todos').append(newTodo);

    $('[name="addTodo"]').val('');

})

// Todo lo que se cree dinámicamente en el contenedor id=todos; asóciale este evento
// Burbujeame hasta el label, que es el contenedor de del todo doble clicado
$('#todos').on('dblclick', 'label', (e) => {

    // en e.currentTarget tenemos el contenedor del 'todo'
    const todo = e.currentTarget;

    // Desde este elemento del DOM búscame el primer <span> y cámbiale la clase 'list-item__done'

    $(todo).find('div').toggleClass("list-item__done");

});

// Cada vez que se crea un todo, asociar el evento click al boton
$('#todos').on('click', 'span.button', (e) => {

    // Desde el botón pulsado, buscame su padre y elíminalo del DOM
    $(e.target).parent().remove();
});

//Gestionar 'Hide completed'
$('#hide-completed').change(e => {
    // acceder al valor del checkbox
    const mustHideCompleted = e.target.checked;

    // Método JQuery que se llama 'filter' 

    // Desde todos los elementos del DOM que tiene la clase .list-item; filtramos todos aquellos que cumplan la condición de la función de callback

    // Todos los .list-item que tengan un hijo del tipo de span y que tenga la clase list-item__done; ocúltamelos 
    console.log("Debo ocultar?: ", mustHideCompleted);

    // Reto: Cuando mustHideCompleted vale false , mostradme todos los todos (hay que ejecutar el método .show())

    if (mustHideCompleted) {

        $('.list-item').filter(function (index, elem) {
            return $(elem).find("div").hasClass("list-item__done");
        }).hide();
    }


    else {
        $('.list-item').show();
    }

})

$('#filter-todo').keyup(e => {

    const textToFilter = e.target.value;
    console.log('textFilteR: ', textToFilter)

    // Utilizamos el find de JQuery para mostrar .show() todo los elementos .list-item que cumplan con la condición que el texto de su <span> sea una subcadena (includes) del texto de 'textToFilter'

    // PISTA: usar el método .text() que da el contenido textual de un nodo y luego usar el includes

    $('.list-item').filter(function (index, elem) {
        return $(elem).text().includes(textToFilter);
    }).show();

    // Utilizamos el find de JQuery para ocultar .hide() todo los elementos .list-item que NO cumplan con la condición que el texto de su <span> sea una subcadena (includes) del texto de 'textToFilter' 

    $('.list-item').filter(function (index, elem) {
        return !$(elem).text().includes(textToFilter);
    }).hide();


});