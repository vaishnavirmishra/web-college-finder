let allColleges = [];

/* FETCH DATA */
db.collection("colleges").onSnapshot(snapshot => {

  allColleges = [];

  snapshot.forEach(doc => {
    allColleges.push({ id: doc.id, ...doc.data() });
  });

  render(allColleges);

});

/* RENDER */
function render(data) {

  const container = document.getElementById("collegeContainer");

  if (!container) return;

  container.innerHTML = "";

  data.forEach(d => {

    container.innerHTML += `
      <div class="college-card" onclick="openCollege('${d.id}')">

        <img src="${d.imageUrl || ''}" class="college-logo" onerror="this.style.display='none'">

        <h3>${d.name || ''}</h3>
        <p>${d.location || ''}</p>

      </div>
    `;

  });

}

/* OPEN DETAIL PAGE */
function openCollege(id) {
  window.location.href = `web_start/user1/college.html?id=${id}`;
}

/* SEARCH */
const searchBox = document.getElementById("searchBox");

if (searchBox) {

  searchBox.addEventListener("input", function () {

    const value = this.value.toLowerCase();

    const filtered = allColleges.filter(c =>
      (c.name || '').toLowerCase().includes(value)
    );

    render(filtered);

  });

}
