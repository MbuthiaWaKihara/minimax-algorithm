# Minimax Algorithm (Simple js implementation)
![view during testing](https://github.com/MbuthiaWaKihara/minimax-algorithm/blob/master/images/first.png)
![view during testing](https://github.com/MbuthiaWaKihara/minimax-algorithm/blob/master/images/second.png)
![view during testing](https://github.com/MbuthiaWaKihara/minimax-algorithm/blob/master/images/third.png)

# Purpose

<p>This project is a simple implementation of the minimax algorithm.</p>
<p>The minimax algorithm is a way of traversing a visualized tree diagram. It is useful in turn based games where a program is automatically playing moves for one side, and needs to make decisions based on future possible positions.</p>
<p>This implementation is one of the simplest possible. The first image references the generic appearance of the algorithm in code. The implementation uses the game of tic tac toe(because the game has fewer possibilities, and more straighforward positional evaluation) and allows a user to play against the program</p>
<p>This algorithm can be used to implement more complex decision making in more complex turn based games like chess.</p>


# Known Bugs
<p>One challenge I had interacting with the alg is move ordering. The algorithm is optimized if it checks moves starting from best to worst.</p>
<p>In this particular implementation, I did not order the moves in any way, therefore the program simply searches the tree in a specific order. Consequently, there are situations where due to equality in evaluation, the program may chose a path that wins, but does not win on the spot. This bug can be fixed by either ordering moves from best to worst, so that the alg considers best moves first, or create a more specific static position evaluation so that even good moves have different evaluations(separate a good move from a better move)</p>

# Resources
<p>The first screenshot is from a youtube video by Sebastian Lague, Algorithms Explained - minimax and alpha-beta prunning. Here's a link: https://www.youtube.com/watch?v=l-hh51ncgDI</p>

# Demo
<p>Test out a deployed version of the tic tac toe ai with a react-based simple gui: </p>

# License
<p>MIT</p>