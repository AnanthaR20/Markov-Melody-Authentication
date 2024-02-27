# Markov Melody Authentication

This is a relatively novel idea for a mneumonic password, where a user maps a song or melody that they know to a long binary string using a binary variant of [Parsons Code](https://en.wikipedia.org/wiki/Parsons_code#:~:text=The%20Parsons%20code%2C%20formally%20named,of%20Tunes%20and%20Musical%20Themes.).

To create a password, pick a song or section of a song. Using only the letters 'D' and 'U', input the song you've chosen by pressing 'D' when the note is lower than the previous note and 'U' when the note is higher than the previous note.

If the note is the same pitch as the previous note press the same key ('D' or 'U') again.
Start on either 'U' or 'D'. User's choice

*Some examples:*
Twinkle Twinkle Little Star... DDUUUUDDDDDDDDUUDDDDDUUDDDDDDDUUUUDDDDDDDD
Silent Night.................. DUDDUUDDUUDUUDUUUDDDUDDUUUDDDUDDUUUDDUUDDDUDDD
Kookaburra Song............... DDDDUUUDDUDDDDDUUDDUDUDUUDDDUUDDDDDD
Happy Birthday................ DDUDUDDDUDUDDDUDDDDUUDDUD
Kal Ho Naa Ho................. UDUDUDUUDDDDUDUUDUDUDUUDDDDUDUDUUDDUUDDUUDDUDD

## Pro's
+ Many people anyways passivley remember many many songs
+ Given that a user is able to differentiate pitch, with some practice converting melodies to parsons code, this could be a great way to remember long passwords
+ Onscreen, there is no need to display any of the inputs since- ideally- the sequence is not rotely memorized. Therefore:
  + Creates some reslience to Observation Shoulder Surfing Attacks
  + People with visual impairments can enter passwords in this way (assuming they can differentiate pitch)
+ With practice, these sequences can be entered fairly quickly for the security they may offer
+ Using an N-gram model would allow a customizable level of security where- depending on the context- it could vary from a monogram to matching the exact sequence

## Con's
- Not everyone can mentally reproduce the relationship between pitches
- There could be some vulnerability to brute force attacks if the space of melodies doesn't map evenly across the space of binary strings
- Using an N-gram model will demand probabilistic criteria for a valid user which may be subjective.

## Open Questions / Things to investigate
? It's unsure how songs/melodies are distributed across binary strings. Is there enough entropy within Parsons Encodings of songs to provide security against brute force attacks?
? On average how many songs can be represented by a given binary string?
? Coming up with criteria for easily reproduceable passwords in this domain. Perhaps the syllable-to-note ratio could be one metric. If syllables coincide with notes it's easier to remember, but if a syllable is stretched over multiple notes it could lead to variations in user input. (i.e. vocal riffs, trills, slides, glissando, etc.)
? Some people are not able to mentally reproduce the relationship between pitches, what is the predictor for who can and who cannot do this?
? What proportion of people can input a password in this way?
? To what extent can people learn how to input a password this way?
? What is the best way to teach this method?
? Can people improve speed and accuracy of input over time?
? Are there other mnemonics that allow users to remember a binary string?
? What is the best UI for inputting this type of password? Swiping left and right? Swiping up and down? 2 buttons?

# Verification
The method of verification in this authentication scheme will use an N-gram language model and the CORRECT parsons code for the chosen melody to compute the probability of a valid user given some input. In this way, a user could specify how 'picky' they want their authentication scheme to be. Choosing anything from a monogram to matching the exact sequence. 

The CORRECT parsons code for their chosen melody would just be the code they input during password set-up.

# DEMO EXAMPLE
You can demo this PIN entry method [HERE](https://ananthar20.github.io/Markov-Melody-Authentication/)
Use user id: 'lrs'
