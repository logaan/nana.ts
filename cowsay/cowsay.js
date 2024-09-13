export const cow = {
    say(text, cow = 'default') {
        switch (cow) {
            case 'default':
                return `${text}
    \\   ^__^
      \\  (oo)\\______
        (__)\\      )\/\\
            ||----w |
            ||     ||
  `;
            case 'owl':
                return `${text}
     ___
    (o o)
   (  V  )
  /--m-m-
  `;
        }
    }
};

export const run = {
    run() {
        console.log(cow.say("Hello from the command interface!"));
    }
};

export function repl() {
    return cow.say("Hello from the repl!");
}