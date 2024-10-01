window.onload = function () {
    const headbox = document.getElementById('headbox');
    const loginpage = document.getElementById('loginpage');
    const loginpage_user = document.getElementById('loginpage-user');
    const loginpage_faculty = document.getElementById('loginpage-faculty');
    const admin_page = document.getElementById('admin-page');
    const edit_page_section = document.getElementById('edit-page-section');

    // Explore button to open admin login page
    document.getElementById('explore').addEventListener('click', function () {
        headbox.style.display = "none";
        loginpage.style.display = "flex";
    });

    // User login button functionality
    document.getElementById('user-login').addEventListener('click', function () {
        headbox.style.display = "none";
        loginpage_user.style.display = "flex";
    });

    // Faculty login button functionality
    document.getElementById('faculty-login').addEventListener('click', function () {
        headbox.style.display = "none";
        loginpage_faculty.style.display = "flex";
    });

    // Admin login button functionality
    document.getElementById('admin-panel').addEventListener('click', function () {
        const email = document.getElementById('email-admin').value;
        const password = document.getElementById('password-admin').value;

        // Placeholder for actual login validation logic
        if (email === "" && password === "") {
            loginpage.style.display = "none";
            admin_page.style.display = "block";
        } else {
            alert("Invalid credentials! Please try again.");
        }
    });

    // Faculty login button functionality
    document.getElementById('faculty-panel').addEventListener('click', function () {
        const email = document.getElementById('email-faculty').value;
        const password = document.getElementById('password-faculty').value;

        // Placeholder for actual login validation logic
        if (email === "" && password === "") {
            loginpage_faculty.style.display = "none";
            edit_page_section.style.display = "block";
        } else {
            alert("Invalid credentials! Please try again.");
        }
    });
};

// GSAP Animations and Navbar Scroll Effects
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    // Cursor animation
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2,
            ease: "power2.out",
        });
    });

    // Cursor hover effect on navbar elements
    const navItems = document.querySelectorAll('.navbar div');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.classList.add('active');
        });
        item.addEventListener('mouseleave', () => {
            cursor.classList.remove('active');
        });
    });
});
// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', function () {
    // Grab elements
    const bgColorInput = document.getElementById('bg-color');
    const textColorInput = document.getElementById('text-color');
    const contentTextArea = document.getElementById('content-text');
    const mainContent = document.getElementById('main-content');
    const displayText = document.getElementById('display-text');
    const displayPhoto = document.getElementById('display-photo');
    const saveButton = document.getElementById('save-button');
    const uploadPhotoInput = document.getElementById('upload-photo');
    const removePhotoButton = document.getElementById('remove-photo');

    let uploadedPhoto = null; // Placeholder for uploaded photo

    // Function to load saved preferences (if any)
    function loadSavedSettings() {
        const savedBgColor = localStorage.getItem('bgColor');
        const savedTextColor = localStorage.getItem('textColor');
        const savedContent = localStorage.getItem('contentText');
        const savedPhoto = localStorage.getItem('photo');

        if (savedBgColor) {
            mainContent.style.backgroundColor = savedBgColor;
            bgColorInput.value = savedBgColor;
        }

        if (savedTextColor) {
            displayText.style.color = savedTextColor;
            textColorInput.value = savedTextColor;
        }

        if (savedContent) {
            displayText.textContent = savedContent;
            contentTextArea.value = savedContent;
        }

        if (savedPhoto) {
            displayPhoto.src = savedPhoto;
            displayPhoto.style.display = "block";
        }
    }

    // Function to handle saving changes
    saveButton.addEventListener('click', function () {
        // Get values from inputs
        const selectedBgColor = bgColorInput.value;
        const selectedTextColor = textColorInput.value;
        const newText = contentTextArea.value;

        // Apply changes to main content
        mainContent.style.backgroundColor = selectedBgColor;
        displayText.style.color = selectedTextColor;
        displayText.textContent = newText;

        // Save changes to localStorage
        localStorage.setItem('bgColor', selectedBgColor);
        localStorage.setItem('textColor', selectedTextColor);
        localStorage.setItem('contentText', newText);

        // Handle saving the uploaded image (if any)
        if (uploadedPhoto) {
            localStorage.setItem('photo', uploadedPhoto);
            displayPhoto.src = uploadedPhoto;
            displayPhoto.style.display = "block";
        }

        alert("Changes saved successfully!");
    });

    // Handle image upload
    uploadPhotoInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                uploadedPhoto = e.target.result;  // Store the image in base64 format
                displayPhoto.src = uploadedPhoto;
                displayPhoto.style.display = "block";  // Show the image on the page
            };
            reader.readAsDataURL(file);  // Convert the image file to base64 string
        }
    });

    // Handle removing the photo
    removePhotoButton.addEventListener('click', function () {
        uploadedPhoto = null;
        displayPhoto.src = "";
        displayPhoto.style.display = "none";

        // Remove from localStorage as well
        localStorage.removeItem('photo');
    });

    // Load saved settings when the page is loaded
    loadSavedSettings();
});


