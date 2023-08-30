const newPost = document.getElementById('newPost');
const errorPost = document.getElementById('errorPost');

function createNewPost() {
    //Получаем значения из полей ввода
    const postTitleNew = document.getElementById('postTitle').value;
    const postTextNew = document.getElementById('postText').value;

    // Проверяем поля на заполненность
    errorPost.classList.remove("error-visible");
    if (postTitleNew === "" || postTextNew === "") {
        return;
    }
    errorPost.classList.add("error-visible");
    // Создаём и добавляем элементы поста в DOM
    let postContainer = document.createElement('div');
    let postTitle = document.createElement('p');
    let postText = document.createElement('p');

    postContainer.classList.add("newPost_container");
    postTitle.classList.add("newPost_title");
    postText.classList.add("newPost_text");
    // Создаём объект post, который содержит свойства `title` и `body` с значениями из полей ввода.
    const post = {
        title: postTitleNew,
        body: postTextNew,
    };

    // Выполняем POST-запрос
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(post),
    })
        .then(response => response.json())
        .then((responsePost) => {
            postTitle.textContent = responsePost.title;
            postText.textContent = responsePost.body;
            newPost.appendChild(postContainer);
            postContainer.appendChild(postTitle);
            postContainer.appendChild(postText);
            // Очищаем поля ввода
            document.getElementById('postTitle').value = '';
            document.getElementById('postText').value = '';
        })
        .catch(error => console.log(error));
}

document.getElementById('createPost').addEventListener('click', createNewPost);