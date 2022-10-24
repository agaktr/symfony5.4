/**
 * FROG START
 * Some serious fun at first :D
 */

export function frog() {
    (function doTheThing() {
        // Act on either the window.console, or the normal console.
        let con = console;
        if (typeof(window) !== 'undefined') {
            con = window.console;
        }

        con.frog = function() {

            let i,
                css = "color: green";

            // Should be enough to make this fine in node.
            let inBrowser = (typeof window !== 'undefined');

            // This looks like a frog, right?
            // Taken from here - http://chris.com/ascii/index.php?art=animals/frogs

            let frog;
            if( inBrowser ) {
                frog = ['%c%c',
                    "%c         _,-.  %c",
                    "%c ,-. ,--'  o ) %c",
                    "%c \\(,' '  ,,-' %c",
                    "%c,-.\\-.__,\\\\_%c",
                    "%c\\(`--'    `\\ %c",
                    '%c%c'];
            } else {
                frog = ['',
                    "         _,-.  ",
                    " ,-. ,--'  o ) ",
                    " \\(,' '  ,,-' ",
                    ",-.\\-.__,\\\\_",
                    "\\(`--'    `\\ ",
                    ''];
            }


            // Gets args as a string
            let args = Array.prototype.slice.call(arguments);
            let stringOfArgs = args.join(' ');

            // Add the bubble if there is something to log!
            if( stringOfArgs.length > 0 ) {
                frog[1] = frog[1] + "   ---" + ("-".repeat(stringOfArgs.length)) + "-";
                frog[2] = frog[2] + "-(   " + stringOfArgs + "   )";
                frog[3] = frog[3] + "    ---" + ("-".repeat(stringOfArgs.length)) + "-";
            }

            // Log the frog!
            if( inBrowser ) {
                for( i = 0; i < frog.length; i++ ) {
                    console.log(frog[i], css, "");
                }
            } else {
                for( i = 0; i < frog.length; i++ ) {
                    console.log(frog[i]);
                }
            }

            let styles= [
                "font-size: 14px",
                "font-family: monospace",
                "background: white",
                "display: inline-block",
                "padding: 8px 19px",
                "border: 2px dashed;"
            ].join(";");
            console.log("%c Roses are red 🔥", "color: red;"+styles );
            console.log("%c Violets are blue 🏄", "color: blue;"+styles );
            console.log("%c Don't mess with our code 😨", "color: green; "+styles );
            console.log("%c Because we will find you! 🚀", "color: black; "+styles );
        }
    })();
    console.frog('We start... Ribit..')
}

/**
 * FROG END
 * Done of serious fun :/
 */

/**
 * COOKIES START
 */

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * COOKIES END
 */

/**
 * VIEWPORT MOBILE FIX START
 */

export function viewportFix() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
        // We execute the same script as before
        vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

/**
 * VIEWPORT MOBILE FIX END
 */