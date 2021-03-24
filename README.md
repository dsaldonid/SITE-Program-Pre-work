# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: Diego Saldonid

Time spent: 15 hours spent in total

Link to project: https://glitch.com/~quasar-resonant-fountain

## Required Functionality

The following **required** functionality is complete:

* [x] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [x] "Start" button toggles between "Start" and "Stop" when clicked. 
* [x] Game buttons each light up and play a sound when clicked. 
* [x] Computer plays back sequence of clues including sound and visual cue for each button
* [x] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [x] User wins the game after guessing a complete pattern
* [x] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [x] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [x] Buttons use a pitch (frequency) other than the ones in the tutorial
* [ ] More than 4 functional game buttons
* [ ] Playback speeds up on each turn
* [x] Computer picks a different pattern each time the game is played
* [ ] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

* [x] Used flexbox to allow flexible game structure 
* [x] Created hover states for the start and stop buttons to ease user interaction
* [x] Added dropdrop that allows user to select different difficulties
* [x] Disabled ability to press buttons while sequence is playing
* [x] Disabled start button unless a difficulty is selected
* [x] Enable buttons again once sequence is finished
* [x] Allow user to see what round they are currently on
* [x] Created popup windows for the player losing and winning the game
* [x] Created try again buttons for each pop window after player wins/loses
* [x] Have button spread out when the game begins
* [x] Stop and restart buttons return game to original states 

## Video Walkthrough

Here's a walkthrough of implemented user stories:
![](your-link-here)


## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 
https://www.w3schools.com/css/, https://darekkay.com/flexbox-cheatsheet/, Ellis Lee (gave incredible design critique) @ https://www.ellislee.me/,
https://developer.mozilla.org/en-US/,https://stackoverflow.com/

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
One of the biggest technical challenge I encountered was enabling the buttons after the sequence was played. Previous versions of the game disabled buttons 
before the sequence was played but would enable the buttons while the sequence was playing. Ultimately, the problem was my lack of understanding of how setTimeout() 
and asynchronous programming works. I learned that even though my enableButtons() function was outside my sequence for loop, the call was being prioritized in 
our call stack. After tinkering around with the call placement and playing around with function closure, I came across a simple solution. I decided to call 
the function via setTimeout() outside the loopwith a time length equal to our delay during the sequence. This would ensure that my enableButtons() function was 
called after all the lights in the sequeunce have been played. 

The biggest mental challenges I faced was changing my mindset on frontend web development. Coming into the project I was a bit sketical about the concept of what frontend 
development encompassed to me. I've mostly focus on creating functionality with little to no visual display. While I was amored with diving deep into algorithmic detail, I spent 
little time focusing on creating a usable product that could bring value to others.Everytime I tried to work on frontend visuals and functionality I genuinely hesitated. 
However, this project really help me reconceptualize not only the emmense value of frontend development in a full stack, but also has me feeling excited to continue 
developing my entire skillset throughtout the entire stack. It was a such a rewarding experience to genuinely create,build and iterate throughtout a project like this.
In specific, I loved the ability to build the game and constantly iterate and develop the game to its "final" version and beyond. I'm excited to add these new skills to my
own projects. Thank you for the opportunity to grow, CodePath, you a real one.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
The project showed me the importance of design critque in order to limit bias, but also the constraints a project may have. How do you leverage the constraints you've noticed
to optimize your projects functionality and usability? In addition, what design principles are important to focus on while working on the project? I noticed myself having to 
choose between what was feasible (with the given time on the project I had) and incorporating the design critque I got. Most importantly, I'm curious how you priortize and 
compromise different component developing? Is it based on utility? What if two components have the same utility? The most important question is what about web development gets
you the most excited?

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 
I would have added more user customized controllers. In particular, I would add a switch that allows the user to choose how if they want the remaining time to guess displayed. 
Having a container besides my game would be a good place for location to ease visibility. The container would work similarly to how my pop-ups for winning and losing work. 
If the user decides that they wanted a clock,via a switch on the page that would have an on change trigger, it would become visible. I would create a function that will 
display the time within the clock container (haven't flushed out visuals specs yet). This would function similar to mine my function that displays the round number on the page.
Additionally, I'd create a slider that allows the user to choose how much time they want for the pattern to play and for them to repeat the pattern. I'd have to be careful not
to set the delay to zero, or close to it, to avoid buttons playing simultaneously. Just like my dropdown menu, the slider would disappear once the game beginners to avoid bugs.





## License

    Copyright Diego Saldonid

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
