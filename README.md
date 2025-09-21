# ⚔️ Missão Épica: O Caminho do Cavaleiro 🐴

Um sistema interativo para resolver o desafio de encontrar a palavra "CAVALEIRO" em uma matriz gerada automaticamente a partir de letras fornecidas pelo usuário.

## 📋 Descrição do Desafio

O objetivo é determinar se é possível formar a palavra "CAVALEIRO" em uma matriz de letras, movendo-se apenas na **vertical** (cima/baixo) ou **horizontal** (esquerda/direita), sem revisitar células já utilizadas.

### 🎯 Regras do Desafio:
- ✅ Movimento permitido: **↑ ↓ ← →** (sem diagonais)
- ❌ **Não é permitido revisitar células**
- 📝 Palavra deve ser formada na ordem exata: **C → A → V → A → L → E → I → R → O**
- 🏆 Resultado: `"Sim"` se encontrou o caminho, `"Não"` caso contrário

## 🚨 Observações Importantes sobre o Desafio

Tudo leva a crer que o desafio, ou pelo menos o exemplo fornecido, está de fato incorreto para a palavra "CAVALEIRO".

Após revisão, foi confirmado que o problema não está no algoritmo DFS com backtracking (que funciona corretamente), mas sim nas matrizes fornecidas para teste.

❌ **Por que as matrizes anteriores não funcionam?**

A palavra **"CAVALEIRO"** tem 9 letras e requer que cada letra esteja em uma célula adjacente (vertical ou horizontal), sem revisitar posições já usadas.

Matriz do desafio original:
```
C A V
A L E
I R O
```

Problema: há dois ``'A's``, mas o caminho C → A → V → A ***quebra***, pois não há como ir do V(0,2) até A(1,0) sem pular ou revisitar células.

Minha tentativa anterior (também incorreta):
`` 
[["C","A","V","A"],
 ["X","Y","Z","L"],
 ["I","R","O","E"]]
``

Problema: até o E(2,3) funciona, mas não há um I adjacente para continuar a sequência.

✅ **Uma matriz que realmente funciona!**

Depois de vários testes, foi construída uma matriz correta que permite formar a palavra "CAVALEIRO" seguindo todas as regras:
```
[["C","A","V"],
 ["E","L","A"],
 ["I","R","O"]]
```

Essa matriz respeita a ordem da palavra e garante adjacência sem revisitar células.

Ou seja: seu código está correto, só faltava uma matriz válida.

## 🚀 Como Usar

### 1. **Entrada de Dados**
Digite as letras separadas por vírgula no campo de entrada:
```
C,A,V,E,L,A,I,R,O
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
**Entrada:** `C,A,V,E,L,A,I,R,O`

**Matriz Gerada (3x3):**
```
Linha 0: [C, A, V]
Linha 1: [E, L, A]
Linha 2: [I, R, O]
```

**Caminho Válido:**
```
🔍 Tentando iniciar busca em posição [0, 0] = 'C'
📍 Passo 1: [0, 0] = 'C' ✓
🔍 Tentando mover para [-1, 0] buscando 'A'
🔍 Tentando mover para [1, 0] buscando 'A'
🔍 Tentando mover para [0, -1] buscando 'A'
🔍 Tentando mover para [0, 1] buscando 'A'
📍 Passo 2: [0, 1] = 'A' ✓
🔍 Tentando mover para [-1, 1] buscando 'V'
🔍 Tentando mover para [1, 1] buscando 'V'
🔍 Tentando mover para [0, 0] buscando 'V'
🔍 Tentando mover para [0, 2] buscando 'V'
📍 Passo 3: [0, 2] = 'V' ✓
🔍 Tentando mover para [-1, 2] buscando 'A'
🔍 Tentando mover para [1, 2] buscando 'A'
📍 Passo 4: [1, 2] = 'A' ✓
🔍 Tentando mover para [0, 2] buscando 'L'
🔍 Tentando mover para [2, 2] buscando 'L'
🔍 Tentando mover para [1, 1] buscando 'L'
📍 Passo 5: [1, 1] = 'L' ✓
🔍 Tentando mover para [0, 1] buscando 'E'
🔍 Tentando mover para [2, 1] buscando 'E'
🔍 Tentando mover para [1, 0] buscando 'E'
📍 Passo 6: [1, 0] = 'E' ✓
🔍 Tentando mover para [0, 0] buscando 'I'
🔍 Tentando mover para [2, 0] buscando 'I'
📍 Passo 7: [2, 0] = 'I' ✓
🔍 Tentando mover para [1, 0] buscando 'R'
🔍 Tentando mover para [3, 0] buscando 'R'
🔍 Tentando mover para [2, -1] buscando 'R'
🔍 Tentando mover para [2, 1] buscando 'R'
📍 Passo 8: [2, 1] = 'R' ✓
🔍 Tentando mover para [1, 1] buscando 'O'
🔍 Tentando mover para [3, 1] buscando 'O'
🔍 Tentando mover para [2, 0] buscando 'O'
🔍 Tentando mover para [2, 2] buscando 'O'
📍 Passo 9: [2, 2] = 'O' ✓
✅ Caminho encontrado! Palavra "CAVALEIRO" formada com sucesso.
```

**Resultado:** `"Sim"`

---

### **Exemplo 2: Caminho NÃO Encontrado ❌**
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
