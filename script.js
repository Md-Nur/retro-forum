const allPostsContainer = document.getElementById("allBlogContainer");
const readingHistoryContainer = document.getElementById(
  "readingHistoryContainer"
);
const readingCount = document.getElementById("readingCount");
const latestPostContainer = document.getElementById("latestPostContainer");
const searchBtn = document.getElementById("searchBtn");
const searchInpt = document.getElementById("searchInpt");

let countOfReading = 0;
const allPosts = async (category) => {
  const url =
    "https://openapi.programming-hero.com/api/retro-forum/posts" + category;

  const loader = document.createElement("span");
  loader.classList = "loading loading-bars loading-lg";
  allPostsContainer.appendChild(loader);

  const loadingTime = setTimeout(() => {
    allPostsContainer.removeChild(loader);
  }, 2000);
  const response = await fetch(url);
  const data = await response.json();
  // allPostsContainer.removeChild(loader); // More efficient but out of rule


  for (let i = 0; i < data.posts.length; i++) {
    const post = data.posts[i];
    const postContainer = document.createElement("div");
    postContainer.classList =
      "flex rounded-xl shadow-xl p-2 md:p-5 bg-[#F3F3F5] hover:bg-[#797dfc1a] w-full gap-5 m-2 md:m-5 border-[#797dfc1a]-2 flex-col sm:flex-row";

    postContainer.innerHTML = `
  <div class="indicator">
    <span class="indicator-item badge badge-${
      post.isActive ? "success" : "error"
    }"></span> 
    <div class="avatar">
      <div class="w-16 h-16 rounded-xl">
        <img src=${post.image}/>
      </div>
    </div>
  </div>

  <div class="text-justify space-y-3 w-full">
    <p class="text-sm">
      #${post.category} &MediumSpace;Author: ${post.author.name}
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
        "flex text-justify items-center gap-5 p-2 md:p-5 bg-white rounded-xl my-3 flex-wrap sm:flex-nowrap";
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

allPosts("");

searchBtn.addEventListener("click", async () => {
  allPostsContainer.innerHTML = "";

  allPosts("?category=" + searchInpt.value);
});

const latestPost = async () => {
  const url =
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts";
  const response = await fetch(url);
  const data = await response.json();
  data.forEach((post) => {
    const postContainer = document.createElement("div");
    postContainer.classList = "card max-w-96 bg-base-100 shadow-xl m-2";
    postContainer.innerHTML = `
      <figure class="p-5">
        <img
          src=${post.cover_image}
          alt=${post.title}
          class="rounded-xl"
        />
      </figure>
      <div class="card-body -mt-7">
        <p class="flex text-gray-700 text-sm items-start gap-2">
          <img src="icons/date.svg" />
          ${
            post.author.posted_date
              ? post.author.posted_date
              : "No publish date"
          }
        </p>
        <h2 class="card-title">${post.title}</h2>
        <p class="text-gray-700">
         ${post.description}
        </p>
        <div class="flex gap-2 items-center">
          <figure class="rounded-full w-10 h-10">
            <img
              src=${post.profile_image}
            />
          </figure>
          <div>
            <p class="font-semibold">${
              post.author.name ? post.author.name : "Unknown"
            }</p>
            <p class="text-gray-600">${
              post.author.designation ? post.author.designation : "Unknown"
            }</p>
          </div>
        </div>
      </div>
  `;
    latestPostContainer.appendChild(postContainer);
  });
};

latestPost();
