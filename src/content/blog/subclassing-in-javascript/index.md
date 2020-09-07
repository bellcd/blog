---
title: Subclassing in JavaScript
description: "What that means & how to do it"
date: "2020-01-10"
---

Let's talk about class hierarchies in JavaScript, (ie subclasses & superclasses).

The basic idea is when you want to share SOME (but not all) properties and / or functionality between several instances of something.

Huh?

If that's clear as mud at this point, perhaps walking through an example might be helpful.

Let's say we have a constructor `Dog`, and that `Dog` constructor creates instances of `Dog`s. Each `dog` that our `Dog` constructor creates can do dog things like `run`, `wagTail`, `eat` and `bark`. Also, each `dog` has characteristics, like `breed`, `color`, `size`, & `name`.

Our `Dog` constructor might look something like this

```js
function Dog(breed, color, size, name) {
  this.breed = breed;
  this.color = color;
  this.size = size;
  this.name = name;
}
```
We're doing pseudoclassical instantiation here, so the object at the prototype property of our `Dog` constructor will have some methods, namely:

```js
Dog.prototype.run = function() {
  console.log('My name is ' + this.name + ' and I\'m running!');
}

Dog.prototype.wagTail = function() {
  console.log('I\'m ' + this.name + ' and I\'m wagging my tail - look at it go!');
}

Dog.prototype.eat = function() {
  console.log('My name is ' + this.name + ' and I\'m coming for dinnertime!');
}

Dog.prototype.bark = function() {
  console.log('WOOF WOOF WOOF. I\'m ' + this.name + ' WOOF WOOF WOOF');
}
```

Now we can create instances of `Dog` with unique `breed`, `color`, `size`, & `name` properties, that all have access (via the prototype chain) to the methods `run`, `wagTail`, `eat`, & `bark`.

Let's do the same type of thing for a `Cat` class.

`Cats` can do things like `run`, `wagTail`, `eat` and `bark`, and also have characteristics like `breed`, `color`, `size`, & `name`. Our constructor and prototype methods might look like this:

```js
function Cat(breed, color, size, name) {
  this.breed = breed;
  this.color = color;
  this.size = size;
  this.name = name;
}

Cat.prototype.run = function() {
  console.log('My name is ' + this.name + ' and I\'m running!');
}

Cat.prototype.wagTail = function() {
  console.log('I\'m ' + this.name + ' and I\'m wagging my tail - look at it go!');
}

Cat.prototype.eat = function() {
  console.log('My name is ' + this.name + ' and I\'m coming for dinnertime!');
}

Cat.prototype.meow = function() {
  console.log('MEOW MEEEEOOOOOW. I\'m ' + this.name + ' MEOW MEOW MEOW MEEEEEEOOOOOOOW');
}
```

This totally works, and we can create lots of cats and dogs ... But does anything jump out at you about the code samples above for `Dog` & `Cat`?

(Take a moment and actually think on it before continuing!)

.

.

.

.

.

.

.

.

.

.

.

.

.

.

We're repeating ourselves quite a bit, even in a small example like this. This is breaking the general principal of Don't Repeat Yourself (DRY). Imagine how quickly this codebase could bloat if we also had classes for other pets (turtles, hamsters, rabbits, etc...)

The key task then, is to:

> **identify which properties or methods can be shared between the classes, and which must be unique.**

Taking another look at our code, there are several places where it appears to have the exact same text - I'm going to say that when the text is exactly the same - verbatim - that's a good indicator that we might be able to share that code somehow.

1. the properties of the constructor functions
2. the `run`, `wagTail`, & `eat` methods

Wouldn't it be nice if there was some way we could have all our dogs and cats share those things? (so we don't have to repeat ourselves as much!)

First, take a moment and consider how we use the classes as they exist now. For example, we could create two dogs with something like this:

```js
var spot = new Dog('Dalmation', 'black and white', 'small', 'Spot');
var disco = new Dog('Mastiff', 'brown', 'huge', 'Disco');
```

Both spot & disco have unique values for `breed`, `color`, `size`, & `name`, but they SHARE access to the methods `run`, `wagTail`, `eat` & `bark`. It is this distinction of what is unique VS what can be shared that we are going to duplicate, but at a different level.

Let's handle setting properties first.

## Properties
Recall that in the pseudoclassical instantiation pattern in JavaScript, using the `new` keyword immediately before a function call does several things behind the scenes, including:

- Shortly after that function's execution context is opened, a new empty object is created.
- Inside the function, that empty object is now bound to the keyword `this`
- By default, the function will return that empty object.

Soooo, what we really want to happen is to be able to do OTHER THINGS to that empty object (ie, setting properties), BEFORE it's returned out the bottom of our constructor.

Next question. Are the "other things" that we want to do to that object the same or different in both our `Cat` and `Dog` constructors?

(actually have an opinion before you continue!)

.

.

.

.

.

.

.

.

.

.

.

.

.

.

In this particular case **they're all the same**. Recall from before that we identified that we're setting the exact same properties (which definitely refer to unique values) to our instances - regardless of whether it's a `Cat` or a `Dog` instance. **So the sequence of steps we need to perform is exactly the same in both the Cat and Dog constructors**

What exactly are those steps? Well, it's setting the properties on the new object we're eventually going to return. So we need a way for BOTH `Cat` & `Dog` constructors to call a function that modifies something they pass it. But recall from above that the `new` keyword does several things under the hood.

```js
function Dog(breed, color, size, name) {
  ____________________ // what function call can go here instead?

  // this.breed = breed;
  // this.color = color;
  // this.size = size;
  // this.name = name;
}
```

Could we use the keyword `new`?

```js
function Dog(breed, color, size, name) {
  var dog = new Animal(breed, color, size, name); // ??

  // this.breed = breed;
  // this.color = color;
  // this.size = size;
  // this.name = name;

  _________________ // but what get's returned here?
}
```

This will indeed create a new object with the four properties referencing unique values, and we have a pointer called `dog` which references it. But we're still inside our `Dog` constructor invocation. And what gets returned from here is the new object created inside the `Dog` constructor invocation.

So, because the `new` keyword (inside the invocation of our constructor) creates, binds `this` to, and eventually returns the object that is to be the instance of our class, using `new` when we're inside another constructor's invocation is less helpful than we might think.

(Some terminology: In our example here, `Dog` is the subclass and `Animal` is the superclass)

Can we make it so that we control what `this` binds to when our superclass constructor invokes?

Yes, actually. We can totally do that.

We can use the `call()` function to specify what a particular execution context's `this` binding will be, as well as passing in any needed arguments. So, if we do something like:

```js
function Dog(breed, color, size, name) {
  Animal.call(this, breed, color, size, name); // =)

  // this.breed = breed;
  // this.color = color;
  // this.size = size;
  // this.name = name;
}
```

The invocation of our `Animal` constructor did NOT use the keyword `new`, (so this does not get automatically bound to a new object, which would then be returned). Furthermore, using `call()` to invoke our `Animal` constructor allowed us to specify what the `this` binding should be when `Animal` invokes here. Here's the crucial piece:

> Inside our subclass constructor (`Dog`) - because we always* expect it to be invoked with the keyword `new` - the new object that's created and bound to `this` - our instance object - is EXACTLY what we want our `this` keyword inside the superclass (`Animal`) execution context to refer to. And that's precisely what invoking the superclass with `call()`, passing in the keyword `this`, does.



*The subclass in the example here, `Dog`, could itself have subclasses. The general idea is the constructor of the class you want an instance of is called with `new`. So, for example, `Dog` could be a superclass to `GermanShepherd` & `ShilohShepherd`. In that case, we would use the keyword `new` to invoke one (let's say `GermanShepherd`), and then the `GermanShepherd` constructor would use `call()` to invoke `Dog`, which would also use `call()` to invoke `Animal`, all the while passing the `this` binding to the object that will eventually be our `GermanShepherd` instance through to each function's execution context.

## Methods
So that seems to solve the issue of properties set directly in a subclass or superclass constructor. But what about methods that are hanging out on the object(s) at a subclass's or superclass's prototype property?

Here, again, we need to be careful that we make choices such that methods are only available to appropriate instance objects. Instances of both our `Dog` & `Cat` classes should both be able to `run`, `wagTail`, & `eat`, but only dogs should be able to `bark`, and only `cats` should be able to meow.

Recall that every function in JavaScript gets a `prototype` property, which references a mostly empty object. When we invoke that function (the constructor) with the keyword `new`, the object that is returned (ie, the one that caused so much fuss above!) has its prototype set to the object at the constructor's `prototype` property.

All of this happens in part so we can do stuff like:

```js
var spot = new Dog('Dalmation', 'black and white', 'small', 'Spot');
spot.bark() // WOOF WOOF WOOF. I'm Spot WOOF WOOF WOOF
```

The object referenced by spot DOES NOT HAVE a `bark()` method. `bark()` is a method on the object at `Dog.prototype`. Our `spot` instance is able to find the `bark()` method because of [how JavaScript's prototype chain works](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes).

Please make sure that's clear, 'cause none of the rest of this will make sense if it's fuzzy!

Now, every object in JavaScript will (eventually) delegate failed property lookups to `Object.prototype`. So, when we're making subclasses, with regards to methods, we want our `[subclass].prototype` to delegate failed lookups to our `[superclass].prototype`.This is in contrast to the default behavior of our `[subclass].prototype`, which would delegate failed lookups directly to `Object.prototype`.

> **We're essentially adding another stop in the failed property lookup chain.**

So how do we do this?

Well, it would be super helpful if there was some syntax in JavaScript that allows us to specify what object a given object should delegate failed lookups to. (hint hint)

Turns out there is. It's called `Object.create()`. We pass in an object, which will be used as the prototype to a new object that it returns.

We can move any methods that both subclasses need to access (`run`, `wagTail`, and `eat`) from their respective constructor's prototype object (`Cat` and `Dog`) onto the superclass' (`Animal`) prototype object.

```js
Animal.prototype.run = function() {
  console.log('My name is ' + this.name + ' and I\'m running!');
}

Animal.prototype.wagTail = function() {
  console.log('I\'m ' + this.name + ' and I\'m wagging my tail - look at it go!');
}

Animal.prototype.eat = function() {
  console.log('My name is ' + this.name + ' and I\'m coming for dinnertime!');
}
```

What will happen here?

```js
var spot = new Dog('Dalmation', 'black and white', 'small', 'Spot');
spot.run() // ??
```

We're going to get an error, because the instance of `Dog` referenced by `spot` currently delegates failed property lookups to **the object at `Dog.prototype`, which right now is a mostly empty object.**

We need to replace the default object that's provided to us (for free) on both the `Cat` and `Dog` constructor's prototype property with a new object generated through `Object.create()` - which will make sure that that new object delegates failed property lookups to `Animal.prototype` - ie, where we added the methods that both `Cat` & `Dog` need access to.

```js
Cat.prototype = Object.create(Animal.prototype);
Dog.prototype = Object.create(Animal.prototype);
```

## The constructor reference
You thought we were done?! Not quite, there's one other piece of housekeeping.

The default object at a given constructor's prototype property (that we get for free) has a reference back to the constructor. This reference is at a property called `constructor`.

```js
function Dog(breed, color, size, name) {
  // ...
}

Dog.prototype.constructor === Dog; // referencing the same function!
```

So, if we're going to replace this default object at the constructor's prototype property, we need to replace the `constructor` reference that now no longer exists.

```js
function Dog(breed, color, size, name) {
  // ...
}

Dog.prototype = Object.create(Animal.prototype); // this new object doesn't have a constructor property
Dog.prototype.constructor = Dog; // so we'll add one
```

## tl:dr
- Make time! This is fundamental and important.
  - Use `Call` to invoke the superclass with `this` bound to the instance object
  - Move subclass' shared methods to `[superclass].prototype`
  - Use `Object.create()` to replace `[subclass].prototype` with an object that delegates to `[superclass].prototype`
  - Set `[subclass].prototype.constructor` to reference `[subclass]`

There's more to it, of course. We didn't get into historical solutions, for example - ie, before `Object.create()` existed. But the goal here is to cover how subclassing in JavaScript is commonly done now, and hopefully allow us to gain a little better insight into how it works.