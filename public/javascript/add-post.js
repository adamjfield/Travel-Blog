var addedImages = [];
var myWidget = cloudinary.createUploadWidget(
  { cloudName: 'dbbxaadyd', uploadPreset: 'ml_default' },
  async (error, result) => {
    // console.log(result);
    if (!error && result && result.event === 'success') {
      //console.log('Done! Here is the image info: ', result.info);
      // console.log('Url : ' + result.info.url);
      addedImages.push(result.info.url);
      let removeContainer = document.querySelector('#uploaded-images');
      removeContainer.remove();
      let imageContainer = document.createElement('div');
      imageContainer.setAttribute('id', 'uploaded-images');
      for (let i = 0; i < addedImages.length; i++) {
        let image = addedImages[i];
        const postForm = document.querySelector('.new-post-form');


        let imageLink = document.createElement('a');
        imageLink.classList = 'image-link';
        imageLink.setAttribute('href', image);
        imageLink.setAttribute('target', '_blank');
        imageLink.textContent = 'Image ' + (i + 1);

        postForm.appendChild(imageContainer);
        imageContainer.appendChild(imageLink);
      }
    } else {
      // alert(response_post.statusText);
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

  let response_post = await fetch('api/posts', {
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
    let response = await fetch('./api/image', {
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
