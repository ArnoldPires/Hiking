document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.querySelector("#add-trail-form");
  const updateForm = document.querySelectorAll("form.update-trail-form");
  const deleteBtn = document.querySelectorAll(".del");

  if (submitForm) {
    submitForm.addEventListener("submit", handleFormSubmit);
  }

  if (updateForm) {
    Array.from(updateForm).forEach((el) => {
      el.addEventListener("submit", updateTrail);
    });
  }

  if (deleteBtn) {
    Array.from(deleteBtn).forEach((el) => {
      el.addEventListener("click", deleteTrail);
    });
  }
});

// Show a notification if required fields haven't been filled
function handleFormSubmit(event) {
  const required = ["name", "description", "file"];
  const inputs = event.target.querySelectorAll("input[name], textarea[name]");
  const errors = [];

  for (const input of inputs) {
    const isRequired = required.includes(input.name);
    const isEmpty = input.value === "";

    if (isRequired && isEmpty) {
      errors.push(input.name);
    }
  }

  if (errors.length > 0) {
    event.preventDefault(); // Prevent form from submitting
    if (errors.includes("lat") || errors.includes("lon")) {
      notify(`Error, please select a location on the map`);
    } else {
      // Image is called 'file' so we need to replace it
      const fileIndex = errors.indexOf("file");
      if (fileIndex !== -1) {
        errors[fileIndex] = "image";
      }

      notify(
        `Error, the following fields cannot be empty: ${errors.join(", ")}`
      );
    }
  }
}

function notify(text) {
  const notification = document.querySelector(".notification");

  notification.textContent = text;
  notification.classList.add("show");
  setTimeout(
    () => {
      notification.classList.remove("show");
    },
    5000,
    notification
  );
}

// Update submitted persons
async function updateTrail(event) {
  event.preventDefault(); // Prevent post request

  const fields = Array.from(
    event.target.querySelectorAll("input[name], textarea[name], select[name]")
  );
  const trailIndex = fields.findIndex((field) => field.name === "id");
  const trailId = fields.splice(trailIndex, 1)[0].value;
  const requestBody = Object.fromEntries(
    fields.map((field) => {
      return [field.name, field.value];
    })
  );

  try {
    const response = await fetch(`/trails/updateTrail/${trailId}`, {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    location.replace(`/trails/${trailId}`);
  } catch (err) {
    console.error(err);
  }
}

// Delete submitted persons
/*/deletePerson/:id */
async function deleteTrail(event) {
  const trail = event.currentTarget.closest("[data-id]");
  const trailId = trail.dataset.id;
  const page = new URL(window.location);

  try {
    const response = await fetch(`/trails/deleteTrail/${trailId}`, {
      method: "DELETE",
    });
    const data = await response;

    // If deleted on person page there is no page to redirect to
    if (page.pathname.startsWith("/trails/")) {
      location.replace("/profile");
    } else {
      location.reload();
    }
  } catch (err) {
    console.error(err);
  }
}

// document.querySelector('#frank').addEventListener('click', getFrank)
// function getFrank() {
//   document.querySelector('#hikingName').innerText = 'Franklin Park'
//   document.querySelector("img").src =
//     "https://static.rootsrated.com/image/upload/s--HX5uh39U--/t_rr_large_natural/ncqynhuu8sooxuzzumye.jpg";
//   document.querySelector("#location").innerText = "Location: Boston MA, Franklin Park";
//   document.querySelector("#difficultly").innerText = " Difficultly: Moderate";
//   document.querySelector("#length").innerText = "Length: 2.3 Miles";
//   document.querySelector("#routeType").innerText = "Route Type: Loop";
//   document.querySelector("#description").innerText = "Franklin Park is a 2.3 mile moderately trafficked loop trail located near Dorchester, Massachusetts that features a lake. The trail is rated as moderate and is primarily used for hiking, walking, running, and road biking. Dogs are also able to use this trail";
// }

// document.querySelector("#carson").addEventListener("click", getcarson);
// function getcarson() {
//   document.querySelector("#hikingName").innerText = "Carson Beach";
//   document.querySelector("img").src =
//     "https://upload.wikimedia.org/wikipedia/commons/1/16/Carson_Beach%2C_South_Boston.jpg";
//   document.querySelector("#location").innerText =
//     "Location: Carson Beach, Boston, MA";
//   document.querySelector("#difficultly").innerText = " Difficultly: Easy";
//   document.querySelector("#length").innerText = "Length: 3.1 Miles";
//   document.querySelector("#routeType").innerText = "Route Type: Out & Back";
//   document.querySelector("#description").innerText =
//     "Carson Beach via Boston Harbor Walk is a 3.1 mile lightly trafficked out and back trail located near South Boston Naval Annex, Massachusetts that offers scenic views and is good for all skill levels. The trail is primarily used for walking, running, and road biking. Dogs are also able to use this trail but must be kept on a leash.";
// }

// document.querySelector("#melnea").addEventListener("click", getmelnea);
// function getmelnea() {
//   document.querySelector("#hikingName").innerText = "Melnea Cass Bike Path";
//   document.querySelector("img").src =
//     "http://www.masspaths.net/photos/sbht2006/IMG_0020.JPG";
//   document.querySelector("#location").innerText =
//     "Location: Melnea Cass Bike Path, Boston, MA";
//   document.querySelector("#difficultly").innerText = " Difficultly: Easy";
//   document.querySelector("#length").innerText = "Length: 1.9 Miles";
//   document.querySelector("#routeType").innerText = "Route Type: Out & Back";
//   document.querySelector("#description").innerText =
//     "Melnea Cass Bike Path is a 1.9 mile out and back trail located near Boston, Massachusetts and is good for all skill levels. The trail is primarily used for walking, running, and road biking";
// }

// document.querySelector("#kids").addEventListener("click", getkids);
// function getkids() {
//   document.querySelector("#hikingName").innerText = "Downtown Boston Kids Walk";
//   document.querySelector("img").src =
//     "https://redtri.com/wp-content/uploads/2020/11/Downtown-Boston-Kids-Walk.jpg?w=605";
//   document.querySelector("#location").innerText =
//     "Location: Belvidere Parking Garage, Boston, MA";
//   document.querySelector("#difficultly").innerText = " Difficultly: Easy";
//   document.querySelector("#length").innerText = "Length: 1.7 Miles";
//   document.querySelector("#routeType").innerText = "Route Type: Point to Point";
//   document.querySelector("#description").innerText =
//     "Downtown Boston Kids Walk is a 1.7 mile moderately trafficked point to point trail located near Boston, Massachusetts that features beautiful wild flowers and is good for all skill levels. The trail is primarily used for walking, nature trips, and bird watching and is best used from March until October. Dogs are also able to use this trail but must be kept on a leash.";
// }
