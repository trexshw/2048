2048 is an interesting game, why not make our own?!

https://play2048.co

1. Generate an initial board with a random number of `2`s at random cells, e.g.:
```json
[
    [2, null, 2, null],
    [null, 2, null, 2],
    [2, null, 2, null],
    [null, 2, null, 2]
]
```

2. Support *Merge Left* on the board. E.g.:

Before:
```json
[
    [null, 8, 2, 2],
    [4, 2, null, 2],
    [null, null, null, null],
    [null, null, null, 2]
]
```
After Merge Left:
```json
[
    [8, 4, null, null],
    [4, 4, null, null],
    [null, null, null, null],
    [2, null, null, null]
]
```

3. Support *Merge Right*. E.g.:

Before:
```json
[
    [null, 8, 2, 2],
    [4, 2, null, 2],
    [null, null, null, null],
    [null, null, null, 2]
]
```
After Merge Right:
```json
[
    [null, null, 8, 4],
    [null, null, 4, 4],
    [null, null, null, null],
    [null, null, null, 2]
]
```

4. Support *Merge Up* and *Merge Down*. E.g.:

Before:
```json
[
    [null, 8, 2, 2],
    [4, 2, null, 2],
    [null, null, null, null],
    [null, null, null, 2]
]
```
After Merge Up:
```json
[
    [4, 8, 2, 4],
    [null, 2, null, 2],
    [null, null, null, null],
    [null, null, null, null]
]
```

5. Generate a `2` or `4` at random empty spaces after each merge. E.g.:

Before:
```json
[
    [null, 8, 2, 2],
    [4, 2, null, 2],
    [null, null, null, null],
    [null, null, null, 2]
]
```
After Merge Up and adding a new 2 or 4:
```json
[
    [4, 8, 2, 4],
    [null, 2, null, 2],
    [null, null, null, null],
    [2, null, null, null]
]
```

5. Determine endgame. E.g.:

No more moves:
```json
[
    [2,4,2,4],
    [4,2,4,2],
    [2,4,2,4],
    [4,2,4,2]
]
```

Or, we've reached the goal of 2048:
```json
[
    [4, null, null, 2],
    [2048, null, null, null],
    [4, 2, null, null],
    [4, null, null, null]
]
```
