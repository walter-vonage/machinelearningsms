const natural = require('natural');
const fs = require('fs');
const path = require('path');

const classifier = new natural.BayesClassifier();
const datasetFilePath = path.join(__dirname, 'sms_dataset.txt');
const modelFilePath = path.join(__dirname, 'spamClassifier.json');

// Function to load dataset from text file
function loadDataset(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data.split('\n').map(line => {
        const parts = line.split('\t');
        // Ensure line has both message and label
        if (parts.length === 2) {
            const [text, label] = parts;
            return { text: text.trim(), label: label.trim() };
        }
    }).filter(item => item !== undefined); // Filter out any undefined entries
}

// Function to train and save the model
function trainAndSaveModel(dataset) {
    console.log("Training the model...");
    dataset.forEach(item => {
        classifier.addDocument(item.text, item.label);
    });
    classifier.train();
    classifier.save(modelFilePath, (err) => {
        if (err) console.error("Error saving the model:", err);
        else console.log("Model trained and saved successfully.");
    });
}

// Load or train the model
if (fs.existsSync(modelFilePath)) {
    console.log("Loading the trained model...");
    natural.BayesClassifier.load(modelFilePath, null, (err, savedClassifier) => {
        if (err) console.error("Error loading model:", err);
        else {
            console.log("Model loaded successfully.");
            classifyTestMessages(savedClassifier);
        }
    });
} else {
    console.log("No saved model found. Training a new model...");
    const dataset = loadDataset(datasetFilePath);
    trainAndSaveModel(dataset);
    classifyTestMessages(classifier);
}

// Function to classify new messages
function classifyTestMessages(classifier) {
    const testMessages = [
        "Congratulations, you've won a prize!",
        "Your bank account needs verification",
        "See you at the office tomorrow!"
    ];
    testMessages.forEach(msg => {
        const result = classifier.classify(msg);
        console.log(`Message: "${msg}" - Classified as: ${result}`);
    });
}
