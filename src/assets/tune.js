const strings = [
`X:1
T: nome
M: 4/4
L: 1/8
K: C
`
,
`X:1
T: Do Re Mi Fa
M: 4/4
L: 1/8
R: reel
K: C
C2 D2 E2|: "F" F2 FFz CDC | "Bb" D2 DDz CGF |
"C" E2 EEz CDE |1 "F" F2 FFz CDE:|2 "F" F2 [FD][FD]z4 |]`
,
`X:1
T:Notes
M:C
L:1/4
K:C
A,,,, B,,,, C,,, D,,, | E,,, F,,, G,,, A,,, |B,,, C,, D,, E,, | F,, G,, A,, B,,| C, D, E, F,|G, A, B, C|D E F G|A B c d|e f g a|b c' d' e'|f' g' a' b'| c'' d'' e'' f'' | g'' a'' b'' c''' |]`
]

const stringToTune = (string) => string.map(s => JSON.parse(JSON.stringify(s)));

const tune = stringToTune(strings);

module.exports = tune;