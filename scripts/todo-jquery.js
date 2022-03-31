// estado
let todos = [];
let hideCompleted = false;

// asociar evento submit
$('form').submit((e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('addTodo');
    addTodo(value);
});

function addTodo(value) {

    const id = uuidv4();

    const newTodo = `
    <label id="${id}" class="list-item">
        <div class="list-item__container">
            <span>${value}</span>
        </div>
    <button onclick="removeItem(event,'${id}')" class="button button-text">Remove</button>
    </label>
`;

    todos.push({
        id,
        value,
        done: false
    });

    $('#todos').append(newTodo);

    $("[name=addTodo]").val("");

};

$('#todos').on('dblclick', 'label', (e) => {

    todos = todos.map(todo => {
        if (todo.id == e.currentTarget.id) {
            return {
                ...todo,
                done: !todo.done
            }
        }
    });

    $(e.currentTarget).find("span").toggleClass("list-item__done");


});

function removeItem(event, id) {


    return; // TODO
    if (event.target.nodeName != "BUTTON") {
        return;
    }

    todos = todos.filter(todo => todo.id != id);

    $(`#${id}`).remove();
};

$('#hide-completed').click(() => {

    hideCompleted = !hideCompleted;

    if (!hideCompleted) {
        $('.list-item').show();
    }

    else {
        console.log("hide completed");
        $('.list-item').filter(function (index, elem) {
            console.log($(elem).find("span"))
            return $(elem).find("span").hasClass("list-item__done");
        }).hide();
    }

});

document.querySelector('#filter-todo').oninput = ((e) => {

    $('.list-item').filter(function (index, elem) {
        return !$(elem).text().includes(e.target.value);
    }).hide();

    $('.list-item').filter(function (index, elem) {
        return $(elem).text().includes(e.target.value);
    }).show();

})


