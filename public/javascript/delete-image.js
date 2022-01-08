async function deleteImageFormHandler(clicked_id) {

  const response = await fetch(`/api/image/${clicked_id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}
