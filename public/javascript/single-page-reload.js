// Fixed url have using the comment link
setTimeout(() => {
  const commentUrl = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (commentUrl === '#comments') {
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 2
    ];

    const newUrl = '/blog/post/' + id;
    history.replaceState({}, '', newUrl);
  }
}, 0);
