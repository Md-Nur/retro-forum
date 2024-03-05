const allPostsContainer = document.getElementById("allBlogContainer");
const readingHistoryContainer = document.getElementById(
  "readingHistoryContainer"
);
const readingCount = document.getElementById("readingCount");
let countOfReading = 0;

const allPosts = async () => {
  const url = "https://openapi.programming-hero.com/api/retro-forum/posts";
  const response = await fetch(url);
  const data = await response.json();
  for (let i = 0; i < data.posts.length; i++) {
    const post = data.posts[i];
    const postContainer = document.createElement("div");
    postContainer.classList =
      "flex rounded-xl shadow-xl p-5 bg-gray-100 hover:bg-blue-50 w-full gap-5 m-5";

    postContainer.innerHTML = `
    <div class="avatar">
    <div class="w-16 h-16 rounded-xl">
      <img
        src=${post.image}
      />
    </div>
  </div>
  <div class="text-justify space-y-3 w-full">
    <p class="text-sm">
      #${post.category} &MediumSpace;<span>Author: Awlad Hossen</span>
    </p>
    <h3 class="font-bold text-justify">${post.title}</h3>
    <p class="text-sm text-gray-700">
      ${post.description}
    </p>
    <hr />
    <div class="flex justify-between flex-wrap">
      <div class="flex gap-3">
        <p
          class="flex gap-2 justify-center items-center text-gray-700"
        >
          <img src="./icons/comment.svg" />${post.comment_count}
        </p>
        <p
          class="flex gap-2 justify-center items-center text-gray-700"
        >
          <img src="./icons/eye.svg" />${post.view_count}
        </p>
        <p
          class="flex gap-2 justify-center items-center text-gray-700"
        >
          <img src="./icons/clock.svg" />${post.posted_time}min
        </p>
      </div>
      <button id="read${i}"><img src="./icons/read.svg" /></button>
    </div>
  </div>
        `;
    allPostsContainer.appendChild(postContainer);

    const readingButton = document.getElementById(`read${i}`);
    readingButton.addEventListener("click", () => {
      countOfReading++;
      readingCount.innerHTML = countOfReading;
      const readingHistoryPost = document.createElement("div");
      readingHistoryPost.classList =
        "flex text-justify items-center gap-5 p-5 bg-white rounded-xl my-3";
      readingHistoryPost.innerHTML = `
    <h5 class="font-bold">${post.title}</h5>
    <p class="flex gap-2 justify-center items-center text-gray-700 w-20">
      <img src="./icons/eye.svg" />${post.view_count}</p>
    </p>
    `;

      readingHistoryContainer.appendChild(readingHistoryPost);
    });
  }
};

allPosts();
