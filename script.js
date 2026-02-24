const breachList = document.getElementById("breachList");
const searchInput = document.getElementById("searchInput");
const yearFilter = document.getElementById("yearFilter");

let breaches = [];

async function loadBreaches() {
    const res = await fetch("https://haveibeenpwned.com/api/v3/breaches");
    const data = await res.json();
    breaches = data;
    populateYears(breaches);
    renderBreaches(breaches);
}

function populateYears(data) {
    const years = new Set(
        data.map(b => new Date(b.BreachDate).getFullYear())
  );

  [...years]
    .sort((a, b) => b - a)
    .forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearFilter.appendChild(option);
    });
}

function renderBreaches(data) {
    breachList.innerHTML = "";
    data.forEach(breach => {
        const div = document.createElement("div");
        div.className = "breach";
        div.innerHTML = `
            <h3>${breach.Title}</h3>
            <p><strong>Date:</strong> ${breach.BreachDate}</p>
            <p><strong>Compromised:</strong> ${breach.DataClasses.join(", ")}</p>
            `;
        breachList.appendChild(div);
  });
}

function filterBreaches() {
    const query = searchInput.value.toLowerCase();
    const year = yearFilter.value;

    let filtered = breaches.filter(b =>
        b.Title.toLowerCase().includes(query)
    );

    if (year !== "all") {
        filtered = filtered.filter(
        b => new Date(b.BreachDate).getFullYear().toString() === year
        );
  }

    renderBreaches(filtered);
}

searchInput.addEventListener("input", filterBreaches);
yearFilter.addEventListener("change", filterBreaches);

loadBreaches();

/*const statusEl = document.getElementById("status");

async function loadBreaches() {
    try {
        statusEl.textContent = "Loading breaches…";
        const res = await fetch("https://haveibeenpwned.com/api/v3/breaches");
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();

        breaches = data;
        populateYears(breaches);
        renderBreaches(breaches);
        statusEl.textContent = `Loaded ${breaches.length} breaches.`;
    } catch (err) {
        statusEl.textContent = "⚠️ Could not load breach data. Try again later.";
    }
}*/

/* div.innerHTML = `
    <h3>${breach.Title}</h3>
    <p><strong>Date:</strong> ${breach.BreachDate}</p>
    <button class="details-btn">View details</button>
    <div class="details hidden">
        <p><strong>Domain:</strong> ${breach.Domain || "N/A"}</p>
        <p><strong>Compromised:</strong> ${breach.DataClasses.join(", ")}</p>
        <p>${breach.Description}</p>
    </div>
`;

document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const details = btn.nextElementSibling;
        details.classList.toggle("hidden");
        btn.textContent = details.classList.contains("hidden")
        ? "View details"
        : "Hide details";
    });
});

document.getElementById("totalCount").textContent = breaches.length;

*/

