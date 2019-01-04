Functional requirements PWD:
============================

The application should be a single page application.
OK

The user shall be able to open multiple windows 
(not browser windows/tabs but custom windows created using the DOM) within the application.
OK

The user shall be able to drag and move the windows inside the PWD.
OK.
HTML5 Drag& drop API used. 
All windows are draggable. Dropzone: trash bin, dropped window will be removed from the DOM.
All windows are movable. Just drag and leave at every place but dropzone.

The user shall be able to open and close new windows of the desired application by clicking 
or double clicking an icon at the desktop.
OK

The icon used to open the window should be represented in the upper bar of the window.
OK

Windows should get focus when clicked/dragged.
OK

The window with focus shall be on top of all other windows.
OK

The following three applications should at least be included in the desktop application:

    A memory-game
    OK

    A chat connected to a central chat channel using websockets
    OK

    One, by you, designed and decided application
    OK, simple canvas-based game a'la Arkanoid.

Non functional requirements PWD:
================================

A complete git commit history should be present for assessment. 
For this assignment somewhere between 30 and 200 commits is normal
OK. 39 commits

The code standard standard.js should be followed. 
(npm start will show errors if you are not complying)
OK but Chat.js 137:27  error  'WebSocket' is not defined  no-undef 

All Exported functions, classes and types should be commented. Perferably using JSDoc.
OK

The application shall be visually appealing
OK (I have try to implement view a'la OSX)

The code shall be organized in appropriate modules, at least four (4).
OK. 9 modules

Functional requirements, Memory application:
============================================

The user should be able to open and play multiple memory games simultaneously.
OK

The user should be able to play the game using only the keyboard.
OK. Arrow keys & Enter

One, by you decided, extended feature
OK. Timer.

    Demands
    =======

    You should be able to play the game with and without using the mouse.
    OK

    The game should count how many attempts the user have made and present that 
    when the game is finnished.
    OK

    It should be possible to render different sizes of the gameboard. (4x4, 2x2, 2x4)
    OK

Functional requirements, Chat application
=========================================

The user should be able to have several chat applications running at the same time.
OK

When the user opens the application for the first time the user should be asked to write 
his/her username.
OK

The username should remain the same the next time the user starts a chat application 
or the PWD is restarted.
OK

The user should be able to send chat messages using a textarea.
OK

The user should be able to see at least the 20 latest messages since the chat applications 
was opened.
OK

One, by you decided, extended feature.
OK. Ability to change username.



