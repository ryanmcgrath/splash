Splash - Teaching kids to program with what they already know
----------------------------------------------------------------------------------
About a year or two ago, I set out to teach one of my younger brothers the basics
of programming. I found myself somewhat astounded at a few things, though:

1) The kid was so beaten down by the public school system that he expected everything
to be explained and done for him

2) He had no interest in trying something out until it was 100% shown to him.

Some people might think this is fine, but I find it horrifying. Kids should be able
to try out programming with a clear mind. See, while programming can be a lot of
mathematics and hard logic, it's also an exercise in free thinking. Answers don't
(at least, rarely do they ever) just come to you in this field, you're required to
think.

I looked at a few of the available options/languages aimed at kids: there's 
Scratch (http://scratch.mit.edu/), a really graphical (almost lego-ish) approach to
programming. The idea is to get kids thinking about logic without worrying about
programming, but I've witnessed first hand that this approach doesn't work. For some
reason, kids don't get things like branching logic up front, and Scratch does nothing
to explain the core concepts, it just dumps kids into a playground. Alice (http://www.alice.org/)
is very much in the same boat (if not worse).

Shoes (http://shoes.heroku.com/) was a novel approach that had potential, but then someone
decided to throw a fit and give up on a great concept. Go figure.

How is Splash different?
------------------------------------------------------------------------------------
One avenue where kids can still get creative and let their brains flow is creative writing.
The act of coding can be very much likened to that of writing a story. When a child writes
a story, they're programming without realizing it. The logic and thought that goes into a simple
tale can easily make up an entire program.

Splash is an attempt to capitalize on that capability. Splash programs are literally a story -
the trick is that, like any grade school vocabulary exercise, you "define" the terms and words in
your story. Check out this example:

    noun daniel:  
	    color: #307ace  
	    picture: box  
        position: 50 50  
    end
    
    noun store:  
	    position: 100 100  
    end
    
    verb ran:  
	    who: daniel  
        position: store  
    end
    
    daniel ran to the store.  

The final sentence is the program itself. Before that, we've just defined the terms used. It's pretty cool - verbs
all relate to an object, etc (e.g, who ran? Daniel ran).

This is all very early stage, mind you. I've written a basic parser that translates things down...

Wait, where does this run?
----------------------------------------------------------------------------------------------------------
Oh yeah, that's the best part.

Splash programs "compile" down to Javascript, and can (will) run in any browser. The core of Splash will always be free
and open source - kids shouldn't be denied access to a great learning experience.

There's nothing else out there where a kid can write a program in a format they already know, and be able to run it anywhere
(Desktop, Laptop, emerging devices (iPhone/iPad/Android)). Rock on.

Currently, to compile a splash program, you'll need Node.js and a Unix system. For portability purposes, this may be rewritten
in the near future, we'll see how it goes.

    node lib/parser.js test.splash

Questions, comments?
-----------------------------------------------------------------------------------------------------------
Hit me up at the following:

ryan[at]venodesigns.net  
http://twitter.com/ryanmcgrath  
http://venodesigns.net/  
