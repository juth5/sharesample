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
    // dbãå®ç¾©
    let auth = firebase.auth();
    let isUser;
    let userName;

    auth.onAuthStateChanged(async(user) => {
      if(user) {
        isUser = user.uid;
      }
      getItem();
    });

    let getItem = async() => {
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

    let randomEmoji = () => {
      let emojiArray = ['â¨','ð','ðââï¸','ðââï¸','ðï¸ââï¸','ð´ââï¸','ð§ââï¸','ð','ð','âï¸','ð§'];
      let num = Math.floor(Math.random() * emojiArray.length);
      return emojiArray[num];
    };

    // æç¨¿ã®éã®ãã¿ã³
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
          name: 'åç¡ããã',
        });
      }
      location.reload();
    });
  }
}