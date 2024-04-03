<script>
function copyToClipboard(text) {
  const el = document.createElement('textarea');
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}
</script>

# TweetTalk
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

#### You can test the TweetTalk yourself: [Click Here](https://tweettalk.netlify.app/login)

This is a real-time chat application built using React and Firebase, enabling users to communicate with their friends in real-time.

## Features

- **Real-time Communication**: Users can chat with their friends in real-time, with messages instantly appearing for all participants.
- **User Authentication**: Firebase Authentication is integrated to provide secure sign-in methods for users.
- **User-Friendly Interface**: The user interface is intuitive and easy to use, allowing users to focus on their conversations without unnecessary distractions.
- **Data Persistence**: Messages are stored securely in Firebase Firestore, ensuring that users can access their chat history even after closing the application.
- **Customization**: Users can customize their profiles with avatars and display names to personalize their chat experience.open.
