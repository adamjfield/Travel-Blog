async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#updated-post-title').value.trim();
  const content = document.querySelector('#updated-post-content').value.trim();
  const postBlankAlert = document.querySelector('#post-alert');

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (title === '' || content === '') {
    postBlankAlert.style.display = 'block';
    return;
  } else {
    postBlankAlert.style.display = 'none';
  }

  const response = await fetch(`/api/posts/${id}`, {
    method: 'put',
    body: JSON.stringify({
      post_id: id,
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
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);
