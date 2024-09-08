const form = document.getElementById('Dynamic Resume') as HTMLFormElement;
const resumeOutput = document.getElementById('resume output') as HTMLDivElement;
const shareButton = document.getElementById('share-link') as HTMLButtonElement;
const copyButton = document.getElementById('copy-link') as HTMLButtonElement;
const resumeLinkInput = document.getElementById('resume-link') as HTMLInputElement;

// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve form values
    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const education = (document.getElementById('education') as HTMLTextAreaElement).value.trim();
    const workExperience = (document.getElementById('work-experience') as HTMLTextAreaElement).value.trim();
    const skills = (document.getElementById('skills') as HTMLInputElement).value.trim();

    // Basic validation
    if (!name || !email || !education || !workExperience || !skills) {
        alert('Please fill out all fields.');
        return;
    }

    // Email validation (basic check)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Split skills by comma and trim whitespace
    const skillsArray = skills.split(',').map(skill => skill.trim());

    // Generate resume content
    const resumeHTML = `
        <h1>${name}</h1>
        <p><strong>Email:</strong> ${email}</p>
        <h2>Education</h2>
        <p>${education}</p>
        <h2>Work Experience</h2>
        <p>${workExperience}</p>
        <h2>Skills</h2>
        <ul>
            ${skillsArray.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
    `;

    // Display the generated resume
    resumeOutput.innerHTML = resumeHTML;

    // Generate resume URL
    const resumeURL = `https://yourdomain.com/resume/${name}`;
    resumeLinkInput.value = resumeURL; // Set the URL in the input field
    shareButton.textContent = `Share Resume: ${resumeURL}`;
    shareButton.style.display = 'block';
    copyButton.style.display = 'block'; // Show the copy button
});

// Handle copy link button click
copyButton.addEventListener('click', () => {
    const resumeLink = resumeLinkInput.value;
    navigator.clipboard.writeText(resumeLink).then(() => {
        alert('Link copied to clipboard!');
    }).catch((error) => {
        console.error('Failed to copy text: ', error);
    });

});
