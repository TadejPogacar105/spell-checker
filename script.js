// 简易单词库（后续可替换为API）
const dictionary = [
    'apple', 'banana', 'computer', 
    'hello', 'world', 'javascript',
    'university', 'student', 'programming'
];
let wordList = [];

// 加载单词库
fetch('existing.json')
  .then(response => response.json())
  .then(data => {
    wordList = data.words; // 将单词存储到数组中
    console.log('单词库加载成功:', wordList.length, '个单词');
  })
  .catch(error => {
    console.error('加载单词库失败:', error);
  });

function checkSpelling(input) {
  return wordList.includes(input.toLowerCase()); // 检查输入单词是否在单词库中
}

function checkSpelling(input, target) {
    if (input === target) {
        return true; // 拼写正确
    } else {
        const distance = levenshteinDistance(input, target);
        const similarity = 1 - distance / Math.max(input.length, target.length);
        return similarity >= 0.8; // 相似度阈值
    }
}
function checkWord() {
  const input = document.getElementById("wordInput").value;
  displayFeedback(input);
}


function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }
    return matrix[b.length][a.length];
}
function displayFeedback(input, target) {
    const feedbackElement = document.getElementById("feedback");
    if (checkSpelling(input, target)) {
        feedbackElement.innerText = "嘿还真让你蒙着了！";
    } else {
        feedbackElement.innerText = "Shit！What the hell is this！";
    }
}
