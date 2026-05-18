import { renderUploadImageComponent } from "./upload-image-component.js";
import { renderHeaderComponent } from "./header-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <div class="add-post-form">
        <p class="form-title">Добавить новый пост</p>
        <div class="upload-image-container"></div>
        <input class="input" id="post_desc" placeholder="Описание">
        <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    let imageUrl = "";
    const uploadImageContainer = appEl.querySelector(".upload-image-container");
    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: uploadImageContainer,
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: document
          .getElementById("post_desc")
          .value.replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;"),
        imageUrl: imageUrl,
      });
    });
  };

  render();
}
