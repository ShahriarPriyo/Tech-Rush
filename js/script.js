document.addEventListener('DOMContentLoaded', () => {
    const postList = document.getElementById('post-list');
    const postDetail = document.getElementById('post-detail');
    const backButton = document.getElementById('back-button');

    // Fetch and display blog posts
    fetch('data/blogs.json')
        .then(response => response.json())
        .then(blogs => {
            blogs.forEach(blog => {
                const postCard = document.createElement('div');
                postCard.className = 'post-card';
                postCard.innerHTML = `
                    <h3>${blog.title}</h3>
                    <p>${blog.content.substring(0, 100)}...</p>
                    <button onclick="viewPost(${blog.id})">Read More</button>
                `;
                postList.appendChild(postCard);
            });
        });

    // View post details
    window.viewPost = (id) => {
        fetch('data/blogs.json')
            .then(response => response.json())
            .then(blogs => {
                const blog = blogs.find(blog => blog.id === id);
                localStorage.setItem('blog', JSON.stringify(blog));
                window.location.href = 'blog.html';
            });
    };

    // Display post details if on blog.html
    if (postDetail) {
        const blog = JSON.parse(localStorage.getItem('blog'));
        if (blog) {
            document.getElementById('post-title').innerText = blog.title;
            document.getElementById('post-content').innerText = blog.content;
        }
    }

    // Back to home button
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});
