# ⚔️ Missão Épica: O Caminho do Cavaleiro 🐴

Um sistema interativo para resolver o desafio de encontrar a palavra "CAVALEIRO" em uma matriz gerada automaticamente a partir de letras fornecidas pelo usuário.

## 📋 Descrição do Desafio

O objetivo é determinar se é possível formar a palavra "CAVALEIRO" em uma matriz de letras, movendo-se apenas na **vertical** (cima/baixo) ou **horizontal** (esquerda/direita), sem revisitar células já utilizadas.

### 🎯 Regras do Desafio:
- ✅ Movimento permitido: **↑ ↓ ← →** (sem diagonais)
- ❌ **Não é permitido revisitar células**
- 📝 Palavra deve ser formada na ordem exata: **C → A → V → A → L → E → I → R → O**
- 🏆 Resultado: `"Sim"` se encontrou o caminho, `"Não"` caso contrário

## 🚀 Como Usar

### 1. **Entrada de Dados**
Digite as letras separadas por vírgula no campo de entrada:
```
C, A, V, A, L, E, I, R, O
```

### 2. **Geração Automática da Matriz**
O sistema automaticamente:
- Remove espaços e caracteres inválidos
- Converte para maiúsculas
- Forma a matriz mais quadrada possível
- Preenche com letras aleatórias se necessário

### 3. **Busca DFS com Backtracking**
Algoritmo implementado:
- Busca por todas as posições que contenham 'C'
- Explora todos os caminhos possíveis
- Usa backtracking para desfazer escolhas incorretas
- Retorna o primeiro caminho válido encontrado

## 📊 Exemplos de Entrada

### **Exemplo 1: Caminho Encontrado ✅**
**Entrada:** `C, A, V, A, L, E, I, R, O, X, Y, Z`

**Matriz Gerada (4x3):**
```
C  A  V  A
L  E  I  R
O  X  Y  Z
```

**Caminho Válido:**
```
C(0,0) → A(0,1) → V(0,2) → A(0,3) → L(1,0) → E(1,1) → I(1,2) → R(1,3) → O(2,0)
```

**Resultado:** `"Sim"`

---

### **Exemplo 2: Caminho Encontrado (Formato Linear) ✅**
**Entrada:** `C, A, V, A, L, E, I, R, O`

**Matriz Gerada (1x9):**
```
C  A  V  A  L  E  I  R  O
```

**Caminho Válido:**
```
C(0,0) → A(0,1) → V(0,2) → A(0,3) → L(0,4) → E(0,5) → I(0,6) → R(0,7) → O(0,8)
```

**Resultado:** `"Sim"`

---

### **Exemplo 3: Caminho NÃO Encontrado ❌**
**Entrada:** `C, A, V, X, Y, Z, W, K, P`

**Matriz Gerada (3x3):**
```
C  A  V
X  Y  Z
W  K  P
```

**Análise:**
- Encontra `C(0,0)` e `A(0,1)`
- Encontra `V(0,2)`
- **Não encontra** segunda letra `A` adjacente
- Posições adjacentes a V(0,2): apenas Z(1,2) ≠ A
- Todas as tentativas falham

**Resultado:** `"Não"`

## 🛠️ Estrutura do Projeto

```
cavaleiro-challenge/
│
├── index.html          # Interface principal
├── styles.css          # Estilos e animações
├── script.js           # Lógica DFS e processamento
│
└── assets/
    └── background.mp4  # Vídeo de fundo (adicionar)
```

## 🎨 Características Técnicas

### **Frontend:**
- **HTML5** com estrutura semântica
- **CSS3** com animações e responsividade completa
- **JavaScript ES6+** com classes e arrow functions

### **Algoritmo:**
- **DFS (Depth-First Search)** com backtracking
- Complexidade de tempo: O(4^n) onde n = comprimento da palavra
- Complexidade de espaço: O(m×n) para matriz visited

### **Design:**
- 🎨 Tema medieval/mágico com cores prateadas
- ✨ Animações suaves e efeitos glow
- 📱 Layout totalmente responsivo
- 🎥 Suporte a vídeo background

### **Funcionalidades:**
- 🔄 Parsing inteligente de entrada
- 📊 Visualização passo-a-passo do processo
- 🗺️ Matriz visual com caminho destacado
- 📋 Resultado detalhado com cálculos

 ## Problemas Encontrados no Desafio
 
### 🚨 Limitações Algorítmicas

1. **Restrição de Movimento**
   
Problema: Algoritmo permite apenas movimentos ortogonais (↑ ↓ ← →)
Impacto: Impossibilita formação de palavras com movimentos mais complexos
Exemplo: Palavras como "PALHAÇADA" não podem ser formadas devido à rigidez dos movimentos

3. **Complexidade Computacional**
   
Desafio: Algoritmo DFS com backtracking tem complexidade exponencial O(4^n)
Consequências:
Alto consumo de memória
Tempo de processamento aumenta rapidamente com matrizes maiores
Potencial travamento em matrizes extensas

5. **Limitação na Geração de Matrizes**
   
Problema: Sistema gera matrizes aleatórias que nem sempre são úteis
Riscos:
Preenchimento com letras aleatórias pode tornar impossível formar palavras
Não há garantia de formação da palavra desejada

7. **Escopo Restrito de Palavras**
   
Limitação: Algoritmo eficiente apenas para palavras específicas como "CAVALEIRO"
Restrições:
Palavras complexas exigem matrizes muito específicas
Não há flexibilidade para palavras com movimentos não-ortogonais

9. **Processamento de Caracteres Especiais**
    
Desafio: Tratamento limitado para caracteres como "Ç" e acentuados
Potenciais Erros:
Possível perda ou má interpretação de caracteres especiais
Necessidade de normalização de caracteres

## 🛠️ Possíveis Melhorias

Expansão de Movimentos

Implementar movimentos em diagonal

Permitir saltos não-adjacentes

Criar modo flexível de movimentação

Otimização de Desempenho
Implementar podas no algoritmo
Usar memoização para reduzir processamentos repetitivos
Limitar profundidade de busca
Geração Inteligente de Matrizes
Algoritmo para garantir formação da palavra
Preferência por matrizes com maior probabilidade de sucesso
Suporte Avançado a Caracteres
Normalização de caracteres especiais
Tratamento robusto de acentuação e caracteres unicode
Modo de Depuração e Estatísticas
Adicionar métricas de desempenho
Visualização detalhada dos caminhos explorados
Opção de configuração de algoritmo

## 🎲 Desafios para Desenvolvimento Futuro

[ ] Implementar movimentos em 8 direções (estilo movimento de cavalo no xadrez)

[ ] Criar modo competitivo com geração de palavras aleatórias

[ ] Adicionar níveis de dificuldade com restrições variáveis

## 🌟 Recursos Visuais

### **Animações:**
- **Shimmer Effect**: Título com gradiente animado
- **Glow Buttons**: Botões com borda luminosa no hover
- **Pulse Animation**: Células do caminho pulsando
- **Smooth Transitions**: Transições suaves em todos os elementos

### **Responsividade:**
- **Desktop**: Container à esquerda, botões lado a lado
- **Tablet**: Botões empilhados, container centralizado
- **Mobile**: Layout otimizado, elementos redimensionados

## 🎯 Instalação e Uso

1. **Clone/Download** dos arquivos
2. **Adicione** o vídeo `background.mp4` na pasta `assets/`
3. **Abra** o `index.html` em qualquer navegador moderno
4. **Digite** as letras no formato especificado
5. **Clique** em "INICIAR BUSCA" e veja a mágica acontecer!

## 🏆 Algoritmo DFS Detalhado

```javascript
// Pseudocódigo simplificado
function findPath(matrix, word) {
    for cada posição (row, col) em matrix {
        if matrix[row][col] == word[0] {
            if dfs(row, col, 0) {
                return "Sim"
            }
        }
    }
    return "Não"
}

function dfs(row, col, wordIndex) {
    if fora_dos_limites(row, col) return false
    if já_visitado(row, col) return false  
    if matrix[row][col] != word[wordIndex] return false
    
    if wordIndex == word.length - 1 return true
    
    marcar_visitado(row, col)
    
    for cada direção (cima, baixo, esquerda, direita) {
        if dfs(novaRow, novaCol, wordIndex + 1) {
            return true
        }
    }
    
    desmarcar_visitado(row, col) // BACKTRACK
    return false
}
```

---

**Desenvolvido com ⚔️ para o desafio épico do Cavaleiro!**
