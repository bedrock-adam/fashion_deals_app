# Fashion Deals App

Here you shall find a simple express app running on node.

Registration, sign in and deal CRUD functionality has been implemented via full page postbacks (using swig templates) AND a deals json api is mounted at /api/deals.

User and Deal information is stored in mongo, using mongoose.

I've included a few domain (mocha), integration (supertest) and acceptance tests (zombie) for good measure.

In addition, Marionette (my preference of front-end JS frameworks) is half integrated. If you hit /marionette a simple LayoutView will render into the App's main container region. Hoping to display those deals via the json endpoint soon.

I'm trying to keep things as modular as possible client side, and am liking the way browserify facilitates this.

Everything was written from scratch (no scaffolding) so as to fully understand each step in the process.
