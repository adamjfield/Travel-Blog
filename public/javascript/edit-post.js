var addedImages = [];
var myWidget = cloudinary.createUploadWidget(
  { cloudName: 'dbbxaadyd', uploadPreset: 'ml_default' },
  async (error, result) => {
    if (!error && result && result.event === 'success') {
      addedImages.push(result.info.url);
      let removeContainer = document.querySelector('#uploaded-images');
      removeContainer.remove();
      let imageContainer = document.createElement('div');
      imageContainer.setAttribute('id', 'uploaded-images');
      for (let i = 0; i < addedImages.length; i++) {
        let image = addedImages[i];
        const imgPreview = document.querySelector('.preview-images');

        let title = document.createElement('h2');
        title.textContent = 'New Photos';

        let imageLink = document.createElement('img');
        imageLink.setAttribute('src', image);
        imageLink.classList = 'img-thumbnail, img-preview';

        imgPreview.appendChild(imageContainer);
        imageContainer.appendChild(imageLink);
      }
    } else {
    }
  }
);

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
    let response = await fetch('/api/image', {
      method: 'post',
      body: JSON.stringify({
        images: addedImages,
        post_id: id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response) {
      document.location.replace('/dashboard');
    }
  } else {
    alert(response_post.statusText);
  }
}

document.getElementById('upload_widget').addEventListener(
  'click',
  function () {
    myWidget.open();
  },
  false
);

document
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);
