# mmtool

This is a part of "New Student" project of mine. "New Student" - because this project aims to get rid of dominance of old-style "speaking head" type of teaching at the universities in Russia, to be certain, at the Faculty of Mathematics and Mechanics, Lomonosov Moscow State University. 

Aim of this very Firefox extension is to kill practice of writing answers to examination questions which are usually known far before exam is hold. Every year thousands of students do the same job: writing down the same paraphrased pieces of information.

Yes, it seems that process of writing down the answer and, that's more important, process of paraphrasing of lecture notes and textbook content itself are probably good practices of learning the stuff, but I have an overwhelming feeling, that this way became a dominant way of studying. Finally, I find this way very boring, and this is enough for me to try another approaches.

And the problem here is that it seems like there is no other option for self-study technical (not sure this is a correct word in English) subjects such as maths, physics. For example, while learning foreighn languages, we have plenty of helpful tools designed for different types of learners: flashcards, audio podcasts, adapted literature, adapting interactive test systems. And what we have for advanced math subjects such as differential geometry, complex analysis, functional analysis etc.? Nothing! Or, at least, very few tools invented by some enthusiasts and hidden from people.

**So, what exactly does this extension?**
* You are able to choose the Mediawiki driven site of your choice (say, https://ru.wikiversity.org )
* You can give your Bot credentials, created on this site, to the extension
* You can select a so-called "base page" that's is used in a described below way
* When activating the extension ("Turn On" in extension popup or some of the keyboard shortcuts used by the extension -- e.g. Alt+M, Alt+V, Alt+Shift+M):
** Select some text on page (say, some specific term, e.g. "normed space")
** Press "Create Card" (Alt+V)
*** An empty wiki subpage of *base page* will be created
** Start surfing Internet for information about
*** Feature assumed to be added: automatically open new tab with the search query on Alt+V
** When found interesting information, select it and press Alt+M to add selection to the end of created card.
*** It supposed to be a plain text or formula image generated by Mediawiki - by default it places the source latex code as alt tag of the img so latex code is copied when the formula is selected together with some text
*** In such way the resulting card is intended to be a nice looking web page with formuli enabled and some explaining text
** Press Alt+Shift+M to finish card creating (or Alt+V to start creating a new card)

