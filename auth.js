'user strict';
{
  window.onload = () => {
    let auth = firebase.auth();

    let $emailSignIn = document.getElementById('emailSignIn');
    let $passwordSignIn = document.getElementById('passwordSignIn');

    // ログインの際に参照する
    let $emailLogin = document.getElementById('emailLogin');
    let $passwordLogin = document.getElementById('passwordLogin');
    

    let $signInButton = document.getElementById('signInButton');
    let $loginButton = document.getElementById('loginButton');
    
    // アカウト登録のボタン
    $signInButton.addEventListener('click', async() => {
      if ($emailSignIn.value === '' || $passwordSignIn.value === '') return ;
      let email = $emailSignIn.value;
      let password = $passwordSignIn.value;

      await auth.createUserWithEmailAndPassword(email, password);
      auth.onAuthStateChanged((user) => {
        console.log(user.uid,'aaaaaaa')
      });
    });

    // サインインのボタン
    $loginButton.addEventListener('click', async() => {
      let email = $emailLogin.value;
      let password = $passwordLogin.value;
      await auth.signInWithEmailAndPassword(email, password);
      auth.onAuthStateChanged((user) => {
        console.log(user,'aaaaaaa');
      });
    });

  }
}