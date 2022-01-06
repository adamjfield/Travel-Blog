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
document.getElementById('upload_widget').addEventListener(
  'click',
  function () {
    myWidget.open();
  },
  false
);

async function addPostFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#content').value.trim();
  const postBlankAlert = document.querySelector('#post-alert');

  if (title === '' || content === '') {
    postBlankAlert.style.display = 'block';
    return;
  } else {
    postBlankAlert.style.display = 'none';
  }

  let response_post = await fetch('/api/posts', {
    method: 'post',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response_post.json();

  if (response_post.ok) {
    let response = await fetch('/image/image', {
      method: 'post',
      body: JSON.stringify({
        images: addedImages,
        post_id: result.id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response) {
      document.location.replace('/dashboard');
    } else {
      document.location.replace('/dashboard');
    }
  } else {
    alert(response_post.statusText);
  }
}

document
  .querySelector('.new-post-form')
  .addEventListener('submit', addPostFormHandler);
