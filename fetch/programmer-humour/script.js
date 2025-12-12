
async function getXKCD() {
  try {
    const response = await fetch("https://xkcd.now.sh/?comic=latest");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Received JSON:", data);

    const img = document.getElementById("comic");
    img.src = data.img;
    img.alt = data.title || "XKCD comic";

  } catch (error) {
    console.error("Error fetching XKCD:", error);
    alert("Error fetching XKCD comic. The API may be down.");
  }
}

getXKCD();
