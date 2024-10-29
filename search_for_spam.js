const natural = require('natural');
const path = require('path');

const modelFilePath = path.join(__dirname, 'spamClassifier.json');

// Mock messages to test the classifier
const testMessages = [
    "Congratulations, you've won a prize!",         // Spam (expected)
    "Your account has been compromised, act now!",  // Spam (expected)
    "Let's meet for coffee tomorrow at 10",         // Not Spam (expected)
    "Reminder: Your meeting is scheduled at 3 pm",  // Not Spam (expected)
    "Click here to claim your free gift!",          // Spam (expected)
    "Are we still on for dinner tonight?",          // Not Spam (expected)
];

// Function to load and test the model
function testModel() {
    natural.BayesClassifier.load(modelFilePath, null, (err, classifier) => {
        if (err) {
            console.error("Error loading the model:", err);
            return;
        }
        console.log("Model loaded successfully. Testing messages...\n");
        
        // Classify each test message
        testMessages.forEach(msg => {
            const result = classifier.classify(msg);
            console.log(`Message: "${msg}" - Classified as: ${result}`);
        });
    });
}

// Run the test
testModel();
