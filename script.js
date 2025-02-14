const users = ['Chapter1', 'Chapter2', 'Chapter3', 'Chapter4'];
const memberDiv = document.querySelector('.memberDiv');

const userIcons = () => {
    users.reverse();
    users.forEach((curElem) => {
        memberDiv.insertAdjacentHTML('afterbegin', `
        <button class="btn ${curElem}" id="'${curElem}" onclick="playVideo('${curElem}')"><span>${curElem}</span></button>
        `);
    });
};


userIcons();


// const playVideo = (chapter) => {
//     const videoUrl = `/${chapter}.mp4`; // แก้ไขเป็น path ของวิดีโอจริง
//     const videoElement = document.createElement("video");

//     videoElement.src = videoUrl;
//     videoElement.controls = true;
//     videoElement.style.position = "fixed";
//     videoElement.style.top = "0%";
//     videoElement.style.left = "0%";
//     videoElement.style.width = "100vw";
//     videoElement.style.height = "100vh";
//     videoElement.style.objectFit = "contain";
//     videoElement.style.zIndex = "9999";
//     videoElement.style.background = "black";

//     document.body.appendChild(videoElement);
//     videoElement.play();

//     const closeVideo = () => {
//         videoElement.muted = true; // ปิดเสียงก่อน
//         videoElement.pause(); 
//         videoElement.src = ""; // ตัดเสียงที่อาจยังค้างอยู่
//         videoElement.remove();
//     };

//     // ปิดวิดีโอเมื่อคลิกที่ตัววิดีโอ
//     videoElement.addEventListener("click", closeVideo);

//     // ปิดวิดีโอเมื่อกดปุ่ม Escape
//     document.addEventListener("keydown", (event) => {
//         if (event.key === "Escape") {
//             closeVideo();
//         }
//     });
// };

const playVideo = (chapter) => {
    const videoUrl = `/${chapter}.mp4`;
    
    // สร้าง Overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "9999";

    // สร้าง Video Element
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    videoElement.controls = true;
    videoElement.style.width = "90%";
    videoElement.style.maxWidth = "800px";
    videoElement.style.borderRadius = "10px";
    videoElement.style.background = "black";
    videoElement.style.objectFit = "contain";

    // สร้างปุ่มปิด
    const closeButton = document.createElement("button");
    closeButton.innerText = "✖";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "20px";
    closeButton.style.background = "rgba(255, 255, 255, 0.8)";
    closeButton.style.color = "black";
    closeButton.style.fontSize = "24px";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "50%";
    closeButton.style.width = "40px";
    closeButton.style.height = "40px";
    closeButton.style.cursor = "pointer";
    
    // ฟังก์ชันปิดวิดีโอ
    const closeVideo = () => {
        videoElement.muted = true; 
        videoElement.pause();
        videoElement.src = "";
        overlay.remove();
    };

    // คลิกที่ overlay (นอกตัววิดีโอ) เพื่อปิด
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeVideo();
        }
    });

    // คลิกที่ปุ่มปิดเพื่อปิดวิดีโอ
    closeButton.addEventListener("click", closeVideo);

    // ปิดวิดีโอเมื่อกด Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeVideo();
        }
    });

    // ใส่ Video และปุ่มปิดใน Overlay
    overlay.appendChild(videoElement);
    overlay.appendChild(closeButton);
    
    // เพิ่ม Overlay เข้าไปใน Body
    document.body.appendChild(overlay);
    
    // เล่นวิดีโอ
    videoElement.play();
};


let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthitems = items.length - 1;

next.onclick = function() {
    if (active + 1 > lengthitems) {
        active = 0;
    } else {
        active = active + 1;
    }
    reloadslider();
}

prev.onclick = function() {
    if (active - 1 < 0) {
        active = lengthitems;
    } else {
        active = active - 1;
    }
    reloadslider();
}

let autoslide = setInterval(() => { next.click(); }, 3000);

function reloadslider() {
    let checkleft = items[active].offsetLeft;
    list.style.left = -checkleft + 'px';

    let lastactiveDot = document.querySelector('.slider .dots li.active');
    if (lastactiveDot) lastactiveDot.classList.remove('active');
    dots[active].classList.add('active');
}

dots.forEach((li, key) => {
    li.addEventListener('click', function() {
        active = key;
        reloadslider();
    })
})