const SITE = {
  name: "Illyas – Course Hub",
  author: "Mohamed Illyas",
  tagline: "Course materials, notes, assignments & blog updates",
  email: "illyas@crescent.education", // optional
  institute: "Mecahnical Engineering / B S Abdur Rahman Crescent Institute of science and technology",
};

const COURSES = [
  {
    code: "MED 30",
    title: "Heat and Mass Transfer",
    term: "Odd Sem 2025",
    instructor: "Mohamed Illyas",
    materials: [
      { type:"Notes", title:"new_notes (PDF)", file:"materials/new_notes.pdf" },
      { type:"PPT", title:"Conduction Slides", file:"materials/conduction-slides.pdf" },
      { type:"Assignment", title:"Assignment 1", file:"materials/assignment-1.pdf" },
    ]
  },
  {
    code: "SE302",
    title: "Solar Energy Engineering",
    term: "Even Sem 2026",
    instructor: "Mohamed Illyas",
    materials: [
      { type:"Notes", title:"Solar Radiation – Notes", file:"materials/solar-radiation-notes.pdf" },
      { type:"Lab", title:"Experiment Sheet", file:"materials/solar-lab.pdf" },
    ]
  }
];

const POSTS = [
  {
    id: "welcome",
    title: "Welcome + How to use this site",
    date: "2026-02-14",
    tags: ["update","guide"],
    excerpt: "Where to find notes, assignments, and how I’ll post announcements here.",
    content: `
      <p>This is my course hub. You’ll find:</p>
      <ul>
        <li><b>Courses</b> → notes, PPTs, assignments, lab sheets</li>
        <li><b>Blog</b> → announcements, deadlines, and weekly updates</li>
      </ul>
      <p>Tip: Bookmark the Courses page and check Blog for updates.</p>
    `
  }
];

function $(sel){ return document.querySelector(sel); }
function setActiveNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a=>{
    if(a.getAttribute("href") === path) a.classList.add("active");
  });
}

function renderHeader(){
  const el = $("#siteHeader");
  if(!el) return;
  el.innerHTML = `
    <div class="nav">
      <div class="brand">
        <div class="logo"></div>
        <div>
          <h1>${SITE.name}</h1>
          <p>${SITE.tagline}</p>
        </div>
      </div>
      <div class="navlinks">
        <a class="pill" data-nav href="index.html">Home</a>
        <a class="pill" data-nav href="course.html">Courses</a>
        <a class="pill" data-nav href="blog.html">Blog</a>
      </div>
    </div>
  `;
  setActiveNav();
}

function renderHome(){
  const el = $("#home");
  if(!el) return;

  const latest = POSTS.slice().sort((a,b)=> b.date.localeCompare(a.date))[0];

  el.innerHTML = `
    <div class="hero">
      <h2>${SITE.tagline}</h2>
      <p>Central place for <b>materials</b> + <b>updates</b>. Fast, clean, and easy to maintain.</p>
      <div class="meta">
        <span class="badge">Author: ${SITE.author}</span>
        <span class="badge">Institute: ${SITE.institute}</span>
        <span class="badge">Last update: ${latest ? latest.date : "—"}</span>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <h3>Quick links</h3>
        <div class="list">
          <div class="item">
            <div class="top">
              <div class="title">Courses & Materials</div>
              <span class="tag">PDF / PPT / Docs</span>
            </div>
            <div class="desc">All notes, assignments, and lab sheets sorted course-wise.</div>
            <div class="links">
              <a class="btn" href="course.html">Open Courses</a>
              <a class="btn secondary" href="blog.html">See Updates</a>
            </div>
          </div>
        </div>
        <hr class="sep"/>
        <p class="small">To add files: put them in <b>/materials</b> and add an entry in <b>COURSES</b> inside <b>assets/site.js</b>.</p>
      </div>

      <div class="card">
        <h3>Latest post</h3>
        ${
          latest ? `
          <div class="item">
            <div class="top">
              <div class="title">${latest.title}</div>
              <span class="tag">${latest.date}</span>
            </div>
            <div class="desc">${latest.excerpt}</div>
            <div class="links">
              <a class="btn" href="post.html?id=${latest.id}">Read post</a>
            </div>
          </div>` : `<p class="small">No posts yet.</p>`
        }
        <hr class="sep"/>
        <div class="kv">
          <div>Email</div><div>${SITE.email || "—"}</div>
          <div>Site</div><div>illyas.com (custom domain)</div>
        </div>
      </div>
    </div>

    <div class="footer">© ${new Date().getFullYear()} ${SITE.author} • Built as a static site (easy hosting)</div>
  `;
}

function renderCourses(){
  const el = $("#courses");
  if(!el) return;

  const courseCards = COURSES.map(c=>{
    const mats = c.materials.map(m=>`
      <div class="item">
        <div class="top">
          <div class="title">${m.title}</div>
          <span class="tag">${m.type}</span>
        </div>
        <div class="links">
          <a class="btn" href="${m.file}" download>Download</a>
          <a class="btn secondary" href="${m.file}" target="_blank" rel="noreferrer">Open</a>
        </div>
      </div>
    `).join("");

    return `
      <div class="card">
        <h3>${c.code} • ${c.title}</h3>
        <p>${c.term} • Instructor: ${c.instructor}</p>
        <hr class="sep"/>
        <div class="list">${mats || `<p class="small">No materials uploaded yet.</p>`}</div>
      </div>
    `;
  }).join("");

  el.innerHTML = `
    <div class="hero">
      <h2>Courses</h2>
      <p>All course materials are grouped here. Add PDFs into <b>/materials</b> and update <b>assets/site.js</b>.</p>
    </div>
    <div class="grid" style="grid-template-columns:1fr">
      ${courseCards}
    </div>
    <div class="footer">Tip: Keep filenames short (no spaces) for clean links.</div>
  `;
}

function renderBlog(){
  const el = $("#blog");
  if(!el) return;

  const q = $("#search")?.value?.trim().toLowerCase() || "";
  const filtered = POSTS
    .slice()
    .sort((a,b)=> b.date.localeCompare(a.date))
    .filter(p=>{
      if(!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.join(" ").toLowerCase().includes(q)
      );
    });

  el.innerHTML = `
    <div class="hero">
      <h2>Blog / Updates</h2>
      <p>Announcements, deadlines, weekly plans, and course notices.</p>
      <div style="margin-top:14px">
        <input id="search" class="input" placeholder="Search posts by title / tag (e.g., deadline, unit 2)..." value="${q}">
        <div class="small" style="margin-top:8px">Posts are stored in <b>POSTS</b> inside <b>assets/site.js</b>.</div>
      </div>
    </div>

    <div class="card" style="margin-top:16px">
      <h3>All posts</h3>
      <div class="list">
        ${
          filtered.length ? filtered.map(p=>`
            <div class="item">
              <div class="top">
                <div class="title">${p.title}</div>
                <span class="tag">${p.date}</span>
              </div>
              <div class="desc">${p.excerpt}</div>
              <div class="links">
                ${p.tags.map(t=>`<span class="tag">#${t}</span>`).join(" ")}
                <a class="btn" href="post.html?id=${p.id}">Read</a>
              </div>
            </div>
          `).join("") : `<p class="small">No matching posts.</p>`
        }
      </div>
    </div>

    <div class="footer">Note: This is public if hosted as a static site. For private access, use Netlify/Cloudflare access controls.</div>
  `;

  $("#search")?.addEventListener("input", renderBlog, { once:true });
}

function renderPost(){
  const el = $("#post");
  if(!el) return;

  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const post = POSTS.find(p=>p.id===id) || POSTS[0];

  el.innerHTML = `
    <div class="hero">
      <h2>${post.title}</h2>
      <p>${post.excerpt}</p>
      <div class="meta">
        <span class="badge">${post.date}</span>
        ${post.tags.map(t=>`<span class="badge">#${t}</span>`).join("")}
      </div>
    </div>

    <div class="card" style="margin-top:16px">
      ${post.content}
      <hr class="sep"/>
      <a class="btn secondary" href="blog.html">← Back to Blog</a>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", ()=>{
  renderHeader();
  renderHome();
  renderCourses();
  renderBlog();
  renderPost();

});
