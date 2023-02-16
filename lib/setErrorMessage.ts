export const setErrorMessage = (error: any) => {
  let title,
    description;

  switch (error.code) {
    // add custom error message here
    case 'auth/username-exists':
      title = 'Username already in use';
      description = 'Please enter another username';
      break;

    case 'auth/email-already-in-use':
      title = 'Email already in use';
      description = 'The email you entered already exists.';
      break;

    case 'auth/too-many-requests':
      title = 'Too many attempts';
      description =
        'You have too many requests at the moment. Please try again later.';
      break;

    case 'auth/user-not-found':
      title = 'User not found';
      description =
        'The email you have entered is not yet registered. Please check your details and try again.';
      break;

    case 'auth/wrong-password':
      title = 'Incorrect password';
      description = 'You have entered a wrong password. Please try again.';
      break;

    case 'auth/requires-recent-login':
      title = 'Requires recent login';
      description = 'You need to logout and then login again to change password.';
      break;

    default:
      title = 'An error occurred.';
      description = error.message;
  }

  return { title, description };
};
