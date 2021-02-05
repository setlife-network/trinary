### Default Developer Workflow

- Assign yourself to an issue you feel confident in taking on
- Checkout a new branch from the latest version of `develop`. Always make sure you have synced with the default branch (currently `develop`)
- Name your branch with your initials, and either the issue number or a short description of what you're working on if multiple issues may be involved in your work. Examples:

```
ol/issue-1
ol/issue-1/update-readme
ol/ui-overhaul
```

- After you've finished testing locally, add any new files, commit and refer to any relevant issues in your commit message. Include `closes #1` if the code you are pushing resolves the issue. Follow these guidelines for writing your commit message (https://chris.beams.io/posts/git-commit/) and try to stick to those rules as closely as possible. Take your time and do not rush when writing commit messages.
- Try to stay focused on one issue at a time and commit frequently, but if it's ever necessary to _close_ multiple issues in a single commit message, be sure to format it as `closes #1, closes #2` since just `closes #1, #2` will leave issue #2 open after merging.
- Before pushing, do another sync with `develop` in case any pull requests have been merged already while you were working. Resolve any conflicts before finalizing the commits and pushing to your branch. See below:

```
// after finished working on your-branch
git add .
git commit -a
// press I to enable INSERT mode and type your commit message, then press ESC, then type ":x" then press Enter

git checkout develop
git pull
git checkout - // this is a shortcut for checking out the last branch you were on
git merge - // this is a shortcut for merging the last branch you were on into the branch you are currently on

// resolve merge conflicts if necessary (git add; git commit -a)

git push -u origin your-branch
// or just "git push" if your branch already exists on GitHub
```

- Create a pull request from `your-branch` to `develop` and be sure to include either a video recording/screenshot with proof that the issue is resolved (preferred) OR clear instructions on how to test successfully and wait for a code review. If any changes are required after review, pushing to the same branch again will automatically update the pull request


### Code Quality Principles

There may be specific linting rules configured in the project that should be followed and it is worth taking the time to set up a linter in your IDE to do this automatically. However, it is not the linting rules themselves that constitute good enforcement of code quality and rules may be changed according to developer preference as long as there is consistency throughout the codebase.

There are key principles involving language skills and grammar that are more important than linting rules and cannot be automated because they are more abstract/logical/conceptual in nature. Use these principles as a guide to make sure your code is as readable and understandable as possible.

#### 1. Minimize Required Knowledge

Whenever you are writing new code, imagine what it would be like to read the same code 6 months from now when you have little to no memory of having written it. This is a good high-level exercise to see if you can understand what your code does or whether adding more context in the form of comments or renaming some variables and functions to better describe the implemented functionality.

#### 2. Write Foldable, Sorted, Consistent Code

Most code files will average hundreds of lines of code which means scrolling through functions and logic blocks should be as easy as possible. Make sure your IDE has code folding features that allow you to collapse code according to its indentation level. A large file full of functions also becomes much easier to read through if the function names are sorted alphabetically so that a reviewer can quickly find and unfold the functions that need to be debugged.

Before:
[Screen Shot 2020-10-08 at 12 15 50 PM](https://user-images.githubusercontent.com/4914611/95486749-6a032200-0961-11eb-9bdc-0fdccd77447a.png)

After:
[Screen Shot 2020-10-08 at 12 20 10 PM](https://user-images.githubusercontent.com/4914611/95486744-68395e80-0961-11eb-804f-c9bd18c23742.png)

#### 3. Avoid Abbreviations

Verbosity is almost _always_ preferred over abbreviations, which far more often than not makes it more difficult to read code. By applying #1 and minimizing the required knowledge, you may not remember what was abbreviated and might have to guess, which takes time and effort when you just are trying to read and decipher the behavior of the code.

Usually the only case where it is acceptable to abbreviate is where the full word was just used, like when looping through items in an array.

```
const fruits = ['Apple', 'Banana', 'Orange']

fruits.map(fruit => {
    console.log(fruit)
})
```

can be abbreviated to

```
const fruits = ['Apple', 'Banana', 'Orange']

fruits.map(f => {
    console.log(f)
})
```

#### 4. Avoid Redundant Programming Terminology

Arrays, objects, strings, requests, responses, etc are all terms specific to programming/computer networks that do not need to be reiterated, especially since the opportunity to add helpful context is lost. Prefer using different words that help describe the logic or data being implemented in real-world terms.

```
// Bad:

let array1 = ['Apple', 'Banana', 'Orange']
let array2 = ['Lettuce', 'Onion']

const pushToArray1 = (i) => {
    array1.push(i)
}
const pushToArray2 = (i) => {
    array2.push(i)
}

pushToArray1('Mango')
pushToArray2('Asparagus')
```

```
// Better:

let fruits = ['Apple', 'Banana', 'Orange']
let vegetables = ['Lettuce', 'Onion']

const addToFruits = (fruitName) => {
    fruits.push(fruitName)
}
const addToVegetables = (vegetableName) => {
    vegetables.push(vegetableName)
}

addToFruits('Mango')
addToVegetables('Asparagus')
```

#### 5. Utilize Parts of Speech

Good code should read almost like a narrative story or operating manual and properly naming variables and functions can have a significant impact when debugging and understanding the behavior of the code. Semantically, variables and functions serve the same purpose as nouns and verbs do in traditional languages so we use them as respective counterparts (variables=nouns, functions=verbs).

Variables are useful for describing something that we need to refer to later. Functions may be defined as variables, but are fundamentally different in that they are executed and can represent actions or events happening in a sequence. See the examples below on how to use these parallels to our advantage.

```
// Bad:

const x = ['Apple', 'Banana', 'Orange']

const fruit = (a) => {
    x.push(a)
}

fruit('Mango')

// Bad:

const fruit = ['Apple', 'Banana', 'Orange']

const addFruitsArray = (x) => {
    fruit.push(x)
}

addFruitsArray('Mango')
```

In the example above, a programmer would be able to make sense of it but the variable and function names do not describe what the program is doing. This would be better written as:

```
// Better:

const fruits = ['Apple', 'Banana', 'Orange']

const addToFruits = (fruitName) => {
    fruits.push(fruitName)
}

addToFruits('Mango')
```

This example can be read and understood more naturally due to good use of parts of speech.

Adjectives, adverbs, prepositions, and other parts of speech can be used to add further context that may be helpful:

```
// Better:

let availableFruits = [
    {
        fruitName: 'Apple',
        quantityRemaining: 5,
    },
    {
        fruitName: 'Banana',
        quantityRemaining: 2,
    },
    {
        fruitName: 'Orange',
        quantityRemaining: 3,
    }
]

const addFruitToInventory = (fruitName, quantity) => {
    availableFruits.push({
        fruitName,
        quantityRemaining: quantity
    })
}

const removeOutOfStockFruits = () => {
    availableFruits = availableFruits.filter(f => {
        if (f.quantityRemaining > 0) {
            return true
        } else {
            return false
        }
    })
}

addFruitToInventory('Mango', 7)
removeOutOfStockFruits()
```

