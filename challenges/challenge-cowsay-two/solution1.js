// =================
// Stripped down cowsayer CLI, 
// no libraries
// https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line
// =================

// 1. Accept arguments

// how will you accept arguments?
const input = process.argv[2];
// 2. Make supplies for our speech bubble

let topLine = '_';
let bottomLine = '-';
let saying = '';

// 3. Make a cow that takes a string

function cowsay(saying) {
// how will you make the speech bubble contain the text?
if (!saying) {
    return "Hi";
}
// where will the cow picture go?
const length = saying.length + 2;
const top = topLine.repeat(length);
const bottom = bottomLine.repeat(length);
// how will you account for the parameter being empty?
  const bubble =
    ` ${top}\n` +
    `< ${saying} >\n` +
    ` ${bottom}\n`;

  const cow = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
`;
    return bubble + cow;
}


//4. Pipe argument into cowsay function and return a cow
console.log(cowsay(input));
// how will you log this to the console?
