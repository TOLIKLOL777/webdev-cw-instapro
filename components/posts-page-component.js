import { formatDistanceToNow } from "https://esm.run/date-fns/formatDistanceToNow";
import { ru } from "https://esm.run/date-fns/locale/ru";
import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, initLikesButton } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  console.log("Актуальный список постов:", posts);
  const commentsEl = document.getElementById("posts");
  let user = JSON.parse(window.localStorage.getItem("user"));
  console.log(posts[0].likes);
  const posts_list = posts
    .map((post, index) => {
      const createdAt = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
        locale: ru,
      });
      return `<li class="post">
          <div class="post-header" data-user-id="${post.user.id}">
              <img src="${post.user.imageUrl}" class="post-header__user-image">
              <p class="post-header__user-name">${post.user.name}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${index}" class="like-button">
              <img src="${post.isLiked ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"}">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${post.likes.length}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
            ${post.description}
          </p>
          <p class="post-date">
            ${createdAt}
          </p>
        </li>`;
    })
    .join("");

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <ul class="posts">${posts_list}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  initLikesButton(user);
}

export function renderUserPostsPageComponent({ appEl }) {
  console.log("Актуальный список постов:", posts);
  const commentsEl = document.getElementById("posts");
  let user = JSON.parse(window.localStorage.getItem("user"));

  const posts_list = posts
    .map((post, index) => {
      const createdAt = formatDistanceToNow(new Date(post.createdAt), {
        addSuffix: true,
        locale: ru,
      });
      return `<li class="post">
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${index}" class="like-button">
              <img src="${post.isLiked ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"}">
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${post.likes.length}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${post.user.name}</span>
            ${post.description}
          </p>
          <p class="post-date">
            ${createdAt}
          </p>
        </li>`;
    })
    .join("");

  const appHtml = `
              <div class="page-container">
                <div class="header-container"></div>
                <p class="user-page-title">Посты пользователя</p>
                <div class="user-page-header">
                  <img src="${posts[0].user.imageUrl}" class="user-page-header__user-image">
                  <p class="user-page-header__user-name">${posts[0].user.name}</p>
                </div>
                <ul class="posts">${posts_list}
                </ul>
              </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  initLikesButton(user);
}
