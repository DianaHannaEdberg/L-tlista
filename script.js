let songList = document.getElementById("songList"); 
let saveNewSong = document.getElementById("saveNewSong");
let saveSongBtn = document.getElementById("saveSongBtn");

const artistInput = document.getElementById("artistInput");
const titleInput = document.getElementById("titleInput");
const yearInput = document.getElementById("yearInput");

const songIdInput = document.getElementById("songIdInput");
const getSongBtn = document.getElementById("getSongBtn");
const specificSongDiv = document.getElementById("specificSong");

let editingSongId = null; 

// GET ALL
function printSong() {
songList.innerHTML = "";

    fetch("http://localhost:3000/song")
    .then(res => res.json())
    .then(data => {
        
        data.map(song => {
            console.log(song.title);

            let li = document.createElement("li")
           li.innerText = `${song.title } ${song.artist} ${song.year}`;   

            songList.appendChild(li) 

            /* // DELETE

            let deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Radera"; 

            deleteBtn.addEventListener("click", () => {
                console.log("Radera låt: ", song.id); 

                fetch("http://localhost:3000/song/" + song.id, {
                    method: "DELETE"
                })
                .then(res => res.json)
                .then(data => console.log("delete", data ))
            })
            li.appendChild(deleteBtn);  */
            
        })
    })
   
}


// SPARA LÅTEN - SAVE 
 printSong();  

saveSongBtn.addEventListener("click", () => {
    console.log("klick på knapp", saveNewSong.value);

    fetch("http://localhost:3000/song", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        artist: artistInput.value,
        title: titleInput.value,
        year: yearInput.value
})
    })
    .then(res => res.json())
    .then(data => {
        console.log("data", data);
        printSong();
            artistInput.value = "";
    titleInput.value = "";
    yearInput.value = "";
    })
})
  const newSong = {
        artist: artistInput.value,
        title: titleInput.value,
        year: yearInput.value };

        artistInput.value = "";
        titleInput.value = "";
        yearInput.value = "";
 
// hämta en låt - GET SPECIFIC
getSongBtn.addEventListener("click", async () => {
    const selectedId = songIdInput.value;

    if (!selectedId) {
        specificSongDiv.textContent = "Välj en låt!";
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/song/${selectedId}`);
        if (!response.ok) throw new Error("Finns inte på listan");
        const song = await response.json();

        specificSongDiv.innerHTML = `
            <p><strong>ID:</strong> ${song.id}</p>
            <p><strong>Artist:</strong> ${song.artist}</p>
            <p><strong>Titel:</strong> ${song.title}</p>
            <p><strong>År:</strong> ${song.year}</p>
        `;
    } catch (error) {
        specificSongDiv.textContent = error.message;
    }
});

function printSong() {
    songList.innerHTML = "";

    fetch("http://localhost:3000/song")
        .then(res => res.json())
        .then(data => {
            data.forEach(song => {
                let li = document.createElement("li");
                li.innerText = `${song.title} ${song.artist} ${song.year} `;

                // DELETE-knapp
                let deleteBtn = document.createElement("button");
                deleteBtn.innerText = "Radera";
                deleteBtn.addEventListener("click", () => {
                    fetch(`http://localhost:3000/song/${song.id}`, { method: "DELETE" })
                        .then(res => res.json())
                        .then(() => printSong());
                }); 
            

              // ÄNDRA-knapp
              
               let editBtn = document.createElement("button");
                editBtn.innerText = "Ändra";

                editBtn.addEventListener("click", () => {
                    console.log("ändra låt", song.id);

                    printSong(song.id); 
                    
                    fetch("http://localhost:3000/song/" + song.id, {
                    method: "PUT",
                    headers: {
                    "Content-Type": "application/json"
            },
                    body: JSON.stringify({
                    artist: artistInput.value,
                    title: titleInput.value,
                    year: yearInput.value})
                })
                .then(res => res.json)
                .then(data => console.log("PUT", data ))
            })
       
                li.appendChild(deleteBtn);
                li.appendChild(editBtn);
                songList.appendChild(li);  

            });
        });
}
    

            

   
    
