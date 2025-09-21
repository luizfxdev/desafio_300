// Desafio do Cavaleiro - Busca DFS com Backtracking
// Objetivo: Encontrar palavras em uma matriz MxN

class KnightPathFinder {
  constructor(targetWord = 'CAVALEIRO') {
    this.targetWord = targetWord.toUpperCase(); // Garantir maiúsculas
    this.directions = [
      [-1, 0], // cima
      [1, 0], // baixo
      [0, -1], // esquerda
      [0, 1] // direita
    ];
    this.foundPath = [];
    this.matrix = [];
    this.visited = [];
  }

  // Função principal para encontrar o caminho
  findKnightPath(matrix) {
    if (!matrix || matrix.length === 0) {
      return { found: false, path: [], steps: [] };
    }

    this.matrix = matrix;
    this.visited = Array(matrix.length)
      .fill()
      .map(() => Array(matrix[0].length).fill(false));

    let steps = [];
    let found = false;

    // Debug: Mostrar a matriz
    steps.push(`🗺️ Matriz a ser analisada:`);
    matrix.forEach((row, i) => {
      steps.push(`   Linha ${i}: [${row.join(', ')}]`);
    });
    steps.push(`📝 Procurando palavra: ${this.targetWord}`);

    // Buscar por todas as posições que contenham a primeira letra da palavra-alvo
    const firstLetter = this.targetWord[0];
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[0].length; col++) {
        if (matrix[row][col] === firstLetter) {
          steps.push(`🔍 Tentando iniciar busca em posição [${row}, ${col}] = '${matrix[row][col]}'`);

          // Resetar visited para cada nova tentativa
          this.visited = Array(matrix.length)
            .fill()
            .map(() => Array(matrix[0].length).fill(false));
          this.foundPath = [];

          if (this.dfsSearch(row, col, 0, steps)) {
            found = true;
            steps.push(`✅ Caminho encontrado! Palavra "${this.targetWord}" formada com sucesso.`);
            break;
          } else {
            steps.push(`❌ Caminho não encontrado a partir de [${row}, ${col}]`);
            steps.push(``); // linha em branco para separar tentativas
          }
        }
      }
      if (found) break;
    }

    return {
      found: found,
      path: this.foundPath.slice(),
      steps: steps
    };
  }

  // Busca DFS com backtracking
  dfsSearch(row, col, wordIndex, steps) {
    // Verificar limites da matriz
    if (row < 0 || row >= this.matrix.length || col < 0 || col >= this.matrix[0].length) {
      return false;
    }

    // Verificar se já foi visitado
    if (this.visited[row][col]) {
      return false;
    }

    // Verificar se a letra atual corresponde à letra esperada
    if (this.matrix[row][col] !== this.targetWord[wordIndex]) {
      return false;
    }

    // Marcar como visitado e adicionar ao caminho
    this.visited[row][col] = true;
    this.foundPath.push({ row, col, letter: this.matrix[row][col] });

    steps.push(`  📍 Passo ${wordIndex + 1}: [${row}, ${col}] = '${this.matrix[row][col]}' ✓`);

    // Se chegou ao final da palavra, sucesso!
    if (wordIndex === this.targetWord.length - 1) {
      return true;
    }

    // Explorar todas as direções possíveis
    for (let [deltaRow, deltaCol] of this.directions) {
      let newRow = row + deltaRow;
      let newCol = col + deltaCol;

      // Log da tentativa de movimento
      steps.push(`    🔍 Tentando mover para [${newRow}, ${newCol}] buscando '${this.targetWord[wordIndex + 1]}'`);

      if (this.dfsSearch(newRow, newCol, wordIndex + 1, steps)) {
        return true;
      }
    }

    // Backtracking: desfazer a escolha se não encontrou caminho
    this.visited[row][col] = false;
    this.foundPath.pop();
    steps.push(`  🔄 Backtrack de [${row}, ${col}] - removendo '${this.matrix[row][col]}'`);

    return false;
  }

  // Gerar visualização da matriz com o caminho destacado
  generateMatrixVisualization(matrix, path) {
    if (!matrix || matrix.length === 0) return '';

    let pathSet = new Set();
    path.forEach(pos => pathSet.add(`${pos.row}-${pos.col}`));

    let html = '<div class="matrix-visual"><h4>🗺️ Mapa com Caminho Destacado:</h4>';

    matrix.forEach((row, rowIndex) => {
      html += '<div class="matrix-row">';
      row.forEach((cell, colIndex) => {
        let isInPath = pathSet.has(`${rowIndex}-${colIndex}`);
        let className = isInPath ? 'matrix-cell path' : 'matrix-cell';
        html += `<div class="${className}">${cell}</div>`;
      });
      html += '</div>';
    });

    html += '</div>';
    return html;
  }
}

// Classe principal da aplicação
class CavalieroChallengeApp {
  constructor() {
    this.pathFinder = new KnightPathFinder();
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    const startBtn = document.getElementById('start-btn');
    const backBtn = document.getElementById('back-btn');
    const matrixInput = document.getElementById('matrix-input');
    startBtn.addEventListener('click', () => this.handleStartChallenge());
    backBtn.addEventListener('click', () => this.handleBack());
    // Exemplo padrão no input com uma matriz válida para CAVALEIRO
    matrixInput.value = `[["C","A","V"],["E","L","A"],["I","R","O"]]`;
  }

  handleStartChallenge() {
    const matrixInput = document.getElementById('matrix-input');
    const inputValue = matrixInput.value.trim();

    if (!inputValue) {
      this.showResult('❌ Por favor, insira uma matriz válida!', 'failure');
      return;
    }

    try {
      // Processar entrada (aceita tanto vírgulas+barras quanto quebras de linha)
      const matrix = this.parseMatrixInput(inputValue);

      if (!matrix || matrix.length === 0) {
        throw new Error('Matriz vazia ou inválida');
      }

      this.executeChallenge(matrix);
    } catch (error) {
      this.showResult(`❌ Erro ao processar matriz: ${error.message}`, 'failure');
    }
  }

  parseMatrixInput(input) {
    const trimmedInput = input.trim();

    // Tentativa 1: Interpretar como JSON (matriz já formatada)
    try {
      const parsed = JSON.parse(trimmedInput);
      if (Array.isArray(parsed) && Array.isArray(parsed[0])) {
        // Validar que todos os elementos são strings de uma letra
        const validMatrix = parsed.every(
          row =>
            Array.isArray(row) &&
            row.every(cell => typeof cell === 'string' && cell.length === 1 && /[A-Z]/i.test(cell))
        );

        if (validMatrix) {
          // Converter para maiúsculas
          return parsed.map(row => row.map(cell => cell.toUpperCase()));
        }
      }
    } catch (e) {
      // Não é JSON válido, continuar para próxima tentativa
    }

    // Tentativa 2: Interpretar como matriz com separadores (formato antigo)
    if (trimmedInput.includes('|') || trimmedInput.includes('\n')) {
      let rows;

      if (trimmedInput.includes('|')) {
        // Formato: C,A,V|A,L,E|I,R,O
        rows = trimmedInput.split('|');
      } else {
        // Formato com quebras de linha
        rows = trimmedInput.split('\n').filter(row => row.trim());
      }

      const matrix = rows
        .map(row => {
          return row
            .split(',')
            .map(cell => cell.trim().toUpperCase())
            .filter(cell => cell.length === 1 && /[A-Z]/.test(cell));
        })
        .filter(row => row.length > 0);

      if (matrix.length > 0) {
        return matrix;
      }
    }

    // Tentativa 3: Lista linear de letras separadas por vírgula
    const letters = trimmedInput
      .split(',')
      .map(letter => letter.trim().toUpperCase())
      .filter(letter => letter.length === 1 && /[A-Z]/.test(letter));

    if (letters.length === 0) {
      throw new Error('Nenhuma letra válida encontrada');
    }

    // Determinar o tamanho ideal da matriz baseado no número de letras
    const totalLetters = letters.length;
    let rows, cols;

    // Tentar formar uma matriz o mais quadrada possível
    if (totalLetters <= 9) {
      // Para até 9 letras, tentar 3x3 ou dimensões menores
      rows = Math.ceil(Math.sqrt(totalLetters));
      cols = Math.ceil(totalLetters / rows);
    } else {
      // Para mais letras, usar uma abordagem mais flexível
      rows = Math.ceil(Math.sqrt(totalLetters));
      cols = Math.ceil(totalLetters / rows);
    }

    // Criar matriz preenchendo com as letras disponíveis
    const matrix = [];
    let letterIndex = 0;

    for (let row = 0; row < rows; row++) {
      const matrixRow = [];
      for (let col = 0; col < cols; col++) {
        if (letterIndex < letters.length) {
          matrixRow.push(letters[letterIndex]);
          letterIndex++;
        } else {
          // Se acabaram as letras, preencher com letras aleatórias
          const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          matrixRow.push(randomLetters[Math.floor(Math.random() * randomLetters.length)]);
        }
      }
      matrix.push(matrixRow);
    }

    return matrix;
  }

  executeChallenge(matrix) {
    const startBtn = document.getElementById('start-btn');
    const matrixInput = document.getElementById('matrix-input');

    // Detectar a palavra a ser buscada com base no input
    const input = matrixInput.value.trim();
    let targetWord = 'CAVALEIRO';

    if (input.includes('JAVASCRIPT')) {
      targetWord = 'JAVASCRIPT';
    } else if (input.includes('ALGORITMO')) {
      targetWord = 'ALGORITMO';
    }

    startBtn.classList.add('loading');
    startBtn.disabled = true;

    setTimeout(() => {
      // Passar a palavra-alvo como parâmetro
      const pathFinder = new KnightPathFinder(targetWord);
      const result = pathFinder.findKnightPath(matrix);
      this.displayResults(matrix, result);
      startBtn.classList.remove('loading');
      startBtn.disabled = false;
    }, 500);
  }

  displayResults(matrix, result) {
    const resultSection = document.getElementById('result-section');
    const resultContent = document.getElementById('result-content');

    let html = '';

    // Cabeçalho do resultado
    if (result.found) {
      html += `<div class="success">🏆 SIM - Caminho encontrado!</div>`;
    } else {
      html += `<div class="failure">❌ NÃO - Não foi possível encontrar o caminho do Cavaleiro!</div>`;
    }

    // Detectar formato da entrada original
    const matrixInput = document.getElementById('matrix-input');
    const inputValue = matrixInput.value.trim();
    let inputType = '';

    try {
      JSON.parse(inputValue);
      inputType = 'Matriz JSON';
    } catch (e) {
      if (inputValue.includes('|') || inputValue.includes('\n')) {
        inputType = 'Matriz com separadores';
      } else {
        inputType = 'Lista linear de letras';
      }
    }

    // Mostrar entrada original e formato detectado
    html += '<div class="calculation-step">';
    html += '<strong>📝 Entrada Original:</strong><br>';
    html += `Formato detectado: ${inputType}<br>`;
    html += `Dados: ${inputValue}<br>`;
    html += '</div>';

    // Mostrar matriz processada
    html += '<div class="calculation-step">';
    html += '<strong>🎯 Matriz Processada:</strong><br>';
    html += `Dimensões: ${matrix.length}x${matrix[0].length}<br>`;
    matrix.forEach((row, index) => {
      html += `Linha ${index}: [${row.join(', ')}]<br>`;
    });
    html += '</div>';

    // Mostrar processo de busca
    if (result.steps.length > 0) {
      html += '<div class="calculation-step">';
      html += '<strong>🔍 Processo de Busca (DFS com Backtracking):</strong><br>';
      result.steps.forEach(step => {
        html += `${step}<br>`;
      });
      html += '</div>';
    }

    // Mostrar caminho encontrado
    if (result.found && result.path.length > 0) {
      html += '<div class="calculation-step">';
      html += '<strong>🗺️ Caminho Percorrido:</strong><br>';
      result.path.forEach((pos, index) => {
        html += `${index + 1}. [${pos.row}, ${pos.col}] = '${pos.letter}'<br>`;
      });
      html += `<strong>Palavra formada: ${result.path.map(p => p.letter).join('')}</strong><br>`;
      html += '</div>';

      // Visualização da matriz com caminho destacado
      html += this.pathFinder.generateMatrixVisualization(matrix, result.path);
    }

    // Resultado final destacado
    html +=
      '<div class="calculation-step" style="border-left-color: ' +
      (result.found ? '#4ade80' : '#ef4444') +
      '; background: rgba(' +
      (result.found ? '74, 222, 128' : '239, 68, 68') +
      ', 0.1);">';
    html += '<strong>🎯 Saída Final:</strong><br>';
    html += `<span class="${result.found ? 'success' : 'failure'}">"${result.found ? 'Sim' : 'Não'}"</span>`;
    html += '</div>';

    resultContent.innerHTML = html;
    resultSection.classList.add('show');

    // Scroll para o resultado
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  handleBack() {
    const resultSection = document.getElementById('result-section');
    const matrixInput = document.getElementById('matrix-input');
    const resultContent = document.getElementById('result-content');

    // Limpar a seção de resultados
    resultContent.innerHTML = '';

    // Ocultar a seção de resultados
    resultSection.classList.remove('show');

    // Limpar o input
    matrixInput.value = '';

    // Focar no input
    matrixInput.focus();

    // Scroll para o topo do container
    document.querySelector('.challenge-container').scrollTop = 0;
  }

  showResult(message, type) {
    const resultSection = document.getElementById('result-section');
    const resultContent = document.getElementById('result-content');

    resultContent.innerHTML = `<div class="${type}">${message}</div>`;
    resultSection.classList.add('show');
  }
}

// Inicializar aplicação quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  new CavalieroChallengeApp();
  console.log('🏰 Desafio do Cavaleiro iniciado! Que a busca épica comece!');
});
