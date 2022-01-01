async function addPostFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#content').value.trim();
  const postAlert = document.querySelector('#post-alert');

  if (title === '' || content === '') {
    postAlert.style.display = 'block';
    return;
  } else {
    postAlert.style.display = 'none';
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
