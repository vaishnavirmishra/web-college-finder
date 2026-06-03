let courses = [];
let editId = null;

/* =========================
   ADD COURSE
========================= */
function addCourseTemp() {

  const course = document.getElementById("courseInput").value;

  if (course) {
    courses.push(course);
    document.getElementById("courseInput").value = "";
    renderCourses();
  }
}

/* =========================
   SHOW COURSES
========================= */
function renderCourses() {

  const list = document.getElementById("courseList");
  list.innerHTML = "";

  courses.forEach((c, i) => {
    list.innerHTML += `
      <li>
        ${c}
        <button onclick="removeCourse(${i})">X</button>
      </li>
    `;
  });
}

/* =========================
   REMOVE COURSE
========================= */
function removeCourse(i) {
  courses.splice(i, 1);
  renderCourses();
}

/* =========================
   SAVE / UPDATE COLLEGE
========================= */
function addCollege() {

  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const category = document.getElementById("category").value;

  const data = {
    name,
    location,
    imageUrl,
    category,
    courses
  };

  const id = name.replace(/\s/g, "_").toLowerCase();

  if (editId) {
    db.collection("colleges").doc(editId).update(data)
      .then(() => {
        alert("Updated Successfully");
        resetForm();
      });
  } else {
    db.collection("colleges").doc(id).set(data)
      .then(() => {
        alert("Saved Successfully");
        resetForm();
      });
  }
}

/* =========================
   LOAD / READ (SHOW LIST)
========================= */
function loadData() {

  db.collection("colleges").onSnapshot(snapshot => {

    const list = document.getElementById("list");
    const count = document.getElementById("count");

    list.innerHTML = "";
    count.innerText = snapshot.size;

    snapshot.forEach(doc => {

      const d = doc.data();

     list.innerHTML += `
  <div class="card">

    <h3>${d.name}</h3>
    <p>${d.location}</p>
    <small>${d.category}</small>

    <hr>

    <b>Courses:</b>
    <div class="course-tags">
      ${d.courses && d.courses.length > 0 
        ? d.courses.map(c => `<span class="tag">${c}</span>`).join("")
        : "No courses"}
    </div>

    <br>

    <button onclick="editCollege('${doc.id}')">Edit</button>
    <button onclick="deleteCollege('${doc.id}')">Delete</button>

  </div>
`;
    });

  });

}

/* =========================
   EDIT COLLEGE
========================= */
function editCollege(id) {

  db.collection("colleges").doc(id).get().then(doc => {

    const d = doc.data();

    document.getElementById("name").value = d.name;
    document.getElementById("location").value = d.location;
    document.getElementById("imageUrl").value = d.imageUrl;
    document.getElementById("category").value = d.category;

    courses = d.courses || [];
    renderCourses();

    editId = id;
  });

}

/* =========================
   DELETE COLLEGE
========================= */
function deleteCollege(id) {

  if (confirm("Delete this college?")) {
    db.collection("colleges").doc(id).delete();
  }
}

/* =========================
   RESET FORM
========================= */
function resetForm() {

  document.getElementById("name").value = "";
  document.getElementById("location").value = "";
  document.getElementById("imageUrl").value = "";

  courses = [];
  editId = null;

  renderCourses();
}

/* =========================
   INIT
========================= */
loadData();