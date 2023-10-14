const express = require('express');
const bodyParser = require('body-parser');
const { sendMail } = require('./sendEmail'); // Correct path to sendEmail.js
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        const emailContent = `
            Service Selected: ${formData.title}
            Company Name: ${formData.companyName}
            Industry: ${formData.industry}
            The amount of employees: ${formData.numEmployees}
            Address: ${formData.address}, ${formData.unit}, ${formData.city}, ${formData.state}, ${formData.country}, ${formData.postcode}
            Company Phone Number: ${formData.companyPhone}
            In-House PR Team: ${formData.inHousePR ? 'Yes' : 'No'}
            Worked with PR Agency: ${formData.workedWithAgency ? 'Yes' : 'No'}
            Primary Goal: ${formData.primaryGoal}
            Milestones/Targets: ${formData.milestones}
            Key Target Audiences: ${formData.targetAudience}
            Demographics/Psychographics: ${formData.demographics}
        `;

        const result = await sendMail(emailContent);

        if (result.success) {
            res.status(200).json({ success: true, message: 'Email sent successfully :)' });
        } else {
            res.status(200).json({ success: false, message: 'Email sending failed :(' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is runnning on port ${port}`);
})