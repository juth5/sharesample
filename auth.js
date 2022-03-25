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

    // ニックネームの表示箇所
    let $nickname = document.getElementById('nickname');

    let $signInButton = document.getElementById('signInButton');
    let $loginButton = document.getElementById('loginButton');
    
    // ログアウトボタン
    let $logout = document.getElementById('logout');

    // ログイン状態に表示される要素
    let $signInStanBy = document.getElementById('signInStanBy');
    let $userNameWrap = document.getElementById('userNameWrap');

    // sync
    let $cover = document.getElementById('cover');

    auth.onAuthStateChanged(async(user) => {
      if(user){
        $signInStanBy.classList.add('hide');
        $logout.innerHTML = 'Logoutする';
        let result = await db.collection('user').doc(user.uid).get();
        let name = result.data().name;
        $nickname.innerHTML = name;
      }
      else {
        $userNameWrap.classList.add('hide');
        $nickname.innerHTML = '名無しさん';
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
      let result = await auth.createUserWithEmailAndPassword(email, password);
      await db.collection('user').doc(result.user.uid).set({
        name: '名無しさん',
      });
      $emailSignIn.value = '';
      $passwordSignIn.value = '';

      $userNameWrap.classList.add('show');
    });

    // サインインのボタン
    $loginButton.addEventListener('click', async() => {
      let email = $emailLogin.value;
      let password = $passwordLogin.value;
      if (email === '' || password === '') return ;
      var result = await auth.signInWithEmailAndPassword(email, password);
      if (result.operationType === 'signIn') {
        $emailLogin.value = '';
        $passwordLogin.value = '';
        $logout.innerHTML = 'Logoutする';
        $userNameWrap.classList.remove('hide');

      }
    });

    // ログアウトボタン
    $logout.addEventListener('click', async() => {
      await auth.signOut();
      debugger;
      let result = await isLogin();
      if(!result) {
        $signInStanBy.classList.remove('hide');
        $userNameWrap.classList.remove('show');
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
      $cover.classList.add('show');
      try {
        await db.collection('user').doc(name).set({
          name: $userName.value,
        });
      
        let result = await db.collection('user').doc(name).get();
        result = result.data().name;
        $nickname.innerHTML = result;
      }
      catch {
        console.log(e,'error');
      }
      finally {
        $cover.classList.remove('show');
        $userName.value = '';
      }
    });
  }
}