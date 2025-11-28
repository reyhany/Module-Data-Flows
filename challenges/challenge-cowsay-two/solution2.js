// =================
// Stripped down cowsayer CLI, 
// no libraries or arguments
// https://nodejs.dev/learn/accept-input-from-the-command-line-in-nodejs
// =================
const readline = require("readline");
// 1. Make  a command line interface.
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

// 2. Make supplies for our speech bubble

// 3. Make a cow that takes a string
const topLine = "_";
const bottomLine = "-";

const cow = (saying) => {
    if (!saying) saying = "Moo";

    const length = saying.length + 2;
    const top = topLine.repeat(length);
    const bottom = bottomLine.repeat(length);

    const bubble =
        ` ${top}\n` +
        `< ${saying} >\n` +
        ` ${bottom}\n`;

    const picture = `
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
    `;

    return bubble + picture;
};

// 4. Prompt the user
rl.question("What are you eating? ", function(answer) {
    console.log(cow(answer));
    rl.close();
});

// 4. Use readline to get a string from the terminal 
// (with a prompt so it's clearer what we want)