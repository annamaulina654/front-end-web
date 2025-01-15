import Swal from "sweetalert2";
import "./loading-spinner.js";

const apiUrl = "https://notes-api.dicoding.dev/v2";

class NoteList extends HTMLElement {
  constructor() {
    super();
    this.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    this.showArchived = false;
  }

  async connectedCallback() {
    await this.loadNotes();
  }

  async loadNotes() {
    const loadingSpinner = document.createElement("loading-spinner");
    this.appendChild(loadingSpinner);
    try {
      let url = this.showArchived
        ? `${apiUrl}/notes/archived`
        : `${apiUrl}/notes`;
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        const notes = data.data;
        this.render(notes);
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat memuat catatan. Silakan coba lagi",
        "error",
      );
    } finally {
      const spinner = this.querySelector("loading-spinner");
      if (spinner) {
        spinner.remove();
      }
      this.setupEventListeners();
    }
  }

  render(notes) {
    notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    this.innerHTML = "";

    const noteContainer = document.createElement("div");
    noteContainer.classList.add("note-item");

    const noteItems = notes.map((note) => {
      let filterDesc = note.body.replaceAll("\n", "<br/>");
      let date = new Date(note.createdAt);
      let formattedDate = `${
        this.months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;

      const li = document.createElement("li");
      li.classList.add("note");

      li.innerHTML = `
        <div class="details">
          <p>${note.title}</p>
          <span>${filterDesc}</span>
        </div>
        <div class="bottom-content">
          <span>${formattedDate}</span>
          <div class="settings">
            <i class="uil uil-ellipsis-h"></i>
            <ul class="menu">
              <li><i class="uil uil-trash"></i>Hapus</li>
              <li>${
                note.archived
                  ? '<i class="uil uil-folder-upload"></i>'
                  : '<i class="uil uil-folder-download"></i>'
              }${note.archived ? "Buka arsip" : "Arsipkan"}</li>
            </ul>
          </div>
        </div>
      `;

      li.addEventListener("click", (event) => {
        const isClickInsideSettings = event.target.closest(".settings");
        if (!isClickInsideSettings) {
          this.getSingleNote(note.id);
        }
      });

      li.querySelector(".menu li:nth-child(1)").addEventListener(
        "click",
        (event) => {
          event.stopPropagation();
          this.deleteNote(note.id);
          event.target.closest(".settings").classList.remove("show");
        },
      );

      li.querySelector(".menu li:nth-child(2)").addEventListener(
        "click",
        (event) => {
          event.stopPropagation();
          this.toggleArchive(note.id, note.archived);
          event.target.closest(".settings").classList.remove("show");
        },
      );

      return li;
    });

    noteItems.forEach((li) => noteContainer.appendChild(li));
    this.appendChild(noteContainer);
  }

  setupEventListeners() {
    const addBox = document.querySelector(".add-box");
    addBox.addEventListener("click", () => {
      this.showAddPopup("Tambah Catatan", "Tambah");
    });

    const closeIcon = document.querySelector(".popup-box header i");
    closeIcon.addEventListener("click", () => {
      this.hidePopup();
    });

    const settingsIcons = this.querySelectorAll(".settings i");
    settingsIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        this.showMenu(icon);
      });
    });

    const addBtn = document.querySelector("form");
    addBtn.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveNote();
      this.hidePopup();
    });

    const showArchivedBtn = document.querySelector("#show-archived");
    showArchivedBtn.addEventListener("click", () => {
      this.showArchived = true;
      showArchivedBtn.style.display = "none";
      showArchivedBtn.innerText = "Back";
      document.querySelector("#back-to-main").style.display = "block";
      addBox.style.display = "none";
      this.loadNotes();
    });

    const backToMainBtn = document.querySelector("#back-to-main");
    backToMainBtn.addEventListener("click", () => {
      window.location.reload();
    });
  }

  showAddPopup(titleText, buttonText) {
    const popupBox = document.querySelector(".popup-box");
    const popupTitle = document.querySelector(".popup-box header p");
    const addBtn = document.querySelector(".popup-box button");
    const body = document.querySelector("body");
    const titleTag = document.querySelector(".popup-box input");
    const descTag = document.querySelector(".popup-box textarea");

    popupTitle.innerText = titleText;
    addBtn.innerText = buttonText;
    popupBox.classList.add("show");
    body.style.overflow = "hidden";

    if (window.innerWidth > 660) {
      titleTag.focus();
    }
  }

  hidePopup() {
    const popupBox = document.querySelector(".popup-box");
    const body = document.querySelector("body");
    const titleTag = document.querySelector(".popup-box input");
    const descTag = document.querySelector(".popup-box textarea");
    const addBtn = document.querySelector(".popup-box button");

    titleTag.value = "";
    descTag.value = "";
    titleTag.disabled = false;
    descTag.disabled = false;
    addBtn.style.display = "block";
    popupBox.classList.remove("show");
    body.style.overflow = "auto";
  }

  showMenu(elem) {
    elem.parentElement.classList.add("show");

    document.addEventListener("click", (e) => {
      if (e.target.tagName !== "I" || e.target !== elem) {
        elem.parentElement.classList.remove("show");
      }
    });
  }

  showSingleNote(note) {
    const popupBox = document.querySelector(".popup-box");
    const popupTitle = document.querySelector(".popup-box header p");
    const addBtn = document.querySelector(".popup-box button");
    const titleTag = document.querySelector(".popup-box input");
    const descTag = document.querySelector(".popup-box textarea");

    popupTitle.innerText = "Detail Catatan";
    addBtn.style.display = "none";
    titleTag.value = note.title;
    descTag.value = note.body;
    titleTag.disabled = true;
    descTag.disabled = true;
    popupBox.classList.add("show");

    const closeIcon = document.querySelector(".popup-box header i");
    closeIcon.addEventListener("click", () => {
      this.hidePopup();
    });
  }

  async deleteNote(id) {
    try {
      const confirmDel = await Swal.fire({
        title: "Apakah Anda yakin ingin menghapus catatan ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal",
      });

      if (!confirmDel.isConfirmed) return;

      const response = await fetch(`${apiUrl}/notes/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        this.loadNotes();
        Swal.fire({
          title: "Berhasil",
          text: "Catatan telah dihapus",
          icon: "success",
          timer: 1300,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: `Error: ${data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menghapus catatan",
        icon: "error",
      });
    }
  }

  async toggleArchive(id, isArchived) {
    const action = isArchived ? "unarchive" : "archive";

    try {
      const response = await fetch(`${apiUrl}/notes/${id}/${action}`, {
        method: "POST",
      });

      const data = await response.json();
      if (response.ok) {
        this.loadNotes();
      } else {
        Swal.fire({
          title: "Error",
          text: `Error: ${data.message}`,
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat mengubah status arsip",
        icon: "error",
      });
    }
  }

  async saveNote() {
    const titleTag = document.querySelector(".popup-box input");
    const descTag = document.querySelector(".popup-box textarea");

    let title = titleTag.value.trim();
    let description = descTag.value.trim();

    if (title || description) {
      let noteInfo = {
        title: title,
        body: description,
      };

      try {
        const response = await fetch(`${apiUrl}/notes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noteInfo),
        });

        const data = await response.json();

        if (response.ok) {
          if (data.status === "success" && data.message === "Note created") {
            this.loadNotes();
            this.hidePopup();
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Catatan berhasil ditambahkan!",
              timer: 1300,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: data.message,
            });
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: data.message,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Terjadi kesalahan saat menyimpan catatan. Silakan coba lagi",
        });
      }
    }
  }

  async getSingleNote(noteId) {
    const loadingSpinner = document.createElement("loading-spinner");
    this.appendChild(loadingSpinner);

    try {
      const response = await fetch(`${apiUrl}/notes/${noteId}`);
      const data = await response.json();

      if (response.ok) {
        this.showSingleNote(data.data);
      } else {
        Swal.fire("Error", data.message, "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Terjadi kesalahan saat memuat catatan. Silakan coba lagi",
        "error",
      );
    } finally {
      this.removeChild(loadingSpinner);
    }
  }
}

customElements.define("note-list", NoteList);
