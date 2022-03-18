'user strict';
{
  window.onload = () => {
    dayjs.locale('js');
    // dbを定義
    const db = firebase.firestore();
    const collection = db.collection('message');
    let $input = document.getElementById('input');
    let $button = document.getElementById('button');
    let $ul = document.getElementById('ul');

    collection.get().then(snapshot => {
      snapshot.forEach(doc => {
        let list = document.createElement('li');
        let div = document.createElement('div');
        list.innerHTML = doc.data().message;
        let time = doc.data().created_at;
        time = dayjs(time).format('YYYY/MM/DD');
        div.innerHTML = time;
        $ul.appendChild(list);
        $ul.appendChild(div);
      });
    });

    $button.addEventListener('click', async() => {
      let time = new Date();
      time = time.getTime();
      await collection.add({
        message: $input.value,
        created_at: time,
      });
      location.reload();
    });
  }
}