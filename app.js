// User Authentication
function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (username && password) {
        localStorage.setItem(username, password);
        alert('Registration successful!');
        showLogin();
    } else {
        alert('Please enter username and password');
    }
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (localStorage.getItem(username) === password) {
        sessionStorage.setItem('user', username);
        showMain();
    } else {
        alert('Invalid username or password');
    }
}

function logout() {
    sessionStorage.removeItem('user');
    showAuth();
}

// Display functions
function showRegister() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'block';
}

function showLogin() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function showMain() {
    document.getElementById('auth').style.display = 'none';
    document.getElementById('main').style.display = 'block';
    loadPosts();
}

function showAuth() {
    document.getElementById('main').style.display = 'none';
    document.getElementById('auth').style.display = 'block';
}

// Post functions
function post() {
    const content = document.getElementById('postContent').value;
    const user = sessionStorage.getItem('user');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    if (content) {
        posts.push({ user, content, likes: 0, comments: [] });
        localStorage.setItem('posts', JSON.stringify(posts));
        document.getElementById('postContent').value = '';
        loadPosts();
    } else {
        alert('Please enter some content');
    }
}

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <p>${post.user}: ${post.content}</p>
            <div class="likes">
                <span>${post.likes} likes</span>
                <button onclick="likePost(${index})">Like</button>
            </div>
            <div class="comments">
                <input type="text" id="comment-${index}" placeholder="Add a comment">
                <button onclick="commentPost(${index})">Comment</button>
            </div>
            <div class="commentList">
                ${post.comments.map(comment => `<div class="comment">${comment.user}: ${comment.text}</div>`).join('')}
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

function likePost(index) {
    const posts = JSON.parse(localStorage.getItem('posts'));
    posts[index].likes++;
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPosts();
}

function commentPost(index) {
    const commentText = document.getElementById(`comment-${index}`).value;
    const user = sessionStorage.getItem('user');
    const posts = JSON.parse(localStorage.getItem('posts'));

    if (commentText) {
        posts[index].comments.push({ user, text: commentText });
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    } else {
        alert('Please enter a comment');
    }
}

// Initialize
if (sessionStorage.getItem('user')) {
    showMain();
} else {
    showAuth();
}
