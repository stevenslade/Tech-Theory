const newFormHandler = async (event) => {
  event.preventDefault();

  const description = document.querySelector('#comment').value.trim();

  if (description) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({ description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/comment');
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-comment-form') //was '.new-comment-form'
  .addEventListener('submit', newFormHandler());