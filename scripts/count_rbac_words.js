const fs = require('fs');
const path = require('path');

// Directory to search
const directoryPath = path.join(__dirname, '../src/plugins/shared2');

// Words to count
const wordsToCount = ['useRBAC', 'DocumentRBAC'];

// Function to recursively read files in a directory
function readFilesRecursively(dir, fileCallback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      readFilesRecursively(fullPath, fileCallback);
    } else if (entry.isFile()) {
      fileCallback(fullPath);
    }
  });
}

// Function to count words in a file
function countWordsInFile(filePath, words) {
  const content = fs.readFileSync(filePath, 'utf8');
  const counts = {};

  words.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    const matches = content.match(regex);
    counts[word] = (matches || []).length;
  });

  return counts;
}

// Main function
function main() {
  const totalCounts = {};
  wordsToCount.forEach((word) => (totalCounts[word] = 0));

  readFilesRecursively(directoryPath, (filePath) => {
    const fileCounts = countWordsInFile(filePath, wordsToCount);
    wordsToCount.forEach((word) => {
      totalCounts[word] += fileCounts[word];
    });
  });

  console.log('Word counts:', totalCounts);
}

main();
