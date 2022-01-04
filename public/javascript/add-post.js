var addedImages = [];
var myWidget = cloudinary.createUploadWidget({ cloudName: 'dbbxaadyd', uploadPreset: 'ml_default'}, async(error, result) => {
  console.log(result)
  if (!error && result && result.event === "success") { 
    //console.log('Done! Here is the image info: ', result.info); 
    console.log('Url : ' + result.info.url)
    addedImages.push(result.info.url);    
  } 
  else {console.log(error)} 
})
document.getElementById("upload_widget").addEventListener("click", function(){
myWidget.open(); }, false);

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
  const result = await response_post.json()
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
