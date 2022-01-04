async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector('#comment').value.trim();
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const commentBlankAlert = document.querySelector('#comment-alert');

  console.log(comment_text);


  if (comment_text === '') {
    commentBlankAlert.style.display = 'block';
    return;
  } else {
    commentBlankAlert.style.display = 'none';
  }

  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('#comment-form')
  .addEventListener('submit', commentFormHandler);
