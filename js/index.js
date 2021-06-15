const container = document.querySelector('.blogs');
const searchForm = document.querySelector('.search');

const renderPosts = async (term) =>{ //Receiving the search term as an argument from the search section
    
    let uri = 'http://localhost:3000/posts';

    //? If we want to sort the posts in descending order on the basis of likes then use this 
    //* 👉 let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';

    //🎯 If the renderPosts function gets any argument then we are adding that term to the end of our URI  
    if (term) {
        uri += `?q=${term}`
    }

    let response = await fetch(uri);
    let posts = await response.json();

    let template = '';
    posts.forEach(post => {
        template += `
        <div class="post">
        <h2>${post.title}</h2>
        <p><small>${post.likes} likes!</small></p>
        <p>${post.body.slice(0, 200)}...</p>
        <a href="/details.html?id=${post.id}">Read More...</a>
        </div>
        `
    });

    container.innerHTML = template;
}

//Search ➡ On enter press the value that we get from the search bar will be sent as an argument to the renderPosts function 🏹 
searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    renderPosts(searchForm.term.value.trim());
})

//Add an event listener DOMContentLoaded to the window & call the renderPosts function 
window.addEventListener('DOMContentLoaded', ()=> renderPosts());