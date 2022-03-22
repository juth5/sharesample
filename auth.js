'user strict';
{
  window.onload = async() => {
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

    // ログイン状態に表示される要素
    let $signInStanBy = document.getElementById('signInStanBy');
    let $userNameWrap = document.getElementById('userNameWrap');


    auth.onAuthStateChanged((user) => {
      console.log(user,'uuuuuu');
      if(user){
        $signInStanBy.classList.add('hide');
        $logout.innerHTML = 'Logoutする';
      }
      else {
        $userNameWrap.classList.add('hide');
      }
    });

    // ログイン状態を調べる
    let isLogin = () => {
      let login;
      auth.onAuthStateChanged((user) => {
        login = user;
      });
      return login;
    };

    // アカウト登録のボタン
    $signInButton.addEventListener('click', async() => {
      if ($emailSignIn.value === '' || $passwordSignIn.value === '') return ;
      let email = $emailSignIn.value;
      let password = $passwordSignIn.value;
      await auth.createUserWithEmailAndPassword(email, password);
      location.reload();
    });

    // サインインのボタン
    $loginButton.addEventListener('click', async() => {
      let email = $emailLogin.value;
      let password = $passwordLogin.value;
      if (email === '' || password === '') return ;
      var result = await auth.signInWithEmailAndPassword(email, password);
      if (result.operationType === 'signIn') {
        $logout.innerHTML = 'Logoutする';
      }
    });

    // ログアウトボタン
    $logout.addEventListener('click', async() => {
      await auth.signOut();
      let result = await isLogin();
      console.log(result,'aaaaaa')
      if(!result) {
        $signInStanBy.classList.remove('hide');
        $logout.innerHTML = '未ログイン状態';
      }
    });

    // ニックネームの登録
    $nameButton.addEventListener('click', async() => {
      if ($userName.value === '') return ;
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