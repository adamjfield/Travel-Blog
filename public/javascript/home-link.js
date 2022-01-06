function homeLink() {
    document.location.replace('/')
}

document
  .querySelector('#logo')
  .addEventListener('click', homeLink);
