-- 1. Брой на потребители.
select count(id) from users;

-- 2. Най-стария потребител.
select * from users 
order by birthDate limit 1;

-- 3. Най-младия потребител.
select * from users 
order by birthDate desc limit 1;

-- 4. Колко юзъра са регистрирани с мейли от abv и колко от gmail и колко с различни от двата.
select 
(select count(id) from users where email like '%@abv.%') as abvEmails,
(select count(id) from users where email like '%@gmail.%') as gmailEmails,
(select count(id) from users where email not like '%@abv.%' and email not like '%@gmail.%') as otherEmails;

-- 5. Кои юзъри са banned.
select * from users 
where isBanned IN (1);

-- 6. Изкарайте всички потребители от базата като ги наредите по име в азбучен ред и дата на раждане(от най-младия към най-възрастния).
select id, username, birthDate from users
order by username, birthDate desc;

-- 7. Изкарайте всички потребители от базата, на които потребителското име започва с a.
select * from users 
where username like 'a%';

-- 8. Изкарайте всички потребители от базата, които съдържат а username името си.
select * from users 
where username like '%a%';

-- 9. Изкарайте всички потребители от базата, чието име се състои от 2 имена.
select *
from users 
where username like '_% %_' and username not like '_% _% _%' and username not like ' _%';


-- 10. Регистрирайте 1 юзър през UI-а и го забранете след това от базата.
Update users
set isBanned=1
where username='dejavu';

-- 11. Брой на всички постове.
select 
(select count(id) from posts) as posts_count;

-- 12. Брой на всички постове групирани по статуса на post-a.
select 
(select count(id) from posts
where postStatus='private') as posts_count_private,
(select count(id) from posts
where postStatus='public') as posts_count_public;

select count(id), postStatus from posts 
group by postStatus;

-- 13. Намерете поста/овете с най-къс caption.
select id, caption from posts 
where char_length(caption) = (select min(char_length(caption)) from posts);

-- 14. Покажете поста с най-дълъг caption.
select id, caption from posts 
where char_length(caption) = (select max(char_length(caption)) from posts);

-- 15. Кой потребител има най-много постове. Използвайте join заявка
select count(postId), userId from (select posts.userId as userId, posts.id as postId from posts
inner join users on posts.userId=users.id) as a
group by userId
order by count(postId) desc limit 1;

-- 16. Кои потребители имат най-малко постове. Използвайте join заявка.
select count(postId) as postCount, userId from
(select posts.userId as userId, posts.id as postId from posts
inner join users on posts.userId=users.id) as a
group by userId
order by postCount;

SELECT userId, postCount from 
(select count(postId) as postCount, userId from
(select posts.userId as userId, posts.id as postId from posts
inner join users on posts.userId=users.id) as a
group by userId
order by postCount) as r
where postCount IN (select min(postCount) from posts);

-- min(count(postId)) from posts;

-- 17. Колко потребителя с по 1 пост имаме. Използвайте join заявка, having clause и вложени заявки.
-- select count(postId), userId from
select postsCount, count(userId) as number_of_users_with_one_post from  
(select count(postId) as postsCount, userId from  (select posts.userId as userId, posts.id as postId from posts inner join users on posts.userId=users.id) as a 
 group by userId having count(postId)=1) as h group by postsCount;

-- 18. Колко потребителя с по малко от 5 поста имаме. Използвайте join заявка, having clause и вложени заявки
select postsCount, count(userId) as number_of_users_with_less_than_five_posts from  
(select count(postId) as postsCount, userId from  (select posts.userId as userId, posts.id as postId from posts inner join users on posts.userId=users.id) as a 
 group by userId having count(postId)<5) as h 
 group by postsCount;
 
 select count(userId) as number_of_users_with_less_than_five_posts from  
(select count(postId) as postsCount, userId from 
(select posts.userId as userId, posts.id as postId from posts 
inner join users on posts.userId=users.id) as a 
 group by userId having count(postId)<5) as h;
 
 -- 19. Кои са постовете с най-много коментари. Използвайте вложена заявка и where clause.
select id, commentsCount 
from posts 
where commentsCount=(select MAX(commentsCount) as max_comments from posts);

-- 20. Покажете най-стария пост. Може да използвате order или с aggregate function.
select id, createdAt from posts 
where createdAt=(select MIN(createdAt) as oldest from posts);

-- 21. Покажете най-новия пост. Може с order или с aggregate function.
select id, createdAt from posts
where createdAt=(select Max(createdAt) as newest from posts);

-- 22. Покажете всички постове с празен caption.
select * from posts
where caption LIKE '' OR ' '; 

-- 23. Създайте потребител през UI-а, добавете му public пост през базата и проверете дали се е създал през UI-а.
-- wildberries, wildberries@abv.bg
insert into posts (caption, coverUrl, postStatus, userId)
values ('New post for zakachka 23', 'https://i.imgur.com/ZGSyI.jpg', 'public', (select users.id as userId from users where username='wildberries'));

-- 24. Покажете всички постове и коментарите им ако имат такива.
select posts.id as postId, posts.caption, posts.postStatus, comments.id as commentId, comments.content 
from posts
left join comments on  posts.id=comments.postId;

-- 25. Покажете само постове с коментари и самите коментари.
select posts.id as postId, posts.caption, posts.postStatus, comments.id as commentId, comments.content 
from posts
inner join comments on  posts.id=comments.postId;

select posts.id as postId, posts.caption, posts.postStatus, comments.id as commentId, comments.content 
from posts
inner join comments on  posts.id=comments.postId
where content not like '' and content not like ' ';

-- 26. Покажете името на потребителя с най-много коментари. Използвайте join клауза.
select count(comments.id) as commentId, comments.userId, users.username from comments
join users on users.id=comments.userId
group by userId
order by commentId desc limit 1;

-- 27. Покажете всички коментари, към кой пост принадлежат и кой ги е направил.Използвайте join клауза.
 select comments.postId, comments.id as commentId ,comments.content, users.username, users.id as userId 
 from comments 
 join users on comments.userId=users.id;
 
-- 28. Кои потребители са like-нали най-много постове.
select count(postsId) as number_of_liked_posts, usersId from users_liked_posts
group by usersId
order by count(postsId) desc;

-- 29. Кои потребители не са like-вали постове.
select username, id, likedPosts from
(select username, users.id, users_liked_posts.postsId as likedPosts  from users
left join users_liked_posts on users.id=users_liked_posts.usersId) as a
 where likedPosts is null;

-- 30. Кои постове имат like-ове. Покажете id на поста и caption.
select postsId, caption
from users_liked_posts
inner join posts on posts.id=users_liked_posts.postsId;
-- where caption not like '' and caption not like ' ' 

-- 31. Кои постове имат най-много like-ове. Покажете id на поста и caption.
select count(usersId) as liked_by_number_of_users, postsId, caption from users_liked_posts
inner join posts on posts.id=users_liked_posts.postsId
group by postsId
order by count(usersId) desc;

-- 32. Покажете всички потребители, които не follow-ват никого.
select username, id 
from users 
where id not in (select usersId_1 from users_followers_users);

-- 33. Покажете всички потребители, които не са follow-нати от никого.
select username, id 
from users 
where id not in (select usersId_2 from users_followers_users);

-- 34. Регистрирайте потребител през UI. Follow-нете някой съществуващ потребител и проверете дали записа го има в базата.
-- nqma go
