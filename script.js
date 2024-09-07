const appointment = document.getElementById("appointment")
const appointmentSM = document.getElementById("appointmentSM")
const home = document.getElementById("home")
const about = document.getElementById("about")
const contact = document.getElementById("contact")
const homeBody = document.getElementById("homeBody")
const appointmentBody = document.getElementById("appointmentBody")
const footer = document.getElementById("footer")
const burgerMenu = document.getElementById("burgerMenu")
const burgerList = document.getElementById("burgerList")


const consult = document.getElementById("consult")
const consultBody = document.getElementById("consultBody")
const diagnose = document.getElementById("diagnose")
const diagnoseBody = document.getElementById("diagnoseBody")
const prescribe = document.getElementById("prescribe")
const prescribeBody = document.getElementById("prescribeBody")

// const userName = document.getElementById("userName")
// const userAge = document.getElementById("userAge")
// const userPhone = document.getElementById("userPhone")
// const userEmail = document.getElementById("userEmail")
// const userAddress = document.getElementById("userAddress")
// const userHMO = document.getElementById("userHMO")
// const maleBox = document.getElementById("maleBox")
// const femBox = document.getElementById("femBox")
// const otherGenBox = document.getElementById("otherGenBox")
// const userGender = document.getElementById("userGender")

burgerMenu.addEventListener("click", ()=>{
    burgerList.classList.toggle("hidden")
    // document.getElementById("burgerList").classList.add("flex")

})


appointment.addEventListener("click",()=>{
    appointment.classList.add("text-white")
    appointment.classList.add("text-2xl")
    homeBody.classList.add("hidden")
    burgerList.classList.add("hidden")
    appointmentBody.classList.remove("hidden")
    appointmentBody.classList.add("flex", "flex-col")
    footer.classList.add("hidden")
})
appointmentSM.addEventListener("click",()=>{
    appointmentSM.classList.add("text-white")
    appointmentSM.classList.add("text-2xl")
    homeBody.classList.add("hidden")
    burgerList.classList.add("hidden")
    appointmentBody.classList.remove("hidden")
    appointmentBody.classList.add("flex","flex-col")
    footer.classList.add("hidden")
})
consult.addEventListener("click", ()=>{
    consult.classList.toggle("bg-black")
    consult.classList.toggle("text-white")
    consultBody.classList.toggle("hidden")
})
diagnose.addEventListener("click", ()=>{
    diagnose.classList.toggle("bg-black")
    diagnose.classList.toggle("text-white")
    diagnoseBody.classList.add("flex")
    diagnoseBody.classList.toggle("hidden")
})

document.getElementById("submit").addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("showReceipt").classList.remove("hidden")
    // Get user details from consultation form
    const userName = document.getElementById("userName").value;
    const userAge = document.getElementById("userAge").value;
    const userPhone = document.getElementById("userPhone").value;
    const userEmail = document.getElementById("userMail").value;
    const userAddress = document.getElementById("userAddress").value;

    
    let userGender = "Unspecified";
    if (document.getElementById("maleBox").checked) userGender = "Male";
    if (document.getElementById("femBox").checked) userGender = "Female";

    // Store consultation data
    const consultData = {
        name: userName,
        age: userAge,
        phone: userPhone,
        email: userEmail,
        address: userAddress,
        gender: userGender,
    };
    localStorage.setItem("consultData", JSON.stringify(consultData));

    // Get appointment data
    const drAppointmentForm = new FormData(document.getElementById("drAppointment"));
    const appointmentData = {};
    drAppointmentForm.forEach((value, key) => {
        if (value) appointmentData[key] = value;
    });
    localStorage.setItem("doctorAppointments", JSON.stringify(appointmentData));

    alert("Appointment data saved!");
    // generateReceipt(); // Generate receipt after submission
});

document.getElementById("showReceipt").addEventListener("click", function () {
    generateReceipt(); // Display receipt when button clicked
    document.getElementById("receipt").classList.remove("hidden")
});

// Function to generate receipt
function generateReceipt() {
    const consultData = JSON.parse(localStorage.getItem("consultData"));
    const appointmentData = JSON.parse(localStorage.getItem("doctorAppointments"));

    if (!consultData && !appointmentData) {
        alert("Incomplete data. Please fill out the forms.");
        return;
    }

    // Construct receipt
    const receiptContent = `
        <h2>Appointment Receipt</h2>
        <p><strong>Name:</strong> ${consultData.name}</p>
        <p><strong>Age:</strong> ${consultData.age}</p>
        <p><strong>Gender:</strong> ${consultData.gender}</p>
        <p><strong>Phone:</strong> ${consultData.phone}</p>
        <p><strong>Email:</strong> ${consultData.email}</p>
        <p><strong>Address</strong> ${consultData.address}</p>
        <p><strong>Doctor & Appointment Time:</strong></p>
        <ul>
            ${Object.entries(appointmentData).map(([key, value]) => `<li class="font-bold text-blue-950">${key}: ${value}</li>`).join('')}
        </ul>
        <div class="space-x-8">
            <button class="border p-3 rounded-md bg-blue-800 text-white">Download</button>
            <button class="border p-3 rounded-md bg-green-600 text-white">Print</button>
        </div>
    `;
    document.getElementById("receipt").innerHTML = receiptContent;
}

// Diagnosing form logic
document.getElementById("diagnoseForm").addEventListener("submit", function (e) {
    e.preventDefault();
    getAilment();
});

function getAilment() {
    const consultData = JSON.parse(localStorage.getItem("consultData"));
    if (!consultData) {
        document.getElementById("results").innerText = "Please fill the consultation form.";
        return;
    }

    const selectedSymptoms = Array.from(
        document.querySelectorAll("#symptoms input[type='checkbox']:checked")
    ).map((el) => el.parentNode.innerText.trim());

    if (selectedSymptoms.length === 0) {
        document.getElementById("results").innerText = "Please select at least one symptom.";
        return;
    }

    const ailments = [
        {
            name: "Malaria",
            symptoms: ["Fever", "Fatigue", "Vomiting", "Headache"],
            prescription: "Artemisinin-based combination therapy (ACT) is recommended. Ensure adequate hydration.",
            image: "https://med-pro.org/wp-content/uploads/Artemisinin-Bottle_EN-1-1.png",  // Replace with an actual image URL
        },
        {
            name: "Typhoid",
            symptoms: ["Fever", "Abdominal Pain", "Vomiting", "Diarrhea"],
            prescription: "Antibiotics like Ciprofloxacin or Ceftriaxone. Drink plenty of fluids to avoid dehydration.",
            image: "https://www.pngfind.com/pngs/m/354-3544749_ciprofloxacin-pharmacy-hd-png-download.png",
        },
        {
            name: "Dengue Fever",
            symptoms: ["Fever", "Fatigue", "Headache", "Rash"],
            prescription: "Supportive care with fluids and acetaminophen for fever. Avoid aspirin due to bleeding risk.",
            image: "https://www.tylenol.com/sites/tylenol_us/files/styles/product_image/public/product-images/microsoftteams-image_1.png",
        },
        {
            name: "Influenza (Flu)",
            symptoms: ["Fever", "Fatigue", "Headache", "Cough"],
            prescription: "Antiviral drugs like Oseltamivir (Tamiflu) or supportive care with rest, fluids, and acetaminophen.",
            image: "https://5.imimg.com/data5/SELLER/Default/2023/4/298276918/VY/EW/YY/159071728/adalimumab-humira-pen-injection-500x500.png",
        },
        {
            name: "COVID-19",
            symptoms: ["Fever", "Fatigue", "Cough", "Diarrhea", "Headache"],
            prescription: "Rest, hydration, and over-the-counter medications for symptom relief. Seek medical help if symptoms worsen.",
            image: "https://healthpolicy.usc.edu/research/the-value-of-treatment-for-covid-19/",
        },
        {
            name: "Food Poisoning",
            symptoms: ["Vomiting", "Abdominal Pain", "Diarrhea", "Fatigue"],
            prescription: "Rehydration therapy with oral rehydration salts (ORS). In severe cases, antibiotics or hospitalization may be needed.",
            image: "https://www.advacarepharma.com/static/2c12cd1c896b6e6a861fc3698b16617c/24470/oral-rehydration-salts-box.webp",
        },
        {
            name: "Pneumonia",
            symptoms: ["Fever", "Cough", "Fatigue", "Chest Pain"],
            prescription: "Antibiotics for bacterial pneumonia. Rest, fluids, and fever-reducing medications for viral cases.",
            image: "https://thumbs.dreamstime.com/z/amoxicillin-medication-plastic-vial-antibiotic-used-to-treat-bacterial-infections-such-as-pneumonia-278280842.jpg?w=992",
        },
        {
            name: "Cholera",
            symptoms: ["Diarrhea", "Vomiting", "Dehydration", "Abdominal Pain"],
            prescription: "Immediate rehydration with oral rehydration salts (ORS) or intravenous fluids in severe cases. Antibiotics may be given.",
            image: "https://static.wixstatic.com/media/fa9860_bec4b2f0a8e541caa2c09ee620846b3e~mv2.jpg/v1/fill/w_640,h_480,al_c,q_80,enc_auto/fa9860_bec4b2f0a8e541caa2c09ee620846b3e~mv2.jpg",
        },
        {
            name: "Meningitis",
            symptoms: ["Fever", "Headache", "Vomiting", "Neck Stiffness"],
            prescription: "Hospitalization with antibiotics or antivirals depending on the cause. Corticosteroids may also be administered.",
            image: "https://www.physio-pedia.com/images/7/7f/Prednisone.jpg",
        },
        {
            name: "Gastroenteritis",
            symptoms: ["Vomiting", "Diarrhea", "Abdominal Pain", "Fatigue"],
            prescription: "Rehydration therapy with oral rehydration salts (ORS). In severe cases, antibiotics may be required.",
            image: "https://www.joysonpl.com/wp-content/uploads/2021/03/ors-1-e1625804457560-700x819.jpg",
        },
        {
            name: "Bronchitis",
            symptoms: ["Cough", "Fatigue", "Headache", "Chest Pain"],
            prescription: "Cough suppressants and bronchodilators. In cases of bacterial bronchitis, antibiotics may be prescribed.",
            image: "https://www.alliedmarketresearch.com/assets/sampleimages/bronchodilators-market-1582784945.jpeg",
        },
        {
            name: "Appendicitis",
            symptoms: ["Abdominal Pain", "Vomiting", "Fever", "Fatigue"],
            prescription: "Immediate surgery (appendectomy) is the recommended treatment. Antibiotics may be administered pre- and post-surgery.",
            image: "https://thumbs.dreamstime.com/z/appendicitis-differential-diagnoses-d-handwritten-diagnosis-anamnesis-medicaments-composition-red-pills-blister-pills-79040638.jpg",
        },
    ];
    
    document.getElementById("diagnoseBtn").addEventListener("click", function(){
        document.getElementById("ailment-info").classList.remove("hidden")
        document.getElementById("ailment-info").classList.add("flex")
    })

    // Match ailment based on selected symptoms
    const possibleAilment = ailments.find((ailment) =>
        ailment.symptoms.every((symptom) => selectedSymptoms.includes(symptom))
    );

    const result = possibleAilment
    if (possibleAilment) {
        document.getElementById("ailment-name").innerText = `Top Result: ${possibleAilment.name}`
        document.getElementById("ailment-image").src = possibleAilment.image;
        document.getElementById("ailment-symptoms").innerText = `Symptoms: ${possibleAilment.symptoms.join(", ")}`;
        document.getElementById("ailment-prescription").innerText = `Prescription: ${possibleAilment.prescription}. See a physician as soon as possible to confirm dosage`;
        // document.getElementById("results").innerText = `${consultData.name}, based on your symptoms, you may have ${possibleAilment.name}. Please consult a doctor for confirmation.`;
    } else{
        document.getElementById("ailment-name").innerText = "No matching ailment found. Please consult a doctor.";
    }
}


// const nam = userName.value
// const age = userAge.value
// const phone = userPhone.value
// const address = userAddress.value
// const email = userEmail
// const gender = userGender.value
// const hmo = userHMO.value


// document.getElementById("submit").addEventListener("click", (e) => {
//     e.preventDefault();
//     let valid = true;

//     //Fetch form values
//     const userName = document.getElementById("userName").value.trim()
//     const userAge = document.getElementById("userAge").value.trim()
//     const userPhone = document.getElementById("userPhone").value.trim()
//     // const userEmail = document.getElementById("userEmail").value
//     const userAddress = document.getElementById("userAddress").value.trim()
//     const userHMO = document.getElementById("userHMO").value.trim()
//     const maleBox = document.getElementById("maleBox")
//     const femBox = document.getElementById("femBox")
//     const otherGenBox = document.getElementById("otherGenBox")
//     const userGender = document.getElementById("userGender")
    
//     // Get gender checkboxes
//     // const maleBox = document.getElementById("male");
//     // const femBox = document.getElementById("female");
//     // const otherGenBox = document.getElementById("other");

//     const numregex = /^\d+$/;
//     const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     // Name validation
//     if (userName === "") {
//         valid = false;
//         alert("Invalid name format!!");
//     }

//     // Age validation
//     if (userAge === "" || !numregex.test(userAge)) {
//         valid = false;
//         alert("Invalid age format!!");
//     }

//     // Phone validation
//     if (userPhone === "" || userPhone.length !== 5 || !numregex.test(userPhone)) {
//         valid = false;
//         alert("Invalid phone format!!");
//     }

//     // Email validation
//     // if (userEmail === "" || !emailregex.test(userEmail)) {
//     //     valid = false;
//     //     alert("Invalid email format!!");
//     // }

//     // Gender validation
//     let genderSelected = false;
//     if (maleBox.checked && !femBox.checked && !otherGenBox.checked) {
//         userGender.textContent = "Male";
//         genderSelected = true;
//     } else if (femBox.checked && !maleBox.checked && !otherGenBox.checked) {
//         userGender.textContent = "Female";
//         genderSelected = true;
//     } else if (otherGenBox.checked && !maleBox.checked && !femBox.checked) {
//         userGender.textContent = "Unknown";
//         userGender.classList.remove("hidden");
//         userGender.innerHTML = "We don't treat nutjobs here pls";
//         genderSelected = true;
//     } else {
//         valid = false;
//         userGender.textContent = "Unknown, must fill form.";
//         alert("Please choose a gender")
//     }

//     // Submit form if valid
//     if (valid && genderSelected) {
//         const formData = {
//             name: userName,
//             age: userAge,
//             phone: userPhone,
//             address: userAddress,
//             hmo: userHMO,
//             gender: userGender
//         };

//         localStorage.setItem("consultData", JSON.stringify(formData));
//         alert("Details Logged Successfully");

//         // Pass the stored data to the next step or function
//     }
// });

// document.getElementById('consultForm').addEventListener('submit', function(event) {
//     event.preventDefault();  // Prevent form from submitting traditionally

//     const consultFormData = new FormData(event.target);  // Gather consult form data
//     const consultData = {};

//     // Extract consultation form data and store it in an object
//     consultFormData.forEach((value, key) => {
//         if (value) {
//             consultData[key] = value;
//         }
//     });

//     // Store the consult data in localStorage
//     localStorage.setItem('consultData', JSON.stringify(consultData));

//     // Now trigger the drAppointment submission after the consultForm is successfully saved
//     document.getElementById('drAppointment').submit();  // Submitting drAppointment form programmatically
// });

// document.getElementById('drAppointment').addEventListener('submit', function(event) {
//     event.preventDefault();  // Prevent form from submitting traditionally

//     const appointmentFormData = new FormData(event.target);  // Gather appointment form data
//     const appointmentData = {};

//     // Extract appointment data and store it in an object
//     appointmentFormData.forEach((value, key) => {
//         if (value) {
//             appointmentData[key] = value;
//         }
//     });

//     // Store the appointment data in localStorage
//     localStorage.setItem('doctorAppointments', JSON.stringify(appointmentData));

//     // After both forms have been filled, generate the receipt
//     generateReceipt();
// });




// document.getElementById("diagnoseForm").addEventListener("submit", (e)=>{
//     e.preventDefault()
//     getAilment()
// })

// const ailments = [
//     {
//         name: "Malaria",
//         symptoms: ["fever", "fatigue", "vomiting", "headache"],
//         eligible: (age, gender) => age >= 5 && age <= 65
//     },
//     {
//         name: "HIV/AIDS",
//         symptoms: ["fever", "fatigue", "headache", "diarrhea"],
//         eligible: (age, gender) => age >= 15 && gender === "Male" // Checking both age and gender
//     },
//     {
//         name: "Diabetes",
//         symptoms: ["fatigue", "headache", "vomiting"],
//         eligible: (age, gender) => age >= 30
//     },
//     {
//         name: "Typhoid Fever",
//         symptoms: ["fever", "abdominal_pain", "vomiting", "diarrhea"],
//         eligible: (age, gender) => age >= 10 && age <= 50
//     },
//     {
//         name: "Asthma",
//         symptoms: ["cough", "fatigue", "headache"],
//         eligible: (age, gender) => age >= 21
//     }
// ];

// // function getAilment() {
// //     const selectedSymptoms = [];
// //     document.querySelectorAll("#symptoms input[type='checkbox']:checked").forEach(checkbox => {
// //         selectedSymptoms.push(checkbox.value);
// //     });

// //     if (selectedSymptoms.length === 0) {
// //         document.getElementById("results").innerText = "Please select at least one symptom.";
// //         return;
// //     }

// //     // Find the most likely ailment based on symptoms and eligibility
// //     const possibleAilments = ailments.filter(ailment => {
// //         const symptomMatch = ailment.symptoms.every(symptom => selectedSymptoms.includes(symptom));
// //         return symptomMatch && ailment.eligible(age, gender);
// //     });

// //     if (possibleAilments.length > 0) {
// //         document.getElementById("results").innerHTML = `<h2>${nam}, based on your symptoms and eligibility, you most likely have ${possibleAilments[0].name}.</h2>`;
// //     } else {
// //         document.getElementById("results").innerText = "No matching ailment found. Contagion is unlikely for these ailments based on your age and gender.";
// //     }
// // }

// // function getAilment() {
// //     const selectedSymptoms = [];
// //     document.querySelectorAll("#symptoms input[type='checkbox']:checked").forEach(checkbox => {
// //         selectedSymptoms.push(checkbox.value);
// //     });

// //     if (selectedSymptoms.length === 0) {
// //         document.getElementById("results").innerText = "Please select at least one symptom.";
// //         return;
// //     }

// //     // Get user age and gender from form
// //     const age = parseInt(document.getElementById("userAge").value.trim());
// //     const gender = document.getElementById("userGender").textContent;

// //     // Find the most likely ailment based on at least one symptom match and eligibility
// //     const possibleAilments = ailments.filter(ailment => {
// //         const symptomMatch = ailment.symptoms.some(symptom => selectedSymptoms.includes(symptom)); // At least one symptom match
// //         return symptomMatch && ailment.eligible(age, gender); // Check eligibility
// //     });

// //     if (possibleAilments.length > 0) {
// //         const nam = document.getElementById("userName").value; // Fetch user's name
// //         document.getElementById("results").innerHTML = `<h2>${nam}, based on your symptoms and eligibility, you most likely have ${possibleAilments[0].name}.</h2>`;
// //     } else {
// //         document.getElementById("results").innerText = "No matching ailment found. Contagion is unlikely for these ailments based on your age and gender.";
// //     }
// // }

// // function getAilment() {
// //     const consultData = JSON.parse(localStorage.getItem("consultData"));

// //     if (!consultData) {
// //         document.getElementById("results").innerText = "Consultation details are missing.";
// //         return;
// //     }

// //     const { name, age, gender } = consultData;

// //     const selectedSymptoms = [];
// //     document.querySelectorAll("#symptoms input[type='checkbox']:checked").forEach(checkbox => {
// //         selectedSymptoms.push(checkbox.value);
// //     });

// //     if (selectedSymptoms.length === 0) {
// //         document.getElementById("results").innerText = "Please select at least one symptom.";
// //         return;
// //     }

// //     // Find the most likely ailment based on symptoms and eligibility
// //     const possibleAilments = ailments.filter(ailment => {
// //         const symptomMatch = ailment.symptoms.some(symptom => selectedSymptoms.includes(symptom));
// //         return symptomMatch && ailment.eligible(parseInt(age), gender);
// //     });

// //     if (possibleAilments.length > 0) {
// //         document.getElementById("results").innerHTML = `<h2>${name}, based on your symptoms and eligibility, you most likely have ${possibleAilments[0].name}.</h2>`;
// //     } else {
// //         document.getElementById("results").innerText = "No matching ailment found.";
// //     }
// // }

// function getAilment() {
//     const consultData = JSON.parse(localStorage.getItem("consultData"));

//     if (!consultData) {
//         document.getElementById("results").innerText = "Consultation details are missing.";
//         return;
//     }

//     const { name, age, gender } = consultData;

//     const selectedSymptoms = [];
//     document.querySelectorAll("#symptoms input[type='checkbox']:checked").forEach(checkbox => {
//         selectedSymptoms.push(checkbox.value);
//     });

//     if (selectedSymptoms.length === 0) {
//         document.getElementById("results").innerText = "Please select at least one symptom.";
//         return;
//     }

//     const ages = parseInt(document.getElementById("userAge").value.trim(), 10);
//     const genders = document.getElementById("userGender").textContent.trim();

//     console.log(`Selected Symptoms: ${selectedSymptoms}`);  // Debug
//     console.log(`Gender: ${genders}, Age: ${ages}`);  // Debug
//     console.log(ailments.map(a => a.symptoms));  // Check expected symptoms

//     // Find the most likely ailment based on at least one symptom match and eligibility
//     const possibleAilments = ailments.filter(ailment => {
//         const symptomMatch = ailment.symptoms.some(symptom => selectedSymptoms.includes(symptom));  // At least one symptom match
//         return symptomMatch && ailment.eligible(ages, genders);  // Check eligibility
//     });

//     if (possibleAilments.length > 0) {
//         const nam = document.getElementById("userName").value; // Fetch user's name
//         document.getElementById("results").innerHTML = `<h2>${nam}, based on your symptoms and eligibility, you most likely have ${possibleAilments[0].name}.</h2>`;
//     } else {
//         document.getElementById("results").innerText = `${name}, no matching ailment found. Contagion is unlikely for these ailments based on your age ${ages} and gender ${genders}.`;
//     }
// }

// function generateReceipt() {
//     // Retrieve consult and appointment data from localStorage
//     const consultData = JSON.parse(localStorage.getItem('consultData'));
//     const appointmentData = JSON.parse(localStorage.getItem('doctorAppointments'));

//     if (!consultData || !appointmentData) {
//         alert('Incomplete data. Please fill out both forms.');
//         return;
//     }

//     // Construct the receipt content
//     const receiptContent = `
//         <h2>Receipt for Consultation</h2>
//         <p><strong>Name:</strong> ${consultData.name}</p>
//         <p><strong>Age:</strong> ${consultData.age}</p>
//         <p><strong>Email:</strong> ${consultData.email}</p>
//         <p><strong>Phone:</strong> ${consultData.phone}</p>
//         <h3>Appointment Details:</h3>
//         <ul>
//             ${Object.entries(appointmentData).map(([day, time]) => `<li>${day}: ${time}</li>`).join('')}
//         </ul>
//         <p><strong>Total Cost:</strong> $100 (flat rate for consultation)</p>
//     `;

//     // Display the receipt in a dedicated section on the page
//     document.getElementById('receipt').innerHTML = receiptContent;
// }