To run this example:

1) Download the files
2) Must have NODE JS installed
3) Run ```npm install```


# Machine Learning SMS
A Machine Learning application which understands if a message is Spam or not.

## 1) Build your data model
Use the text file ```sms_dataset.txt``` with the data from the customer.
```
Congratulations, you've won a prize!	Spam
Your bank account needs verification	Spam
Win big today! Click here!	Spam
See you at the office tomorrow!	Not Spam
Dinner at 7 pm?	Not Spam
Hey, are we still on for lunch?	Not Spam
```

## 2) Run the trainer
Run ```node model_trainer.js``` to read the text content and generate a new file called ```spamClassifier.json```
This JSON file containsd the training for messages to analyse.

## 3) Test some messages based on the learning
Run ```node search_for_spam.js``` with some messages in the array provided inside the code
```
const testMessages = [
    "Congratulations, you've won a prize!",         // Spam (expected)
    "Your account has been compromised, act now!",  // Spam (expected)
    "Let's meet for coffee tomorrow at 10",         // Not Spam (expected)
    "Reminder: Your meeting is scheduled at 3 pm",  // Not Spam (expected)
    "Click here to claim your free gift!",          // Spam (expected)
    "Are we still on for dinner tonight?",          // Not Spam (expected)
];
```
The output will tell you which one of these are spam and which are not.

