// <!--4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули-->
// <!--5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера-->
// <!--(для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)-->
// <!--6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
// котра має детальну інфу про поточний пост.-->


let urlString = 'https://jsonplaceholder.typicode.com/users'
let search = new URL(location.href);
let idSearch = search.searchParams.get('id');
let urlUser = new URL (urlString + '/' + idSearch);
let urlPosts = new URL (urlString + '/' + idSearch + '/posts');

let userInfo = document.createElement('div');
userInfo.id = 'styleForUser';
fetch(urlUser)
    .then(value => value.json())
    .then(value => {
      let arrValuesOfUser = Object.values(value);
      let arrKeysOfUser= Object.keys(value);
      let ul = document.createElement('ul');
      for (let item=0; item<arrValuesOfUser.length; item++) {
          let li = document.createElement('li')
          if (typeof arrValuesOfUser[item] === 'object' && !Array.isArray(arrValuesOfUser[item])) {
              li.innerText = arrKeysOfUser[item] +':';
              let ul = document.createElement('ul')
              let newObj = Object.assign(arrValuesOfUser[item]);
              for (let items in newObj) {
                  let li = document.createElement('li');
                    if (typeof newObj[items] === 'object' && !Array.isArray(items)) {
                        li.innerText = items;
                        let ull = document.createElement('ul');
                        let newNewObj = Object.assign(newObj[items]);
                            for (let itemsItem in newNewObj) {
                                let lii = document.createElement('li');
                                lii.append(`${itemsItem} : ${newNewObj[itemsItem]}`);
                                ull.append(lii);
                            }
                        li.append(ull)
                        ul.append(li);
                    } else {
                        li.append(`${items}:  ${newObj[items]}`);
                        ul.append(li);
                    }
              }
              li.append(ul);
          } else {
              li.append(arrKeysOfUser[item] + ': ' + arrValuesOfUser[item]);
          }
          ul.append(li);
      }
        userInfo.append(ul);
    });

let button = document.createElement('button');
button.id = 'buttonUsers';
button.innerText = 'Post of current user';
button.onclick = () => {
        fetch(urlPosts)
            .then(value => value.json())
            .then(value => {
                let posts = document.createElement('div');
                posts.id = 'posts';
                for (let post of value) {
                    let a = document.createElement('a');
                    a.id = 'postsUsers';
                    a.innerText = post.title;
                    a.href = './post-details.html?postId=' + post.id;
                    posts.append(a);
                    const  currentUrl2 = new URL(urlPosts);
                    currentUrl2.searchParams.append('postId', post.id);
                }
                document.body.append(posts)
            });
}
document.body.append(userInfo);
document.body.append(button);


