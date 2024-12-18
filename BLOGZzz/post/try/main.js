document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const markdownEditor = document.getElementById('markdownEditor');
    const submitPost = document.getElementById('submitPost');
    const postsContainer = document.getElementById('posts');
    const adminPanel = document.getElementById('admin-panel');
    const adminPosts = document.getElementById('admin-posts');

    let posts = [];

    // Preview image on upload
    imageUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    // Submit a new post
    submitPost.addEventListener('click', () => {
        const content = markdownEditor.value.trim();
        const imageSrc = imagePreview.src;

        if (!content) {
            alert('Please write some content!');
            return;
        }

        const newPost = {
            id: posts.length,
            content,
            imageSrc,
            likes: 0,
            comments: [],
        };

        posts.push(newPost);
        renderPosts();
        markdownEditor.value = '';
        imagePreview.style.display = 'none';
        imageUpload.value = '';
    });

    // Render all posts
    function renderPosts() {
        postsContainer.innerHTML = '';
        posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                ${post.imageSrc ? `<img src="${post.imageSrc}" alt="Post Image">` : ''}
                <div class="post-content">${parseMarkdown(post.content)}</div>
                <button onclick="likePost(${post.id})">Like (${post.likes})</button>
                <button onclick="toggleCommentSection(${post.id})">Comment</button>
                <div class="comment-section" id="comments-${post.id}" style="display: none;">
                    <input type="text" placeholder="Write a comment" id="comment-input-${post.id}">
                    <button onclick="addComment(${post.id})">Add Comment</button>
                    <div id="comment-list-${post.id}">${renderComments(post.comments)}</div>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Like a post
    window.likePost = (id) => {
        posts[id].likes++;
        renderPosts();
    };

    // Toggle comment section
    window.toggleCommentSection = (id) => {
        const commentSection = document.getElementById(`comments-${id}`);
        commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
    };

    // Add a comment
    window.addComment = (id) => {
        const commentInput = document.getElementById(`comment-input-${id}`);
        const commentText = commentInput.value.trim();
        if (commentText) {
            posts[id].comments.push(commentText);
            commentInput.value = '';
            renderPosts();
        }
    };

    // Render comments
    function renderComments(comments) {
        return comments.map((comment) => `<p>${comment}</p>`).join('');
    }

    // Parse Markdown (basic example)
    function parseMarkdown(text) {
        return text
            .replace(/# (.*?)\\n/g, '<h1>$1</h1>')
            .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
            .replace(/\\*(.*?)\\*/g, '<em>$1</em>')
            .replace(/\\n/g, '<br>');
    }

    // Admin Panel (example functionality)
    window.showAdminPanel = () => {
        adminPanel.style.display = 'block';
        adminPosts.innerHTML = posts
            .map(
                (post) => `
                <div class="post">
                    ${post.imageSrc ? `<img src="${post.imageSrc}" alt="Post Image">` : ''}
                    <div class="post-content">${post.content}</div>
                    <button onclick="deletePost(${post.id})">Delete Post</button>
                </div>
            `
            )
            .join('');
    };

    window.deletePost = (id) => {
        posts = posts.filter((post) => post.id !== id);
        renderPosts();
        showAdminPanel();
    };
});
