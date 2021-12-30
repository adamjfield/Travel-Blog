async function addPostFormHandler(event) {
  event.preventDefault();

  const postTitle = document.querySelector('#post-title').value.trim();
  const postText = document.querySelector('#post-text').value.trim();
  const alert = document.querySelector('#post-alert');

  if (postTitle === '' || postText === '') {
    alert.style.display = 'block';
    return;
  } else {
    alert.style.display = 'none';
  }

  const response = await fetch('api/posts', {
    method: 'post',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.new-post-form')
  .addEventListener('submit', addPostFormHandler);
