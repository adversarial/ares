/**
 * @function: generateRandomPhrase
 * @description: generates random phrase that can be used to overwrite comments
 * **/

export function generateRandomPhrase() {
    //thanks to http://stackoverflow.com/a/4709034
    var verbs =
        [
            ["go to", "goes to", "going to", "went to", "gone to"],
            ["look at", "looks at", "looking at", "looked at", "looked at"],
            ["choose", "chooses", "choosing", "chose", "chosen"]
        ];
    var tenses =
        [
            {name: "Present", singular: 1, plural: 0, format: "%subject %verb %complement"},
            {name: "Past", singular: 3, plural: 3, format: "%subject %verb %complement"},
            {name: "Present Continues", singular: 2, plural: 2, format: "%subject %be %verb %complement"}
        ];
    var subjects =
        [
            {name: "I", be: "am", singular: 0},
            {name: "You", be: "are", singular: 0},
            {name: "He", be: "is", singular: 1}
        ];
    var complementsForVerbs =
        [
            ["cinema", "park", "home", "concert"],
            ["for a map", "them", "the stars", "the lake"],
            ["a book for reading", "a dvd for tonight"]
        ];

    Array.prototype.random = function () {
        return this[Math.floor(Math.random() * this.length)];
    };

    function generate() {
        var index = Math.floor(verbs.length * Math.random());
        var tense = tenses.random();
        var subject = subjects.random();
        var verb = verbs[index];
        var complement = complementsForVerbs[index];
        var str = tense.format;
        str = str.replace("%subject", subject.name).replace("%be", subject.be);
        str = str.replace("%verb", verb[subject.singular ? tense.singular : tense.plural]);
        str = str.replace("%complement", complement.random());
        return str;
    }

    return generate();
}

/**
 * @function resolveAfter2Seconds: Simulates sleep() for 2 seconds and returns a promise.
 * to be used in conjunction with await.
 * Primary purpose is to respect reddit's API ratelimits (60 per minute)
 */
export function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
}

export function onNetworkError(error) {
    if (error.response) {
        // if error code is above 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('An Improper Request was sent to reddit. Please post this on /r/NukeRedditHistory for more help', error.message);
    }
    console.log(error);
}