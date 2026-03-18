const functionList = ['real','imag','abs','arg','neg','conj','sq','cube','sqrt','exp','ln','recip','imul','cis','sin','cos','tan','csc','sec','cot','sinh','cosh','tanh','csch','sech','coth','asin','acos','atan','acsc','asec','acot','asinh','acosh','atanh','asech','acsch','acoth','gamma','gamma_left','gamma_right','fact','lambertw','zeta_character','zeta_strip','eta_strip','eta_right','eta','eta_left','zeta','nome','erf','rerf','erf_large','erf_small','exp_raw','theta000','binom','theta00','theta01','theta10','theta11','invert_tau','raw_sn','raw_dn','raw_cn','jacobi_reduce','sn','dn','cn'];

const functionMap = {
  'real': 'c_real',
  'imag': 'c_imag',
  'abs': 'c_abs',
  'arg': 'c_arg',
  'neg': 'c_neg',
  'conj': 'c_conj',
  'sq': 'c_sq',
  'cube': 'c_cube',
  'sqrt': 'c_sqrt',
  'exp': 'c_exp',
  'ln': 'c_ln',
  'recip': 'c_recip',
  'imul': 'i_mul',
  'cis': 'c_cis',
  'sin': 'c_sin',
  'cos': 'c_cos',
  'tan': 'c_tan',
  'csc': 'c_csc',
  'sec': 'c_sec',
  'cot': 'c_cot',
  'sinh': 'c_sinh',
  'cosh': 'c_cosh',
  'tanh': 'c_tanh',
  'csch': 'c_csch',
  'sech': 'c_sech',
  'coth': 'c_coth',
  'asin': 'c_asin',
  'acos': 'c_acos',
  'atan': 'c_atan',
  'acsc': 'c_acsc',
  'asec': 'c_asec',
  'acot': 'c_acot',
  'asinh': 'c_asinh',
  'acosh': 'c_acosh',
  'atanh': 'c_atanh',
  'asech': 'c_asech',
  'acsch': 'c_acsch',
  'acoth': 'c_acoth',
  'gamma': 'c_gamma',
  'gamma_left': 'c_gamma_left',
  'gamma_right': 'c_gamma_right',
  'fact': 'c_fact',
  'lambertw': 'c_lambertw',
  'zeta_character': 'zeta_character',
  'zeta_strip': 'czeta_strip',
  'eta_strip': 'ceta_strip',
  'eta_right': 'ceta_right',
  'eta': 'ceta',
  'eta_left': 'ceta_left',
  'zeta': 'c_zeta',
  'nome': 'c_nome',
  'erf': 'c_erf',
  'rerf': 'rerf',
  'erf_large': 'c_erf_large',
  'erf_small': 'c_erf_small',
  'exp_raw': 'c_exp_raw',
  'theta000': 'theta000',
  'binom': 'c_binom',
  'theta00': 'c_theta00',
  'theta01': 'c_theta01',
  'theta10': 'c_theta10',
  'theta11': 'c_theta11',
  'invert_tau': 'invert_tau',
  'jacobi_reduce': 'jacobi_reduce',
  'raw_sn': 'raw_sn',
  'raw_cn': 'raw_cn',
  'raw_dn': 'raw_dn',
  'sn': 'csn',
  'cn': 'ccn',
  'dn': 'cdn',
};

function Token(type, value) {
  this.type = type;
  this.value = value;
}

function isComma(ch) {
  return /,/.test(ch);
}

function isDigit(ch) {
  return /\d/.test(ch);
}

function isLetter(ch) {
  return /[a-z]/i.test(ch);
}

function isOperator(ch) {
  return /\+|-|\*|\/|\^/.test(ch);
}

function isLeftParenthesis(ch) {
  return /\(/.test(ch);
}

function isRightParenthesis(ch) {
  return /\)/.test(ch);
}

function tokenize(str) {
  str = str.replace(/\s+/g, "");
  str = str.split("");

  var result = [];
  var letterBuffer = [];
  var numberBuffer = [];

  str.forEach(function (char, idx) {
    if (isDigit(char)) {
      if (letterBuffer.length) {
        // If we are currently building a function name, treat the digit as part of it
        letterBuffer.push(char);
      } else {
        // Otherwise, treat it as part of a number
        numberBuffer.push(char);
      }
    } else if (char === ".") {
      numberBuffer.push(char);
    } else if (isLetter(char) || (char === '_' && letterBuffer.length)) { // Allow underscore in function names
      if (numberBuffer.length) {
        emptyNumberBufferAsLiteral();
        result.push(new Token("Operator", "*")); // Insert a multiplication operator between a number and a function/variable
      }
      letterBuffer.push(char);
    } else if (isOperator(char)) {
      if (char === '-' && (idx === 0 || isOperator(str[idx - 1]) || isLeftParenthesis(str[idx - 1]))) {
        // Treat as unary minus
        result.push(new Token("Unary", "Unary -"));
      } else {
        emptyNumberBufferAsLiteral();
        emptyLetterBufferAsVariables();
        result.push(new Token("Operator", char));
      }
    } else if (isLeftParenthesis(char)) {
      if (letterBuffer.length) {
        result.push(new Token("Function", letterBuffer.join("")));
        letterBuffer = [];
      } else if (numberBuffer.length) {
        emptyNumberBufferAsLiteral();
        result.push(new Token("Operator", "*")); // Insert a multiplication operator between a number and a parenthesis
      }
      result.push(new Token("Left Parenthesis", char));
    } else if (isRightParenthesis(char)) {
      emptyLetterBufferAsVariables();
      emptyNumberBufferAsLiteral();
      result.push(new Token("Right Parenthesis", char));
    } else if (isComma(char)) {
      emptyNumberBufferAsLiteral();
      emptyLetterBufferAsVariables();
      result.push(new Token("Function Argument Separator", char));
    }
  });

  if (numberBuffer.length) {
    emptyNumberBufferAsLiteral();
  }
  if (letterBuffer.length) {
    emptyLetterBufferAsVariables();
  }

  return result;

  function emptyLetterBufferAsVariables() {
    var l = letterBuffer.length;
    for (var i = 0; i < l; i++) {
      result.push(new Token("Variable", letterBuffer[i]));
      if (i < l - 1) { // there are more Variables left
        result.push(new Token("Operator", "*"));
      }
    }
    letterBuffer = [];
  }

  function emptyNumberBufferAsLiteral() {
    if (numberBuffer.length) {
      result.push(new Token("Literal", numberBuffer.join("")));
      numberBuffer = [];
    }
  }
}

function ASTNode(token, children) {
  this.token = token.value;
  this.children = children;
}

function parse(inp) {
  var outStack = [];
  var opStack = [];
  var argsStack = [];

  Array.prototype.addNode = function (operatorToken, args) {
    var children = [];
    if (args) {
      // For functions with multiple arguments
      for (let i = 0; i < args; i++) {
        children.unshift(this.pop()); // Add arguments in reverse order
      }
    } else if (operatorToken.type === "Unary") {
      children.push(this.pop()); // Unary operator has one child
    } else {
      // Binary operator
      children.push(this.pop()); // Right child
      children.push(this.pop()); // Left child
    }
    this.push(new ASTNode(operatorToken, children));
  };

  Array.prototype.peek = function () {
    return this.slice(-1)[0];
  };

  var assoc = {
    "^": "right",
    "*": "left",
    "/": "left",
    "+": "left",
    "-": "left"
  };

  var prec = {
    "^": 4,
    "*": 3,
    "/": 3,
    "+": 2,
    "-": 2
  };

  Token.prototype.precedence = function () {
    return prec[this.value];
  };

  Token.prototype.associativity = function () {
    return assoc[this.value];
  };

  // Tokenize
  var tokens = tokenize(inp);

  tokens.forEach(function (v) {
    if (v.type === "Function Argument Separator") {
      while (opStack.peek() && opStack.peek().type !== "Left Parenthesis") {
        outStack.addNode(opStack.pop());
      }
      argsStack[argsStack.length - 1]++; // Increment argument count for the current function
    } else if (v.type === "Left Parenthesis") {
      opStack.push(v);
      argsStack.push(1); // Initialize argument count for a new function
    } else if (v.type === "Right Parenthesis") {
      while (opStack.peek() && opStack.peek().type !== "Left Parenthesis") {
        outStack.addNode(opStack.pop());
      }
      opStack.pop(); // Pop the left parenthesis
      let argCount = argsStack.pop(); // Get the argument count for the function
      if (opStack.peek() && opStack.peek().type === "Function") {
        outStack.addNode(opStack.pop(), argCount); // Add function node with all its arguments
      }
    } 
    if (v.type === "Literal" || v.type === "Variable") {
      outStack.push(new ASTNode(v, null, null));
    } else if (v.type === "Function" || v.type === "Unary") { // Treat Unary operators similarly to functions
      opStack.push(v);
    } else if (v.type == "Operator") {
      while (opStack.peek() && (opStack.peek().type === "Operator") &&
        ((v.associativity() === "left" && v.precedence() <= opStack.peek().precedence()) ||
          (v.associativity() === "right" && v.precedence() < opStack.peek().precedence()))) {
        outStack.addNode(opStack.pop());
      }
      opStack.push(v);
    }
  });

  while (opStack.peek()) {
    outStack.addNode(opStack.pop());
  }

  return outStack.pop();
}

function astWriteFn(ast) {
  var token = ast.token;

  if ('+-*/^'.includes(token)) {
    var fn = {
      '+': 'c_add',
      '-': 'c_sub',
      '*': 'c_mul',
      '/': 'c_div',
      '^': 'c_pow',
    }[token];
    // Ensure the correct order of operands for binary operations
    var leftChild = astWriteFn(ast.children[1]); // Left child (second in array)
    var rightChild = astWriteFn(ast.children[0]); // Right child (first in array)
    return fn + '(' + leftChild + ',' + rightChild + ')';
  }

  if (token === 'Unary -') {
    return 'c_neg(' + astWriteFn(ast.children[0]) + ')';
  }

  if (functionList.includes(token)) {
    return functionMap[token] + '(' + ast.children.map(astWriteFn).join(',') + ')';
  }

  if (token == 'i') return '[0,1]';
  if (token == 'z') return 'z';

  return '[' + token + ',0]';
}


function compile(expression) {
  return new Function('z','return ' + astWriteFn(parse(expression)));
}