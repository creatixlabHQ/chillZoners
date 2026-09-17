const API_URL =
  "https://script.google.com/macros/s/AKfycbxAbTjViNaubG55XnuTkETTjt3u6WxmR_6J01exDcVkCDGPWehbybR82J5mlsTt4F6QXw/exec";


const form = document.getElementById("memberForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");


form.addEventListener("submit", async function (event) {

  event.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Registering...";
  message.textContent = "";


  // Get form values

  const name = document.getElementById("name").value.trim();

  const phone = document.getElementById("phone").value.trim();

  const email = document.getElementById("email").value.trim();

  const address =
    document.getElementById("address").value.trim();

  const city =
    document.getElementById("city").value.trim();

  const state =
    document.getElementById("state").value.trim();

  const pincode =
    document.getElementById("pincode").value.trim();


  // Phone validation

  if (!/^[0-9]{10}$/.test(phone)) {

    message.textContent =
      "❌ Enter a valid 10 digit phone number.";

    submitBtn.disabled = false;
    submitBtn.textContent = "Register Member";

    return;
  }


  // Pincode validation

  if (!/^[0-9]{6}$/.test(pincode)) {

    message.textContent =
      "❌ Enter a valid 6 digit pincode.";

    submitBtn.disabled = false;
    submitBtn.textContent = "Register Member";

    return;
  }


  // Device information

  const deviceInfo = navigator.userAgent;


  // Data to send

  const data = {

    name: name,

    phone: phone,

    email: email,

    address: address,

    city: city,

    state: state,

    pincode: pincode,

    ip: "",

    device: deviceInfo,

    status: "Active"

  };


  try {

    // Send data to Google Apps Script

    const response = await fetch(API_URL, {

      method: "POST",

      headers: {

        "Content-Type":
          "text/plain;charset=utf-8"

      },

      body: JSON.stringify(data)

    });


    // Read API response

    const result = await response.json();


    // Success

    if (result.success) {

      message.textContent =
        `✅ Member added successfully! Member ID: ${result.memberId}`;

      form.reset();

    }

    // API error

    else {

      throw new Error(
        result.error || "Unknown API error"
      );

    }


  } catch (error) {

    console.error(
      "Registration Error:",
      error
    );

    message.textContent =
      "❌ Registration failed. Please try again.";

  }


  submitBtn.disabled = false;

  submitBtn.textContent =
    "Register Member";

});
