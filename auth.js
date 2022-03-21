'user strict';
{
  window.onload = () => {
    let auth = firebase.auth();
    let db = firebase.firestore();

    // サインインの際に参照する
    let $emailSignIn = document.getElementById('emailSignIn');
    let $passwordSignIn = document.getElementById('passwordSignIn');
    
    // ログインの際に参照する
    let $emailLogin = document.getElementById('emailLogin');
    let $passwordLogin = document.getElementById('passwordLogin');
    
    // ニックネームの登録
    let $userName = document.getElementById('userName');
    let $nameButton = document.getElementById('nameButton');

    let $signInButton = document.getElementById('signInButton');
    let $loginButton = document.getElementById('loginButton');
    
    // ログアウトボタン
    let $logout = document.getElementById('logout');

    // アカウト登録のボタン
    $signInButton.addEventListener('click', async() => {
      if ($emailSignIn.value === '' || $passwordSignIn.value === '' || $userName.value === '') return ;
      let email = $emailSignIn.value;
      let password = $passwordSignIn.value;
      await auth.createUserWithEmailAndPassword(email, password);
    });

    // サインインのボタン
    $loginButton.addEventListener('click', async() => {
      let email = $emailLogin.value;
      let password = $passwordLogin.value;
      await auth.signInWithEmailAndPassword(email, password);
    });

    // ログアウトボタン
    $logout.addEventListener('click', async() => {
      await auth.signOut();
    });

    // ニックネームの登録
    $nameButton.addEventListener('click', async() => {
      if($userName.value === '') return ;
      let name = '';
      await auth.onAuthStateChanged((user) => {
        name = user.uid;
      });
      await db.collection('user').doc(name).set({
        name: $userName.value,
      });
      $userName.value = '';
    });

  }
}