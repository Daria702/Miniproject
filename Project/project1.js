// <!--1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users-->
// <!--2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.-->
// <!--3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html,
//     котра має детальну інфорацію про об'єкт на який клікнули-->

let urlString = 'https://jsonplaceholder.typicode.com/users'
let url = new URL(urlString);
fetch(url).then(value => value.json()).then(value => console.log(value));
fetch(urlString).then(value => value.json())
    .then(users => {
       for (let user of users) {
            let divObg = document.createElement('div');
            divObg.id = 'divObgIndex';
            let div = document.createElement('div');
            div.id = 'divIndex';
            let button = document.createElement('button');
            button.id = 'buttonIndex';
            let a = document.createElement('a');
            a.target = 'blank';
            div.innerText = user.id + " - " + user.name;
            a.innerText = "Подробніше";
            a.href  = './user-details.html?id=' + user.id;
            button.append(a);
            divObg.append(div);
            divObg.append(button);
            document.body.append(divObg);
            const  currentUrl = new URL(urlString);
            currentUrl.searchParams.append('id', user.id);
        }
    });