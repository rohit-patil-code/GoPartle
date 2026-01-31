const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Requirement = require('./models/Requirement');

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const requirements = await Requirement.find({}).sort({ createdAt: -1 });

        console.log('\n--- 📋 All Requirements in DB ---');
        console.log(`Total Count: ${requirements.length}\n`);

        requirements.forEach((req, index) => {
            console.log(`[${index + 1}] Event: ${req.eventName} (${req.eventType})`);
            console.log(`    Role: ${req.hiringFor}`);
            console.log(`    Details:`, req.details);
            console.log('-----------------------------------');
        });

        if (requirements.length === 0) {
            console.log('No data found yet. Submit the form first!');
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDB();
