let dictionary = []; // 用于存储从 JSON 文件加载的词典

// 加载词典
async function loadDictionary() {
    try {
        const response = await fetch('dictionary.json');
        if (!response.ok) {
            throw new Error('无法加载词典文件');
        }
        dictionary = await response.json();
    } catch (error) {
        console.error('加载词典时出错:', error);
    }
}

// 初始化：加载词典
loadDictionary();

function checkSpelling() {
    const wordInput = document.getElementById('wordInput').value.toLowerCase();
    const resultElement = document.getElementById('result');

    // 如果单词在词典中，直接判定为正确
    if (dictionary.includes(wordInput)) {
        resultElement.textContent = `"${wordInput}" 拼写正确！`;
        resultElement.style.color = 'green';
        return;
    }

    // 否则，查找最接近的单词
    const closestWord = findClosestWord(wordInput, dictionary);
    const distance = levenshteinDistance(wordInput, closestWord);

    // 如果编辑距离较小，提示可能的正确拼写
    if (distance <= 2) { // 编辑距离阈值，可以根据需要调整
        resultElement.textContent = `"${wordInput}" 拼写错误，您是否想输入 "${closestWord}"？`;
        resultElement.style.color = 'orange';
    } else {
        resultElement.textContent = `"${wordInput}" 拼写错误或不在词典中。`;
        resultElement.style.color = 'red';
    }
}

// 计算编辑距离（Levenshtein Distance）
function levenshteinDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else {
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1, // 删除
                    dp[i][j - 1] + 1, // 插入
                    dp[i - 1][j - 1] + (word1[i - 1] !== word2[j - 1] ? 1 : 0) // 替换
                );
            }
        }
    }
    return dp[m][n];
}

// 查找词典中最接近的单词
function findClosestWord(inputWord, dictionary) {
    let closestWord = '';
    let minDistance = Infinity;

    for (const word of dictionary) {
        const distance = levenshteinDistance(inputWord, word);
        if (distance < minDistance) {
            minDistance = distance;
            closestWord = word;
        }
    }
    return closestWord;
}
