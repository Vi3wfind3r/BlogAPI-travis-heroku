'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();
chai.use(chaiHttp);


describe('Blog Post', function() {
  before(function() {
    return runServer();
  });
  after(function() {
    return closeServer();
  });

  it('should list blog post on GET', function() {

  });

  it('should add a blog post on POST', function() {

  });

  it('should updated blog post on PUT', function() {

  });

  it('should delete blog post on DELETE', function() {

  });


});