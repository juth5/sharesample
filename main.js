'user strict';
{
  window.onload = () => {
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
        div.innerHTML = doc.data().created_at;
        $ul.appendChild(list);
        $ul.appendChild(div);
      });
    });

    $button.addEventListener('click', async() => {
      await collection.add({
        message: $input.value,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
      });
      location.reload();
    });

  }
}