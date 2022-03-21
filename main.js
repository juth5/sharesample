'user strict';
{
  window.onload = () => {
    const db = firebase.firestore();
    const collection = db.collection('message');
    let $input = document.getElementById('input');
    let $button = document.getElementById('button');
    let $authBtn = document.getElementById('authbtn');
    let $ul = document.getElementById('ul');
    $input.focus();
    dayjs.locale('js');
    // dbを定義
    let auth = firebase.auth();
    let isUser;
    let userName;

    auth.onAuthStateChanged(async(user) => {
      if(user) {
        isUser = user.uid;
        // var result = await db.collection('user').doc(isUser).get();
        // userName = result.data().name;
      }
      getItem();

    });

    let getItem = async() => {
      // var result = await db.collection('user').doc(isUser).get();
      // let userName = result.data().name;
      // console.log(result.data().name,'ccccccccccc')
      await collection.orderBy('created_at', 'desc').get().then(snapshot => {
        snapshot.forEach(doc => {
          let list = document.createElement('li');
          let div = document.createElement('div');

          list.innerHTML = doc.data().message;
          let time = doc.data().created_at;
          let name = doc.data().name;
          time = dayjs(time).format('YYYY/MM/DD');
          div.innerHTML = time + '  ' + 'by' + '  ' + name;
          $ul.appendChild(list);
          $ul.appendChild(div);
        });
      });
    };
    // getItem();
    
    // データ取得の中身
    // collection.orderBy('created_at', 'desc').get().then(snapshot => {
    //   snapshot.forEach(doc => {
    //     let list = document.createElement('li');
    //     let div = document.createElement('div');
    //     list.innerHTML = doc.data().message;
    //     let time = doc.data().created_at;
    //     time = dayjs(time).format('YYYY/MM/DD');
    //     div.innerHTML = time + userName;
    //     $ul.appendChild(list);
    //     $ul.appendChild(div);
    //   });
    // });

    let randomEmoji = () => {
      let emojiArray = ['✨','👟','🏃‍♀️','🏃‍♂️','🏋️‍♂️','🚴‍♂️','🧘‍♂️','👍','😄','✌️','🎧'];
      let num = Math.floor(Math.random() * emojiArray.length);
      return emojiArray[num];
    };

    // 投稿の際のボタン
    $button.addEventListener('click', async() => {
      if ($input.value === '') return ;
      let emoji = randomEmoji();
      let time = new Date();
      time = time.getTime();

      if (isUser) {
        var result = await db.collection('user').doc(isUser).get();
        let userName = result.data().name;
        await collection.add({
          message: $input.value + emoji,
          created_at: time,
          name: userName,
        });
      }
      else {
        await collection.add({
          message: $input.value + emoji,
          created_at: time,
          name: '名無しさん',
        });
      }
      location.reload();
    });
  }
}