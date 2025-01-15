import Notes from "../data/notes.js";

class NoteList extends HTMLElement {
  constructor() {
    super();

    this.notes = Notes.getAll();

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

    this.isUpdate = false;
    this.updateId = null;
  }

  connectedCallback() {
    if (localStorage.getItem("notes")) {
      this.notes = JSON.parse(localStorage.getItem("notes"));
    } else {
      this.notes = Notes.getAll();
    }

    this.render();
    this.setupEventListeners();
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

    const deleteIcons = this.querySelectorAll(".menu li:nth-child(2)");
    deleteIcons.forEach((deleteIcon, index) => {
      deleteIcon.addEventListener("click", () => {
        this.deleteNote(index);
      });
    });

    const editIcons = this.querySelectorAll(".menu li:nth-child(1)");
    editIcons.forEach((editIcon, index) => {
      editIcon.addEventListener("click", () => {
        const { title, body } = this.notes[index];
        this.updateNote(index, title, body);
      });
    });

    const addBtn = document.querySelector("form");
    addBtn.addEventListener("submit", (e) => {
      e.preventDefault();
      this.saveOrUpdateNote();
    });
  }

  render() {
    this.innerHTML = "";

    const noteContainer = document.createElement("div");
    noteContainer.classList.add("note-item");

    this.notes.forEach((note, id) => {
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
                            <li><i class="uil uil-pen"></i>Edit</li>
                            <li><i class="uil uil-trash"></i>Hapus</li>
                        </ul>
                    </div>
                </div>
            `;

      noteContainer.appendChild(li);
    });

    this.appendChild(noteContainer);
    this.setupEventListeners();
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

    titleTag.value = "";
    descTag.value = "";
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

  deleteNote(index) {
    let confirmDel = confirm("Apakah Anda yakin ingin menghapus catatan ini?");
    if (!confirmDel) return;

    this.notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(this.notes));
    this.render();
  }

  updateNote(index, title, description) {
    const titleTag = document.querySelector(".popup-box input");
    const descTag = document.querySelector(".popup-box textarea");
    const popupTitle = document.querySelector(".popup-box header p");
    const addBtn = document.querySelector(".popup-box button");

    let filterDesc = description.replaceAll("<br/>", "\r\n");
    this.updateId = index;
    this.isUpdate = true;
    titleTag.value = title;
    descTag.value = filterDesc;
    popupTitle.innerText = "Edit Catatan";
    addBtn.innerText = "Perbarui";
    this.showAddPopup("Edit Catatan", "Perbarui");
  }

  saveOrUpdateNote() {
    const titleTag = document.querySelector(".popup-box input");
    const descTag = document.querySelector(".popup-box textarea");
    const currentDate = new Date();

    let title = titleTag.value.trim();
    let description = descTag.value.trim();

    if (title || description) {
      let noteInfo = {
        id: this.isUpdate ? this.notes[this.updateId].id : `note-${Date.now()}`,
        title: title,
        body: description,
        createdAt: this.isUpdate
          ? this.notes[this.updateId].createdAt
          : currentDate.toISOString(),
        archived: false,
      };

      if (!this.isUpdate) {
        this.notes.unshift(noteInfo);
      } else {
        this.isUpdate = false;
        this.notes[this.updateId] = noteInfo;
      }

      localStorage.setItem("notes", JSON.stringify(this.notes));
      this.render();
      this.hidePopup();
    }
  }
}

customElements.define("note-list", NoteList);