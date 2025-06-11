// Initialize EmailJS (replace with your actual user ID)
emailjs.init("YOUR_EMAILJS_USER_ID");

// Initialize AOS animations
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
});

function toggleDarkMode() {
  const htmlTag = document.documentElement;
  if (htmlTag.getAttribute("data-bs-theme") === "light") {
    htmlTag.setAttribute("data-bs-theme", "dark");
  } else {
    htmlTag.setAttribute("data-bs-theme", "light");
  }
}

// Contact form submission
document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.target;
  const feedback = document.getElementById("form-feedback");
  feedback.textContent = "";
  feedback.className = "";

  // Collect form data
  const formData = {
    from_name: form.name.value,
    from_email: form.email.value,
    phone: form.phone.value,
    message: form.message.value,
  };

  // Basic validation (HTML required attributes handle most)
  if (!formData.from_name || !formData.from_email || !formData.message) {
    feedback.textContent = "Please fill in all required fields.";
    feedback.className = "text-danger";
    return;
  }

  // Send email via EmailJS
  emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
    .then(function () {
      feedback.textContent = "Thank you! Your message has been sent.";
      feedback.className = "text-success";
      form.reset();
    }, function (error) {
      feedback.textContent = "Oops! Something went wrong. Please try again later.";
      feedback.className = "text-danger";
      console.error("EmailJS error:", error);
    });
});
function initMap() {
  const destination = { lat: 30.742, lng: 76.687 }; // Approx coordinates for SBP SEC 115 Kharar Landran Road Mohali Chandigarh

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: destination,
  });

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const origin = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        directionsService.route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK") {
              directionsRenderer.setDirections(response);
            } else {
              alert("Directions request failed due to " + status);
              // Just show marker if directions fail
              new google.maps.Marker({ position: destination, map: map, title: "SBP Sec 115 Kharar" });
            }
          }
        );
      },
      () => {
        // User denied location - just show marker
        new google.maps.Marker({ position: destination, map: map, title: "SBP Sec 115 Kharar" });
      }
    );
  } else {
    // Browser doesn't support Geolocation - show marker
    new google.maps.Marker({ position: destination, map: map, title: "SBP Sec 115 Kharar" });
  }
}

const blogPosts = [
  {
    title: "Exploring the Beauty of Kharar",
    date: "2025-06-09",
    content: "Discover the scenic landscapes and vibrant culture of Kharar. From historic landmarks to modern attractions, Kharar offers a unique blend of tradition and progress."
  },
  {
    title: "Top 5 Self-Drive Routes Near Landran",
    date: "2025-06-16",
    content: "Embark on a self-drive adventure through picturesque routes around Landran. Ideal for weekend getaways and nature enthusiasts."
  },
  {
    title: "Tips for First-Time Renters",
    date: "2025-06-23",
    content: "A comprehensive guide for first-time car renters. Learn about insurance, fuel policies, and best practices to ensure a smooth rental experience."
  }
];

function displayWeeklyBlog() {
  const today = new Date();
  const startDate = new Date("2025-06-09"); // Starting date for the first blog post
  const daysDifference = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  const weekIndex = Math.floor(daysDifference / 7) % blogPosts.length;

  const blog = blogPosts[weekIndex];

  document.getElementById("blog-title").innerText = blog.title;
  document.getElementById("blog-date").innerText = `Published on: ${blog.date}`;
  document.getElementById("blog-content").innerHTML = blog.content;
}

// Call the function to display the blog post
displayWeeklyBlog();
