// <!--7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .-->
// <!--8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)-->


let urlString = 'https://jsonplaceholder.typicode.com/posts'
let url = new URL(urlString);
let search = new URL(location.href);
let idSearch = search.searchParams.get('postId');
let urlPosts = new URL (urlString + '/' + idSearch);

let postInfo = document.createElement('div');
postInfo.id = 'postInfo';
let comm = document.createElement('div');
comm.id = 'divForComm';
fetch(urlPosts)
    .then(value => value.json())
    .then(value => {
        let valuesOfPosts= Object.values(value);
        let keysOfPosts= Object.keys(value);
        let ul = document.createElement('ul');
        for (let item=0; item<valuesOfPosts.length; item++) {
            let li = document.createElement('li')
            if (typeof valuesOfPosts[item] === 'object') {
                li.append(keysOfPosts[item] + ': ' + Object.values(valuesOfPosts[item]));
            } else {
                li.append(keysOfPosts[item] + ': ' + valuesOfPosts[item]);
            }
            ul.append(li);
        }
        postInfo.append(ul);
    });
fetch(urlPosts + '/comments')
    .then(value => value.json())
    .then(value => {
        for (let comment of value) {
            let valuesOfComments = Object.values(comment);
            let keysOfComments = Object.keys(comment);
            let ul = document.createElement('ul');
            ul.id = 'ulComm';
            for (let item = 0; item < valuesOfComments.length; item++) {
                let li = document.createElement('li')
                    li.append(keysOfComments[item] + ': ' + valuesOfComments[item]);
                ul.append(li);
            }
            comm.append(ul);
        }
    });
document.body.append(postInfo);
document.body.append(comm);

